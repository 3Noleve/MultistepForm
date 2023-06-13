import styles from './page.module.css';
import AboutMeForm from '~/app/auth/page';

export default function Home() {
  return (
    <main className={styles.main}>
      <AboutMeForm />
    </main>
  );
}
