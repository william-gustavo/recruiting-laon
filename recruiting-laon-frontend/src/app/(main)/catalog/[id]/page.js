'use client';

import Header from '../../../../components/forms/Header/Header'; 
import Footer from '../../../../components/forms/Footer/Footer'; 
import Detail from '../../../../components/forms/CatalogForm/Detail/Detail';
import ProtectedRoute from '../../../../components/ProtectedRoute';

export default function CatalogDetailPage() {
  return (
    <ProtectedRoute>
      <div className="catalog-layout">        
        <Header variant="details" />
        <main className="catalog-main">
          <Detail />
        </main>        
        <Footer />
      </div>
    </ProtectedRoute>
  );
}