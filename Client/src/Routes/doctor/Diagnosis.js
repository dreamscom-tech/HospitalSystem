import React, { Component } from "react";
import {
  TextField,
  Snackbar,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/forms";
import UsersApi from "../../api/users";
import user from "../../app_config";

import "../../design/main.css";
import "../../design/forms.css";
import "../../design/dialog.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Diagnosis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "Please Wait...",
      messageState: "",
      referrals: [],
      activePatient: {
        status: false,
        patient_number: "",
        patient_name: "",
      },
      dialog_open: true,
    };
    this.referrals();
  }

  //start functions
  async referrals() {
    const res =
      (await UsersApi.data(
        `/user/doctor/referrals/patients_clinical_info?doctor=${user.user.user_id}`
      )) || [];
    if (res) {
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
    const api = new FormsApi();
    let res = await api.post("/user/doctor/new_clinical_info", _fcontent);
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
  handleClickOpenDialog = (e) => {
    this.setState({
      ...this.state,
      dialog_open: true,
    });
  };
  handleCloseDialog = () => {
    this.setState({
      ...this.state,
      dialog_open: false,
    });
  };
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
        <Nav active="diagnosis" />
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid">
              <div className="card">
                <div className="card-header">
                  <h3>Other Patients</h3>
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
                        <td></td>
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
                                <Button variant="contained" color="primary">
                                  Lab Report
                                </Button>
                              </td>
                              <td>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={(e) => {
                                    {
                                      this.setState({
                                        ...this.state,
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
                                  Diagnose
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
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div className="card-header">
                    <h3>Diagnosis</h3>
                    <div className="">
                      <Button
                        type="submit"
                        aria-describedby={this.id}
                        variant="contained"
                        color="primary"
                        style={{ marginRight: 10 }}
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
                        <h4>Diagnosis Form</h4>
                        <div className="inputs_ctr">
                          <div className="inpts_on_left">
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
                                width: "75%",
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
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                            <TextField
                              name="patient_location"
                              variant="outlined"
                              label="Patient Location"
                              value="OPD"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                          </div>
                          <div className="inpts_on_left">
                            <TextField
                              name="clinical_notes"
                              variant="outlined"
                              multiline={true}
                              label="Clinical Notes"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                            <TextField
                              name="therapy"
                              variant="outlined"
                              multiline={true}
                              label="Therapy"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
        <Dialog
          open={this.state.dialog_open}
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle id="alert-dialog-title">Lab Report</DialogTitle>
          <DialogContent>
            <div className="dialog_ctr">
              <div className="dialog_row">Date: 22/07/2021</div>
              <div className="dialog_row">
                <span>Paitient: Samuel Wekobosya</span>
                <span>Paitient Number: 19/U/004</span>
              </div>
              <div className="dialog_row">
                <span>Gender: M</span>
                <span>Paitient Number: 19/U/004</span>
              </div>
              <div className="dialog_title">Tests &amp; Reports</div>
              <div className="dialog_row">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Test</td>
                      <td>Result</td>
                      <td>Equipment</td>
                      <td>Bio Ref.</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Fat</td>
                      <td>OPD</td>
                      <td>
                        <span className="status purple"></span>Sick
                      </td>
                    </tr>
                    <tr>
                      <td>Dan</td>
                      <td>OPD</td>
                      <td>
                        <span className="status pink"></span>Very Sick
                      </td>
                    </tr>
                    <tr>
                      <td>Hajara</td>
                      <td>OPD</td>
                      <td>
                        <span className="status orange"></span>Treatment
                      </td>
                    </tr>
                  </tbody>
                  <thead>
                    <tr>
                      <td>Lab A</td>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="dialog_row">
                <div>
                  <span className="dialog_block_span">
                    Lab Technician: Samuel Wekobosya
                  </span>
                  <span className="dialog_block_span">Date: 22/07/2021</span>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              Print
            </Button>
            <Button variant="contained" color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default Diagnosis;
