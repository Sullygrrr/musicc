import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { FormField } from './form/FormField';
import { Upload, X } from 'lucide-react';
import AvatarEditor from 'react-avatar-editor';
import { storage } from '../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ProfileSetupModalProps {
  onClose: () => void;
}

export function ProfileSetupModal({ onClose }: ProfileSetupModalProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef<AvatarEditor | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { user, updateUserProfile } = useAuth();

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Username is required');
      return;
    }

    try {
      let photoURL = '';
      
      if (image && editorRef.current) {
        const canvas = editorRef.current.getImageScaledToCanvas();
        const blob = await new Promise<Blob>((resolve) => canvas.toBlob(resolve as BlobCallback));
        const imageFile = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        
        const storageRef = ref(storage, `avatars/${user?.uid}`);
        await uploadBytes(storageRef, imageFile);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateUserProfile(username, photoURL);
      onClose();
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Complete Your Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField label="Choose a Username" htmlFor="username">
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </FormField>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            
            <div className="flex justify-center">
              {image ? (
                <div className="relative">
                  <AvatarEditor
                    ref={editorRef}
                    image={image}
                    width={200}
                    height={200}
                    border={25}
                    borderRadius={100}
                    color={[255, 255, 255, 0.6]}
                    scale={scale}
                    rotate={0}
                  />
                  <button
                    type="button"
                    onClick={() => setImage(null)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="w-48 h-48 border-2 border-dashed rounded-full flex items-center justify-center">
                  <label className="cursor-pointer text-center p-4">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload Photo</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              )}
            </div>

            {image && (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Zoom
                </label>
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.01"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Skip
            </Button>
            <Button type="submit">
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}