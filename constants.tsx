import React from 'react';
import { Experience, ContentItem, ContentType, Education } from './types';

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: 'Data Engineer',
    company: 'Myorder Intelligence Co., Ltd.',
    period: 'August 2024 - Present',
    description: [
      'Design, build, and maintain scalable and robust data pipelines on Google Cloud Platform (GCP).',
      'Develop and optimize ETL/ELT processes using BigQuery, Dataflow, and Cloud Composer to ingest data from various sources.',
      'Implement data quality checks and monitoring solutions to ensure data accuracy, completeness, and reliability.',
      'Collaborate with software engineers and stakeholders to understand data requirements and deliver actionable insights.',
    ],
    tags: ['GCP', 'BigQuery', 'Dataflow', 'ETL', 'Data Pipelines'],
  },
  {
    id: 2,
    role: 'Software Engineer',
    company: 'JIB Digital Consult',
    period: 'September 2023 - July 2024',
    description: [
      'Developed and tested software applications according to client and organizational requirements.',
      'Wrote efficient, readable, and standardized code using TypeScript, Next.js, React Native, Flutter, and Kotlin.',
      'Developed and integrated APIs with various database systems including MongoDB, MSSQL and PostgreSQL.',
      'Utilized version control tools such as GitLab, GitHub, and SVN for efficient code management.',
      'Collaborated with cross-functional teams to maintain, improve, and support software systems.',
    ],
    tags: ['TypeScript', 'Next.js', 'React Native', 'API', 'MongoDB', 'MSSQL', 'PostgreSQL', 'GitLab'],
  },
  {
    id: 3,
    role: 'Full-stack Developer',
    company: 'Intelligent Automation Research Center',
    period: 'June 2022 - September 2023',
    description: [
      'Led the development of web applications using Node.js and React.js.',
      'Designed and managed database architecture with MongoDB.',
      'Mentored and trained junior employees on development best practices.',
      'Advised entrepreneurs on software systems and acted as a guest speaker for the E-Merchant platform.',
      'Developed E-OnlineShop V2 and a general e-commerce platform named E-Factory.',
    ],
    tags: ['Node.js', 'React.js', 'MongoDB', 'E-commerce', 'Mentoring'],
  },
   {
    id: 4,
    role: 'Front-end Developer',
    company: 'Intelligent Automation Research Center',
    period: 'July 2021 - June 2022',
    description: [
      'Developed modern websites and web applications with Next.js.',
      'Trained junior employees on front-end technologies and workflows.',
      'Collaborated closely with the backend team and managers to deliver high-quality products.',
      'Authored and maintained comprehensive project documentation.',
    ],
    tags: ['Next.js', 'Front-end', 'Collaboration', 'Documentation'],
  },
];


export const EDUCATIONS: Education[] = [
  {
    id: 1,
    institution: 'Prince of Songkla University',
    degree: "Master's Degree, Computer Engineering",
    period: 'September 2022 - September 2024',
    link: 'https://www.psu.ac.th/',
  },
  {
    id: 2,
    institution: 'Prince of Songkla University',
    degree: "Bachelor's Degree, Computer Engineering",
    period: 'July 2017 - April 2021',
    link: 'https://www.psu.ac.th/',
  },
];

export const CONTENT_ITEMS: ContentItem[] = [
  {
    id: 1,
    type: ContentType.GitHub,
    title: 'GCP Data Pipeline Templates',
    description: 'A collection of reusable Terraform templates for deploying common data pipeline architectures on Google Cloud.',
    link: 'https://github.com/benzthanachit',
    tags: ['GCP', 'Terraform', 'BigQuery'],
  },
  {
    id: 2,
    type: ContentType.GitHub,
    title: 'n8n Custom Nodes',
    description: 'Custom nodes for n8n to connect with internal company APIs and services, streamlining workflows.',
    link: 'https://github.com/benzthanachit',
    tags: ['n8n', 'TypeScript', 'API'],
  },
  {
    id: 3,
    type: ContentType.Medium,
    title: 'Building Cost-Effective Data Lakes on GCP',
    description: 'A deep dive into strategies for optimizing storage costs and query performance in BigQuery and GCS.',
    link: 'https://medium.com/@thanachit02185',
    tags: ['GCP', 'Data Engineering', 'BigQuery'],
  },
  {
    id: 4,
    type: ContentType.Medium,
    title: 'Getting Started with n8n for Workflow Automation',
    description: 'A beginner-friendly guide to setting up n8n and building your first automated workflow in under 30 minutes.',
    link: 'https://medium.com/@thanachit02185',
    tags: ['n8n', 'Automation', 'Tutorial'],
  },
  {
    id: 5,
    type: ContentType.YouTube,
    title: 'Live Coding: Building a Real-time Data Pipeline',
    description: 'Watch me build a data pipeline from scratch using Pub/Sub, Dataflow, and BigQuery to process streaming data.',
    link: 'https://www.youtube.com/@benzondataen',
    tags: ['GCP', 'Live Coding', 'Dataflow'],
  },
  {
    id: 6,
    type: ContentType.YouTube,
    title: 'n8n vs. Zapier: Which is Better for Developers?',
    description: 'A detailed comparison of two popular automation platforms, focusing on features relevant to engineers.',
    link: 'https://www.youtube.com/@benzondataen',
    tags: ['n8n', 'Automation', 'Review'],
  },
];

export const GitHubIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <title>GitHub</title>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
);

export const MediumIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <title>Medium</title>
      <path d="M7.4 6.2c0-1.4-1-2.5-2.3-2.5C4 3.7 3 4.8 3 6.2s1 2.5 2.2 2.5c1.2 0 2.2-1.1 2.2-2.5zm5.5 0c0-1.4-1-2.5-2.3-2.5s-2.3 1.1-2.3 2.5 1 2.5 2.3 2.5 2.3-1.1 2.3-2.5zm6.5 0c0-1.4-1-2.5-2.3-2.5s-2.3 1.1-2.3 2.5 1 2.5 2.3 2.5 2.3-1.1 2.3-2.5zM21 12.5v.5c0 4.1-3.1 7.5-7 7.5s-7-3.4-7-7.5v-.5c0-1 .4-2 1.2-2.8.8-.7 1.9-1.2 3-1.2h5.5c1.2 0 2.2.5 3 1.2.8.7 1.3 1.8 1.3 2.8z"></path>
    </svg>
);

export const YouTubeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <title>YouTube</title>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
);

export const LinkedInIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <title>LinkedIn</title>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

export const FacebookIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <title>Facebook</title>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);