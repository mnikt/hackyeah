import "@blueprintjs/core/lib/css/blueprint.css";
import styles from "./page.module.css";
import Header from "./components/header";
import PageContent from "./components/pageContent";

import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />

      <PageContent />

      <Link href="/home">About Us</Link>
    </div>
  );
}
