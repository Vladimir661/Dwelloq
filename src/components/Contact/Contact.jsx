import React, { useEffect, useState, useRef } from 'react';
import styles from './Contact.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Contact() {
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
        <div className={styles.container}>
             <div className={styles.title}>
                <h1 ref={titleRef} className={`${isVisible ? styles.textFocusIn : styles.textBlurOut}`}>
                Contact Us
                </h1>
            </div>
            <div className={styles.contact}>
                <div className={styles.info}>
                    <img src="/logo/Logo-3.png" alt="logo" />
                    <p className={styles.text}>
                        At Dwelloq, we've transformed over 4.5 million square feet into dream homes for more than 1,200 happy customers, spanning across vibrant cities.
                    </p>
                </div>
                <div className={styles.location}>
                    <h6>Dwelloq</h6>
                    <span>
                         IMAGINE, 78 Khreshchatyk Street,
                        Central District, Kyiv, 01001, Ukraine
                    </span>
                    <h6>Sales</h6>
                    <span>
                        Mobile: +380 93 4212751 <br></br>
                        Email: xphigota@gmail.com
                    </span>
                </div>
                <div className={styles.follow}>
                    <h1>Follow Us</h1>
                    <div className={styles.link}>
                        <a href="https://github.com/Vladimir661"><FontAwesomeIcon icon="fa-brands fa-github" size="xl" /></a>
                        <a href="https://www.linkedin.com/in/volodymyr-zozulia-674504311"><FontAwesomeIcon icon="fa-brands fa-linkedin" size="xl" /></a>
                        <a href="https://x.com/mrxsssss696?s=21"><FontAwesomeIcon icon="fa-brands fa-x-twitter" size="xl" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;