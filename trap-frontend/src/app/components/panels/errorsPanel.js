'use client'; // Ensure it's a client component

import React, { useState } from 'react';
import { Card, Elevation, Tabs, Tab } from "@blueprintjs/core"; // Import Blueprint components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVolumeUp, faAlignLeft } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

const ErrorsPanel = ({ errors }) => {
  const [selectedTab, setSelectedTab] = useState('video'); // Default tab is 'video'

  // Filter errors based on the selected tab (tag)
  const filteredErrors = errors.filter(error => error.tag === selectedTab);

  return (
    <div>
      <Card interactive={false} elevation={Elevation.TWO} style={cardStyle}>
        {/* Errors content */}
        <div style={errorsContainer}>
          {filteredErrors.map((error, index) => (
            <div key={index} style={errorItem}>
              <div style={timestamp}>{error.timestamp}</div>
              <div style={content}>
              <div style={origin}>{error.origin}</div>
                <div style={errorText}>{error.text}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
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
  overflow: 'hidden' 
};

const iconStyle = {
  marginRight: '5px',
  fontSize: '16px',
};

const tabText = {
  fontSize: '14px',
  fontWeight: 'bold',
};

const errorsContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const errorItem = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '10px',
  padding: '10px 0',
  borderBottom: '1px solid #e0e0e0',
};

const timestamp = {
  fontWeight: 'bold',
  color: '#757575',
  fontSize: '14px',
};

const content = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column'
}

const origin = {
  fontSize: '14px',
  color: '#407bff',
  fontWeight: "bold"
}

const errorText = {
  fontSize: '14px',
  color: '#333',
};

export default ErrorsPanel;
