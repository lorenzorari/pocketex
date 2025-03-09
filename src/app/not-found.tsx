'use client'

import { useRouter } from 'next/navigation';
import Button from '@/components/button';
import styles from './not-found.module.scss';

const NotFoundPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <h1>404</h1>
        <p>This page could not be found</p>
        <Button className={styles.btn} onClick={handleClick}>
          Back home
        </Button>
      </div>
    </main>
  );
};

export default NotFoundPage;
