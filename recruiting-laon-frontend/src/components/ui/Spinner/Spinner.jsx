import styles from './Spinner.module.css';

const Spinner = ({ size = '40px' }) => (
  <div className={styles.spinner} style={{ width: size, height: size }}></div>
);

export default Spinner;
