import React from 'react';
import { Experience, ContentItem, ContentType, Education, FAQItem, SkillCategory, CertificationGroup } from './types';

// GCS bucket that hosts assets the site reads at runtime - photos and the CV.
// Add, replace, or rename files directly in the bucket; the site always fetches the
// current listing, so nothing here needs a redeploy.
export const ASSETS_BUCKET = 'n8n-short-clip';

// Gallery photos, organized in photos/<year>/<file> folders. Set a custom metadata key
// named "description" on an object to caption it - otherwise the filename is used.
export const GALLERY_PREFIX = 'photos/';

// CV - the site downloads whichever file was uploaded most recently under this prefix.
export const CV_PREFIX = 'MY_CV/';

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: 'Data Engineer',
    company: 'Myorder Intelligence Co., Ltd.',
    period: 'August 2024 - Present',
    description: [
      'Own the GCP data platform end to end, consolidating fragmented operational sources into one governed BigQuery warehouse.',
      'Cut warehouse spend and pipeline latency by re-architecting nightly full-table ETL into partitioned, incrementally-loaded ELT models in Dataform and dbt, with Pub/Sub and Dataflow for streaming.',
      'Shipped GenAI into production workflows: Document AI capture, Gemini on Vertex AI for RAG, and BigQuery ML forecasting.',
      'Eliminated silent data failures with automated quality, freshness, and schema-drift checks on OpenMetadata lineage.',
    ],
    tags: ['GCP', 'BigQuery', 'Dataform', 'dbt', 'Dataflow', 'GenAI'],
  },
  {
    id: 2,
    role: 'Software Engineer',
    company: 'JIB Digital Consult',
    period: 'September 2023 - July 2024',
    description: [
      'Delivered client web and mobile products to fixed consulting deadlines in TypeScript, Next.js, React Native, and Kotlin.',
      'Designed and integrated REST APIs across MongoDB, MSSQL, and PostgreSQL, standardizing contracts so front-end teams shipped without rework.',
      'Raised release reliability by enforcing shared code standards and review workflows on GitLab and GitHub.',
    ],
    tags: ['TypeScript', 'Next.js', 'React Native', 'Kotlin', 'MongoDB', 'MSSQL', 'PostgreSQL', 'GitLab'],
  },
  {
    id: 3,
    role: 'Full-stack Developer',
    company: 'Intelligent Automation Research Center',
    period: 'June 2022 - September 2023',
    description: [
      'Scaled the E-Merchant platform to 30+ active business users and shipped E-OnlineShop v2 on Node.js, React.js, and MongoDB.',
      'Cut long-term maintenance cost by consolidating three product stacks into the unified E-Factory platform on one data model.',
      'Mentored junior developers and delivered system training to entrepreneurs as an invited guest speaker.',
    ],
    tags: ['Node.js', 'React.js', 'MongoDB', 'E-commerce', 'Mentoring'],
  },
   {
    id: 4,
    role: 'Front-end Developer',
    company: 'Intelligent Automation Research Center',
    period: 'July 2021 - June 2022',
    description: [
      'Co-built the E-Accom accommodation platform in Next.js, launched at Kittipoomhill Resort and replicated to more properties.',
    ],
    tags: ['Next.js', 'Front-end'],
  },
];


export const EDUCATIONS: Education[] = [
  {
    id: 1,
    institution: 'Prince of Songkla University',
    degree: "Master's Degree, Computer Engineering",
    period: 'September 2022 - Present',
    link: 'https://www.psu.ac.th/',
    gpa: '3.83 / 4.00',
    thesis: 'Hybrid inventory forecasting with stacking-ensemble learning - SARIMAX + LSTM + LightGBM',
  },
  {
    id: 2,
    institution: 'Prince of Songkla University',
    degree: "Bachelor's Degree, Computer Engineering",
    period: 'July 2017 - April 2021',
    link: 'https://www.psu.ac.th/',
  },
];

