'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Dropdown, { DropdownItem } from '../../ui/Dropdown/Dropdown';
import styles from './Header.module.css';
import logo from '../../../../public/logo.png';

const Header = ({ variant = 'default' }) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'S';

  return (
    <header className={styles.headerWrapper}>
      <div className="container">
        <div className={styles.headerContent}>
          <div className={styles.leftSection}>
            {variant === 'default' ? (
              <>
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
              </>
            ) : (
              <button onClick={() => router.back()} className={styles.backButton}>
                <span className={styles.iconWrapper}>
                  <FontAwesomeIcon icon={faArrowLeft} />
                </span>
                VOLTAR
              </button>
            )}
          </div>
          
          <div className={styles.rightSection}>
            <button className={styles.iconButton}>
              <FontAwesomeIcon icon={faSearch} />
            </button>

            <Dropdown
              trigger={
                <div className={styles.userAvatar}>
                  <span>{userInitial}</span>
                </div>
              }
            >
              <DropdownItem onClick={handleLogout}>
                Sair
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;