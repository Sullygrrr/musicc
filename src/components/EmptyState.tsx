import { Music } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-12">
      <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">No audio submissions yet</h3>
      <p className="text-gray-500">
        Be the first to share an audio submission by clicking the Submit tab above.
      </p>
    </div>
  );
}