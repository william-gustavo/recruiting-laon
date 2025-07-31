'use client';

import { useEffect } from 'react';
import { useLoading } from '../contexts/LoadingContext';
import { setLoadingHooks } from '../lib/api';

export default function LoadingSetup() {
  const { showLoader, hideLoader } = useLoading();

  useEffect(() => {
    setLoadingHooks(showLoader, hideLoader);
  }, [showLoader, hideLoader]);

  return null;
}