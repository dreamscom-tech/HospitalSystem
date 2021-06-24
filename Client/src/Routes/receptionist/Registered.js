import React, { Component, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/forms";
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormGroup,
  FormLabel,
  TextField,
  Snackbar,
  Button,
  IconButton,
  FormControl,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import user from "../../app_config";

import "../../design/main.css";
import "../../design/forms.css";
import { useParams } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Screening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "Please Wait...",
      messageState: "",
    };
  }

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
    let res = await api.post("/user/receptionist/new_patient_unit", _fcontent);
    if (res !== "Error") {
      if (res.status === true) {
        this.setState({
          ...this.state,
          message: "Triage Process Successfull...",
          messageState: "success",
        });
      } else {
        this.setState({
          ...this.state,
          message: "Not Added. !!!An Error Occurred",
          messageState: "warning",
        });
      }
    } else {
      this.setState({
        ...this.state,
        message: "Not Added. !!!An Error Occurred",
        messageState: "warning",
      });
    }
  };

  closePopUp = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      ...this.state,
      message: "Please Wait...",
      messageState: "",
      open: false,
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
          autoHideDuration={10000}
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
        <Nav active="screening" />
        <div className="main-content">
          <Header />
          <main>
            <div className="fullwidth-ctr">
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
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
                        <h3>Triage</h3>
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
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <BioData />
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

export default Screening;

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

function BioData() {
  //validate patient number
  function validate_p_number(i) {
    if (i.length === 9 && i[2] === "/" && i[5] === "/") {
      return true;
    } else {
      return false;
    }
  }
  //validate patient number
  let location = useLocation();
  let id = new URLSearchParams(location.search).get("patient-number") || "0";

  const [pnumber, setPnumber] = useState(id);
  const [BMI, setBMI] = useState({ weight: null, height: null });
  return (
    <div className="inputCtr">
      <TextField
        name="patient_number"
        variant="outlined"
        label={pnumber === "0" ? "Insert Patient ID" : "Patient Number"}
        defaultValue={pnumber === "0" ? "" : pnumber}
        style={{
          width: "200px",
          margin: "20px 0px",
        }}
        onChange={(e) => {
          if (validate_p_number(e.target.value)) {
            setPnumber(e.target.value);
          } else {
            setPnumber(id);
          }
        }}
      />
      <Link to="all_patients">
        <Button
          variant="contained"
          color="primary"
          style={{
            width: "150px",
            margin: "20px",
            display: pnumber === "0" ? "inline-block" : "none",
          }}
        >
          Select Patient
        </Button>
      </Link>
      <div
        className="inputs_ctr"
        style={{
          pointerEvents: pnumber === "0" ? "none" : "all",
          opacity: pnumber === "0" ? 0.3 : 1,
        }}
      >
        <div className="inpts_on_left">
          <TextField
            name="muac"
            variant="outlined"
            label="Muac"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
          <TextField
            type="number"
            name="weight"
            variant="outlined"
            label="Weight(KG)"
            style={{
              width: "75%",
              margin: "20px",
            }}
            onChange={(e) => {
              setBMI({ ...BMI, weight: parseFloat(e.target.value) });
            }}
          />
          <TextField
            type="number"
            name="height"
            variant="outlined"
            label="Height"
            style={{
              width: "75%",
              margin: "20px",
            }}
            onChange={(e) => {
              setBMI({ ...BMI, height: parseFloat(e.target.value) });
            }}
          />
          <TextField
            name="bmi"
            variant="outlined"
            label="BMI"
            value={
              BMI.weight && BMI.height
                ? Math.round((BMI.weight / (BMI.height * BMI.height)) * 100) /
                  100
                : "..."
            }
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
        </div>
        <div className="inpts_center">
          <TextField
            name="blood_pressure"
            variant="outlined"
            label="Blood Pressure"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
          <TextField
            name="blood_sugar"
            variant="outlined"
            label="Blood Sugar"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
          <TextField
            name="palliative_care"
            variant="outlined"
            label="Palliative Care"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
        </div>
        <div className="inpts_on_right">
          <TextField
            name="patient_classification"
            variant="outlined"
            label="Patient Classification"
            style={{
              width: "75%",
              margin: "20px",
            }}
          />
          <FormControl
            component="fieldset"
            style={{
              width: "75%",
              margin: "20px",
            }}
          >
            <FormLabel component="legend">Social History</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="social_history"
                    color="primary"
                    value="Tobacco Use"
                  />
                }
                label="Tobacco Use"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="social_history"
                    color="primary"
                    value="Alcohol"
                  />
                }
                label="Alcohol"
              />
            </FormGroup>
            <FormHelperText>Select Options</FormHelperText>
          </FormControl>
        </div>
      </div>
    </div>
  );
}
