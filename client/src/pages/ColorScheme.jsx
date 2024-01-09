import React from "react";
import Layout from "../components/Layout/Layout";

const colorScheme = [
  { name: "Coral", hex: "#F56355" },
  { name: "Off-White", hex: "#F5F5F5" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Cream", hex: "#FFFDD0" },
  { name: "Gray", hex: "#808080" },
  { name: "Charcoal", hex: "#36454F" },
  { name: "Taupe", hex: "#483C32" },
  { name: "Brown", hex: "#964B00" },
  { name: "Navy Blue", hex: "#000080" },
  { name: "Sky Blue", hex: "#87CEEB" },
  { name: "Teal", hex: "#008080" },
  { name: "Sage Green", hex: "#9DC183" },
  { name: "Olive Green", hex: "#556B2F" },
  { name: "Forest Green", hex: "#228B22" },
  { name: "Lavender", hex: "#E6E6FA" },
  { name: "Pastel Pink", hex: "#FFB6C1" },
  { name: "Salmon", hex: "#FA8072" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "Mustard Yellow", hex: "#FFDB58" },
  { name: "Sunshine Yellow", hex: "#FFD700" },
  { name: "Peach", hex: "#FFDAB9" },
  { name: "Mint Green", hex: "#98FF98" },
  { name: "Lilac", hex: "#C8A2C8" },
  { name: "Crimson", hex: "#DC143C" },
  { name: "Amber", hex: "#FFBF00" },
  { name: "Plum", hex: "#8E4585" },
  { name: "Turquoise", hex: "#40E0D0" },
  { name: "Steel Blue", hex: "#4682B4" },
  { name: "Tomato", hex: "#FF6347" },
  { name: "Khaki", hex: "#F0E68C" },
  { name: "Periwinkle", hex: "#CCCCFF" },
  { name: "Rust", hex: "#B7410E" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "Orchid", hex: "#DA70D6" },
  { name: "Cornflower Blue", hex: "#6495ED" },
  { name: "Lime Green", hex: "#32CD32" },
  { name: "Chocolate", hex: "#D2691E" },
  { name: "Slate Gray", hex: "#708090" },
  { name: "Deep Pink", hex: "#FF1493" },
  { name: "Goldenrod", hex: "#DAA520" }
];

const ColorScheme = () => {
  return (
    <Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            margin: "auto",
            marginTop: "30px",
          }}
        >
          Color Scheme
        </h1>

        <div
          style={{
            width: "80%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "40px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          {colorScheme.map((item, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: item.hex,
                  }}
                ></div>
                <p>{item.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ColorScheme;
