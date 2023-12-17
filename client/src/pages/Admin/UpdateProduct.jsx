import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import useImageUploader from "../../hooks/useUploadImage";
import { getTags } from "../../components/constants/sharedApiCalls";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  console.log("Params", _id);
  const { handleImageUpload } = useImageUploader("dazmxqu77");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: "",
    photos: [],
    tags: [],
    color: "#000",
  });

  const handleFileChange = async (event) => {
    const files = event.target.files;
    const uploadedImages = await handleImageUpload(files);
    setFormValues((prevValues) => ({
      ...prevValues,
      photos: [...prevValues.photos, uploadedImages[0]],
    }));
  };

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${_id}`
      );
      setFormValues({
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        category: data.product.category._id,
        quantity: data.product.quantity,
        shipping: data.product.shipping,
        photos: data.product.photo, // Assuming 'photo' is a single URL
        tags: data.product.tags,
        color: data.product.color || "#000", // Assuming a default color if it's missing
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    const fetchData = async () => {
      try {
        await getAllCategory();
        const tagsFromCalls = await getTags();
        setTags(tagsFromCalls.tags);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    getSingleProduct(); 
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("auth")).token;
      const requestData = {
        ...formValues,
        category: formValues.category,
      };
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${_id}`,
        requestData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Something went wrong");
    }
  };

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
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                value={formValues.category}
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
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {formValues?.photos?.length > 0
                    ? formValues.photos[0].name
                    : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
              </div>
              {/* Add other necessary input fields for product details */}
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
              <div className="mb-3">
                <textarea
                  value={formValues.description}
                  name="description"
                  placeholder="Write a description"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
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
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Tags"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setFormValues((prevValues) => ({
                      ...prevValues,
                      tags: [...prevValues.tags, value], // Appending the new tag to the existing array
                    }));
                  }}
                >
                  {console.log("Tags", tags)}
                  {tags &&
                    tags?.map((tag, index) => {
                      return (
                        <Option key={tag._id} value={tag._id}>
                          {tag.name}
                        </Option>
                      );
                    })}
                </Select>
              </div>
              {/* End of input fields */}
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
