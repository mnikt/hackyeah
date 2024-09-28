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
        {/* Blueprint Tabs with FontAwesome icons */}
        <Tabs id="error-tabs" onChange={setSelectedTab} selectedTabId={selectedTab}>
          <Tab
            id="video"
            title={
              <>
                <FontAwesomeIcon icon={faVideo} style={iconStyle} />
                <span style={tabText}> Wideo </span>
              </>
            }
          />
          <Tab
            id="audio"
            title={
              <>
                <FontAwesomeIcon icon={faVolumeUp} style={iconStyle} />
                <span style={tabText}> Audio </span>
              </>
            }
          />
          <Tab
            id="text"
            title={
              <>
                <FontAwesomeIcon icon={faAlignLeft} style={iconStyle} />
                <span style={tabText}> Tekst </span>
              </>
            }
          />
          <Tabs.Expander />
        </Tabs>

        {/* Errors content */}
        <div style={errorsContainer}>
          {filteredErrors.map((error, index) => (
            <div key={index} style={errorItem}>
              <div style={timestamp}>{error.timestamp}</div>
              <div style={errorText}>{error.text}</div>
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
  borderRadius: '8px',
  backgroundColor: '#f4f4f4',
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
  marginTop: '15px',
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

const errorText = {
  fontSize: '14px',
  color: '#333',
};

export default ErrorsPanel;
