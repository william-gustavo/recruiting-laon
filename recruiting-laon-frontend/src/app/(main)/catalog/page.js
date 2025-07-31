'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Header from '../../../components/forms/Header/Header';
import Footer from '../../../components/forms/Footer/Footer';
import api from '../../../lib/api';
import CatalogCarousel from '../../../components/forms/CatalogForm/Caroussel/CatalogCaroussel';

export default function CatalogPage() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const [moviesResponse, seriesResponse] = await Promise.all([
          api.get('/catalog?type=movie'),
          api.get('/catalog?type=series')
        ]);
        setMovies(moviesResponse.data);
        setSeries(seriesResponse.data);
      } catch (error) {
        
      }
    };

    fetchCatalog();
  }, []);

  return (
    <ProtectedRoute>
      <div className="catalog-layout">        
        <Header />
        <main className="catalog-main container">
          <h1 className="main-title">Populares</h1>
           <div className="main-content">
            <CatalogCarousel title="Filmes" items={movies} />
            <CatalogCarousel title="Séries" items={series} />
          </div>
        </main>        
        <Footer />
      </div>
    </ProtectedRoute>
  );
}