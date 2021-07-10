import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Nav from "./components/Nav";
import Header from "./components/Header";
import UsersApi from "../../api/users";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      departments_number: "...",
      tests_number: "...",
      patients: [],
    };
    this.users();
    this.patients();
    this.tests();
    this.departments();
  }

  async users() {
    const res = (await UsersApi.data("/user/all/users")) || [];
    if (res !== "Error") {
      this.setState({ ...this.state, users: res });
    } else {
      this.setState({ ...this.state, users: [] });
    }
  }

  async departments() {
    const res = (await UsersApi.data("/user/all/departments")) || [];
    if (res) {
      this.setState({ ...this.state, departments_number: res.length });
    }
  }

  async patients() {
    const res = (await UsersApi.data("/user/all/patients")) || [];
    if (res !== "Error") {
      this.setState({ ...this.state, patients: res });
    } else {
      this.setState({ ...this.state, patients: [] });
    }
  }

  async tests() {
    const res = (await UsersApi.data("/user/all/tests")) || [];
    if (res) {
      this.setState({ ...this.state, tests_number: res.length });
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
            <div className="cards">
              <div className="card-single">
                <div className="">
                  <h1>{this.state.patients.length}</h1>
                  <span>Patients</span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h1>{this.state.users.length}</h1>
                  <span>Users</span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h1>{this.state.departments_number}</h1>
                  <span>Departments</span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h1>{this.state.tests_number}</h1>
                  <span>Tests</span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
            </div>
            <div className="recent-grid">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Recent Patients</h3>
                    <Button variant="contained" color="primary">
                      See all
                      <span
                        style={{ fontSize: "17.5px", marginInline: "10px" }}
                      >
                        <span className="las la-arrow-right"></span>
                      </span>
                    </Button>
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Patient No.</td>
                          <td>Firstname</td>
                          <td>Surname</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.patients.length === 0 ? (
                          <tr>
                            <td>No Patient Added</td>
                          </tr>
                        ) : this.state.patients.length >= 5 ? (
                          this.state.patients
                            .slice(
                              this.state.patients.length - 5,
                              this.state.patients.length
                            )
                            .map((v, i) => {
                              return (
                                <>
                                  <tr key={i}>
                                    <td>{v.patient_number}</td>
                                    <td>{v.patient_first_name}</td>
                                    <td>{v.patient_surname}</td>
                                    <td>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                      >
                                        Details
                                      </Button>
                                    </td>
                                  </tr>
                                </>
                              );
                            })
                        ) : (
                          this.state.patients.map((v, i) => {
                            return (
                              <>
                                <tr key={i}>
                                  <td>{v.patient_number}</td>
                                  <td>{v.patient_first_name}</td>
                                  <td>{v.patient_surname}</td>
                                  <td>
                                    <Button variant="contained" color="primary">
                                      Details
                                    </Button>
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Recent Users</h3>
                    <Button variant="contained" color="primary">
                      See all
                      <span
                        style={{ fontSize: "17.5px", marginInline: "10px" }}
                      >
                        <span className="las la-arrow-right"></span>
                      </span>
                    </Button>
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>User No</td>
                          <td>Surname</td>
                          <td>Role</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.length === 0 ? (
                          <tr>
                            <td>No User Added</td>
                          </tr>
                        ) : this.state.users.length >= 5 ? (
                          this.state.users
                            .slice(
                              this.state.users.length - 5,
                              this.state.users.length
                            )
                            .map((v, i) => {
                              return (
                                <>
                                  <tr key={i}>
                                    <td>{v.user_number}</td>
                                    <td>{v.user_surname}</td>
                                    <td>{v.user_role}</td>
                                    <td>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                      >
                                        Details
                                      </Button>
                                    </td>
                                  </tr>
                                </>
                              );
                            })
                        ) : (
                          this.state.users.map((v, i) => {
                            return (
                              <>
                                <tr key={i}>
                                  <td>{v.user_number}</td>
                                  <td>{v.user_surname}</td>
                                  <td>{v.user_role}</td>
                                  <td>
                                    <Button variant="contained" color="primary">
                                      Details
                                    </Button>
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                    {console.log(this.state.recent_users)}
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

export default Dashboard;
