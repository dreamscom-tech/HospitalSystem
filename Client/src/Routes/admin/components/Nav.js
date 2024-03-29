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
                <span className="lab la-accusoft"></span>
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
                  <Link to="/departments">
                    <span
                      className={`${
                        this.props.active === "departments" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-address-book"></span>
                      <span>Departments</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/patients">
                    <span
                      className={`${
                        this.props.active === "patients" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-user-injured"></span>
                      <span>Patients</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/tests">
                    <span
                      className={`${
                        this.props.active === "tests" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-medkit"></span>
                      <span>Tests</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/users">
                    <span
                      className={`${
                        this.props.active === "users" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-user-plus"></span>
                      <span>Users</span>
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
                      <span className="las la-comments-dollar"></span>
                      <span>Payments</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/addresses">
                    <span
                      className={`${
                        this.props.active === "addresses" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span className="las la-location-arrow"></span>
                      <span>Addresses</span>
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
