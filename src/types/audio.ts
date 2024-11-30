export interface PlatformLinks {
  spotify?: string;
  deezer?: string;
  youtube?: string;
}

export interface AudioSubmission {
  id: string;
  title: string;
  definition: string;
  tags: string[];
  file: File | null;
  createdAt: Date;
  platformLinks: PlatformLinks;
}

export interface Tag {
  id: string;
  label: string;
}

export type TabType = 'browse' | 'submit';

export type Platform = 'spotify' | 'deezer' | 'youtube';