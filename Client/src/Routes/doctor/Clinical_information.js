import React, { Component } from "react";
import {
  TextField,
  Snackbar,
  Button,
  IconButton,
  TextareaAutosize,
} from "@material-ui/core";
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

class ClinicalInformationClass extends Component {
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
        <Nav active="clinical_information" />
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid">
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div className="card-header">
                    <h3>Clinical And Sample Info.</h3>
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
                        <h4>Clinical Info. Form</h4>
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
                              <td>{v.reason_for}</td>
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

export default ClinicalInformationClass;

const styles = {
  input_ctr: {
    width: "50%",
    margin: "auto",
  },
  input_group: {
    width: "100%",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "5px",
    margin: "15px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
};

function ClinicalInformation() {
  return (
    <div className="">
      <h4>Clinical Info. Form</h4>
      <div className="inputs_ctr">
        <div className="inpts_on_left">
          <TextField
            name="patient_number"
            variant="outlined"
            label="Patient Number"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Minimum 3 rows"
          />
          ;
          <TextField
            name="patient_name"
            variant="outlined"
            label="Patient Name"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
          <TextField
            name="amount"
            variant="outlined"
            label="Amount(Shs)"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
          <TextField
            name="balance"
            variant="outlined"
            label="Balance(Shs)"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
        </div>
        <div className="inpts_center">
          <TextField
            name="patient_number"
            variant="outlined"
            label="Patient Number"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
          <TextField
            name="patient_name"
            variant="outlined"
            label="Patient Name"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
          <TextField
            name="amount"
            variant="outlined"
            label="Amount(Shs)"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
          <TextField
            name="balance"
            variant="outlined"
            label="Balance(Shs)"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
