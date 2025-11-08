import React from 'react';
// This assumes react-type-animation is available in the environment
// @ts-ignore
import { TypeAnimation } from 'react-type-animation';

const Hero: React.FC = () => {
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
        <div className="text-xl sm:text-2xl font-mono text-gray-600 dark:text-slate h-10 mb-8">
           <TypeAnimation
            sequence={[
              'Freelance n8n Automation Expert.',
              2000,
              'Freelance GCP Data Architect.',
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
        <a href="#contact"
           className="px-8 py-4 border border-blue-600 text-blue-600 rounded-md font-mono text-lg hover:bg-blue-600/10 dark:border-accent-blue dark:text-accent-blue dark:hover:bg-accent-blue/10 transition-colors duration-300">
          Get In Touch
        </a>
      </div>
    </section>
  );
};

export default Hero;