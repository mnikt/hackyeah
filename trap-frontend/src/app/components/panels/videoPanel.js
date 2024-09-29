import React from 'react';
import { Card, Elevation } from "@blueprintjs/core"; // Import Blueprint components

const VideoPanel = ({ videoSrc }) => {
  return (
    <div>
      <Card interactive={false} elevation={Elevation.ONE} style={cardStyle}>
        <video controls style={videoStyle}>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Card>
    </div>
  );
};

// Styles for the component
const cardStyle = {
    padding: '0', // Remove padding
    borderRadius: '15px',
    backgroundColor: '#f4f4f4',
    width: '100%',
    maxWidth: '800px',
    margin: 'auto',
    boxShadow: 'none',
    overflow: 'hidden' 
  };

const videoStyle = {
    display: 'block',
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    boxSizing: 'border-box',
    margin: '-20px',
    overflowY: 'auto',  // Enable vertical scrolling when content exceeds max height
    padding: '0',   
};

export default VideoPanel;