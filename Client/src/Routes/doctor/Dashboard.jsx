import React, { Component, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  FormControl,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Radio,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  FormLabel,
  InputLabel,
  Select,
} from "@material-ui/core";
import Nav from "./components/Nav";
import Header from "./components/Header";
import UsersApi from "../../api/users";
import FormsApi from "../../api/forms";
import user from "../../app_config";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AnchorEl: null,
      _pnumber: "...",
      _pnumber_month: "...",
      _doctors: "...",
      _pending_consultions: "...",
      patients: [],
      referrals: [],
    };
    this.patients();
    this.patients_this_month();
    this.doctors_today();
    this.pending_consultions();
    this.referrals();
  }
  //cards Requests
  async patients() {
    const res = (await UsersApi.data("/user/all/patients")) || [];
    if (res) {
      this.setState({ ...this.state, patients: res === "Error" ? [] : res });
      this.setState({
        ...this.state,
        _pnumber: res === "Error" ? [].length : res.length,
      });
    }
  }
  async patients_this_month() {
    const res = (await UsersApi.data("/user/all/patients_this_month")) || [];
    if (res) {
      this.setState({ ...this.state, _pnumber_month: res.length });
    }
  }
  async doctors_today() {
    const res = (await UsersApi.data("/user/all/doctors_today")) || [];
    if (res) {
      this.setState({ ...this.state, _doctors: res.length });
    }
  }
  async pending_consultions() {
    const res = (await UsersApi.data("/user/all/pending_consultions")) || [];
    if (res) {
      this.setState({ ...this.state, _pending_consultions: res.length });
    }
  }
  async referrals() {
    const res =
      (await UsersApi.data(
        `/user/all/referrals/${user.user.user_id}/?refer_to=${user.user.user_id}`
      )) || [];
    if (res) {
      this.setState({ ...this.state, referrals: res === "Error" ? [] : res });
    }
  }
  handleOpenActions = (e) => {
    this.setState({ ...this.state, AnchorEl: e.currentTarget });
  };
  handleCloseActions = () => {
    this.setState({ ...this.state, AnchorEl: null });
  };
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
                  <h1>{this.state._pnumber_month}</h1>
                  <span>
                    Patients Registered <br />
                    <span style={{ fontSize: "13px" }}>This Period</span>
                  </span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h1>{this.state._pending_consultions}</h1>
                  <span>Pending Consultations</span>
                </div>
                <div className="">
                  <span className="las la-users"></span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h1>{this.state._doctors}</h1>
                  <span>Doctors Available</span>
                </div>
                <div className="">
                  <span className="las la-users"> </span>
                </div>
              </div>
              <div className="card-single">
                <div className="">
                  <h1>{this.state._pnumber}</h1>
                  <span>Total Patients</span>
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
                    <Link to="/all_patients">
                      <Button variant="contained" color="primary">
                        See all
                        <span
                          style={{ fontSize: "17.5px", marginLeft: "10px" }}
                        >
                          <span className="las la-arrow-right"></span>
                        </span>
                      </Button>
                    </Link>
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Patient No.</td>
                          <td>Name</td>
                          <td>Age</td>
                          <td>Contact</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.patients.length === 0 ? (
                          <tr>
                            <td>No Patients Registered</td>
                          </tr>
                        ) : (
                          this.state.patients.slice(0, 5).map((v, i) => {
                            return <Row v={v} i={i} key={i} />;
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
                    <h3>Referrals</h3>
                    <Button
                      variant="contained"
                      color="primary"
                      aria-controls="reception-actions"
                      aria-haspopup="true"
                      onClick={this.handleOpenActions}
                    >
                      More
                      <span
                        style={{ fontSize: "17.5px", marginInline: "10px" }}
                      >
                        <span className="las la-angle-down"></span>
                      </span>
                    </Button>
                    <Menu
                      id="reception-actions"
                      anchorEl={this.state.AnchorEl}
                      keepMounted
                      open={Boolean(this.state.AnchorEl)}
                      onClose={this.handleCloseActions}
                      disableScrollLock={true}
                    >
                      <Link to="/new">
                        <MenuItem onClick={this.handleCloseActions}>
                          New Patient
                        </MenuItem>
                      </Link>
                      <Link to="/triage">
                        <MenuItem onClick={this.handleCloseActions}>
                          Triage
                        </MenuItem>
                      </Link>
                    </Menu>
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
                            <td>No Referrals Made</td>
                          </tr>
                        ) : (
                          this.state.referrals.slice(0, 5).map((v, i) => {
                            return <ReferralRow v={v} i={i} key={i} />;
                          })
                        )}
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

export default Dashboard;

function Row({ v, i }) {
  const [AnchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [pnumber, setPNumber] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [appointment, setAppointment] = useState({
    patient: v.patient_id,
    user: user.user.user_id,
  });

  getDoctors();
  async function getDoctors() {
    const doctors = await UsersApi.data("/user/all/doctors");
    if (doctors.length !== 0 && doctors !== "Error") {
      setDoctors(doctors);
    }
  }
  const handleOpenActions = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  const handleClickOpenDialog = (e) => {
    setPNumber(e.target.dataset.number);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <tr key={i}>
        <td>{v.patient_number}</td>
        <td>{`${v.patient_surname} ${v.patient_first_name}`}</td>
        <td>{v.patient_age}</td>
        <td>{v.patient_phone_number}</td>
        <td>
          <Button
            variant="contained"
            color="primary"
            aria-controls={`reception-actions_${i}`}
            aria-haspopup="true"
            onClick={handleOpenActions}
          >
            Actions
          </Button>
        </td>
      </tr>
      <Menu
        id={`reception-actions_${i}`}
        anchorEl={AnchorEl}
        keepMounted
        disableScrollLock={true}
        open={Boolean(AnchorEl)}
        onClose={handleCloseActions}
      >
        <MenuItem
          data-number={v.patient_number}
          onClick={handleClickOpenDialog}
        >
          Assign To Doctor
        </MenuItem>
      </Menu>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle id="alert-dialog-title">Assign Doctor</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Patient: {pnumber}
          </DialogContentText>
          <form>
            <FormControl
              variant="outlined"
              style={{
                width: "75%",
                margin: "20px",
              }}
            >
              <InputLabel id="doctor">Doctor</InputLabel>
              <Select
                inputProps={{ name: "doctor" }}
                required
                labelId="doctor"
                label="Doctor"
                defaultValue=""
                onChange={(e) => {
                  setAppointment({ ...appointment, doctor: e.target.value });
                }}
              >
                {doctors.length === 0 ? (
                  <MenuItem value="null">No Doctors Available</MenuItem>
                ) : (
                  doctors.map((v, i) => {
                    return (
                      <MenuItem value={v.user_id} key={i}>
                        {v.user_username}
                      </MenuItem>
                    );
                  })
                )}
              </Select>
            </FormControl>
            <FormControl
              component="fieldset"
              style={{
                width: "75%",
                marginBlock: "20px",
              }}
            >
              <FormLabel component="legend">Reason:</FormLabel>
              <RadioGroup
                onChange={(e) => {
                  setAppointment({ ...appointment, reason: e.target.value });
                }}
              >
                <FormControlLabel
                  value="consultation"
                  control={<Radio />}
                  label="Consultation With a Fee"
                />
                <FormControlLabel
                  value="clinical_information"
                  control={<Radio />}
                  label="Clinical Information"
                />
              </RadioGroup>
              <FormHelperText>Select Options</FormHelperText>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            autoFocus
            onClick={async () => {
              const api = new FormsApi();
              let res = await api.post(
                "/user/receptionist/new_doctor_referral",
                appointment
              );
              if (res !== "Error") {
                if (res.status === true) {
                  handleCloseDialog();
                }
              }
            }}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function ReferralRow({ v, i }) {
  return (
    <>
      <tr key={i}>
        <td>{v.patient_number}</td>
        <td>{`${v.patient_surname} ${v.patient_first_name}`}</td>
        <td>{v.reason_for}</td>
        <td>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              alert("Beta Version.....");
            }}
          >
            Remove
          </Button>
        </td>
      </tr>
    </>
  );
}
