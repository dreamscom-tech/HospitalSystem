import React, { Component } from "react";
import { Button } from "@material-ui/core";
import Nav from "./components/Nav";
import Header from "./components/Header";
import UsersApi from "../../api/users";

class Patient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {},
    };
    this.patient();
  }

  async patient() {
    let id = parseInt(
      new URLSearchParams(window.location.search).get("patient-id")
    );
    const [res] = (await UsersApi.data(`/user/all/patient/${id}`)) || {};
    if (res !== "Error") {
      this.setState({ ...this.state, patient: res });
    } else {
      this.setState({ ...this.state, patient: {} });
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
            <div className="fullwidth-ctr">
              <div className="projects">
                <div className="card">
                  <div className="card-header">
                    <h3>Patient Details</h3>
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
                    <div>
                      <div className="inputCtr">
                        <h3>
                          Patient Number : {this.state.patient.patient_number}
                        </h3>
                        <div className="inputs_ctr">
                          <table width="100%">
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Firstname :
                                </span>
                                {this.state.patient.patient_first_name}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Othername :
                                </span>
                                {this.state.patient.patient_surname}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Date of Birth :
                                </span>
                                {this.state.patient.patient_DOB}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Age:
                                </span>
                                {this.state.patient.patient_age}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Phonenumber :
                                </span>
                                {this.state.patient.patient_phone_number}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Email Address :
                                </span>
                                {this.state.patient.patient_email}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Occupation :
                                </span>
                                {this.state.patient.patient_occupation}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Marital Status :
                                </span>
                                {this.state.patient.patient_marital_status}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Education Level :
                                </span>
                                {this.state.patient.patient_education_level}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Religion :
                                </span>
                                {this.state.patient.patient_religion}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Tribe :
                                </span>
                                {this.state.patient.patient_tribe}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Gender :
                                </span>
                                {this.state.patient.patient_gender === "M"
                                  ? "Male"
                                  : "Female"}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  District :
                                </span>
                                {this.state.patient.district_name}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Subcounty :
                                </span>
                                {this.state.patient.sub_county_name}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Parish :
                                </span>
                                {this.state.patient.parish_name}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Village :
                                </span>
                                {this.state.patient.village_name}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Date :
                                </span>
                                {new Date(
                                  this.state.patient.patient_date
                                ).getDate()}
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <div className="inputCtr">
                        <h5>Patient Units</h5>
                        <div className="inputs_ctr">
                          <table width="100%">
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Weight :
                                </span>
                                {this.state.patient.weight}
                                {"Kg"}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Height :
                                </span>
                                {this.state.patient.height}
                                {"cm"}
                              </td>
                            </tr>

                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Pressure :
                                </span>
                                {this.state.patient.blood_pressure}
                                {"Pa"}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Sugar Level :
                                </span>
                                {this.state.patient.blood_sugar}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  MUAC :
                                </span>
                                {this.state.patient.muac}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  BMI :
                                </span>
                                {this.state.patient.bmi}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Palliative Care :
                                </span>
                                {this.state.patient.palliative_care}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Class :
                                </span>{" "}
                                Very Sick
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Tobacco Use :
                                </span>
                                30%
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Date :
                                </span>{" "}
                                24/06/2020
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Time :
                                </span>{" "}
                                12:35PM
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      <div className="inputCtr">
                        <h5>Next of kin</h5>
                        <div
                          className="inputs_ctr"
                          style={{
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <table width="100%">
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Firstname :
                                </span>
                                {this.state.patient.next_of_kin_first_name}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Othername :
                                </span>
                                {this.state.patient.next_of_kin_surname}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Relationship :
                                </span>
                                {this.state.patient.next_of_kin_relationship}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Address :
                                </span>
                                {this.state.patient.next_of_kin_address}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Contact :
                                </span>
                                {this.state.patient.next_of_kin_phone}
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Occupation :
                                </span>
                                {this.state.patient.next_of_kin_occupation}
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Date :
                                </span>{" "}
                                24/06/2020
                              </td>
                              <td>
                                <span style={{ fontWeight: "bolder" }}>
                                  Time :
                                </span>{" "}
                                12:35PM
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="projects"></div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default Patient;
