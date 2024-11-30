import { useState } from 'react';
import { Music2, Youtube, Radio } from 'lucide-react';
import { Platform, PlatformLinks as PlatformLinksType } from '../../types/audio';
import { validatePlatformUrl } from '../../utils/validateUrl';
import { PlatformLinkInput } from './PlatformLinkInput';

interface PlatformLinksProps {
  links: PlatformLinksType;
  onChange: (links: PlatformLinksType) => void;
}

const PLATFORM_CONFIG = {
  spotify: {
    icon: Music2,
    color: 'text-green-600',
  },
  deezer: {
    icon: Radio,
    color: 'text-purple-600',
  },
  youtube: {
    icon: Youtube,
    color: 'text-red-600',
  },
} as const;

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
      {(Object.keys(PLATFORM_CONFIG) as Platform[]).map((platform) => (
        <PlatformLinkInput
          key={platform}
          icon={PLATFORM_CONFIG[platform].icon}
          iconColor={PLATFORM_CONFIG[platform].color}
          platform={platform}
          value={links[platform] || ''}
          error={errors[platform]}
          onChange={(url) => validateAndUpdateUrl(platform, url)}
        />
      ))}
    </div>
  );
}