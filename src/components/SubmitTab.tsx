import { useState } from 'react';
import { AudioUploader } from './AudioUploader';
import { TagInput } from './TagInput';
import { PlatformLinks } from './platform/PlatformLinks';
import { Button } from './ui/Button';
import { FormField } from './form/FormField';
import type { AudioSubmission } from '../types/audio';

interface SubmitTabProps {
  onSubmit: (submission: AudioSubmission) => void;
}

export function SubmitTab({ onSubmit }: SubmitTabProps) {
  const [submission, setSubmission] = useState<Omit<AudioSubmission, 'id' | 'createdAt'>>({
    title: '',
    definition: '',
    tags: [],
    file: null,
    platformLinks: {},
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...submission,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    });
    
    setSubmission({
      title: '',
      definition: '',
      tags: [],
      file: null,
      platformLinks: {},
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Title" htmlFor="title">
        <input
          type="text"
          id="title"
          value={submission.title}
          onChange={(e) => setSubmission({ ...submission, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </FormField>

      <FormField label="Definition" htmlFor="definition">
        <textarea
          id="definition"
          value={submission.definition}
          onChange={(e) => setSubmission({ ...submission, definition: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          required
        />
      </FormField>

      <FormField label="Tags">
        <TagInput
          tags={submission.tags}
          onChange={(tags) => setSubmission({ ...submission, tags })}
        />
      </FormField>

      <FormField label="Platform Links">
        <PlatformLinks
          links={submission.platformLinks}
          onChange={(platformLinks) => setSubmission({ ...submission, platformLinks })}
        />
      </FormField>

      <FormField label="Audio File">
        <AudioUploader
          onFileSelect={(file) => setSubmission({ ...submission, file })}
        />
        {submission.file && (
          <p className="mt-2 text-sm text-green-600">
            Selected file: {submission.file.name}
          </p>
        )}
      </FormField>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setSubmission({
            title: '',
            definition: '',
            tags: [],
            file: null,
            platformLinks: {},
          })}
        >
          Reset
        </Button>
        <Button type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}