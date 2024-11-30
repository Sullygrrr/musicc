import { AudioSubmission } from '../types/audio';
import { AudioCard } from './AudioCard';
import { EmptyState } from './EmptyState';

interface BrowseTabProps {
  submissions: AudioSubmission[];
}

export function BrowseTab({ submissions }: BrowseTabProps) {
  if (submissions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      {submissions.map((submission) => (
        <AudioCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
}