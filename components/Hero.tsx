import React, { useState, useEffect } from 'react';
// This assumes react-type-animation is available in the environment
// @ts-ignore
import { TypeAnimation } from 'react-type-animation';
import { ASSETS_BUCKET, CV_PREFIX } from '../constants';
import { fetchLatestFileUrl } from '../services/api';

const LocationIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const Hero: React.FC = () => {
  const [cvUrl, setCvUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchLatestFileUrl(ASSETS_BUCKET, CV_PREFIX)
      .then(setCvUrl)
      .catch(error => {
        console.error('Failed to fetch CV:', error);
        setCvUrl(null);
      });
  }, []);

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-start">
      <div className="w-full max-w-4xl">
        <p className="text-blue-600 dark:text-accent-blue font-mono text-lg mb-4">Hi, my name is</p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-900 dark:text-light-slate mb-4">
          Thanachit Sengsalee.
        </h1>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-700 dark:text-slate mb-6">
          I build things for data.
        </h2>
        <div className="text-xl sm:text-2xl font-mono text-gray-600 dark:text-slate h-10 mb-6">
           <TypeAnimation
            sequence={[
              'Data Engineer, GCP & n8n Automation.',
              2000,
              'Open to full-time roles & freelance projects.',
              2000,
              'Let\'s build something together.',
              3000,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
            style={{ display: 'inline-block' }}
          />
        </div>
        <p className="max-w-2xl text-gray-600 dark:text-slate mb-3">
          Data Engineer with 4+ years building and operating batch and streaming pipelines end-to-end on Google Cloud - BigQuery, Dataform, dbt, Pub/Sub, Dataflow, Cloud Run - covering ingestion, modeling, data quality, and BI.
        </p>
        <p className="flex items-center gap-2 text-gray-500 dark:text-slate text-sm mb-8">
          <LocationIcon className="h-4 w-4" />
          Hat Yai, Thailand
        </p>
        <div className="flex flex-wrap gap-4">
          <a href="#contact"
             className="px-8 py-4 border border-blue-600 text-blue-600 rounded-md font-mono text-lg hover:bg-blue-600/10 dark:border-accent-blue dark:text-accent-blue dark:hover:bg-accent-blue/10 transition-colors duration-300">
            Get In Touch
          </a>
          {cvUrl ? (
            <a href={cvUrl}
               download
               target="_blank"
               rel="noopener noreferrer"
               className="px-8 py-4 bg-blue-600 text-white rounded-md font-mono text-lg hover:bg-blue-700 dark:bg-accent-blue dark:text-dark-bg dark:hover:bg-accent-blue/80 transition-colors duration-300">
              Download CV
            </a>
          ) : (
            <span aria-disabled="true"
               className="px-8 py-4 bg-blue-600/50 text-white/70 rounded-md font-mono text-lg cursor-not-allowed transition-colors duration-300">
              Download CV
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;