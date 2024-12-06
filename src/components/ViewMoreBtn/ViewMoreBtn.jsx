import React from 'react';
import styles from './ViewMoreBtn.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ViewMoreBtn({ onClick }) {
  return (
    <div className={styles.viewMoreBtn}>
      <button className={styles.moreBtn} onClick={onClick}>
        <FontAwesomeIcon icon="fa-solid fa-circle-chevron-down" size="2xl" />
        <span>View More</span>
      </button>
    </div>
  );
}

export default ViewMoreBtn;
