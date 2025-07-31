'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import api from '../../../../lib/api';
import styles from './Detail.module.css'; 

const DetailSection = ({ title, children }) => (
  <div className={styles.section}>
    <h3 className={styles.sectionTitle}>{title}</h3>
    <div className={styles.sectionContent}>{children}</div>
  </div>
);

export default function Detail() {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const fetchItemDetails = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/catalog/${params.id}`);
          setItem(response.data);
        } catch (error) {
          console.error("Falha ao buscar detalhes do item:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchItemDetails();
    }
  }, [params.id]);

  if (loading) {
    return <div className={styles.loadingState}>Carregando...</div>;
  }

  if (!item) {
    return <div className={styles.loadingState}>Item não encontrado.</div>;
  }

  const handleWatchTrailer = () => {
    if (item && item.trailer_url) {
      window.open(item.trailer_url, '_blank', 'noopener,noreferrer');
    }
  };

  const castNames = item.cast?.map(person => person.name).join(', ') || 'Não disponível';
  const awardNames = item.awards?.map(award => award.name).join(', ') || 'Não disponível';
  const directorName = item.director?.name || 'Não disponível';
  const imdbRating = item.ratings?.find(r => r.source === 'IMDb')?.score || 'N/A';

  return (

    <div className={`${styles.pageWrapper} container`}>
      <div className={styles.contentGrid}>

        <div className={styles.posterColumn}>
          <div className={styles.posterWrapper}>
            <Image
              src={item.poster_url}
              alt={`Pôster de ${item.title}`}
              fill
              className={styles.posterImage}
            />
          </div>
          {item.trailer_url && (
            <button 
              className={styles.trailerButton} 
              onClick={handleWatchTrailer}
            >
              Assistir trailer
            </button>
          )}
        </div>

        <div className={styles.detailsColumn}>
          <h1 className={styles.title}>{item.title}</h1>
          <p className={styles.subtitle}>Título original: {item.original_title}</p>
          <p className={styles.subtitle}>Ano: {item.year}</p>
          <p className={styles.subtitle}>Duração: {item.duration}</p>

          <div className={styles.genres}>
            {item.genres?.map(genre => (
              <span key={genre.id} className={styles.genreTag}>{genre.name}</span>
            ))}
          </div>

          <DetailSection title="Sinopse">
            <p>{item.synopsis}</p>
          </DetailSection>

          <div className={styles.creditsGrid}>
            <DetailSection title="Elenco">{castNames}</DetailSection>
            <DetailSection title="Prêmios">{awardNames}</DetailSection>
            <DetailSection title="Diretor">{directorName}</DetailSection>
            <DetailSection title="Avaliações">IMDb: {imdbRating}</DetailSection>
          </div>
        </div>
      </div>
    </div>
  );
}