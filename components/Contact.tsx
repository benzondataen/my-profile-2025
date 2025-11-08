import React from 'react';
import { GitHubIcon, LinkedInIcon, FacebookIcon } from '../constants';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 text-center">
      <h2 className="text-2xl font-mono text-blue-600 dark:text-accent-blue mb-4">05. What's Next?</h2>
      <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-light-slate mb-4">Get In Touch</h3>
      <p className="max-w-xl mx-auto text-gray-600 dark:text-slate mb-8">
        I'm currently available for freelance opportunities and open to discussing new projects. Whether you have a question or just want to say hi, my inbox is always open.
      </p>
      <a href="mailto:6510120049@email.psu.ac.th"
         className="inline-block px-12 py-4 border border-blue-600 text-blue-600 rounded-md font-mono text-lg hover:bg-blue-600/10 dark:border-accent-blue dark:text-accent-blue dark:hover:bg-accent-blue/10 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-accent-blue">
        Say Hello
      </a>
      
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
            <a href="mailto:6510120049@email.psu.ac.th" className="font-mono text-sm tracking-widest vertical-rl text-gray-600 dark:text-slate hover:text-blue-600 dark:hover:text-accent-blue transition-colors duration-300 transform hover:-translate-y-1 p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-accent-blue">
                6510120049@email.psu.ac.th
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