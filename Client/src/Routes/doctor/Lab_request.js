// import React, { Component } from "react";
// import { TextField, Snackbar, Button, IconButton } from "@material-ui/core";
// import MuiAlert from "@material-ui/lab/Alert";
// import Nav from "./components/Nav";
// import Header from "./components/Header";
// import FormsApi from "../../api/forms";

// import "../../design/main.css";

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// class LabRequest extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       open: false,
//       message: "Please Wait...",
//       messageState: "",
//     };
//   }

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     this.setState({ ...this.state, open: true, messageState: "info" });
//     const fd = new FormData(e.target);
//     let _fcontent = {};
//     fd.forEach((value, key) => {
//       _fcontent[key] = value;
//     });
//     const api = new FormsApi();
//     let res = await api.post("/user/doctor/new_lab_request", _fcontent);
//     if (res.status === true) {
//       this.setState({
//         ...this.state,
//         message: res.data,
//         messageState: "success",
//       });
//     } else {
//       this.setState({
//         ...this.state,
//         message: res.data,
//         messageState: "error",
//       });
//     }
//   };

//   closePopUp = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     this.setState({ ...this.state, open: false });
//   };

//   render() {
//     return (
//       <>
//         <Snackbar
//           anchorOrigin={{
//             vertical: "top",
//             horizontal: "center",
//           }}
//           open={this.state.open}
//           autoHideDuration={5000}
//           onClose={this.closePopUp}
//           action={
//             <React.Fragment>
//               <IconButton
//                 size="small"
//                 aria-label="close"
//                 color="inherit"
//                 onClick={this.closePopUp}
//               >
//                 <i className="las la-times"></i>
//               </IconButton>
//             </React.Fragment>
//           }
//         >
//           <Alert onClose={this.closePopUp} severity={this.state.messageState}>
//             {this.state.message}
//           </Alert>
//         </Snackbar>
//         <input type="checkbox" id="nav-toggle" defaultChecked />
//         <Nav active="lab_request" />
//         <div className="main-content">
//           <Header />
//           <main>
//             <div className="recent-grid-left">
//               <div className="projects">
//                 <form
//                   className="card"
//                   autoComplete="off"
//                   onSubmit={this.handleSubmit}
//                 >
//                   <div className="card-header">
//                     <h3>Lab Request</h3>
//                     <div className="">
//                       <Button
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                         style={{ marginRight: 10 }}
//                       >
//                         <span
//                           style={{ fontSize: "17.5px", marginRight: "10px" }}
//                         >
//                           <i className="las la-print"></i>
//                         </span>
//                         Print Request
//                       </Button>
//                       <Button
//                         type="submit"
//                         aria-describedby={this.id}
//                         variant="contained"
//                         color="primary"
//                         style={{ marginLeft: "10px" }}
//                       >
//                         <span
//                           style={{ fontSize: "17.5px", marginRight: "10px" }}
//                         >
//                           <i className="las la-save"></i>
//                         </span>
//                         Save
//                       </Button>
//                     </div>
//                   </div>
//                   <div className="card-body">
//                     <div>
//                       <Request />
//                     </div>
//                   </div>
//                 </form>
//               </div>
//               <div className="card">
//                 <div className="card-header">
//                   <h3>Request Details</h3>
//                   <Button variant="contained" color="primary">
//                     <span style={{ fontSize: "17.5px", marginInline: "10px" }}>
//                       <i className="las la-print"></i>
//                     </span>
//                     Print
//                   </Button>
//                 </div>
//                 <div className="card-body">
//                   <table width="100%">
//                     <thead>
//                       <tr>
//                         <td>Details</td>
//                         <td>Qty</td>
//                         <td>Unit(Shs)</td>
//                         <td>Total(Shs)</td>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>CBC Test</td>
//                         <td>1</td>
//                         <td>3000</td>
//                         <td>3000</td>
//                       </tr>
//                       <tr>
//                         <td>CBC Test</td>
//                         <td>1</td>
//                         <td>3000</td>
//                         <td>3000</td>
//                       </tr>
//                       <tr>
//                         <td>CBC Test</td>
//                         <td>1</td>
//                         <td>3000</td>
//                         <td>3000</td>
//                       </tr>
//                       <tr>
//                         <td>CBC Test</td>
//                         <td>1</td>
//                         <td>3000</td>
//                         <td>3000</td>
//                       </tr>
//                     </tbody>
//                     <thead>
//                       <tr>
//                         <td></td>
//                         <td></td>
//                         <td>Total</td>
//                         <td>12000</td>
//                       </tr>
//                     </thead>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </>
//     );
//   }
// }

// export default LabRequest;

// const styles = {
//   input_ctr: {
//     width: "50%",
//     margin: "auto",
//   },
//   input_group: {
//     width: "100%",
//     border: "1px solid rgba(0,0,0,0.1)",
//     borderRadius: "5px",
//     margin: "15px auto",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-around",
//     alignItems: "center",
//   },
// };

