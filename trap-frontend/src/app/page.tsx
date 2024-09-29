"use client";

import React from 'react';
import Image from 'next/image'; // Next.js image component for better optimization
import styles from './css/Home.module.css'; // Import custom CSS
import FileUploader from './components/organisms/FileUploader';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleSubmit = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file, idx) => {
      formData.append(`file_${idx}`, file);
    })


    try {
      const response = await fetch("http://34.118.88.52:8000/api", {
        method: "POST",
        body: formData,
      });

      const jsonResponse = await response.json();
      localStorage.setItem('response', JSON.stringify(jsonResponse));
      localStorage.setItem('fileName', files[0].name);

      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <div className={styles.logoImage}></div>
        </header>

    <div style={{height: '100vh'}} className={styles.columns}>
        {/* Left Column: Image */}
        <div className={styles.leftColumn}>
            <Image
            src="/img/uploadIcon.svg" // Using the image from the public directory
            alt="Upload Icon"
            width={400} // Width of the image
            height={400} // Height of the image
            className={styles.image}
            style={{width: '100vh'}}
            />
        </div>

        {/* Right Column: Text and Buttons */}
        <div className={styles.rightColumn}>
            <h1 className={styles.title}>Udostępnij swoją wypowiedź</h1>
            <p className={styles.subtitle}>Pokażemy Ci jak mówić, by każdy Ciebie zrozumiał.</p>

            <div className={styles.buttonContainer}>
              <FileUploader onSubmit={handleSubmit} multipleUpload={false} />
            </div>
        </div>
      </div>
    </div>
  );
}