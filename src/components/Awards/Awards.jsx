import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Awards.module.css'

function Awards() {
    const [isVisible, setIsVisible] = useState(false);
    const titleRef = useRef(null);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        },
        { threshold: 0.5 }
      );
  
      if (titleRef.current) {
        observer.observe(titleRef.current);
      }
  
      return () => {
        if (titleRef.current) {
          observer.unobserve(titleRef.current);
        }
      };
    }, []);
    
    return (
        <div className={styles.awards}>
            <h1 ref={titleRef} className={`${styles.title} ${isVisible ? styles.textFocusIn : styles.textBlurOut}`}>
                Awards
            </h1>
            <div className={styles.allAwards}>
                <div className={styles.description}>
                    <img src="/awards/awards-1.png" alt="awards" />
                    <h6>Global - 2024 <FontAwesomeIcon icon="fa-solid fa-award" /></h6>
                    <span>WAF Completed Buildings - House & Villa</span>
                    <h6>Authority: <span>World Architecture Festival</span></h6>
                    <h6>Project: <span>Green-roof Walk, Hyderabad</span></h6>
                </div>
                <div className={styles.description}>
                    <img src="/awards/awards-1.png" alt="awards" />
                    <h6>Global - 2023 <FontAwesomeIcon icon="fa-solid fa-award" /></h6>
                    <span>WAF Completed Buildings - Housing</span>
                    <h6>Authority: <span>World Architecture Festival</span></h6>
                    <h6>Project: <span>Lost in the Greens, Bangalore</span></h6>
                </div>
                <div className={styles.description}>
                    <img src="/awards/awards-2.png" alt="awards two" />
                    <h6>Global - 2023 <FontAwesomeIcon icon="fa-solid fa-award" /></h6>
                    <span>Platinum Certification</span>
                    <h6>Authority: <span>Indian Green Building Council</span></h6>
                    <h6>Project: <span> Pursuit of a Radical Rhapsody,Bangalore</span></h6>
                </div>
                <div className={styles.description}>
                    <img src="/awards/awards-2.png" alt="awards two" />
                    <h6>Global - 2022 <FontAwesomeIcon icon="fa-solid fa-award" /></h6>
                    <span>Platinum Certification</span>
                    <h6>Authority: <span>Indian Green Building Council</span></h6>
                    <h6>Project: <span> Songs from the Wood, Pune</span></h6>
                </div>
            </div>
        </div>
    );
}

export default Awards;