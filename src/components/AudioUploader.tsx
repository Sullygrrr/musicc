import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Music } from 'lucide-react';

interface AudioUploaderProps {
  onFileSelect: (file: File) => void;
}

export function AudioUploader({ onFileSelect }: AudioUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <Music className="w-12 h-12 mx-auto mb-4 text-gray-400" />
      {isDragActive ? (
        <p className="text-blue-500">Drop the MP3 file here</p>
      ) : (
        <div>
          <p className="text-gray-600">Drag and drop an MP3 file here, or click to select</p>
          <p className="text-sm text-gray-400 mt-2">Only MP3 files are accepted</p>
        </div>
      )}
    </div>
  );
}