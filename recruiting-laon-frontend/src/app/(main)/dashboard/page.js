'use client';

import ProtectedRoute from '../../../components/ProtectedRoute';
import Header from '../../../components/forms/Header/Header';
import { useAuth } from '../../../contexts/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <Header />
      <div style={{ padding: '2rem' }}>
        <h1>Bem-vindo ao Dashboard!</h1>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '1rem',
          borderRadius: '4px',
          marginTop: '1rem'
        }}>
          <h3>Informações do Usuário:</h3>
          <p><strong>Nome:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>ID:</strong> {user?.id}</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}