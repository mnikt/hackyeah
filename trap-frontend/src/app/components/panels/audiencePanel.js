import React from 'react';
import { Card, Elevation } from "@blueprintjs/core"; // Import Blueprint components
import Image from 'next/image'; // For handling images in Next.js

const AudiencePanel = ({ title, icon, label, icon2, label2 }) => {
    return (
        <Card interactive={false} elevation={Elevation.TWO} style={cardStyle}>
            {/* Header with total errors */}
            <div style={header}>
                <h3>{title}</h3>
            </div>
                
            <div style={icons}>
            <div style={iconContainer}>
                <p style={iconImage}>{icon}</p>
                <p style={iconLabel}>{label}</p>
            </div>
            <div style={divider}></div>
            <div style={iconContainer}>
                <p style={iconImage}>{icon2}</p>
                <p style={iconLabel}>{label2}</p>
            </div>
            </div>
{/* 
            <div style={bottomBar}>
                <p style={descriptionStyle}>{description}</p>
            </div> */}
        </Card>
    );
};


// Styles for the component
const cardStyle = {
    padding: '15px',
    borderRadius: '15px',
    backgroundColor: '#f4f4f4',
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
    boxShadow: 'none',
    overflow: 'hidden' 
};

const header = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const icons = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: '15px',
    padding: '15px 15px 0 15px'
}

const divider = {
    minWidth: '2px',
    minHeight: '60px',
    backgroundColor: '#ecebec'
}

const iconContainer = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
}

const iconImage = {
    fontSize: '50px',
    marginBottom: '10px',
    textAlign: 'center'
}

const iconLabel = {
    fontSize: '14px',
    fontWeight: 'semi-bold',
    color: '#333'
}

const bottomBar = {
    backgroundColor: '#ecebec',
    padding: '15px',
    margin: '-15px',
}

const descriptionStyle = {
    color: '#333',
    fontSize: '14px'
}

export default AudiencePanel;