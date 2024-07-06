import React, { useState } from "react";
import "./App.css";

function App() {
  const [colors, setColors] = useState([
    { id: 1, value: "#ff0000", stop: 0 },
    { id: 2, value: "#0000ff", stop: 100 },
  ]);
  const [gradientType, setGradientType] = useState("linear");
  const [angle, setAngle] = useState(0);

  const handleColorChange = (id, newValue) => {
    setColors(
      colors.map((color) =>
        color.id === id ? { ...color, value: newValue } : color
      )
    );
  };

  const handleStopChange = (id, newStop) => {
    newStop = parseInt(newStop);
    const updatedColors = colors.map((color) =>
      color.id === id ? { ...color, stop: newStop } : color
    );
    setColors(updatedColors);
  };

  const addColor = () => {
    setColors([
      ...colors,
      { id: colors.length + 1, value: "#ffffff", stop: 50 },
    ]);
  };

  const removeColor = (id) => {
    if (colors.length > 2) {
      setColors(colors.filter((color) => color.id !== id));
      colors.map((color)=>{color.id=color.id>id?color.id-1:color.id})
    }
  };

  const handleMouseMove = (e) => {
    const slider = document.getElementById("circular-slider");
    const rect = slider.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    let newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    newAngle = (newAngle + 360) % 360; // Convert to range 0-360
    setAngle(Math.round(newAngle));
  };

  const getGradient = () => {
    const sortedColors = [...colors].sort((a, b) => a.stop - b.stop);
    const colorStops = sortedColors
      .map((color) => `${color.value} ${color.stop}%`)
      .join(", ");
    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${colorStops})`;
    } else if (gradientType === "radial") {
      return `radial-gradient(circle, ${colorStops})`;
    }
  };

  const getCSSCode = () => {
    return `background: ${getGradient()};`;
  };

  return (
    <div className="App">
      <h1>Gradient Generator</h1>
      <br />
      <div className="controls">
        {colors.map((color) => (
          <div key={color.id} className="color-input">
            <label>Color {color.id}:</label>
            <input
              type="color"
              value={color.value}
              onChange={(e) => handleColorChange(color.id, e.target.value)}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={color.stop}
              onChange={(e) => handleStopChange(color.id, e.target.value)}
            />
            <div id="percent">{color.stop}%</div>
            {colors.length > 2 && (
              <button id="remove" onClick={() => removeColor(color.id)}>
                X
              </button>
            )}
          </div>
        ))}
        <button onClick={addColor}>Add Color</button>
        <div className="gradient-type-buttons">
          <button
            className={gradientType === "linear" ? "selected" : ""}
            onClick={() => setGradientType("linear")}
          >
            Linear
          </button>
          <button
            className={gradientType === "radial" ? "selected" : ""}
            onClick={() => setGradientType("radial")}
          >
            Radial
          </button>
        </div>
        {gradientType === "linear" && (
          <div className="angle-picker">
            <label>Angle:</label>
            <input
              type="number"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value))}
            />
            <div
              id="circular-slider"
              className="circular-slider"
              onMouseMove={(e) => e.buttons === 1 && handleMouseMove(e)}
              onClick={handleMouseMove}
            >
              <div
                className="knob"
                style={{
                  transform: `rotate(${angle}deg) translate(67.5px) translate(-50%, -50%)`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
      <div
        className="gradient-preview"
        style={{ background: getGradient() }}
      ></div>
      <div className="css-code">
        <h2>CSS Code</h2>
        <pre>{getCSSCode()}</pre>
      </div>
    </div>
  );
}

export default App;
