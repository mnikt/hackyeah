import { Card, Elevation } from "@blueprintjs/core";

export type Transcription = {
  timestamp: string;
  text: string;
}

type TranscriptionsPanelProps = {
  transcriptions: Transcription[];
}

const TranscriptionsPanel: React.FC<TranscriptionsPanelProps> = ({transcriptions}) => {
  return (
    <Card interactive={false} elevation={Elevation.ONE}>
      <div style={scrollableContent}>
          <div style={contentPadding}>
            {transcriptions.map((transcription) => (
              <div key={transcription.timestamp}>
                <p style={timestampStyle}>{transcription.timestamp}:</p>
                <p>{transcription.text}</p>
              </div>
            ))}
          </div>
      </div>
    </Card>
  );
}

const timestampStyle = {
  marginRight: '6px',
  fontWeight: 'bold',
  paddingLeft: '4px',
}

const scrollableContent = {
  maxHeight: '200px', // Limit height to approx. 3 lines
  overflowY: 'auto',  // Enable vertical scrolling when content exceeds max height
  padding: '0',       // Set padding to 0 for scrollable content
  margin: '-20px',    // Apply negative margin to eliminate card's default padding effect
};

const contentPadding = {
    padding: '30px 0'
}

export default TranscriptionsPanel;