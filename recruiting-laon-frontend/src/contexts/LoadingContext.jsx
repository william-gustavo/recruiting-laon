'use client';

import { createContext, useState, useContext, useCallback } from 'react';
import Spinner from '../components/ui/Spinner/Spinner';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  const showLoader = useCallback(() => {
    setRequestCount(prev => {
      if (prev === 0) setLoading(true);
      return prev + 1;
    });
  }, []);

  const hideLoader = useCallback(() => {
    setRequestCount(prev => {
      const newCount = prev - 1;
      if (newCount === 0) setLoading(false);
      return newCount < 0 ? 0 : newCount;
    });
  }, []);

  return (
    <LoadingContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 9999,
        }}>
          <Spinner size="60px" />
        </div>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
