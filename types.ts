
export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export enum ContentType {
  GitHub = 'GitHub',
  Medium = 'Medium',
  YouTube = 'YouTube'
}

export interface ContentItem {
  id: number;
  type: ContentType;
  title: string;
  description: string;
  link: string;
  tags: string[];
}
