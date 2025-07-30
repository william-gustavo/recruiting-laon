'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './AuthForm.module.css';
import logo from '../../../../public/logo.png';

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const { login, register, loading, error: apiError, clearError } = useAuth();
  const router = useRouter();
  const isRegister = type === 'register';

  const pageTexts = {
    headerLink: isRegister ? { href: '/login', text: 'ENTRAR' } : { href: '/register', text: 'CADASTRAR' },
    title: isRegister ? 'Cadastre-se' : 'Entrar',
    subtitle: isRegister ? 'Acompanhe os melhores filmes e séries.' : 'Bem vindo(a) de volta!',
    buttonText: isRegister ? 'Cadastrar' : 'Entrar',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }

    if (apiError) clearError();
  };

  const validateForm = () => {
    const newErrors = {};

    if (isRegister && !formData.name.trim()) {
      newErrors.name = 'O nome completo é obrigatório.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'O email é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'O formato do email é inválido.';
    }

    if (!formData.password) {
      newErrors.password = 'A senha é obrigatória.';
    } else if (isRegister && formData.password.length < 8) {
      newErrors.password = 'A senha deve ter no mínimo 8 caracteres.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (apiError) clearError();
    setErrors({});

    const isValid = validateForm();
    if (!isValid) return;

    try {
      if (isRegister) {
        await register(formData);
      } else {
        await login({ email: formData.email, password: formData.password });
      }
    } catch (err) {
      if (err.validationErrors) {
        const apiErrors = {};
        for (const key in err.validationErrors) {
          apiErrors[key] = err.validationErrors[key][0];
        }
        setErrors(apiErrors);
      }
    }
  };

  return (
    <div className={styles.authPage}>
      {/* Header */}
      <header className={`${styles.authHeader} container-fluid`}>
        <div className="d-flex justify-content-between align-items-center">
          <button onClick={() => router.back()} className={`${styles.navLink} d-flex align-items-center`}>
            <span className={styles.iconWrapper}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </span>
            VOLTAR
          </button>

          <Link href="/" className={`${styles.logoContainer} d-flex align-items-center`}>
            <Image 
              src={logo}
              alt="Símbolo da Laon" 
              width={40} 
              height={40} 
              className={styles.logoSymbol} 
            />
            <div className={styles.logoTextContainer}>
              <div className={styles.logoText}>LAON</div>
              <div className={styles.logoSubtext}>STREAMING</div>
            </div>
          </Link>
          
          <Link href={pageTexts.headerLink.href} className={`${styles.navLink} ${styles.navLinkRight}`}>
            {pageTexts.headerLink.text}
          </Link>
        </div>
      </header>

      {/* Formulário Central */}
      <main className="d-flex justify-content-center align-items-center flex-grow-1">
        <div className={styles.formContainer}>
          <div className="text-center mb-4">
            <h1 className={styles.formTitle}>{pageTexts.title}</h1>
            <p className={styles.formSubtitle}>{pageTexts.subtitle}</p>
          </div>

          {apiError && (
            <div className="alert alert-danger" role="alert">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {isRegister && (
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
                  placeholder="Nome completo"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
              </div>
            )}
            
            <div className="mb-3">
              <input
                type="email"
                name="email"
                className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
            </div>
            
            <div className="mb-3 position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className={`${styles.formInput} ${errors.password ? styles.inputError : ''}`}
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
              />
              <button type="button" className={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
              {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
            </div>

            {isRegister && (
              <p className={styles.termsText}>
                Ao clicar em cadastrar, você está aceitando os Termos e Condições e a Política de Privacidade da Laon.
              </p>
            )}

            <button type="submit" className={styles.submitButton} disabled={loading}>
              {loading ? 'Carregando...' : pageTexts.buttonText}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AuthForm;