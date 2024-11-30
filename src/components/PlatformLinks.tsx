import { useState } from 'react';
import { Music2, Youtube, Radio } from 'lucide-react';
import { Platform, PlatformLinks } from '../types/audio';
import { validatePlatformUrl } from '../utils/validateUrl';
import { cn } from '../utils/cn';

interface PlatformLinksProps {
  links: PlatformLinks;
  onChange: (links: PlatformLinks) => void;
}

export function PlatformLinks({ links, onChange }: PlatformLinksProps) {
  const [errors, setErrors] = useState<Partial<Record<Platform, string>>>({});
  const [isValidating, setIsValidating] = useState<Partial<Record<Platform, boolean>>>({});

  const validateAndUpdateUrl = async (platform: Platform, url: string) => {
    setIsValidating({ ...isValidating, [platform]: true });
    setErrors({ ...errors, [platform]: undefined });

    if (!url) {
      onChange({ ...links, [platform]: undefined });
      setIsValidating({ ...isValidating, [platform]: false });
      return;
    }

    const isValid = await validatePlatformUrl(platform, url);
    
    if (!isValid) {
      setErrors({ ...errors, [platform]: `Invalid ${platform} URL` });
      onChange({ ...links, [platform]: undefined });
    } else {
      onChange({ ...links, [platform]: url });
    }
    
    setIsValidating({ ...isValidating, [platform]: false });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Music2 className="w-5 h-5 text-green-600" />
        <input
          type="url"
          placeholder="Spotify URL (optional)"
          value={links.spotify || ''}
          onChange={(e) => validateAndUpdateUrl('spotify', e.target.value)}
          className={cn(
            'flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2',
            errors.spotify ? 'border-red-300 focus:ring-red-500' : 'focus:ring-blue-500'
          )}
        />
      </div>
      {errors.spotify && (
        <p className="text-sm text-red-500 mt-1">{errors.spotify}</p>
      )}

      <div className="flex items-center gap-2">
        <Radio className="w-5 h-5 text-purple-600" />
        <input
          type="url"
          placeholder="Deezer URL (optional)"
          value={links.deezer || ''}
          onChange={(e) => validateAndUpdateUrl('deezer', e.target.value)}
          className={cn(
            'flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2',
            errors.deezer ? 'border-red-300 focus:ring-red-500' : 'focus:ring-blue-500'
          )}
        />
      </div>
      {errors.deezer && (
        <p className="text-sm text-red-500 mt-1">{errors.deezer}</p>
      )}

      <div className="flex items-center gap-2">
        <Youtube className="w-5 h-5 text-red-600" />
        <input
          type="url"
          placeholder="YouTube URL (optional)"
          value={links.youtube || ''}
          onChange={(e) => validateAndUpdateUrl('youtube', e.target.value)}
          className={cn(
            'flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2',
            errors.youtube ? 'border-red-300 focus:ring-red-500' : 'focus:ring-blue-500'
          )}
        />
      </div>
      {errors.youtube && (
        <p className="text-sm text-red-500 mt-1">{errors.youtube}</p>
      )}
    </div>
  );
}