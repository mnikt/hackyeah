import React from 'react';
import { Card, Elevation } from "@blueprintjs/core"; // Import Blueprint components

const VidInfoPanel = ({ videoDuration, videoSize, textWordCount, textSize }) => {
  return (
    <div>
      <Card interactive={false} elevation={Elevation.ONE}>
        {/* Video Info Section */}
        <div style={infoRow}>
          <div style={sectionStyle}>
            <h4 style={sectionTitle}>Plik Wideo</h4>
            <div style={infoContainer}>
              <span style={highlight}>{videoDuration}</span>
              <span style={unit}>s</span>
              <span style={divider}>|</span>
              <span style={highlight}>{videoSize}</span>
              <span style={unit}>mb</span>
            </div>
          </div>

          {/* Text Info Section */}
          <div style={sectionStyle}>
            <h4 style={sectionTitle}>Tekst</h4>
            <div style={infoContainer}>
              <span style={highlight}>{textWordCount}</span>
              <span style={unit}>słów</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const infoRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '10px'
};

const sectionTitle = {
    marginBottom: '5px'
}

const sectionStyle = {
  flex: '1',
  paddingRight: '20px'
};

const infoContainer = {
  display: 'flex',
  alignItems: 'flex-end',
  gap: '5px'
};

const highlight = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: 'black'
};

const unit = {
  fontSize: '12px',
  color: 'gray',
  paddingBottom: '1px'
};

const divider = {
  color: 'lightgray',
  margin: '0 15px'
};

export default VidInfoPanel;