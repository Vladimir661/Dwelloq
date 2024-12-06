import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Reviews.module.css';

const reviewsData = [
  { name: 'Alexander Johnson', profession: 'Software Engineer', comment: 'Dwelloq exceeded my expectations!' },
  { name: 'Maria Smith', profession: 'Graphic Designer', comment: 'Amazing interface and smooth navigation!' },
  { name: 'David Taylor', profession: 'Real Estate Agent', comment: 'Searching for a home became enjoyable!' },
  { name: 'Anna Brown', profession: 'Marketing Specialist', comment: 'I found my dream home with Dwelloq.' },
  { name: 'Michael Wilson', profession: 'Data Analyst', comment: 'The site works flawlessly.' },
  { name: 'Olivia Davis', profession: 'Architect', comment: 'Convenient filters and top-notch service.' },
  { name: 'James Martinez', profession: 'Project Manager', comment: 'I appreciated the simplicity.' },
  { name: 'Emily Garcia', profession: 'Content Writer', comment: 'Professional approach to every detail.' },
  { name: 'Daniel Thomas', profession: 'Financial Advisor', comment: 'The most convenient real estate site.' }
];

function Reviews() {
  const [startIndex, setStartIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const updateSlidesPerView = () => {
    if (window.innerWidth <= 576) {
      setSlidesPerView(1);
    } else if (window.innerWidth <= 992) {
      setSlidesPerView(2);
    } else {
      setSlidesPerView(3);
    }
  };
  useEffect(() => {
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);
  const handlePrev = () => {
    setStartIndex((prev) => (prev - slidesPerView + reviewsData.length) % reviewsData.length);
  };
  const handleNext = () => {
    setStartIndex((prev) => (prev + slidesPerView) % reviewsData.length);
  };

  const visibleReviews = reviewsData.slice(startIndex, startIndex + slidesPerView);
  while (visibleReviews.length < slidesPerView) {
    visibleReviews.push(...reviewsData.slice(0, slidesPerView - visibleReviews.length));
  }

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
    <div id="clients" className={styles.reviews}>
      <h1 ref={titleRef}className={`${styles.title} ${isVisible ? styles.textFocusIn : styles.textBlurOut}`}>
        What clients say
      </h1>
      <h6 className={styles.secondTitle}>
        Our goal is at the heart of all that we do. We make our clients' happiness our sole priority.
      </h6>
      <div className={styles.allReviews}>
        {visibleReviews.map((review, index) => (
          <div key={index} className={styles.reviewCard}>
            <div className={styles.card}>
              <div className={styles.icon}>
                <FontAwesomeIcon icon="fa-solid fa-circle-user" size="2xl" style={{ color: "#000000" }} />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>{review.name}</span>
                <span className={styles.profession}>{review.profession}</span>
              </div>
              <div className={styles.rating}>
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon="fa-solid fa-star" size="xl" style={{ color: "#ffaa00" }} />
                ))}
              </div>
            </div>
            <div className={styles.text}>
              <p>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.button}>
        <button onClick={handlePrev} className={styles.left}>
          <FontAwesomeIcon icon="fa-solid fa-circle-arrow-left" size="xl" />
        </button>
        <button onClick={handleNext} className={styles.right}>
          <FontAwesomeIcon icon="fa-solid fa-circle-arrow-right" size="xl" />
        </button>
      </div>
    </div>
  );
}

export default Reviews;
