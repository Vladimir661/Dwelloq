import React, { useEffect, useState } from "react";
import styles from "./Title.module.css";

const Title = ({ isBurgerOpen }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const titleElement = document.querySelector(`.${styles.titleContainer}`);
      const rect = titleElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight && rect.bottom >= 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${styles.titleContainer} ${
        isBurgerOpen ? styles.burgerOpen : ""
      } ${
        isVisible
          ? styles.focusInContractBck
          : styles.trackingOutExpandFwd
      }`}
    >
      <h1>
        Find Your <span className={styles.highlight}>Dream Home</span>
      </h1>
      <h2>With Us</h2>
    </div>
  );
};

export default Title;
