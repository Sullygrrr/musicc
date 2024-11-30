import { cn } from '../../utils/cn';
import { LucideIcon } from 'lucide-react';

interface PlatformLinkInputProps {
  icon: LucideIcon;
  iconColor: string;
  platform: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export function PlatformLinkInput({
  icon: Icon,
  iconColor,
  platform,
  value,
  error,
  onChange,
}: PlatformLinkInputProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <Icon className={cn('w-5 h-5', iconColor)} />
        <input
          type="url"
          placeholder={`${platform} URL (optional)`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2',
            error ? 'border-red-300 focus:ring-red-500' : 'focus:ring-blue-500'
          )}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}