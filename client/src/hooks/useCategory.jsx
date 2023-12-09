import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCategories(data?.category);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
