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
import UsersApi from "../../api/users";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class New_user extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "Please Wait...",
      messageState: "",
      departments: [],
    };
    this.fetchDepartments();
  }

  async fetchDepartments() {
    const res = (await UsersApi.data("/user/all/departments")) || [];
    if (res !== "Error") {
      this.setState({ ...this.state, departments: res });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ ...this.state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    let api = new FormsApi();
    let res = await api.post("/user/admin/new_user", _fcontent);
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
        <Nav active="users" />
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
                        <h3>New User</h3>
                      </div>
                      <div className="">
                        <Button
                          aria-describedby={this.id}
                          variant="contained"
                          color="primary"
                          style={{ marginInline: 10 }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          aria-describedby={this.id}
                          variant="contained"
                          color="primary"
                          style={{ marginInline: 10 }}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="inputCtr">
                        <h4>User Details</h4>
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
                            />
                            <TextField
                              name="other_name"
                              variant="outlined"
                              label="Other Name"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                            <TextField
                              name="username"
                              variant="outlined"
                              label="Username"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                            <FormControl
                              variant="outlined"
                              label="Gender"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            >
                              <InputLabel id="gender">Gender</InputLabel>
                              <Select
                                inputProps={{ name: "gender" }}
                                id="select_gender"
                                label="Gender"
                                defaultValue="M"
                              >
                                <MenuItem value="M">Male</MenuItem>
                                <MenuItem value="F">Female</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="inpts_center">
                            <FormControl
                              variant="outlined"
                              label="Department"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            >
                              <InputLabel id="department">
                                Department
                              </InputLabel>
                              <Select
                                inputProps={{ name: "department" }}
                                label="Department"
                                id="select_department"
                                defaultValue=""
                              >
                                {this.state.departments.length === 0
                                  ? ""
                                  : this.state.departments.map((v, i) => {
                                      return (
                                        <MenuItem
                                          value={v.department_id}
                                          key={i}
                                        >
                                          {v.department_name}
                                        </MenuItem>
                                      );
                                    })}
                              </Select>
                            </FormControl>
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
                            <FormControl
                              variant="outlined"
                              label="Role"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            >
                              <InputLabel id="role">Role</InputLabel>
                              <Select
                                inputProps={{ name: "role" }}
                                id="select_role"
                                label="Role"
                                defaultValue=""
                              >
                                <MenuItem value="doctor">Doctor</MenuItem>
                                <MenuItem value="lab">Lab Technician</MenuItem>
                                <MenuItem value="receptionist">
                                  Receptionist
                                </MenuItem>
                                <MenuItem value="accountant">
                                  Accountant
                                </MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                          <div className="inpts_on_right">
                            <TextField
                              type="password"
                              name="password"
                              variant="outlined"
                              label="Password"
                              style={{
                                width: "75%",
                                margin: "20px",
                              }}
                            />
                            <TextField
                              type="password"
                              name="confirm_password"
                              variant="outlined"
                              label="Confirm Password"
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
      </>
    );
  }
}

export default New_user;
