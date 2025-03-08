'use client'; // Ensure it's a client component

import React, { useRef, useState } from 'react';
import { Card, Elevation, Tabs, Tab } from "@blueprintjs/core"; // Import Blueprint components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVolumeUp, faAlignLeft } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

type TimelinedError = {
  description: string;
  timestamp: string;
  positionX: number;
  positionY: number;
  size: number;
};

const ErrorPanel = (props: { error: TimelinedError, videoRef: React.MutableRefObject<HTMLVideoElement | undefined> }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const captureFrame = () => {
    const video = props.videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Set canvas size to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame onto the canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div>
      <Card interactive={false} elevation={Elevation.TWO} style={cardStyle}>
        <div style={errorsContainer}>
          <canvas ref={canvasRef}> </canvas>
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

const errorsContainer = {
  marginTop: '15px',
  display: 'flex',
  // flexDirection: 'column',
  gap: '10px',
};

export default ErrorPanel;
