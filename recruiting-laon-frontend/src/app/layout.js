import './globals.css';
import { AuthProvider } from '../contexts/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { LoadingProvider } from '../contexts/LoadingContext';
import LoadingSetup from '../components/LoadingSetup';
config.autoAddCss = false;

export const metadata = {
  title: 'Laon Streaming'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <AuthProvider>
          <LoadingProvider>
            <LoadingSetup />
            {children}
          </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}