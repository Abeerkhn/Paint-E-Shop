import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={p.photos.length > 0 && p.photos[0]}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <div className="d-flex justify-content-between align-items-bottom">
             
                  <div
                    className="d-flex justify-content-start align-items-bottom"
                    style={{
                      gap: "10px",
                    }}
                  >
                    <p>Color : </p>
                    <div
                      style={{
                        width: "50px",
                        height: "20px",
                        background: p.color,
                        borderRadius: "5px",
                      }}
                    ></div>
                  </div>
                  <p className="card-text"> $ {p.price}</p>
                  </div>
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
