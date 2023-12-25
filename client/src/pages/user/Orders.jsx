import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/orders",
        {
          headers: {
            Authorization: `${JSON.parse(localStorage.getItem("auth")).token}`,
          },
        }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Orders", orders);

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders &&
              orders?.map((o, i) => {
                return (
                  <div className="border shadow">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col"> date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment.method}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p, i) => (
                        <div
                          className="row mb-2 p-3 card flex-row"
                          key={p.productId}
                        >
                          <div className="col-md-4">
                            {
                              p.photos && p.photos.length > 0 && (
                                <img
                                src={p.photos && p.photos[0]}
                                className="card-img-top"
                                alt={p.name}
                                width="100%"
                                maxHeight="100px"
                                height="auto"
                              />
                              )
                            }
                          
                          </div>
                          <div className="col-md-8">
                            <p>{p.name}</p>
                            {/* <p>{p.description.substring(0, 30)}</p> */}
                            <p className="fw-bold">Price : {p.price}</p>
                            <p className="fw-bold">Buyer : {o.buyer.name}</p>

                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
