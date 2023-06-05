import Image from 'next/image';
import styles from './page.module.css';
import AboutMeForm from '~/app/user/page';

export default function Home() {
  return (
    <main className={styles.main}>
      <AboutMeForm />
    </main>
  );
}
