"use client";

import React from 'react';
import Image from 'next/image'; // Next.js image component for better optimization
import styles from '../css/Home.module.css'; // Import custom CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <div className={styles.container}>
        <header className={styles.header}>
            <div className={styles.logoImage}></div>
        </header>

    <div className={styles.columns}>
        {/* Left Column: Image */}
        <div className={styles.leftColumn}>
            <Image
            src="/img/uploadIcon.svg" // Using the image from the public directory
            alt="Upload Icon"
            width={400} // Width of the image
            height={400} // Height of the image
            className={styles.image}
            />
        </div>

        {/* Right Column: Text and Buttons */}
        <div className={styles.rightColumn}>
            <h1 className={styles.title}>Udostępnij swoją wypowiedź</h1>
            <p className={styles.subtitle}>Pokażemy Ci jak mówić, by każdy Ciebie zrozumiał.</p>

            <div className={styles.buttonContainer}>
            <button className={styles.primaryButton}>Coś się dzieje</button>
            <button className={styles.secondaryButton}>Tutaj też coś</button>
            </div>
        </div>

        {/* Arrow Section */}
        <div className={styles.scrollArrow} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
         <FontAwesomeIcon icon={faChevronDown} />
         </div>
      </div>

      <div className={styles.processSection}>
        <h2 className={styles.processTitle}>O to nasz proces</h2>
        <div className={styles.processCards}>
          <div className={styles.card}>
            <div className={styles.cardImage}></div>
            <h3 className={styles.cardTitle}>Value 1</h3>
            <p className={styles.cardText}>Lorem ipsum dolor sit amet bla bla bla and stuff</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardImage}></div>
            <h3 className={styles.cardTitle}>Value 2</h3>
            <p className={styles.cardText}>Lorem ipsum dolor sit amet bla bla bla and stuff</p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardImage}></div>
            <h3 className={styles.cardTitle}>Value 3</h3>
            <p className={styles.cardText}>Lorem ipsum dolor sit amet bla bla bla and stuff</p>
          </div>
        </div>
    </div>
    </div>
  );
}