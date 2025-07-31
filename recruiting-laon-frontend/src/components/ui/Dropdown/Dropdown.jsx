'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Dropdown.module.css';

const Dropdown = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fecha o dropdown se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      {isOpen && (
        <div className={styles.menu}>
          {children}
        </div>
      )}
    </div>
  );
};

// Componente para os itens do menu
export const DropdownItem = ({ href, onClick, children }) => {
  if (href) {
    return (
      <Link href={href} className={styles.menuItem}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} className={styles.menuItem}>
      {children}
    </button>
  );
};

export default Dropdown;
