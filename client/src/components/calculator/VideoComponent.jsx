import React, { useState, useEffect } from "react";

const FullWidthVideo = () => {
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState(
    "Like a canvas awaiting vibrant colors"
  );

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, currentIndex));
      currentIndex++;

      if (currentIndex > fullText.length) {
        clearInterval(interval);

        // Hide the text after a certain delay (e.g., 2000 milliseconds)
        setTimeout(() => {
          setText("");
        }, 2000); // Adjust the delay as needed
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [fullText]);

  return (
    <div style={{ position: "relative", overflow: "hidden", height: "80vh" }}>
      <video
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/about_intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          color: "white",
          textAlign: "center",
          paddingTop: "20vh", // Adjust as needed to center content vertically
          fontFamily: "Arial, sans-serif",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Adding text shadow
        }}
      >
        <h1 style={{ fontSize: "2.5em" }}>{text}</h1>
        <p style={{ fontSize: "1.2em" }}></p>
      </div>
    </div>
  );
};

export default FullWidthVideo;