// function Request() {
//   return (
//     <div className="inputCtr" style={styles.input_ctr}>
//       <h4>Lab Request</h4>
//       <div className="inputs_ctr" style={styles.input_group}>
//         <TextField
//           name="patient_number"
//           variant="outlined"
//           label="Patient Number"
//           style={{
//             width: "320px",
//             margin: "20px",
//             display: "block",
//           }}
//         />
//         <TextField
//           name="patient_name"
//           variant="outlined"
//           label="Patient Name"
//           style={{
//             width: "320px",
//             margin: "20px",
//             display: "block",
//           }}
//         />
//         <TextField
//           name="tests_required"
//           variant="outlined"
//           label="Tests Required"
//           multiline
//           style={{
//             width: "320px",
//             margin: "20px",
//             display: "block",
//           }}
//         />
//         <TextField
//           name="specimens"
//           variant="outlined"
//           label="Specimens"
//           multiline
//           style={{
//             width: "320px",
//             margin: "20px",
//             display: "block",
//           }}
//         />
//       </div>
//     </div>
//   );
// }

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
import user from "../../app_config";

import "../../design/main.css";
import "../../design/forms.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class LabRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: "Please Wait...",
      messageState: "",
      referrals: [],
      lab_technicians: [],
      tests: [],
      tests_selected: [],
      activePatient: {
        status: false,
        patient_number: "",
        patient_name: "",
      },
    };
    this.patients();
    this.tests();
    this.lab_technicians();
  }

  //start functions
  async patients() {
    const res =
      (await UsersApi.data(
        `/user/doctor/lab/patients_clinical_info?doctor=${user.user.user_id}`
      )) || [];
    if (res) {
      this.setState({ ...this.state, referrals: res === "Error" ? [] : res });
    }
  }
  async tests() {
    const res = (await UsersApi.data(`/user/all/tests`)) || [];
    if (res) {
      this.setState({ ...this.state, tests: res === "Error" ? [] : res });
    }
  }
  async lab_technicians() {
    const res = (await UsersApi.data(`/user/all/lab_technicians`)) || [];
    if (res) {
      this.setState({
        ...this.state,
        lab_technicians: res === "Error" ? [] : res,
      });
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
    _fcontent["user"] = user.user.user_id;
    _fcontent["tests_required"] = this.state.tests_selected;
    let res = await api.post("/user/doctor/new_lab_request", _fcontent);
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
        <Nav active="lab_request" />
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid-right">
              <div className="card">
                <div className="card-header">
                  <h3>Patients</h3>
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
              <div className="projects">
                <form
                  className="card"
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <div className="card-header">
                    <h3>Lab Request</h3>
                    <div className="">
                      <Button
                        type="submit"
                        aria-describedby={this.id}
                        variant="contained"
                        color="primary"
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
                        <h4>Lab Request Form</h4>
                        <div className="inputs_ctr">
                          <div className="inpts_on_left">
                            <div className="selected_tests_hdr">
                              Tests Available
                            </div>
                            <div className="tests_ctr">
                              <table width="100%">
                                <thead>
                                  <tr>
                                    <td>No.</td>
                                    <td>Test</td>
                                    <td></td>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.tests.length === 0 ? (
                                    <tr>
                                      <td>No Tests Available</td>
                                    </tr>
                                  ) : (
                                    this.state.tests.map((v, i) => {
                                      return (
                                        <tr key={i}>
                                          <td>{i + 1}</td>
                                          <td>{v.test_name}</td>
                                          <td>
                                            <Button
                                              variant="contained"
                                              color="primary"
                                              onClick={(e) => {
                                                {
                                                  this.setState(
                                                    {
                                                      ...this.state,
                                                      tests_selected: [
                                                        ...this.state
                                                          .tests_selected,
                                                        {
                                                          test_id: v.test_id,
                                                          test_name:
                                                            v.test_name,
                                                          test_amount:
                                                            v.test_amount,
                                                        },
                                                      ],
                                                    },
                                                    () => {
                                                      const { tests } =
                                                        this.state;
                                                      tests.splice(i, 1);
                                                      this.setState({
                                                        ...this.state,
                                                        tests,
                                                      });
                                                    }
                                                  );
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
                          <div className="inpts_on_right">
                            <div className="selected_tests_hdr">
                              Request Info
                            </div>
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
                                width: "90%",
                                margin: "10px 20px",
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
                                width: "90%",
                                margin: "20px",
                              }}
                            />
                            <FormControl
                              variant="outlined"
                              style={{
                                width: "90%",
                                margin: "20px",
                              }}
                            >
                              <InputLabel id="lab_user">
                                Lab Technician
                              </InputLabel>
                              <Select
                                inputProps={{ name: "lab_user" }}
                                labelId="lab_user"
                                id="select_lab_user"
                                label="Lab User"
                                defaultValue=""
                              >
                                {this.state.lab_technicians.length === 0 ? (
                                  <MenuItem value="1">
                                    No Lab User Available
                                  </MenuItem>
                                ) : (
                                  this.state.lab_technicians.map((v, i) => {
                                    return (
                                      <MenuItem value={v.user_id} key={i}>
                                        {v.user_username}
                                      </MenuItem>
                                    );
                                  })
                                )}
                              </Select>
                            </FormControl>
                            <div className="saved_tests">
                              <div className="selected_tests_hdr">
                                Tests Selected
                              </div>
                              <div className="selected_tests_ctr">
                                <table width="100%">
                                  <thead>
                                    <tr>
                                      <td>No.</td>
                                      <td>Test</td>
                                      <td>Amount(shs)</td>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.tests_selected.length === 0 ? (
                                      <tr>
                                        <td>No Tests Selected</td>
                                      </tr>
                                    ) : (
                                      this.state.tests_selected.map((v, i) => {
                                        return (
                                          <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{v.test_name}</td>
                                            <td>{v.test_amount}</td>
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

export default LabRequest;
