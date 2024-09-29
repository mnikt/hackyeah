import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faVolumeHigh, faAlignLeft } from '@fortawesome/free-solid-svg-icons';
import RainbowSlider from '../rainbowSlider';

const MglistaPanel = ({ score }) => {
    return (
        <div>
            <Card interactive={false} elevation={Elevation.ONE}>
                {/* Header Section */}
                <div style={header}>
                    <h3>Skala Mglistości</h3>
                    <h2 style={highlight}>{score}</h2> {/* Dynamic score display */}
                </div>
                
                {/* Rainbow Slider reflects the score */}
                <RainbowSlider value={score} style={rainbow} />
            </Card>
        </div>
    );
};

const header = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '25px'
}

const highlight = {
    color: "#407BFF",
    margin: 0
}

const rainbow = {
    paddingBottom: '15px'
}

export default MglistaPanel;