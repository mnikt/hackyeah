import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faHeadphones, faAlignLeft } from '@fortawesome/free-solid-svg-icons';

const FoundErrorsPanel = ({ videoErrors, audioErrors, textErrors }) => {
    const totalErrors = videoErrors + audioErrors + textErrors; // Calculate total errors

    const videoBarWidth = (videoErrors / totalErrors) * 100 + "%";
    const audioBarWidth = (audioErrors / totalErrors) * 100 + "%";
    const textBarWidth = (textErrors / totalErrors) * 100 + "%";

    return (
        <div>
            <Card interactive={false} elevation={Elevation.ONE}>
                {/* Header with total errors */}
                <div style={header}>
                    <h3>Znalezione Błędy</h3>
                    <h2 style={highlight}>{totalErrors}</h2> {/* Total errors */}
                </div>
                
                {/* Display individual error counts */}
                <div style={barChartContainer}>
                    <div style={{ ...bar, width: videoBarWidth, backgroundColor: '#F4A300' }} /> {/* Video Bar */}
                    <div style={{ ...bar, width: audioBarWidth, backgroundColor: '#FF5656' }} /> {/* Audio Bar */}
                    <div style={{ ...bar, width: textBarWidth, backgroundColor: '#6CC744' }} /> {/* Text Bar */}
                </div>

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

/* Bar Chart Styles */
const barChartContainer = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '15px',  // Height of the entire bar chart
    marginBottom: '20px',
    backgroundColor: '#e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
    margin: '25px 0 15px 0'
};

const bar = {
    height: '100%',
    transition: 'width 0.3s ease-in-out'
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
    padding: '0 15px 15px 15px'
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