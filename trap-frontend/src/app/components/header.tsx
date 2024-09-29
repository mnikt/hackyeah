'use click';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faDownload } from '@fortawesome/free-solid-svg-icons';
import styles from "../css/header.module.css";
import Link from 'next/link';

const Header = () => {
  return (
    <header className={styles.headerStyle}>
        <div style={container}>
            <div style={logoImage}></div>

            <div className={styles.buttonContainer}>
                <button className={styles.primaryButton}>
                    <span style={buttonLabel}>
                        <Link href={'/dashboard/comparison'}>                        
                            <FontAwesomeIcon icon={faTableColumns} />
                            Porównaj
                        </Link>
                    </span>
                </button>

                <button className={styles.secondaryButton}>
                    <span style={buttonLabel}>
                        <FontAwesomeIcon icon={faDownload} />
                        Zapisz Raport
                    </span>
                </button>
            </div>
        </div>
    </header>
  );
};

// Header Styles

const container = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 15px',
    maxWidth: 1200,
    margin: '0 auto',
};

// Logo Side Styles
const logoImage = {
    display: 'block',
    width: '200px',
    height: '44px',
    background: "url('/img/logo.png') no-repeat center",
    backgroundSize: 'contain',
};

// Buttons Section
const buttonsSide = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px'
};

// Button Styles (Updated for Design)
const button = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    textDecoration: 'none',
    margin: 0,
    padding: '8px 16px',
    background: '#fff',
    border: '2px solid #407BFF', // Blue border
    borderRadius: '30px', // Fully rounded corners
    cursor: 'pointer',
    transition: 'background 0.2s, border-color 0.2s', // Smooth hover transition
};

const buttonLabel = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px'
};

const buttonLabelLabel = {
    fontSize: '16px',
    color: '#333',
    margin: 0
};

const buttonLabelIcon = {
    fontSize: '18px',
    color: '#333',
};

// Use CSS classes to handle hover effect
export default Header;
