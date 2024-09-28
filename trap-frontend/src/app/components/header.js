import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faDownload } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header style={headerStyle}>
        <div style={container}>
            <div style={logoSide}>
                <div style={logo}></div>
                <a style={logoName} href="#">Breaking Bad</a>
            </div>

            <div style={buttonsSide}>
                <button style={button} className="custom-button">
                    <span style={buttonLabel}>
                        <FontAwesomeIcon icon={faTableColumns} style={buttonLabelIcon} />
                        <p style={buttonLabelLabel}>Porównaj</p>
                    </span>
                </button>

                <button style={button} className="custom-button">
                    <span style={buttonLabel}>
                        <FontAwesomeIcon icon={faDownload} style={buttonLabelIcon} />
                        <p style={buttonLabelLabel}>Zapisz Raport</p>
                    </span>
                </button>
            </div>
        </div>
    </header>
  );
};

// Header Styles
const headerStyle = {
  background: '#fff',
  color: '#333',
  textAlign: 'center',
  padding: '15px',
  fontFamily: 'sans-serif',
  position: 'sticky',
  top: 0,
  left: 0,
  width: '100vw'
};

const container = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1200,
    margin: '0 auto',
};

// Logo Side Styles
const logoSide = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px'
};

const logoName = {
    fontSize: 24,
    textDecoration: 'none',
    color: '#333',
    fontWeight: "bold"
};

const logo = {
    width: 44,
    height: 44,
    backgroundColor: '#ecebec',
    borderRadius: 15
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
