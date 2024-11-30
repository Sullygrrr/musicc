import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { FormField } from './form/FormField';
import { Mail } from 'lucide-react';
import { ProfileSetupModal } from './ProfileSetupModal';

interface AuthModalProps {
  onClose: () => void;
}

export function AuthModal({ onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (resetMode) {
      try {
        await resetPassword(email);
        setResetSent(true);
      } catch (err) {
        setError('Failed to send password reset email.');
      }
      return;
    }

    try {
      if (isLogin) {
        await signIn(email, password);
        onClose();
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          return;
        }
        await signUp(email, password);
        setShowProfileSetup(true);
      }
    } catch (err) {
      setError('Failed to authenticate. Please check your credentials.');
    }
  };

  if (showProfileSetup) {
    return <ProfileSetupModal onClose={onClose} />;
  }

  if (resetSent) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
        <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md text-center">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Check your email</h2>
          <p className="text-gray-600 mb-4">
            We've sent password reset instructions to {email}
          </p>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {resetMode ? 'Reset Password' : isLogin ? 'Sign In' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Email" htmlFor="email">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </FormField>

          {!resetMode && (
            <FormField label="Password" htmlFor="password">
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </FormField>
          )}

          {!isLogin && !resetMode && (
            <FormField label="Confirm Password" htmlFor="confirmPassword">
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </FormField>
          )}

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex flex-col gap-3">
            <Button type="submit">
              {resetMode ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Create Account'}
            </Button>

            {!resetMode && (
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
              </button>
            )}

            {isLogin && !resetMode && (
              <button
                type="button"
                onClick={() => setResetMode(true)}
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Forgot your password?
              </button>
            )}

            {resetMode && (
              <button
                type="button"
                onClick={() => setResetMode(false)}
                className="text-sm text-gray-600 hover:text-gray-700"
              >
                Back to sign in
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}