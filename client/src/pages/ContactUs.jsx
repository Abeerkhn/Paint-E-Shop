import React from "react";
import Layout from "../components/Layout/Layout";
const ContactUs = () => {
  return (
    <>
      <Layout>
        <div style={{ backgroundColor: " #FD7C47" }}>
          <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
              <div
                className="col-md-6 col-10 mb-4 mb-md-0 shadow p-4"
                style={{ background: "#fff", borderRadius: "30px" }}
              >
                <h2>Contact Us</h2>
                <form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input type="text" className="form-control" id="name" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="4"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>

              {/* Image Container */}
              <div className="col-md-6 col-10 d-none d-md-flex">
                <div className=" p-4">
                  <img
                    src="/images/contact-us.svg"
                    alt="Image"
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ContactUs;
