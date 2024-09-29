import React from 'react';
import { Card, Elevation } from "@blueprintjs/core"; // Import Blueprint components

const SummaryPanel = ({ summary }) => {
  return (
    <div>
      <Card interactive={false} elevation={Elevation.ONE} >
        {/* Header Section */}
        <div style={header}>
          <h3>Podsumowanie</h3>
        </div>

        {/* Keywords Section */}
        <p style={keywordsContainer}>{summary}</p>
      </Card>
    </div>
  );
};

const header = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '15px'
}

const highlight = {
    color: "#407BFF",
    margin: 0
}

const keywordsContainer = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    margin: 0,
    fontSize: '14px'
  }
  
  /* Each keyword box style */
  const keywordBox = {
    padding: '8px 12px',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'black'
  }

export default SummaryPanel;