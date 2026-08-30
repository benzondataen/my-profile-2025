import React, { useState } from 'react';
import { GitHubIcon, LinkedInIcon, FacebookIcon } from '../constants';

const EMAIL = 'thanachit02185@gmail.com';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // mailto: links silently do nothing if the visitor has no default email app configured
  // (common for anyone using Gmail/Outlook in-browser) - copy the address as a fallback so
  // something visible always happens, whether or not a mail app actually opens too.
  const handleEmailClick = () => {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {});
  };

  return (
    <section id="contact" className="py-24 text-center">
      <h2 className="text-2xl font-mono text-blue-600 dark:text-accent-blue mb-4">08. What's Next?</h2>
      <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-light-slate mb-4">Get In Touch</h3>
      <p className="max-w-xl mx-auto text-gray-600 dark:text-slate mb-8">
        I'm currently open to full-time Data Engineer roles as well as freelance projects. Whether you have a question, an opportunity, or just want to say hi, my inbox is always open.
      </p>
      <a href={`mailto:${EMAIL}`}
         onClick={handleEmailClick}
         className="inline-block px-12 py-4 border border-blue-600 text-blue-600 rounded-md font-mono text-lg hover:bg-blue-600/10 dark:border-accent-blue dark:text-accent-blue dark:hover:bg-accent-blue/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-accent-blue">
        Say Hello
      </a>
      <p role="status" className={`mt-3 text-sm text-blue-600 dark:text-accent-blue transition-opacity duration-300 ${copied ? 'opacity-100' : 'opacity-0'}`}>
        Copied {EMAIL} to your clipboard
      </p>

      <div className="flex flex-col items-center gap-2 mt-2 font-mono text-sm text-gray-600 dark:text-slate">
        <a href={`mailto:${EMAIL}`} onClick={handleEmailClick} className="hover:text-blue-600 dark:hover:text-accent-blue transition-colors duration-300">
          {EMAIL}
        </a>
        <a href="tel:+66928938956" className="hover:text-blue-600 dark:hover:text-accent-blue transition-colors duration-300">
          +66 92 893 8956
        </a>
      </div>

      <div className="flex justify-center space-x-6 mt-16 md:hidden">
          <a href="https://github.com/benzthanachit" target="_blank" rel="noopener noreferrer" aria-label="Visit Thanachit's GitHub profile" className="text-gray-600 dark:text-slate hover:text-blue-600 dark:hover:text-accent-blue transition-colors duration-300 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-accent-blue">
              <GitHubIcon className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/thanachit-sengsalee/" target="_blank" rel="noopener noreferrer" aria-label="Visit Thanachit's LinkedIn profile" className="text-gray-600 dark:text-slate hover:text-blue-600 dark:hover:text-accent-blue transition-colors duration-300 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-accent-blue">
              <LinkedInIcon className="w-6 h-6" />
          </a>
          <a href="https://www.facebook.com/benz.sengsalee/" target="_blank" rel="noopener noreferrer" aria-label="Visit Thanachit's Facebook profile" className="text-gray-600 dark:text-slate hover:text-blue-600 dark:hover:text-accent-blue transition-colors duration-300 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-accent-blue">
              <FacebookIcon className="w-6 h-6" />
          </a>
      </div>

      <div className="hidden md:block fixed bottom-0 left-12">
        <div className="flex flex-col items-center space-y-6">
          <a href="https://github.com/benzthanachit" target="_blank" rel="noopener noreferrer" aria-label="Visit Thanachit's GitHub profile" className="text-gray-600 dark:text-slate hover:text-blue-600 dark:hover:text-accent-blue transition-colors duration-300 transform hover:-translate-y-1 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-accent-blue">
              <GitHubIcon className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/thanachit-sengsalee/" target="_blank" rel="noopener noreferrer" aria-label="Visit Thanachit's LinkedIn profile" className="text-gray-600 dark:text-slate hover:text-blue-600 dark:hover:text-accent-blue transition-colors duration-300 transform hover:-translate-y-1 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-accent-blue">
              <LinkedInIcon className="w-6 h-6" />
          </a>
           <a href="https://www.facebook.com/benz.sengsalee/" target="_blank" rel="noopener noreferrer" aria-label="Visit Thanachit's Facebook profile" className="text-gray-600 dark:text-slate hover:text-blue-600 dark:hover:text-accent-blue transition-colors duration-300 transform hover:-translate-y-1 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-accent-blue">
              <FacebookIcon className="w-6 h-6" />
          </a>
          <div className="w-px h-24 bg-gray-600 dark:bg-slate"></div>
        </div>
      </div>
      <div className="hidden md:block fixed bottom-0 right-12">
        <div className="flex flex-col items-center space-y-6">
            <a href={`mailto:${EMAIL}`} onClick={handleEmailClick} className="font-mono text-sm tracking-widest vertical-rl text-gray-600 dark:text-slate hover:text-blue-600 dark:hover:text-accent-blue transition-colors duration-300 transform hover:-translate-y-1 p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-accent-blue">
                {EMAIL}
            </a>
            <div className="w-px h-24 bg-gray-600 dark:bg-slate"></div>
        </div>
        <style>{`
            .vertical-rl {
                writing-mode: vertical-rl;
            }
        `}</style>
      </div>

    </section>
  );
};

export default Contact;