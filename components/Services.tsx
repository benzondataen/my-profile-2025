import React, { useRef } from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

const SectionTitle: React.FC<{ number: string; title: string }> = ({ number, title }) => (
    <h2 className="text-3xl font-bold text-gray-900 dark:text-light-slate mb-12 flex items-center w-full">
        <span className="text-blue-600 dark:text-accent-blue font-mono mr-4 text-2xl">{number}.</span>
        {title}
        <span className="flex-grow h-px bg-gray-300 dark:bg-slate/30 ml-6"></span>
    </h2>
);

const ServiceCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useOnScreen(ref, { threshold: 0.2, triggerOnce: true });

    return (
        <div 
            ref={ref}
            className={`bg-white dark:bg-light-navy p-8 rounded-lg shadow-md dark:shadow-lg transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="flex items-center mb-4">
                <div className="text-blue-600 dark:text-accent-blue mr-4">{icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-light-slate">{title}</h3>
            </div>
            <p className="text-gray-600 dark:text-slate">{children}</p>
        </div>
    );
}

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24">
      <SectionTitle number="01" title="Freelance Services" />
      <div className="grid md:grid-cols-2 gap-8">
        <ServiceCard 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
            title="n8n Automation">
            Streamline your business processes, connect APIs, and build complex workflows with ease. I provide end-to-end n8n implementation, from self-hosting setup to custom node development and workflow optimization. Save time and reduce manual errors.
        </ServiceCard>
        <ServiceCard
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" /></svg>}
            title="GCP Data Pipelines">
            Leverage the power of Google Cloud to build robust, scalable, and cost-effective data pipelines. I specialize in designing and implementing solutions with BigQuery, Dataflow, Cloud Composer, and Pub/Sub to turn your raw data into actionable insights.
        </ServiceCard>
      </div>
    </section>
  );
};

export default Services;