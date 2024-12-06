import React from 'react';
import styles from './Main.module.css'
import Card from '../Cards/Card';

function Main() {
  return (
    <main className={styles.mainCust}>
      <Card />
    </main>
  );
}

export default Main;