import React from 'react';
import { Card, Elevation } from "@blueprintjs/core"; // Import Blueprint components

const QuestionsPanel = ({ questions }) => {
  return (
    <div>
      <Card interactive={false} elevation={Elevation.TWO} style={cardStyle}>
        <div style={header}>
          <h3>10 Pytań</h3>
        </div>
        <div style={questionsContainer}>
          {questions.map((question, index) => (
            <div key={index} style={questionStyle}>
                <div style={numberStyle}>{index+1}.</div>
                <div style={questionText}>{question}</div> {/* Question text */}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Styles
const cardStyle = {
  padding: '20px',
  borderRadius: '15px',
  backgroundColor: '#f4f4f4',
  width: '100%',
  maxWidth: '800px',
  margin: 'auto',
  boxShadow: 'none',
  overflow: 'hidden' 
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
  alignItems: 'center',
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
