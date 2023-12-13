import React from "react";
import chroma from "chroma-js";

const ColorShadesComponent = ({ hexValue }) => {
  const color = chroma(hexValue);
  const shades = Array.from({ length: 20 }, (_, index) =>
    color.darken(index).hex()
  );

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {shades.map((shade, index) => (
        <div
          key={index}
          style={{
            backgroundColor: shade,
            width: "30px",
            height: "30px",
            margin: "3px",
          }}
        ></div>
      ))}
    </div>
  );
};

export default ColorShadesComponent;
