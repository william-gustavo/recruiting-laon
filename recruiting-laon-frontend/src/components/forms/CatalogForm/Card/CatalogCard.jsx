import Image from 'next/image';
import Link from 'next/link';
import styles from './CatalogCard.module.css';

const CatalogCard = ({ item }) => {
  return (
    <Link href={`/catalog/${item.id}`} className={styles.cardLink}>
      <div className={styles.catalogCard}>
        <Image
          src={item.poster_url}
          alt={`Pôster de ${item.title}`}
          fill
          sizes="(max-width: 768px) 33vw, (max-width: 1200px) 20vw, 15vw"
          className={styles.posterImage}
        />
      </div>
    </Link>
  );
};

export default CatalogCard;
