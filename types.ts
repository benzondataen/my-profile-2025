export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  tags?: string[];
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  period: string;
  link?: string;
}

export enum ContentType {
  GitHub = 'GitHub',
  Medium = 'Medium',
  YouTube = 'YouTube'
}

export interface ContentItem {
  id: number | string;
  type: ContentType;
  title: string;
  description: string;
  link: string;
  tags: string[];
}