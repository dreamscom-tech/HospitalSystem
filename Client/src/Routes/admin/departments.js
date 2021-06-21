import React, { Component } from "react";
import { TextField, Snackbar, Button, IconButton } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Nav from "./components/Nav";
import Header from "./components/Header";
import FormsApi from "../../api/forms";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "Please Wait...",
      messageState: "",
      required: {
        depart_name: "",
        department_description: "",
      },
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ ...this.state, open: true, messageState: "info" });
    const fd = new FormData(e.target);
    let form_content = {};
    fd.forEach((value, key) => {
      if (value.length == 0) {
        this.setState({
          ...this.state,
          error: true,
          open: true,
          message: "These Fields are required",
          messageState: "warning",
        });
      } else {
        form_content[key] = value;
      }
    });
    let api = new FormsApi();
    let res = await api.post("/user/admin/new_department", form_content);
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
        <Nav active="departments" />
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
                  <div className="card-header card-header-payments">
                    <h3 className="class_payment_header">New Department</h3>
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
                          style={{ fontSize: "17.5px", marginRigth: "10px" }}
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
                        <h4>Add Department</h4>
                        <div
                          className="inputs_ctr"
                          style={{
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <TextField
                            name="depart_name"
                            variant="outlined"
                            label="Department Name"
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
                                  depart_name: e.target.value,
                                },
                              });
                            }}
                          />
                          <TextField
                            name="department_description"
                            variant="outlined"
                            label="Department Description"
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
                                  depart_name: e.target.value,
                                },
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="card">
                <div className="card-header">
                  <h3>Department Details</h3>
                  <Button variant="contained" color="primary">
                    <span style={{ fontSize: "17.5px", marginInline: "10px" }}>
                      <i className="las la-print"></i>
                    </span>
                    Print
                  </Button>
                </div>
                <div className="card-body">
                  <table width="100%">
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Workers</td>
                        <td>Actions</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>LAB</td>
                        <td>4</td>
                        <td>
                          <Button variant="contained" color="primary">
                            <span
                              style={{
                                fontSize: "10px",
                                marginInline: "3px",
                              }}
                            ></span>
                            Details
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>Reception</td>
                        <td>2</td>
                        <td>
                          <Button variant="contained" color="primary">
                            <span
                              style={{
                                fontSize: "10px",
                                marginInline: "3px",
                              }}
                            ></span>
                            Details
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>OPD</td>
                        <td>3</td>
                        <td>
                          <Button variant="contained" color="primary">
                            <span
                              style={{
                                fontSize: "10px",
                                marginInline: "3px",
                              }}
                            ></span>
                            Details
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>Martenity</td>
                        <td>8</td>
                        <td>
                          <Button variant="contained" color="primary">
                            <span
                              style={{
                                fontSize: "10px",
                                marginInline: "3px",
                              }}
                            ></span>
                            Details
                          </Button>
                        </td>
                      </tr>
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

export default Department;
