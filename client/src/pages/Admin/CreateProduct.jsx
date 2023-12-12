import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "", // lowercase 'name' instead of 'Name'
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: "",
    photo: null,
  });
  
  console.log("Form data product", formValues);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
  
      // Append text fields
      for (let key in formValues) {
        if (key === "photo" && formValues[key]) {
          // Append the photo file
          productData.append(key, formValues[key]);
        } else {
          productData.append(key.toLowerCase(), formValues[key]);
        }
      }
  
      const token = JSON.parse(localStorage.getItem("auth")).token;
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/product/create-product",
        productData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  
  
  
  // const handleCreate = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const productData = new FormData();
  //     for (let key in formValues) {
  //       if (key === "photo" && formValues[key]) {
  //         productData.append(key, formValues[key]);
  //       } else {
  //         productData.append(key, formValues[key]);
  //       }
  //     }
  //     const { data } = axios.post(
  //       "http://localhost:8080/api/v1/product/create-product",
  //       productData,{
  //         headers: {
  //           Authorization: `${JSON.parse(localStorage.getItem("auth")).token}`,
  //         },
  //       }
  //     );
  //     if (data?.success) {
  //       toast.error(data?.message);
  //     } else {
  //       toast.success("Product Created Successfully");
  //       navigate("/dashboard/admin/products");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: files[0],
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              {/* Select Category */}
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setFormValues((prevValues) => ({
                    ...prevValues,
                    category: value,
                  }));
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              {/* Photo upload */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {formValues.photo ? formValues.photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleInputChange}
                    hidden
                  />
                </label>
              </div>
              {/* Display photo preview */}
              <div className="mb-3">
                {formValues.photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(formValues.photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              {/* Product Name */}
              <div className="mb-3">
                <input
                  type="text"
                  value={formValues.name}
                  name="name"
                  placeholder="Write a name"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              {/* Product Description */}
              <div className="mb-3">
                <textarea
                  value={formValues.description}
                  name="description"
                  placeholder="Write a description"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              {/* Product Price */}
              <div className="mb-3">
                <input
                  type="number"
                  value={formValues.price}
                  name="price"
                  placeholder="Enter Price"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              {/* Product Quantity */}
              <div className="mb-3">
                <input
                  type="number"
                  value={formValues.quantity}
                  name="quantity"
                  placeholder="Enter Quantity"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              {/* Select Shipping */}
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      shipping: value,
                    }));
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              {/* Create product button */}
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
