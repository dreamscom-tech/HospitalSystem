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
                  <Link to="/sample_collection">
                    <span
                      className={`${
                        this.props.active === "samples" ? "active" : ""
                      } _a_replaced`}
                    >
                      <span style={{ fontSize: "24px" }}>
                        <i className="las la-microscope"></i>
                        {/* <span className="las la-microscope"></span> */}
                      </span>
                      <span>Samples</span>
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/lab_report">
                    <span
                      className={`${
                        this.props.active === "lab_report" ? "active" : ""
                      } _a_replaced`}
                    >
                      {/* <span className="las la-users"></span> */}
                      <span style={{ fontSize: "24px" }}>
                        <i className="las la-file-medical"></i>
                      </span>
                      <span>Lab Report</span>
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
