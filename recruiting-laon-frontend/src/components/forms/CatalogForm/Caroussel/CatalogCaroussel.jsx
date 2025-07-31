'use client';

import { useRef, useState, useEffect } from 'react';
import CatalogCard from '../Card/CatalogCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './CatalogCaroussel.module.css';

const CatalogCarousel = ({ title, items = [] }) => {
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || !items || items.length === 0) {
        setShowLeftArrow(false);
        setShowRightArrow(false);
        return;
    }

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = carousel;
      setShowLeftArrow(scrollLeft > 5); // Pequena tolerância
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    };

    handleScroll(); 
    carousel.addEventListener('scroll', handleScroll);

    return () => carousel.removeEventListener('scroll', handleScroll);
  }, [items]);

  if (!items || items.length === 0) {
    return null; 
  }

  const getScrollAmount = () => {
    if (!carouselRef.current) return 0;
    const cardElement = carouselRef.current.children[0];
    if (!cardElement) return 0;
    const cardWidth = cardElement.offsetWidth;
    const gap = parseInt(getComputedStyle(carouselRef.current).gap) || 20;
    return (cardWidth + gap) * 6;
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.carouselSection}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselTitle}>{title}</h2>
        <div className={styles.arrowButtons}>
          {showLeftArrow && (
            <button onClick={scrollLeft} className={styles.scrollButton} aria-label="Voltar">
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}
          {showRightArrow && (
            <button onClick={scrollRight} className={styles.scrollButton} aria-label="Avançar">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          )}
        </div>
      </div>
      <div className={styles.carouselWrapper}>
        <div className={styles.carouselContainer} ref={carouselRef}>
          {items.map((item) => (
            <CatalogCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogCarousel;