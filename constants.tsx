
import React from 'react';
import { Experience, ContentItem, ContentType } from './types';

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: 'Senior Data Engineer',
    company: 'Tech Solutions Inc.',
    period: 'Jan 2021 - Present',
    description: [
      'Designed and implemented scalable data pipelines on GCP using Dataflow, BigQuery, and Composer.',
      'Developed n8n automation workflows to integrate third-party APIs, saving 20+ hours of manual work per week.',
      'Mentored junior engineers and established best practices for data modeling and infrastructure as code (Terraform).',
    ],
  },
  {
    id: 2,
    role: 'Data Engineer',
    company: 'Data Insights Co.',
    period: 'Jun 2018 - Dec 2020',
    description: [
      'Built and maintained ETL processes for the company\'s main data warehouse.',
      'Collaborated with data scientists to provide clean, reliable datasets for machine learning models.',
      'Automated reporting tasks using Python scripts and SQL.',
    ],
  },
    {
    id: 3,
    role: 'Junior Data Analyst',
    company: 'Analytics Firm',
    period: 'Jul 2016 - May 2018',
    description: [
      'Performed data analysis and created dashboards to track key business metrics.',
      'Cleaned and preprocessed large datasets to ensure data quality.',
      'Assisted in the migration of data to a new database system.',
    ],
  },
];

export const CONTENT_ITEMS: ContentItem[] = [
  {
    id: 1,
    type: ContentType.GitHub,
    title: 'GCP Data Pipeline Templates',
    description: 'A collection of reusable Terraform templates for deploying common data pipeline architectures on Google Cloud.',
    link: '#',
    tags: ['GCP', 'Terraform', 'BigQuery'],
  },
  {
    id: 2,
    type: ContentType.GitHub,
    title: 'n8n Custom Nodes',
    description: 'Custom nodes for n8n to connect with internal company APIs and services, streamlining workflows.',
    link: '#',
    tags: ['n8n', 'TypeScript', 'API'],
  },
  {
    id: 3,
    type: ContentType.Medium,
    title: 'Building Cost-Effective Data Lakes on GCP',
    description: 'A deep dive into strategies for optimizing storage costs and query performance in BigQuery and GCS.',
    link: '#',
    tags: ['GCP', 'Data Engineering', 'BigQuery'],
  },
  {
    id: 4,
    type: ContentType.Medium,
    title: 'Getting Started with n8n for Workflow Automation',
    description: 'A beginner-friendly guide to setting up n8n and building your first automated workflow in under 30 minutes.',
    link: '#',
    tags: ['n8n', 'Automation', 'Tutorial'],
  },
  {
    id: 5,
    type: ContentType.YouTube,
    title: 'Live Coding: Building a Real-time Data Pipeline',
    description: 'Watch me build a data pipeline from scratch using Pub/Sub, Dataflow, and BigQuery to process streaming data.',
    link: '#',
    tags: ['GCP', 'Live Coding', 'Dataflow'],
  },
  {
    id: 6,
    type: ContentType.YouTube,
    title: 'n8n vs. Zapier: Which is Better for Developers?',
    description: 'A detailed comparison of two popular automation platforms, focusing on features relevant to engineers.',
    link: '#',
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
