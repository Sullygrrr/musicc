import { AudioSubmission } from '../types/audio';
import { Play, Tag, Music2, Youtube, Radio } from 'lucide-react';
import { Button } from './ui/Button';

interface AudioCardProps {
  submission: AudioSubmission;
}

export function AudioCard({ submission }: AudioCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{submission.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(submission.createdAt).toLocaleDateString()}
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Play className="w-4 h-4" />
          Play
        </Button>
      </div>
      
      <p className="text-gray-700 mb-4">{submission.definition}</p>
      
      {submission.tags.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-4 h-4 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {submission.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {(submission.platformLinks.spotify || submission.platformLinks.deezer || submission.platformLinks.youtube) && (
        <div className="flex flex-wrap gap-3">
          {submission.platformLinks.spotify && (
            <a
              href={submission.platformLinks.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700"
            >
              <Music2 className="w-4 h-4" />
              Listen on Spotify
            </a>
          )}
          {submission.platformLinks.deezer && (
            <a
              href={submission.platformLinks.deezer}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
            >
              <Radio className="w-4 h-4" />
              Listen on Deezer
            </a>
          )}
          {submission.platformLinks.youtube && (
            <a
              href={submission.platformLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
            >
              <Youtube className="w-4 h-4" />
              Watch on YouTube
            </a>
          )}
        </div>
      )}
    </div>
  );
}