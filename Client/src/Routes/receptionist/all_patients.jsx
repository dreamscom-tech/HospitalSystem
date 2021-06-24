import React, { Component, useState } from "react";
import {
  Button,
  TextField,
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
} from "@material-ui/core";
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
                        {this.state.patients.length === 0 ? (
                          <tr>
                            <td>No Patients Registered</td>
                          </tr>
                        ) : (
                          this.state.patients.map((v, i) => {
                            return <Row v={v} i={i} key={i} />;
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

export default AllPatients;

function Row({ v, i }) {
  const [AnchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [pnumber, setPNumber] = React.useState("");

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
        <td>{v.surname}</td>
        <td>{v.first_name}</td>
        <td>{v.age}</td>
        <td>{v.gender}</td>
        <td>{v.phone_number}</td>
        <td>
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </td>
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
            <TextField
              name="doctor"
              variant="outlined"
              label="Doctor"
              style={{
                width: "75%",
                marginBlock: "20px",
              }}
            />
            <FormControl
              component="fieldset"
              style={{
                width: "75%",
                marginBlock: "20px",
              }}
            >
              <FormLabel component="legend">Reason:</FormLabel>
              <RadioGroup>
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
          <Button variant="contained" color="primary" autoFocus>
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
