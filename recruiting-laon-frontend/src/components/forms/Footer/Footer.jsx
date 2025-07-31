import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.css';
import logo from '../../../../public/logo.png';

const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <div className="container">
        <div className={styles.footerContent}>
          {/* Seção da Esquerda: Logo */}
          <div className={styles.logoSection}>
            <Link href="/" className={`${styles.logoContainer} d-flex align-items-center`}>
              <Image 
                src={logo}
                alt="Laon Streaming" 
                width={40} 
                height={40} 
                className={styles.logoSymbol} 
              />
              <div className={styles.logoTextContainer}>
                <div className={styles.logoText}>LAON</div>
                <div className={styles.logoSubtext}>STREAMING</div>
              </div>
            </Link>
          </div>

          {/* Seção Central: Links de Navegação */}
          <nav className={styles.navSection}>
            <Link href="/" className={styles.navLink}>Início</Link>
            <Link href="/" className={styles.navLink}>Termos e Condições</Link>
            <Link href="/" className={styles.navLink}>Política de Privacidade</Link>
            <Link href="/" className={styles.navLink}>Ajuda</Link>
          </nav>

          {/* Seção da Direita: Ícones Sociais */}
          <div className={styles.socialSection}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
              <FontAwesomeIcon icon={faYoutube} />
            </a>
          </div>
        </div>
      </div>
    </footer>
   );
};

export default Footer;
