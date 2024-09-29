import React from 'react';
import { Card, Elevation } from "@blueprintjs/core"; // Import Blueprint components

const QuestionsPanel = ({ questions }) => {
  return (
    <div>
      <Card interactive={false} elevation={Elevation.ONE}>
        <div style={header}>
          <h3>10 Pytań</h3>
        </div>
        <div style={questionsContainer}>
          {questions.map((question, index) => (
            <div key={index} style={questionStyle}>
              <span style={numberStyle}>{index + 1}</span>
              <p style={questionText}>{question}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

const header = {
  marginBottom: '15px',
  fontWeight: 'bold',
  fontSize: '18px'
};

const questionsContainer = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
};

const questionStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: '10px',
};

const numberStyle = {
  color: '#407BFF',
  fontSize: '18px',
  fontWeight: 'bold',
  maxWidth: '55px',
  width: '55px',
  textAlign: 'center'
};

const questionText = {
  fontSize: '14px',
  lineHeight: '1.5', // Ensure proper line height
};

export default QuestionsPanel;
