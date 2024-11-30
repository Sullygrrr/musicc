import { Music, Upload } from 'lucide-react';
import { cn } from '../utils/cn';
import type { TabType } from '../types/audio';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex justify-around py-4">
          <button
            onClick={() => onTabChange('browse')}
            className={cn(
              'flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors',
              activeTab === 'browse'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            )}
          >
            <Music className="w-6 h-6" />
            <span className="text-sm font-medium">Browse</span>
          </button>
          <button
            onClick={() => onTabChange('submit')}
            className={cn(
              'flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors',
              activeTab === 'submit'
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-blue-600'
            )}
          >
            <Upload className="w-6 h-6" />
            <span className="text-sm font-medium">Submit</span>
          </button>
        </div>
      </div>
    </div>
  );
}