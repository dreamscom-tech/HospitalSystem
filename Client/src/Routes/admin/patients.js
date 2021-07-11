import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Nav from "./components/Nav";
import Header from "./components/Header";
import UsersApi from "../../api/users";

class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
    };
    this.patients();
  }

  async patients() {
    const res = (await UsersApi.data("/user/all/patients")) || [];
    if (res !== "Error") {
      this.setState({ ...this.state, patients: res });
    } else {
      this.setState({ ...this.state, patients: [] });
    }
  }

  render() {
    return (
      <>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="patients" />
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid-left">
              <div className="projects">
                <div className="card">
                  <div className="card-header card-header-payments">
                    <h3 className="class_payment_header">
                      Registered Patients
                    </h3>
                    <div className="">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ marginRight: 10 }}
                      >
                        <span
                          style={{ fontSize: "17.5px", marginRight: "10px" }}
                        >
                          <i className="las la-print"></i>
                        </span>
                        Print
                      </Button>
                    </div>
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Contact</td>
                          <td>Number</td>
                          <td>Date of Birth</td>
                          <td>Actions</td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.patients.map((v, i) => {
                          return (
                            <>
                              <tr key={i}>
                                <td>{v.patient_surname}</td>
                                <td>{v.patient_phone_number}</td>
                                <td>{v.patient_number}</td>
                                <td>{v.patient_DOB}</td>
                                <td>
                                  <Link
                                    to={`/patient?patient-id=${v.patient_id}`}
                                  >
                                    <Button variant="contained" color="primary">
                                      <span
                                        style={{
                                          fontSize: "10px",
                                          marginInline: "3px",
                                        }}
                                      ></span>
                                      Details
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default Patients;
