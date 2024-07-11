import React, { useState } from "react";
import "./App.css";

function App() {
  // start state for colors with two default colors
  const [colors, selcol] = useState([
    { id: 1, value: "#ff0000", stop: 0 },
    { id: 2, value: "#0000ff", stop: 100 },
  ]);

  // start state for gradient type default is linear
  const [gradient, setgradient] = useState("linear");

  // start state for angle default is 0
  const [angle, setangle] = useState(0);

  // handle change in color input
  const changecolor = (id, newValue) => {
    // update color is array
    selcol(
      colors.map((color) =>
        color.id === id ? { ...color, value: newValue } : color
      )
    );
  };

  // handle change in stop position
  const dstopchanges = (id, newStop) => {
    newStop = parseInt(newStop); // convert the stop value to integer
    // update color stop
    const updatedColors = colors.map((color) =>
      color.id === id ? { ...color, stop: newStop } : color
    );
    selcol(updatedColors);
  };

  // add new color
  const add = () => {
    selcol([...colors, { id: colors.length + 1, value: "#ffffff", stop: 50 }]);
  };

  // remove color
  const delcol = (id) => {
    if (colors.length > 2) {
      selcol(colors.filter((color) => color.id !== id));
      // update id on deletoin
      colors.map((color) => {
        color.id = color.id > id ? color.id - 1 : color.id;
      });
    }
  };

  // handle mouse positon on circle
  const mousemoving = (e) => {
    const slider = document.getElementById("circular-slider"); // get the circular slider element
    const rect = slider.getBoundingClientRect(); // get the bounding rectangle of the slider
    const centerX = rect.left + rect.width / 2; // calculate the center X coordinate
    const centerY = rect.top + rect.height / 2; // calculate the center Y coordinate
    const dx = e.clientX - centerX; // calculate the difference in X coordinates
    const dy = e.clientY - centerY; // calculate the difference in Y coordinates
    let newangle = Math.atan2(dy, dx) * (180 / Math.PI); // calculate the angle in degrees
    newangle = (newangle + 360) % 360; // Convert to range 0 to 360
    setangle(Math.round(newangle)); // set new angle in integer
  };

  // Generate the gradient CSS string
  const gradientchange = () => {
    const sortarr = [...colors].sort((a, b) => a.stop - b.stop); // sort colors by stop value
    const stopcolor = sortarr
      .map((color) => `${color.value} ${color.stop}%`) // create the color stops string
      .join(", ");
    if (gradient === "linear") {
      return `linear-gradient(${angle}deg, ${stopcolor})`; // linear gradient with angle
    } else if (gradient === "radial") {
      return `radial-gradient(circle, ${stopcolor})`; // radial gradient
    }
  };

  // finding CSS code for the gradient
  const css = () => {
    return `background: ${gradientchange()};`;
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
              onChange={(e) => changecolor(color.id, e.target.value)}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={color.stop}
              onChange={(e) => dstopchanges(color.id, e.target.value)}
            />
            <div id="percent">{color.stop}%</div>
            {colors.length > 2 && (
              <button id="remove" onClick={() => delcol(color.id)}>
                X
              </button>
            )}
          </div>
        ))}
        <button onClick={add}>Add Color</button>
        <div className="gradient-type-buttons">
          <button
            className={gradient === "linear" ? "selected" : ""}
            onClick={() => setgradient("linear")}
          >
            Linear
          </button>
          <button
            className={gradient === "radial" ? "selected" : ""}
            onClick={() => setgradient("radial")}
          >
            Radial
          </button>
        </div>
        {gradient === "linear" && (
          <div className="angle-picker">
            <label>Angle:</label>
            <input
              type="number"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setangle(parseInt(e.target.value))}
            />
            <div
              id="circular-slider"
              className="circular-slider"
              onMouseMove={(e) => e.buttons === 1 && mousemoving(e)} // update angle on mouse move when mouse button is pressed
              onClick={mousemoving} // update angle on click
            >
              <div
                className="knob"
                style={{
                  transform: `rotate(${angle}deg) translate(67.5px) translate(-50%, -50%)`, // Rotate the knob to show the angle
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
      <div
        className="gradient-preview"
        style={{ background: gradientchange() }} // apply gradient
      ></div>
      <div className="css-code">
        <h2>CSS Code</h2>
        <pre>{css()}</pre> {/* Display CSS code */}
      </div>
    </div>
  );
}

export default App;
