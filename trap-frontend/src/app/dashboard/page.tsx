"use client";

import { useRef } from 'react';
import generatePDF from 'react-to-pdf';

import styles from "../page.module.css";
import Header from "../components/header";
import PageContent from "../components/pageContent";

export default function Home() {
  const targetRef = useRef(null);

  return (
    <div className={styles.page}>
      <Header action={() => generatePDF(targetRef, {filename: 'raport.pdf'})} />

      <PageContent targetRef={targetRef} />

      {/* <Link href="/home">About Us</Link> */}
      {/* <main className={styles.main}>
        <FileUploader />
      </main>
      <footer className={styles.footer}>
      </footer>
      */}
    </div>
  );
}
