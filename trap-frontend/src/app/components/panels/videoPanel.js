import React from 'react';
import { Card, Elevation } from "@blueprintjs/core"; // Import Blueprint components

const VideoPanel = ({ videoSrc }) => {
  return (
    <div>
      <Card interactive={false} elevation={Elevation.ONE}>
        <video controls style={videoStyle}>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Card>
    </div>
  );
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