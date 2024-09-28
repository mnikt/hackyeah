'use client';

import React, { useState } from 'react';
import { Card, Elevation } from "@blueprintjs/core"; // Import Blueprint components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'; // Icons for expand/collapse

const WordSuggestionPanel = ({ keywords }) => {
    // State to manage if the panel is open or closed
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the panel
    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Card interactive={true} elevation={Elevation.TWO} style={cardStyle}>
            {/* Header Section with toggle functionality */}
            <div style={header} onClick={togglePanel} className="panel-header">
                <h3 style={headerText}>Sugestie Doboru Słów</h3>
                
                {/* Chevron as a button */}
                <button style={chevronButton} onClick={togglePanel}>
                    <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} style={iconStyle} />
                </button>
            </div>

            {/* Collapsible content: only visible when isOpen is true */}
            {isOpen && (
                <div style={keywordsContainer}>
                    {keywords.map((keyword, index) => (
                        <div key={index} style={keywordBox}>
                            {keyword}
                        </div>
                    ))}
                </div>
            )}
        </Card>
    );
};

// Styles
const cardStyle = {
    padding: '15px',
    borderRadius: '15px',
    backgroundColor: '#f4f4f4',
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
    boxShadow: 'none',
    overflow: 'hidden',
    cursor: 'pointer', // Makes the header clickable
    transition: 'max-height 0.3s ease-in-out', // Smooth transition
};

const header = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0', // Add padding for spacing
    cursor: 'pointer',
};

const headerText = {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
};

const iconStyle = {
    fontSize: '18px',
    color: '#407BFF',
    width: '20px',
    height: '20px',
};

const chevronButton = {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    outline: 'none', // Removes outline when clicked
};

const keywordsContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '15px',
    maxHeight: '200px', // Limit the height of the container
    overflowY: 'auto', // Scroll if content exceeds max height
    paddingRight: '10px', // Add padding to avoid scrollbar overlap
};

const keywordBox = {
    padding: '8px 12px',
    backgroundColor: '#e0e0e0',
    borderRadius: '15px',
    fontSize: '12px',
    color: 'black',
};

export default WordSuggestionPanel;
