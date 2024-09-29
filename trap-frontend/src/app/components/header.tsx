'use click';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faDownload } from '@fortawesome/free-solid-svg-icons';
import styles from "../css/header.module.css";
import Link from 'next/link';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const Header = ({ action }) => {
    const [linkDestination, setLinkDestination] = useState('/dashboard/comparison');

  // Check if the URL contains '/comparison' and set the destination accordingly
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('/comparison')) {
        setLinkDestination('/dashboard');
      } else {
        setLinkDestination('/dashboard/comparison');
      }
    }
  }, []);

  const [linkLabel, setLinkLabel] = useState("Wróć");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('/comparison')) {
        setLinkLabel('Wróć');
      } else {
        setLinkLabel('Porównaj');
      }
    }
  }, []);

  const [linkIcon, setLinkIcon] = useState("Wróć");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('/comparison')) {
        setLinkIcon('fa-chevron-left');
      } else {
        setLinkIcon('fa-table-columns');
      }
    }
  }, []);


  return (
    <header className={styles.headerStyle}>
        <div style={container}>
            <div style={logoImage}></div>

            <div className={styles.buttonContainer}>
                <button className={styles.primaryButton}>
                    <span style={buttonLabel}>
                        <Link href={linkDestination} style={compareButton}>                        
                            <FontAwesomeIcon icon={["fas", linkIcon]} />
                            {linkLabel}
                        </Link>
                    </span>
                </button>

                <button onClick={action} className={styles.secondaryButton}>
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

const compareButton = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    color: "#fff"
}

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
