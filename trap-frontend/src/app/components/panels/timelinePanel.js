import React from 'react';
import { Card, Elevation } from "@blueprintjs/core"; // Import Blueprint components

const TimelinePanel = ({ textDictionary }) => {
  return (
    <div>
      <Card interactive={false} elevation={Elevation.TWO} style={cardStyle}>
        <div style={scrollableContent}>
            <div style={contentPadding}>
            {Object.keys(textDictionary).map((key, index) => (
                <p key={index} style={paragraphStyle}>
                {textDictionary[key].map((word, i) => (
                    word.highlight ? 
                    <span key={i} style={highlightStyle}>{word.text}</span> : 
                    <span key={i}>{word.text}</span>
                ))}
                </p>
            ))}
            </div>
        </div>
      </Card>
    </div>
  );
};

// Styles
const cardStyle = {
  padding: '0', // Eliminate padding inside the card
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  overflow: 'hidden' // Ensures no overflow issues due to negative padding
};

const scrollableContent = {
  maxHeight: '180px', // Limit height to approx. 3 lines
  overflowY: 'auto',  // Enable vertical scrolling when content exceeds max height
  padding: '0',       // Set padding to 0 for scrollable content
  margin: '-20px',    // Apply negative margin to eliminate card's default padding effect
};

const contentPadding = {
    padding: '30px 0'
}

const paragraphStyle = {
  fontSize: '16px',
  margin: '10px 0',
  textAlign: 'center'
};

const highlightStyle = {
  backgroundColor: '#d0d8ff',
  fontWeight: 'bold',
  padding: '2px 4px',
  borderRadius: '4px',
};

export default TimelinePanel;