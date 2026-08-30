import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ContentHub from './components/ContentHub';
import Gallery from './components/Gallery';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PeekaBoo from './components/PeekaBoo';

const App: React.FC = () => {
  // Defaults to 'dark' so the server-rendered markup matches the client's first
  // hydration pass (localStorage isn't available during SSR). The real stored
  // preference is applied right after mount, in the effect below.
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const preferred = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(preferred);
  }, []);

  useEffect(() => {
    // Apply the theme class to the html element and save preference
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="bg-gray-50 dark:bg-dark-bg font-sans text-gray-700 dark:text-slate transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto px-6 md:px-12 lg:px-24">
        <Hero />
        <Services />
        <ContentHub />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <FAQ />
        <Contact />
        <Gallery />
      </main>
      <Footer />
      <PeekaBoo />
    </div>
  );
};

export default App;