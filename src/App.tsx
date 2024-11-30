import React, { useState } from 'react';
import { Music, LogOut } from 'lucide-react';
import { BrowseTab } from './components/BrowseTab';
import { SubmitTab } from './components/SubmitTab';
import { BottomNavigation } from './components/BottomNavigation';
import { useSwipeGesture } from './hooks/useSwipeGesture';
import { AuthModal } from './components/AuthModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Button } from './components/ui/Button';
import type { AudioSubmission, TabType } from './types/audio';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabType>('browse');
  const [submissions, setSubmissions] = useState<AudioSubmission[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout } = useAuth();

  const handleSubmit = (submission: AudioSubmission) => {
    setSubmissions((prev) => [submission, ...prev]);
    setActiveTab('browse');
  };

  useSwipeGesture({
    onSwipeLeft: () => {
      if (activeTab === 'browse') {
        setActiveTab('submit');
      }
    },
    onSwipeRight: () => {
      if (activeTab === 'submit') {
        setActiveTab('browse');
      }
    },
    threshold: 50,
  });

  const handleTabChange = (tab: TabType) => {
    if (tab === 'submit' && !user) {
      setShowAuthModal(true);
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Audio Library</h1>
          </div>
          {user && (
            <Button
              variant="secondary"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {activeTab === 'browse' ? (
            <BrowseTab submissions={submissions} />
          ) : user ? (
            <SubmitTab onSubmit={handleSubmit} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Sign in Required
              </h3>
              <p className="text-gray-500 mb-4">
                Please sign in to submit audio content
              </p>
              <Button onClick={() => setShowAuthModal(true)}>
                Sign In
              </Button>
            </div>
          )}
        </div>
      </div>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;