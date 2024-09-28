import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faHeadphones, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

const FoundErrorsPanel = ({ videoErrors, audioErrors, textErrors }) => {
    const totalErrors = videoErrors + audioErrors + textErrors; // Calculate total errors

    return (
        <div>
            <Card interactive={false} elevation={Elevation.TWO} style={cardStyle}>
                {/* Header with total errors */}
                <div style={header}>
                    <h3>Znalezione Błędy</h3>
                    <h2 style={highlight}>{totalErrors}</h2> {/* Total errors */}
                </div>
                
                {/* Display individual error counts */}
                <div style={columns}>
                    {/* Video Errors */}
                    <div style={item}>
                        <h5 style={{...number, color: '#F4A300'}}>{videoErrors}</h5> {/* Custom color for video */}
                        <FontAwesomeIcon icon={faVideo} style={icon} />
                    </div>

                    {/* Audio Errors */}
                    <div style={item}>
                        <h5 style={{...number, color: '#FF5656'}}>{audioErrors}</h5> {/* Custom color for audio */}
                        <FontAwesomeIcon icon={faHeadphones} style={icon} />
                    </div>

                    {/* Text Errors */}
                    <div style={item}>
                        <h5 style={{...number, color: '#6CC744'}}>{textErrors}</h5> {/* Custom color for text */}
                        <FontAwesomeIcon icon={faAlignLeft} style={icon} />
                    </div>
                </div>
            </Card>
        </div>
    );
};

// Styles for the component
const cardStyle = {
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
};

const header = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const highlight = {
    color: "#407BFF",
    margin: 0
};

const columns = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',  // Align items to center to make them uniform
    padding: '15px'
};

const item = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: '5px'
};

const number = {
    fontSize: '24px',  // Consistent font size for all numbers
    fontWeight: 'bold'
};

const icon = {
    fontSize: '24px', // Consistent font size for all icons
    color: '#ababab',
    width: '16px',
    height: '16px'
};

export default FoundErrorsPanel;