import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary fixed-top "
        style={{
          marginBottom: "100px",
          color: "#fff",
        }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarTogglerDemo01"
            style={{
              color: "#fff",
            }}
          >
            <Link
              to="/"
              className="navbar-brand "
              style={{
                color: "#fff",
              }}
            >
              🛒 MAS-PAINTS
            </Link>
            <ul
              className="navbar-nav ms-auto mb-2 mb-lg-0"
              style={{
                color: "#fff",
              }}
            >
              <SearchInput />
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link "
                  style={{
                    color: "#fff",
                  }}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                  style={{
                    color: "#fff",
                  }}
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories &&
                    categories.map((c) => (
                      <li>
                        <Link
                          className="dropdown-item"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </li>
              <li>
                <Link
                  className="nav-link"
                  to={"/calculator"}
                  style={{
                    color: "#fff",
                  }}
                >
                  Paint Calculator
                </Link>
              </li>
              {!auth?.user ? (
                <>
                  <li
                    className="nav-item"
                    style={{
                      color: "#fff",
                    }}
                  >
                    <NavLink
                      to="/register"
                      className="nav-link"
                      style={{
                        color: "#fff",
                      }}
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className="nav-link"
                      style={{
                        color: "#fff",
                      }}
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href=""
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{
                        color: "#fff",
                        border: "none",
                      }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li
                className="nav-item"
                style={{
                  color: "#fff",
                }}
              >
                <NavLink
                  to="/cart"
                  className="nav-link"
                  style={{
                    color: "#fff",
                  }}
                >
                  <Badge
                    count={cart?.length}
                    showZero
                    offset={[10, -5]}
                    style={{
                      color: "#fff",
                    }}
                  >
                    <p
                      style={{
                        color: "#fff",
                      }}
                    >
                      Cart
                    </p>{" "}
                  </Badge>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
