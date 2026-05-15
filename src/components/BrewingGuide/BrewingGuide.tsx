import React from 'react';
import styles from './BrewingGuide.module.css';
import Image from 'next/image';

export interface BrewingStep {
  number: string;
  title: string;
  desc: string;
}

export interface BrewingGuideProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  steps: BrewingStep[];
}

const BrewingGuide: React.FC<BrewingGuideProps> = ({ title, subtitle, description, image, steps }) => {
  return (
    <section className={styles.guideSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className={styles.subtitle}>{subtitle}</span>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>
        
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageDecor}></div>
            <img src={image} alt={title} className={styles.image} />
          </div>
          
          <div className={styles.steps}>
            {steps.map((step, idx) => (
              <div key={idx} className={styles.stepItem}>
                <div className={styles.stepNumber}>{step.number}</div>
                <div className={styles.stepText}>
                  <h4 className={styles.stepTitle}>{step.title}</h4>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrewingGuide;
