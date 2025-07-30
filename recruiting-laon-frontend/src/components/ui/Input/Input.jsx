import React, { useState } from 'react';
import styles from './css/input.module.css';

const Input = ({
  type = 'text',
  placeholder = 'Sample',
  disabled = false,
  className = '',
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === 'password';

  const inputClasses = [
    styles.inputBase,
    disabled ? styles.disabled : '',
    className
  ].join(' ');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type={isPasswordField && isPasswordVisible ? 'text' : type}
        placeholder={placeholder}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      {isPasswordField && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={styles.passwordToggle}
        >
        </button>
      )}
    </div>
  );
};

export default Input;
