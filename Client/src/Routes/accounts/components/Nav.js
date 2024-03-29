import React, { Component } from "react";
import { Link } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <div className="sideBar-ctr">
          <div className="sidebar">
            <label htmlFor="nav-toggle" className="close-on-sm">
              <span className="las la-times"></span>
            </label>
            <div className="sidebar-brand">
              <h2>
                <span
                  className="las la-clinic-medical"
                  style={{ fontSize: "32px" }}
                ></span>
                <span>Hospital</span>
              </h2>
            </div>
            <div className="sidebar-menu">
              <ul>
                <li>
                  <Link to="/">
                    <span
                      className={`${
                        this.props.active === "dashboard" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-home"></span>
                      <span>Home</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/payments">
                    <span
                      className={`${
                        this.props.active === "payments" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-file-invoice-dollar"></span>
                      <span>Payments</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/payments">
                    <span
                      className={`${
                        this.props.active === "pending" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-folder-plus"></span>
                      <span>Pending</span>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Nav;
