import React, { useEffect, useRef } from 'react';
import styles from './About.module.css';

function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const h1 = entry.target.querySelector('h1');
          const paragraphs = entry.target.querySelectorAll('p');

          if (entry.isIntersecting) {
            h1.classList.remove(styles.textBlurOut);
            h1.classList.add(styles.textFocusIn);

            paragraphs.forEach((p) => {
              p.classList.remove(styles.textBlurOut);
              p.classList.add(styles.textFocusIn);
            });
          } else {
            h1.classList.remove(styles.textFocusIn);
            h1.classList.add(styles.textBlurOut);

            paragraphs.forEach((p) => {
              p.classList.remove(styles.textFocusIn);
              p.classList.add(styles.textBlurOut);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ textAlign: 'center' }}>
      <h1 className={styles.title}>Why Choose Us</h1>
      <p className={styles.paragraphs}>
        It's about finding a place where memories are made, where comfort matches style, and where your future begins. That is why we strive to offer not just real estate, but the opportunity to create your ideal living space.
      </p>
      <p className={styles.paragraphs}>
        Our platform provides a wide range of real estate, modern, spacious family homes and luxury estates. Whether it's your first time buying a home or you're looking for the investment of your dreams, we have something to suit all needs and budgets.
      </p>
      <p className={styles.paragraphs}>
        We strive to make the purchasing process as simple, transparent, and enjoyable as possible. With Dwelloq, you won't just browse listings—you'll have access to expert advice and personalized recommendations from our experienced team. We guide you through each step, offering insight into the best areas, property values, and investment opportunities to ensure you make an informed decision.
      </p>
      <p className={styles.paragraphs}>
        Our listings are carefully vetted to ensure you see only high-quality, reliable options. We work with reputable sellers and developers, so you can trust that the properties you view meet the highest standards.
      </p>
      <p className={styles.paragraphs}>
        At Dwelloq, we don't just help you find a home; we help you find a place that feels right for you—a space where you can truly belong. Let us make your home-buying experience smooth, rewarding, and exciting.
      </p>
    </section>
  );
}

export default About;
