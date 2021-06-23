import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import Nav from "./components/Nav";
import Header from "./components/Header";
import UsersApi from "../../api/users";
import { Link } from "react-router-dom";

class AllPatients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patients: [],
    };
    this.patients();
  }
  //patient Request
  async patients() {
    const res = (await UsersApi.data("/user/all/patients")) || [];
    if (res) {
      this.setState({ ...this.state, patients: res === "Error" ? [] : res });
    }
  }
  render() {
    return (
      <>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="dashboard" />
        <div className="main-content">
          <Header />
          <main>
            <div className="fullwidth-ctr">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Recent Patients</h3>
                    <TextField />
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Patient No.</td>
                          <td>Surname</td>
                          <td>Other Names</td>
                          <td>Age</td>
                          <td>Gender</td>
                          <td>Contact</td>
                          <td></td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.patients.length === 0
                          ? ""
                          : this.state.patients.map((v, i) => {
                              return (
                                <tr>
                                  <td>v.patient_number</td>
                                  <td>v.surname</td>
                                  <td>v.first_name</td>
                                  <td>v.age</td>
                                  <td>v.gender</td>
                                  <td>v.phone_contact</td>
                                  <td>
                                    <Button variant="contained" color="primary">
                                      Edit
                                    </Button>
                                  </td>
                                  <td>
                                    <Button variant="contained" color="primary">
                                      <div className="">
                                        <i className="las la-print"></i>Print
                                      </div>
                                    </Button>
                                  </td>
                                </tr>
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

export default AllPatients;
