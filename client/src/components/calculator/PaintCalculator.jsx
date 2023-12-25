import React, { useState, useEffect } from "react";
import {
  wallConditions,
  coatingNumbers,
  paintBrands,
  paintCategories,
  units,
} from "./calculatorData";
import Layout from "../Layout/Layout";
import SimpleSlider from "../Layout/Carousel";

const PaintCalculator = () => {
  const [formData, setFormData] = useState({
    length: 0,
    width: 0,
    wallCondition: "",
    paintCategory: "",
    coatingNumber: 1,
    selectedPaintBrand: "",
    selectedUnit: "",
    paintNeeded: 0,
  });
  const [text, setText] = useState("");
  const [fullText, setFullText] = useState("Calculate Paint Before You Buy");
  const [isCalculated, setIsCalculated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsCalculated(false); // Reset the flag when input changes
  };

  const handleCalculate = () => {
    if (isCalculated) return; // If already calculated, prevent re-calculation

    if (
      Object.values(formData).some((value) => value === "") ||
      Object.keys(formData).length !== 8
    ) {
      setText("Please select values for all fields");
      return;
    }

    const wallArea = formData.length * formData.width;
    const selectedPaint = paintBrands.find(
      (brand) => brand.name === formData.selectedPaintBrand
    );
    let calculatedPaint =
      wallArea *
      parseFloat(formData.wallCondition) *
      parseFloat(formData.paintCategory) *
      formData.coatingNumber *
      (selectedPaint ? selectedPaint.coverage_rate : 1);

    if (calculatedPaint < 1) {
      setText("Insufficient data for calculation");
      return;
    }

    if (calculatedPaint > 1000) {
      calculatedPaint = Math.floor(Math.random() * (1000 - 900 + 1)) + 900;
    }

    setFormData({ ...formData, paintNeeded: calculatedPaint });
    setText(`Paint Needed: ${formData.paintNeeded} gallons`);
    setIsCalculated(true); // Set the flag to true after calculation
  };

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, currentIndex));
      currentIndex++;

      if (currentIndex > fullText.length) {
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [fullText]);

  return (
    <>
      <Layout>
        <div style={{
          marginTop:"20px"
        }}>
     <SimpleSlider />
        </div>
        <div
          style={{
            maxWidth: "50%",
            "@media (maxWidth : 800px)": {
              maxWidth: "100%",
            },
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "50px",
          }}
        >
          <h1>Paint Calculator</h1>

          <div>
            <label htmlFor="selectedUnit">Select Unit:</label>
            <select
              id="selectedUnit"
              name="selectedUnit"
              className="form-select"
              value={formData.selectedUnit}
              onChange={handleInputChange}
            >
              {units.map((unit, index) => (
                <option key={index} value={unit.conversion_factor}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="length">Length:</label>
            <input
              type="number"
              id="length"
              name="length"
              className="form-select"
              value={formData.length}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="width">Width:</label>
            <input
              type="number"
              id="width"
              name="width"
              className="form-select"
              value={formData.width}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="wallCondition">Wall Condition:</label>
            <select
              id="wallCondition"
              name="wallCondition"
              className="form-select"
              value={formData.wallCondition}
              onChange={handleInputChange}
            >
              {wallConditions.map((condition, index) => (
                <option key={index} value={condition.factor}>
                  {condition.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="paintCategory">Paint Category:</label>
            <select
              id="paintCategory"
              name="paintCategory"
              className="form-select"
              value={formData.paintCategory}
              onChange={handleInputChange}
            >
              {paintCategories.map((category, index) => (
                <option key={index} value={category.factor}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="coatingNumber">No Of Coatings:</label>
            <select
              id="coatingNumber"
              name="coatingNumber"
              className="form-select"
              value={formData.coatingNumber}
              onChange={handleInputChange}
            >
              {coatingNumbers.map((number, index) => (
                <option key={index} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="selectedPaintBrand">Paint Brand:</label>
            <select
              id="selectedPaintBrand"
              name="selectedPaintBrand"
              className="form-select"
              value={formData.selectedPaintBrand}
              onChange={handleInputChange}
            >
              {paintBrands.map((brand, index) => (
                <option key={index} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              onClick={handleCalculate}
              className="btn button-color"
              style={{
                backgroundColor: "#FD6C37",
                color: "#fff",
              }}
            >
              Calculate
            </button>
          </div>
          <div
            style={{
              position: "relative",
              zIndex: 1,
              color: "black",
              textAlign: "center",
              paddingTop: "15vh",
              fontFamily: "Arial, sans-serif",
              fontSize: "2em",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            <h1>{text}</h1>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PaintCalculator;
