import React, { Component } from "react";
import {
  TextField,
  Snackbar,
  Button,
  IconButton,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/forms";

import "../../design/main.css";
import "../../design/forms.css";
import UsersApi from "../../api/users";
import { Redirect } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class NewPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      open: false,
      message: "",
      messageState: "",
      currentTab: 0,
      backTabButtonClickable: false,
      submitButton: false,
      onOpenState: {
        patient_number: "",
      },
      required: {
        surname: "",
        other_names: "",
      },
      redirect: {
        status: false,
        url: null,
      },
      address: {
        districts: [
          {
            district_id: "null",
            district_name: "No Sub Counties Added",
          },
        ],
        sub_counties: [
          {
            subcounty_id: "null",
            subcounty_name: "No Sub Counties Added",
          },
        ],
        parishes: [
          {
            parish_id: "null",
            parish_name: "No Sub Counties Added",
          },
        ],
        villages: [
          {
            village_id: "null",
            village_name: "No Sub Counties Added",
          },
        ],
      },
    };
    this.onOpenFile();
  }
  onOpenFile = async () => {
    const p_number = await UsersApi.data("/user/receptionist/pnumber");
    const districts = await UsersApi.data("/user/all/districts");
    if (districts.length !== 0 && districts !== "Error") {
      this.setState({
        ...this.state,
        address: {
          ...this.state.address,
          districts,
        },
      });
    }
    if (p_number.status === true) {
      this.setState({
        ...this.state,
        onOpenState: {
          ...this.state.onOpenState,
          patient_number: p_number._pnumber,
        },
      });
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      open: true,
      messageState: "info",
      message: "Please Wait...",
    });
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    const api = new FormsApi();
    let res = await api.post("/user/receptionist/new_patient", _fcontent);
    if (res !== "Error") {
      if (res.status === true) {
        this.setState({
          ...this.state,
          message: "Patient Added.....",
          messageState: "success",
          redirect: {
            ...this.state.redirect,
            url: "/triage",
          },
        });
      } else {
        this.setState({
          ...this.state,
          message: "Failed, Server Error...",
          messageState: "error",
        });
      }
    } else {
      this.setState({
        ...this.state,
        message: "Failed, Cannot Connect to Server...",
        messageState: "error",
      });
    }
  };

  closePopUp = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      ...this.state,
      message: "",
      messageState: "",
      open: false,
    });
    if (this.state.redirect.url !== null) {
      this.setState({
        ...this.state,
        redirect: {
          ...this.state.redirect,
          status: true,
        },
      });
    }
  };

  handleSlideForward = () => {
    let err = false;
    Object.values(this.state.required).forEach((e) => {
      if (e.length === 0) {
        err = true;
        this.setState({
          ...this.state,
          error: true,
          open: true,
          messageState: "warning",
          message: "These Input Fields are required",
        });
      }
    });
    if (!err) {
      this.setState({
        ...this.state,
        error: false,
        submitButton: true,
        currentTab: 1,
      });
    }
  };
  handleSlideBack = () => {
    if (this.state.currentTab === 0) {
      return;
    } else {
      this.setState({
        ...this.state,
        submitButton: false,
        currentTab: this.state.currentTab - 1,
      });
    }
  };
  render() {
    const { redirect } = this.state;
    if (redirect.status) {
      return <Redirect to={redirect.url} />;
    }
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
        <Nav active="new" />
        <div className="main-content">
          <Header />
          <main>
            <div className="fullwidth-ctr">
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
                  noValidate
                  onSubmit={this.handleSubmit}
                >
                  <div
                    className=""
                    style={{
                      borderBottom: "1px solid #f0f0f0",
                      padding: "1rem",
                    }}
                  >
                    <div className="form-header-ctr">
                      <div className="">
                        <TextField
                          name="patient_number"
                          variant="outlined"
                          label="New Patient Number"
                          value={this.state.onOpenState.patient_number}
                          style={{
                            width: "250px",
                            margin: "20px 0px",
                          }}
                        />
                      </div>

                      <div className="">
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginRight: 10 }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          aria-describedby={this.id}
                          variant="contained"
                          color="primary"
                          style={{ marginLeft: 10 }}
                          disabled={!this.state.submitButton}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <div
                        className=""
                        style={
                          this.state.currentTab === 0
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <div className="inputCtr">
                          <h4>Patient Bio Data</h4>
                          <div className="inputs_ctr">
                            <div className="inpts_on_left">
                              <TextField
                                name="surname"
                                variant="outlined"
                                label="Surname"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                                error={this.state.error}
                                onChange={(e) => {
                                  this.setState({
                                    ...this.state,
                                    required: {
                                      ...this.state.required,
                                      surname: e.target.value,
                                    },
                                  });
                                }}
                              />
                              <TextField
                                name="other_names"
                                variant="outlined"
                                label="Other Names"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                                error={this.state.error}
                                onChange={(e) => {
                                  this.setState({
                                    ...this.state,
                                    required: {
                                      ...this.state.required,
                                      other_names: e.target.value,
                                    },
                                  });
                                }}
                              />
                              <TextField
                                name="dob"
                                variant="outlined"
                                helperText="Date of Birth"
                                type="date"
                                style={{
                                  width: "75%",
                                  margin: "20px 20px 0px 20px",
                                }}
                              />
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                  inputProps={{ name: "gender" }}
                                  labelId="gender"
                                  id="select_gender"
                                  label="Gender"
                                  value="M"
                                >
                                  <MenuItem value="M">Male</MenuItem>
                                  <MenuItem value="F">Female</MenuItem>
                                </Select>
                              </FormControl>
                            </div>
                            <div className="inpts_center">
                              <TextField
                                name="phone_contact"
                                variant="outlined"
                                label="Phone Contact"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="email_address"
                                variant="outlined"
                                label="Email Address:(If Any)"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="pt_occupation"
                                variant="outlined"
                                label="Occupation"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="education_level"
                                variant="outlined"
                                label="Education Level"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                            </div>
                            <div className="inpts_on_right">
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="marital_status">
                                  Marital Status
                                </InputLabel>
                                <Select
                                  inputProps={{ name: "marital_status" }}
                                  labelId="marital_status"
                                  id="select_marital_status"
                                  label="Marital Status"
                                  value="Single"
                                >
                                  <MenuItem value="Single">Single</MenuItem>
                                  <MenuItem value="Married">Married</MenuItem>
                                  <MenuItem value="Divorced">Divorced</MenuItem>
                                </Select>
                              </FormControl>
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="religion">Religion</InputLabel>
                                <Select
                                  inputProps={{ name: "religion" }}
                                  labelId="religion"
                                  id="select_religion"
                                  label="Religion"
                                  value="Christian"
                                >
                                  <MenuItem value="Christian">
                                    Christian
                                  </MenuItem>
                                  <MenuItem value="Muslim">Muslim</MenuItem>
                                  <MenuItem value="Pentecostal">
                                    Pentecostal
                                  </MenuItem>
                                </Select>
                              </FormControl>
                              <TextField
                                name="age"
                                variant="outlined"
                                label="Age"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className=""
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ marginLeft: 10 }}
                              onClick={this.handleSlideForward}
                            >
                              Next
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div
                        className=""
                        style={
                          this.state.currentTab === 1
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <div className="inputCtr">
                          <h4>Patient Address &amp; Next Of Kin</h4>
                          <div className="inputs_ctr">
                            <div className="inpts_on_left">
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="district">District</InputLabel>
                                <Select
                                  inputProps={{ name: "district" }}
                                  required
                                  labelId="district"
                                  // id="select_gender"
                                  label="District"
                                  defaultValue=""
                                  onChange={async (e) => {
                                    const sub_counties = await UsersApi.data(
                                      `/user/all/subcounties/${e.target.value}`
                                    );
                                    if (
                                      sub_counties.length !== 0 &&
                                      sub_counties !== "Error"
                                    ) {
                                      this.setState({
                                        ...this.state,
                                        address: {
                                          ...this.state.address,
                                          sub_counties,
                                        },
                                      });
                                    }
                                  }}
                                >
                                  {this.state.address.districts.map((v, i) => {
                                    return (
                                      <MenuItem value={v.district_id} key={i}>
                                        {v.district_name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="sub_county">
                                  Sub County
                                </InputLabel>
                                <Select
                                  inputProps={{ name: "sub_county" }}
                                  required
                                  labelId="sub_county"
                                  // id="select_su"
                                  // label="Sub County"
                                  defaultValue=""
                                  onChange={async (e) => {
                                    const parishes = await UsersApi.data(
                                      `/user/all/parishes/${e.target.value}`
                                    );
                                    if (
                                      parishes.length !== 0 &&
                                      parishes !== "Error"
                                    ) {
                                      this.setState({
                                        ...this.state,
                                        address: {
                                          ...this.state.address,
                                          parishes,
                                        },
                                      });
                                    }
                                  }}
                                >
                                  {this.state.address.sub_counties.map(
                                    (v, i) => {
                                      return (
                                        <MenuItem
                                          value={v.subcounty_id}
                                          key={i}
                                        >
                                          {v.subcounty_name}
                                        </MenuItem>
                                      );
                                    }
                                  )}
                                </Select>
                              </FormControl>
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="parish">Parish</InputLabel>
                                <Select
                                  inputProps={{ name: "parish" }}
                                  required
                                  labelId="parish"
                                  // id="select_su"
                                  // label="Sub County"
                                  defaultValue=""
                                  onChange={async (e) => {
                                    const villages = await UsersApi.data(
                                      `/user/all/villages/${e.target.value}`
                                    );
                                    if (
                                      villages.length !== 0 &&
                                      villages !== "Error"
                                    ) {
                                      this.setState({
                                        ...this.state,
                                        address: {
                                          ...this.state.address,
                                          villages,
                                        },
                                      });
                                    }
                                  }}
                                >
                                  {this.state.address.parishes.map((v, i) => {
                                    return (
                                      <MenuItem value={v.parish_id} key={i}>
                                        {v.parish_name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>
                            </div>
                            <div className="inpts_center">
                              <FormControl
                                variant="outlined"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="village">Village</InputLabel>
                                <Select
                                  inputProps={{ name: "village" }}
                                  required
                                  labelId="village"
                                  // id="select_su"
                                  // label="Sub County"
                                  defaultValue=""
                                >
                                  {this.state.address.villages.map((v, i) => {
                                    return (
                                      <MenuItem value={v.village_id} key={i}>
                                        {v.village_name}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              </FormControl>

                              <TextField
                                name="village"
                                variant="outlined"
                                label="Village"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="tribe"
                                variant="outlined"
                                label="Tribe"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="address"
                                variant="outlined"
                                label="Address"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                            </div>
                            <div className="inpts_on_right">
                              <TextField
                                name="nk_surname"
                                variant="outlined"
                                label="Next Of Kin Surname"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="nk_first_name"
                                variant="outlined"
                                label="Next Of Kin Firstname"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="nk_relationship"
                                variant="outlined"
                                label="Relationship With Patient"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                              <TextField
                                name="nk_telephone"
                                variant="outlined"
                                label="Phone Number"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              />
                            </div>
                          </div>
                          <div
                            className=""
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ marginRight: 10 }}
                              onClick={this.handleSlideBack}
                            >
                              Back
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ marginLeft: 10 }}
                              onClick={this.handleSlideForward}
                              disabled
                            >
                              Next
                            </Button>
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
      </>
    );
  }
}

export default NewPatient;

const styles = {
  input_ctr: {
    width: "75%",
    margin: "auto",
  },
  input_group: {
    width: "100%",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "5px",
    margin: "15px auto",
    display: "flex",
    justifyContent: "space-around",
  },
};
