import React, { useState, useEffect } from "react";
import {
  wallConditions,
  coatingNumbers,
  paintBrands,
  paintCategories,
  units,
} from "./calculatorData";
import Layout from "../Layout/Layout";
import Swal from "sweetalert2";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCalculate = () => {
    const wallArea = formData.length * formData.width;
    const selectedPaint = paintBrands.find(
      (brand) => brand.name === formData.selectedPaintBrand
    );
    let calculatedPaint =
      wallArea *
      parseFloat(formData.wallCondition) *
      parseFloat(formData.paintCategory) *
      formData.coatingNumber *
      (selectedPaint ? selectedPaint.coverage_rate : 1); // Adjust with actual formula
  
    // Cap the calculated paint to a maximum of 100 gallons
    calculatedPaint = Math.min(calculatedPaint, 100);
  
    setFormData({ ...formData, paintNeeded: calculatedPaint });
    handleShowPaint()
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


 const handleShowPaint = ()=>{
    if (formData.paintNeeded !== 0) {
      Swal.fire({
        title: "Paint Estimation Result",
        text: `Paint Needed: ${formData.paintNeeded} gallons`,
        icon: "success",
        confirmButtonText: "Close",
        customClass: {
          confirmButton: "btn-custom-color",
        },
        showCloseButton: true, // If you want to show a close button
      });
    }
  }

  return (
    <>
      <Layout>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: "70vh",
            marginTop: "10vh",
          }}
        >
          <img
            src="/images/paint_calculator_walpaper.jpg" // Replace with your image path
            alt="Banner"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              color: "white",
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
        </div>
      </Layout>
    </>
  );
};

export default PaintCalculator;
