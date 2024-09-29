import React from 'react';
import { Card, Elevation } from "@blueprintjs/core"; // Import Blueprint components

type DerivedError = {
  timestamp: string;
  description: string;
}

type TimelinedError = {
  errorName: string;
  derivedErrors: Array<DerivedError>;
};

type ErrorsTimeline = Array<TimelinedError>;

type TimelinePanelProps = {
  timelinedErrors: ErrorsTimeline | undefined;
}

const TimelinePanel: React.FC<TimelinePanelProps> = ({ timelinedErrors }) => {
  return (
    <Card interactive={false} elevation={Elevation.ONE}>
      <div style={scrollableContent}>
          <div style={contentPadding}>
            {timelinedErrors && timelinedErrors.map((err, index) => (
              <div key={index}>
                <h3 style={errorNameStyle}>{err.errorName}</h3>
                {err.derivedErrors.map((derivedError) => (
                  <div style={derivedErrorStyle} key={derivedError.description}>
                    <p style={timestampStyle}>{derivedError.timestamp}:</p>
                    <p>{derivedError.description}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
      </div>
    </Card>
  );
};

const errorNameStyle = {
  fontWeight: 'bold',
  padding: '2px 4px',
  fontSize: '18px',
  marginBottom: '8px',
}

const timestampStyle = {
  marginRight: '6px',
  fontWeight: 'bold',
  paddingLeft: '4px',
}

const derivedErrorStyle = {
  display: 'flex',
}

const scrollableContent = {
  maxHeight: '300px', // Limit height to approx. 3 lines
  overflowY: 'auto',  // Enable vertical scrolling when content exceeds max height
  padding: '10px',       // Set padding to 0 for scrollable content
  margin: '-20px',    // Apply negative margin to eliminate card's default padding effect
};

const contentPadding = {
    padding: '30px 0'
}

export default TimelinePanel;