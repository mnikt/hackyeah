import styles from "./page.module.css";
import FileUploader from "./components/organisms/FileUploader";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <FileUploader />
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
