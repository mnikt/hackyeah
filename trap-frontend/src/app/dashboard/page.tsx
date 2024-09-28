import styles from "./page.module.css";
import Header from "../components/header";
import PageContent from "../components/pageContent";

import Link from 'next/link';
import FileUploader from "../components/organisms/FileUploader";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <PageContent />

      <Link href="/home">About Us</Link>
      <main className={styles.main}>
        <FileUploader />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
