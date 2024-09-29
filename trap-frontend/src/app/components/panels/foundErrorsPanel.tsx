import React from "react";
import { Card, Elevation } from "@blueprintjs/core";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the Pie chart elements
ChartJS.register(ArcElement, Tooltip, Legend);

// Utility function to generate random colors
const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

type DerivedError = {
  timestamp: string;
  description: string;
}

type TimelinedError = {
  errorName: string;
  derivedErrors: Array<DerivedError>;
};

type ErrorsTimeline = Array<TimelinedError>;

type FoundErrorPanelProps = {
    errorsTimeline: ErrorsTimeline;
}


const FoundErrorsPanel: React.FC<FoundErrorPanelProps> = ({ errorsTimeline }) => {
    // Extract error names and counts
    const errorNames = errorsTimeline.map(error => error.errorName); // Extract error names
    const errorCounts = errorsTimeline.map(error => error.derivedErrors.length); // Count the number of derived errors for each error type
    const colors = errorsTimeline.map(() => getRandomColor()); // Generate random colors for each type

    // Prepare the data for the Pie chart
    const pieData = {
        labels: errorNames, // Error names as labels
        datasets: [{
            label: 'Errors by Type',
            data: errorCounts, // Derived errors counts as the data
            backgroundColor: colors, // Random colors
        }]
    };

    return (
        <div>
            <Card interactive={false} elevation={Elevation.ONE} style={cardStyle}>
                {/* Header */}
                <div style={header}>
                    <h3>Znalezione Błędy</h3>
                    <h2 style={highlight}>{errorCounts.reduce((acc, count) => acc + count, 0)}</h2> {/* Dynamic score display */}
                </div>

                {/* Pie Chart */}
                <div style={chart}>
                <Pie
                    data={pieData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                    }}
                    height={200} // Set the height for the pie chart
                />
                </div>
            </Card>
        </div>
    );
};

/* Styles */
const cardStyle = {
    padding: '15px',
    width: '100%',
    maxWidth: '400px', // Adjust the width of each card
    minHeight: '350px' // Minimum height to fit the pie chart
};


const highlight = {
    color: "#407BFF",
    margin: 0
}


const header = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '15px'
};

const chart = {
    maxWidth: '400px',
    height: '300px'
}

export default FoundErrorsPanel;