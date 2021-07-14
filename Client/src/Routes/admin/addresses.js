import React, { Component } from "react";
import {
  Button,
  TextField,
  Snackbar,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Nav from "./components/Nav";
import Header from "./components/Header";
import UsersApi from "../../api/users";
import FormsApi from "../../api/forms";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "Please Wait...",
      messageState: "",
      districts: [],
      subCounties: [],
      parishes: [],
      value: "",
      required: {
        address: "",
        id: "",
        name: "",
      },
    };
    this.districts();
  }

  async districts() {
    const res = await UsersApi.data("/user/all/districts");
    if (res !== "Error") {
      this.setState({ ...this.state, districts: res });
    }
  }

  handleChange = (e) => {
    this.setState({ ...this.state, value: e.target.value });
  };

  fetchSubCounties = async (e) => {
    const res = await UsersApi.data(`/user/all/subcounties/${e.target.value}`);
    if (res !== "Error") {
      this.setState({ ...this.state, subCounties: res });
    }
  };

  fetchParishes = async (e) => {
    const res = await UsersApi.data(`/user/all/parishes/${e.target.value}`);
    if (res !== "Error") {
      this.setState({ ...this.state, parishes: res });
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ ...this.state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      if (value.length === 0) {
        this.setState({
          ...this.state,
          error: true,
          open: true,
          message: "These Fields are required",
          messageState: "warning",
        });
      } else {
        _fcontent[key] = value;
      }
    });
    let api = new FormsApi();
    let res = await api.post("/user/admin/new_address", _fcontent);
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
        <Nav active="addresses" />
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid-left">
              <div className="projects">
                <form
                  className="card"
                  onSubmit={this.handleSubmit}
                  autoComplete="off"
                >
                  <div className="card-header card-header-payments">
                    <h3 className="class_payment_header">Add Address</h3>
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
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        aria-describedby={this.id}
                        variant="contained"
                        color="primary"
                        style={{ marginLeft: 10 }}
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
                      <div className="inputCtrPaymentsDepart">
                        <h5>New Address</h5>
                        <div
                          className="inputs_ctr"
                          style={{
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <FormControl
                            variant="outlined"
                            label="Address"
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
                                  test_name: e.target.value,
                                },
                              });
                            }}
                          >
                            <InputLabel id="address">Address</InputLabel>
                            <Select
                              inputProps={{ name: "address" }}
                              label="Address"
                              id="select_address"
                              onChange={this.handleChange}
                              defaultValue=""
                            >
                              <MenuItem value="1">District</MenuItem>
                              <MenuItem value="2">Sub County</MenuItem>
                              <MenuItem value="3">Parish</MenuItem>
                              <MenuItem value="4">Village</MenuItem>
                            </Select>
                          </FormControl>
                          {this.state.value === "1" ? (
                            <>
                              <TextField
                                name="name"
                                variant="outlined"
                                label="District Name"
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
                                      name: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </>
                          ) : this.state.value === "2" ? (
                            <>
                              <FormControl
                                variant="outlined"
                                label="District"
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
                                      id: e.target.value,
                                    },
                                  });
                                }}
                              >
                                <InputLabel id="district">District</InputLabel>
                                <Select
                                  inputProps={{ name: "id" }}
                                  id="select_district"
                                  label="District"
                                  defaultValue=""
                                >
                                  {this.state.districts.length === 0
                                    ? ""
                                    : this.state.districts.map((v, i) => {
                                        return (
                                          <MenuItem
                                            value={v.district_id}
                                            key={i}
                                          >
                                            {v.district_name}
                                          </MenuItem>
                                        );
                                      })}
                                </Select>
                              </FormControl>
                              <TextField
                                name="name"
                                variant="outlined"
                                label="Subcounty Name"
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
                                      name: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </>
                          ) : this.state.value === "3" ? (
                            <>
                              <FormControl
                                variant="outlined"
                                label="District"
                                style={{
                                  width: "75%",
                                  margin: "20px",
                                }}
                              >
                                <InputLabel id="parish">District</InputLabel>
                                <Select
                                  inputProps={{ name: "district_id" }}
                                  id="select_district"
                                  label="District"
                                  onChange={this.fetchSubCounties}
                                  defaultValue=""
                                >
                                  {this.state.districts.length === 0
                                    ? ""
                                    : this.state.districts.map((x, y) => {
                                        return (
                                          <MenuItem
                                            value={x.district_id}
                                            key={y}
                                          >
                                            {x.district_name}
                                          </MenuItem>
                                        );
                                      })}
                                </Select>
                              </FormControl>
                              <FormControl
                                variant="outlined"
                                label="Sub County"
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
                                      name: e.target.value,
                                    },
                                  });
                                }}
                              >
                                <InputLabel id="subcounty">
                                  Sub County
                                </InputLabel>
                                <Select
                                  inputProps={{ name: "id" }}
                                  id="select_subcounty"
                                  label="SubCounty"
                                  defaultValue=""
                                >
                                  {this.state.subCounties.length === 0
                                    ? ""
                                    : this.state.subCounties.map((a, b) => {
                                        return (
                                          <MenuItem
                                            value={a.sub_county_id}
                                            key={b}
                                          >
                                            {a.sub_county_name}
                                          </MenuItem>
                                        );
                                      })}
                                </Select>
                              </FormControl>
                              <TextField
                                name="name"
                                variant="outlined"
                                label="Parish Name"
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
                                      name: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </>
                          ) : this.state.value === "4" ? (
                            <>
                              <FormControl
                                variant="outlined"
                                label="Parish"
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
                                      name: e.target.value,
                                    },
                                  });
                                }}
                              >
                                <InputLabel id="district">District</InputLabel>
                                <Select
                                  inputProps={{ name: "district_id" }}
                                  id="select_parish"
                                  label="District"
                                  defaultValue=""
                                  onChange={this.fetchSubCounties}
                                >
                                  {this.state.districts.length === 0
                                    ? ""
                                    : this.state.districts.map((v, i) => {
                                        return (
                                          <MenuItem
                                            value={v.district_id}
                                            key={i}
                                          >
                                            {v.district_name}
                                          </MenuItem>
                                        );
                                      })}
                                </Select>
                              </FormControl>
                              <FormControl
                                variant="outlined"
                                label="subcounty"
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
                                      name: e.target.value,
                                    },
                                  });
                                }}
                              >
                                <InputLabel id="subcounty">
                                  Sub County
                                </InputLabel>
                                <Select
                                  inputProps={{ name: "subcounty_id" }}
                                  id="select_subcounty"
                                  label="subcounty"
                                  defaultValue=""
                                  onChange={this.fetchParishes}
                                >
                                  {this.state.subCounties.length === 0
                                    ? ""
                                    : this.state.subCounties.map((a, b) => {
                                        return (
                                          <MenuItem
                                            value={a.sub_county_id}
                                            key={b}
                                          >
                                            {a.sub_county_name}
                                          </MenuItem>
                                        );
                                      })}
                                </Select>
                              </FormControl>
                              <FormControl
                                variant="outlined"
                                label="Parish"
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
                                      name: e.target.value,
                                    },
                                  });
                                }}
                              >
                                <InputLabel id="gender">Parish</InputLabel>
                                <Select
                                  inputProps={{ name: "id" }}
                                  id="select_parish"
                                  label="Parish"
                                  defaultValue=""
                                >
                                  {this.state.parishes.length === 0
                                    ? ""
                                    : this.state.parishes.map((a, b) => {
                                        return (
                                          <MenuItem value={a.parish_id} key={b}>
                                            {a.parish_name}
                                          </MenuItem>
                                        );
                                      })}
                                </Select>
                              </FormControl>
                              <TextField
                                name="name"
                                variant="outlined"
                                label="Village Name"
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
                                      name: e.target.value,
                                    },
                                  });
                                }}
                              />
                            </>
                          ) : (
                            ""
                          )}
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

export default Addresses;
