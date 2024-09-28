import React from 'react';
import { Card, Elevation } from "@blueprintjs/core"; // Import Blueprint components

const VidInfoPanel = ({ videoDuration, videoSize, date, textWordCount, textSize }) => {
  return (
    <div>
      <Card interactive={false} elevation={Elevation.TWO} style={cardStyle}>
        {/* Video Info Section */}
        <div style={infoRow}>
          <div style={sectionStyle}>
            <h4 style={sectionTitle}>Plik Wideo</h4>
            <div style={infoContainer}>
              <span style={highlight}>{videoDuration}</span>
              <span style={unit}>czas</span>
              <span style={divider}>|</span>
              <span style={highlight}>{videoSize}</span>
              <span style={unit}>mb</span>
              <span style={divider}>|</span>
              <span style={highlight}>{date}</span>
              <span style={unit}>data</span>
            </div>
          </div>

          {/* Text Info Section */}
          <div style={sectionStyle}>
            <h4 style={sectionTitle}>Tekst</h4>
            <div style={infoContainer}>
              <span style={highlight}>{textWordCount}</span>
              <span style={unit}>słów</span>
              <span style={divider}>|</span>
              <span style={highlight}>{textSize}</span>
              <span style={unit}>mb</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Styles for the component
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