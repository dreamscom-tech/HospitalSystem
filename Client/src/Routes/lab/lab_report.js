import React, { Component } from "react";
import { TextField, Snackbar, Button, IconButton } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/forms";
import UsersApi from "../../api/users";
import user from "../../app_config";

import "../../design/main.css";
import "../../design/forms.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class LabReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "Please Wait...",
      messageState: "",
      referrals: [],
      tests: [],
      results: [],
      activePatient: {
        status: false,
        patient_number: "",
        patient_name: "",
      },
    };
    this.referrals();
  }

  //start functions
  async referrals() {
    const res =
      (await UsersApi.data(
        `/user/lab/patients_referred?user=${user.user.user_id}`
      )) || [];
    if (res) {
      console.log(res);
      this.setState({ ...this.state, referrals: res === "Error" ? [] : res });
    }
  }
  //start functions
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ ...this.state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    _fcontent["user"] = user.user.user_id;
    _fcontent["date"] = Date.now();
    const api = new FormsApi();
    let res = await api.post("/user/lab/new_lab_report", _fcontent);
    if (res.status === true) {
      this.setState({
        ...this.state,
        message: res.data,
        messageState: "success",
      });
    } else {
      this.setState({
        ...this.state,
        message: res.data,
        messageState: "error",
      });
    }
  };

  closePopUp = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ ...this.state, open: false });
  };
  handleClickPatient;
  render() {
    return (
      <>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.closePopUp}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.closePopUp}
              >
                <i className="las la-times"></i>
              </IconButton>
            </React.Fragment>
          }
        >
          <Alert onClose={this.closePopUp} severity={this.state.messageState}>
            {this.state.message}
          </Alert>
        </Snackbar>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="lab_report" />
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid-left">
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div className="card-header">
                    <h3>Laboratory Report.</h3>
                    <div className="">
                      <Button
                        type="submit"
                        aria-describedby={this.id}
                        variant="contained"
                        color="primary"
                        style={{ marginInline: 10 }}
                      >
                        <span
                          style={{ fontSize: "17.5px", marginRight: "10px" }}
                        >
                          <i className="las la-save"></i>
                        </span>
                        Save
                      </Button>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="">
                        <h4>Report Form...</h4>
                        <div className="inputs_ctr">
                          <div className="inpts_on_left" style={{ flex: 2 }}>
                            <TextField
                              name="patient_number"
                              variant="outlined"
                              label="Patient Number"
                              value={
                                this.state.activePatient.status
                                  ? this.state.activePatient.patient_number
                                  : ""
                              }
                              style={{
                                margin: "20px",
                              }}
                            />
                            <TextField
                              name="patient_name"
                              variant="outlined"
                              label="Patient Name"
                              value={
                                this.state.activePatient.status
                                  ? this.state.activePatient.patient_name
                                  : ""
                              }
                              style={{
                                margin: "20px",
                              }}
                            />
                            <div
                              className="lab_tbl_ctr"
                              style={{ margin: "20px" }}
                            >
                              <table width="100%">
                                <thead>
                                  <tr>
                                    <td>Test</td>
                                    <td>Equipment</td>
                                    <td>Report</td>
                                    <td>Bio. Ref</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.tests.length === 0 ? (
                                    <tr>
                                      <td>No Tests Requested</td>
                                    </tr>
                                  ) : (
                                    this.state.tests.map((v, i) => {
                                      return (
                                        <tr key={i}>
                                          <td>{v.test_name}</td>
                                          <td>
                                            <TextField
                                              multiline={true}
                                              variant="standard"
                                              label="Result/Report"
                                              name={`report_${i}`}
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              variant="standard"
                                              label="Equipment Used"
                                              name={`equipment_${i}`}
                                            />
                                          </td>
                                          <td>
                                            <TextField
                                              variant="standard"
                                              label="Ref"
                                              name={`ref_${i}`}
                                            />
                                          </td>
                                        </tr>
                                      );
                                    })
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card">
                <div className="card-header">
                  <h3>Patients List</h3>
                  <Button variant="contained" color="primary">
                    <span style={{ fontSize: "17.5px", marginRight: "10px" }}>
                      <i className="las la-print"></i>
                    </span>
                    Print
                  </Button>
                </div>
                <div className="card-body">
                  <table width="100%">
                    <thead>
                      <tr>
                        <td>Patient Number</td>
                        <td>Patient Name</td>
                        <td>Reason</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.referrals.length === 0 ? (
                        <tr>
                          <td>No Patients Available</td>
                        </tr>
                      ) : (
                        this.state.referrals.map((v, i) => {
                          return (
                            <tr key={i}>
                              <td>{v.patient_number}</td>
                              <td>{`${v.patient_surname} ${v.patient_first_name}`}</td>
                              <td>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={(e) => {
                                    {
                                      this.setState({
                                        ...this.state,
                                        tests: v.test_required
                                          ? JSON.parse(v.test_required)
                                          : [],
                                        activePatient: {
                                          ...this.state.activePatient,
                                          status: true,
                                          patient_name: `${v.patient_surname} ${v.patient_first_name}`,
                                          patient_number: v.patient_number,
                                        },
                                      });
                                    }
                                  }}
                                >
                                  Select
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

export default LabReport;
