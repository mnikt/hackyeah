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
                <button style={button}>
                    <span style={buttonLabel}>
                        <FontAwesomeIcon icon={faTableColumns} style={buttonLabelIcon} />
                        <p style={buttonLabelLabel}>Porównaj</p>
                    </span>
                </button>

                <button style={button}>
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
}

const logoSide = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px'
}

const logoName = {
    fontSize: 24,
    textDecoration: 'none',
    color: '#333',
    fontWeight: "bold"
}

const logo = {
    width: 44,
    height: 44,
    backgroundColor: '#ecebec',
    borderRadius: 15
}

const buttonsSide = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px'
}

const button = {
    textDecoration: 'none',
    style: 'none',
    margin: 0,
    background: '#fff',
    border: '2px solid #ecebec',
    borderRadius: '15px'
}

const buttonLabel = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px'
}

const buttonLabelLabel = {
    fontSize: '16px',
    color: '#333',
    margin: 0
}

const buttonLabelIcon = {
    fontSize: '10px',
    color: '#333',
}

export default Header;