export const SKILLS: SkillCategory[] = [
  { id: 1, category: 'Google Cloud', skills: ['BigQuery', 'Dataform', 'Pub/Sub', 'Dataflow', 'Cloud Run', 'Cloud Functions', 'Cloud Build', 'Dataplex / BigLake', 'Looker Studio', 'Cloud Monitoring'] },
  { id: 2, category: 'Data Engineering', skills: ['dbt', 'Batch & Streaming Pipelines', 'ELT / ETL', 'Data Modeling', 'Data Quality', 'OpenMetadata'] },
  { id: 3, category: 'Programming', skills: ['Python', 'SQL', 'TypeScript', 'JavaScript', 'Kotlin', '.NET'] },
  { id: 4, category: 'AI & ML', skills: ['Gemini', 'Vertex AI', 'Document AI', 'BigQuery ML', 'RAG', 'Vector Search', 'LSTM', 'LightGBM'] },
  { id: 5, category: 'Full-Stack', skills: ['React', 'Next.js', 'Node.js', 'React Native', 'Flutter', 'Tailwind CSS'] },
  { id: 6, category: 'Platform & Ops', skills: ['Docker', 'Kubernetes (GKE)', 'CI/CD', 'MongoDB', 'PostgreSQL', 'MSSQL'] },
];

// Google Cloud skill badges earned via hands-on labs, verified on Credly.
export const CREDLY_BADGES_URL = 'https://www.credly.com/users/thanachit-sengsalee/badges/credly';
export const CREDLY_SKILLS_URL = 'https://www.credly.com/users/thanachit-sengsalee/skills';
export const CREDLY_BADGE_COUNT = 17;

export const CERTIFICATIONS: CertificationGroup[] = [
  { id: 1, category: 'Data & Analytics', items: ['Predictive Modeling with BigQuery ML', 'Streaming Analytics into BigQuery', 'Multimodal Vector Search', 'BigLake & Dataplex'] },
  { id: 2, category: 'AI & GenAI', items: ['Enhance Gemini Capabilities', 'GenAI Apps with Gemini', 'Prompt Design in Vertex AI', 'Document AI at Scale'] },
  { id: 3, category: 'Infra & DevOps', items: ['Kubernetes on Google Cloud', 'Serverless Apps on Cloud Run', 'Cloud Functions', 'CI/CD Pipelines', 'Cloud Operations'] },
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
  // No static YouTube fallback here on purpose: unlike GitHub/Medium (public APIs,
  // fetched live reliably with no key), YouTube depends on VITE_YOUTUBE_API_KEY - if
  // that fetch ever fails (missing/invalid/quota-exceeded key), a hardcoded fallback
  // would show fabricated video titles as if they were real. Show the "no content
  // yet" empty state instead (see ContentHub.tsx).
];

// Keep in sync with the FAQPage JSON-LD in index.html - schema markup must match visible page content.
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: 'Who is Thanachit Sengsalee?',
    answer: 'Thanachit Sengsalee is a Data Engineer based in Hat Yai, Thailand, with 4+ years of experience building and operating batch and streaming data pipelines on Google Cloud Platform.',
  },
  {
    id: 2,
    question: 'What does Thanachit specialize in?',
    answer: 'He specializes in Google Cloud data pipelines - BigQuery, Dataform, dbt, Pub/Sub, and Dataflow - covering ingestion, modeling, data quality, and BI, plus n8n workflow automation.',
  },
  {
    id: 3,
    question: 'What technologies does Thanachit work with?',
    answer: 'Google Cloud: BigQuery, Dataform, Pub/Sub, Dataflow, Cloud Run, Dataplex/BigLake, Looker Studio. Data Engineering: dbt, ELT/ETL, Data Modeling, OpenMetadata. Programming: Python, SQL, TypeScript. AI & ML: Gemini, Vertex AI, Document AI, BigQuery ML. Full-Stack: React, Next.js, Node.js.',
  },
  {
    id: 4,
    question: 'Is Thanachit available for full-time or freelance work?',
    answer: "Both. He's open to full-time Data Engineer roles as well as freelance n8n automation and GCP data pipeline projects.",
  },
  {
    id: 5,
    question: 'Where is Thanachit based?',
    answer: 'Hat Yai, Thailand. He works with clients both locally and remotely.',
  },
  {
    id: 6,
    question: 'Does Thanachit have any Google Cloud certifications?',
    answer: 'Yes, 17 Google Cloud skill badges from hands-on labs on Google Cloud Skills Boost, covering BigQuery ML, GenAI with Gemini and Vertex AI, and Kubernetes/Cloud Run - all verified on Credly.',
  },
  {
    id: 7,
    question: 'How can I get in touch with Thanachit?',
    answer: 'Email thanachit02185@gmail.com, call +66 92 893 8956, connect on LinkedIn, or use the contact section on this site. His CV is also available to download from the top of this page.',
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