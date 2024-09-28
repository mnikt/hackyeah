import React from 'react';
import { Card, Elevation } from "@blueprintjs/core"; // Import Blueprint components
import '../../css/keywordPanel.css'; // Custom CSS for styling

const KeywordPanel = ({ keywords }) => {
  return (
    <div>
      <Card interactive={false} elevation={Elevation.TWO} style={cardStyle}>
        {/* Header Section */}
        <div style={header}>
          <h3>Frazy i Słowa Kluczowe</h3>
          <h2 style={highlight}>{keywords.length}</h2>
        </div>

        {/* Keywords Section */}
        <div style={keywordsContainer}>
          {keywords.map((keyword, index) => (
            <div key={index} style={keywordBox}>
              {keyword}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

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
}

const highlight = {
    color: "#407BFF",
    margin: 0
}

const keywordsContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '15px'
  }
  
  /* Each keyword box style */
  const keywordBox = {
    padding: '8px 12px',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    fontSize: '12px',
    color: 'black'
  }

export default KeywordPanel;