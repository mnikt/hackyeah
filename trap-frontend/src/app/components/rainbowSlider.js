import React from 'react';
import '../css/rainbow.css'; // Import CSS for styling

const RainbowSlider = ({ value, onChange }) => {
  return (
    <div className="slider-container">
      {/* The range input slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        className="slider"
        onChange={onChange}
      />
      
      {/* The translucent capsule indicating the selected value */}
      
    </div>
  );
};

export default RainbowSlider;