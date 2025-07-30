import React from 'react';
import styles from './css/grid.module.css';

export const colSpanClasses = {
  1: styles.colSpan1,
  2: styles.colSpan2,
  3: styles.colSpan3,
  4: styles.colSpan4,
  5: styles.colSpan5,
  6: styles.colSpan6,
  7: styles.colSpan7,
  8: styles.colSpan8,
  9: styles.colSpan9,
  10: styles.colSpan10,
  11: styles.colSpan11,
  12: styles.colSpan12,
};

export const GridContainer = ({ children, className = '' }) => {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.grid}>
        {children}
      </div>
    </div>
  );
};

export const GridItem = ({ children, span = 12, className = '' }) => {
  const spanClass = colSpanClasses[span] || colSpanClasses[12];
  return (
    <div className={`${spanClass} ${className}`}>
      {children}
    </div>
  );
};