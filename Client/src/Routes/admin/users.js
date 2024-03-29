import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Nav from "./components/Nav";
import Header from "./components/Header";
import UsersApi from "../../api/users";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    this.users();
  }

  async users() {
    const res = (await UsersApi.data("/user/all/users")) || [];
    if (res !== "Error") {
      this.setState({ ...this.state, users: res });
    } else {
      this.setState({ ...this.state, users: [] });
    }
  }

  render() {
    return (
      <>
        <input type="checkbox" id="nav-toggle" defaultChecked />
        <Nav active="users" />
        <div className="main-content">
          <Header />
          <main>
            <div className="recent-grid-left">
              <div className="projects">
                <div className="card">
                  <div className="card-header card-header-payment">
                    <h3 className="class_payment_header">Registered Users</h3>
                    <div className="">
                      <Link to="/register">
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{ marginRight: 10 }}
                        >
                          <span
                            style={{ fontSize: "17.5px", marginRight: "10px" }}
                          >
                            <i className="las la-plus"></i>
                          </span>
                          Add
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    <table width="100%">
                      <thead>
                        <tr>
                          <td>Name</td>
                          <td>Contact</td>
                          <td>Role</td>
                          <td></td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.length === 0 ? (
                          <tr>
                            <td>No User Added</td>
                          </tr>
                        ) : (
                          this.state.users.map((v, i) => {
                            return (
                              <>
                                <tr key={i}>
                                  <td>{v.user_surname}</td>
                                  <td>{v.user_phone_number}</td>
                                  <td>{v.user_role}</td>
                                  <td>
                                    <div>
                                      <Link to="/user_details">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                        >
                                          <span
                                            style={{
                                              fontSize: "10px",
                                              marginInline: "3px",
                                            }}
                                          ></span>
                                          Details
                                        </Button>
                                      </Link>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            );
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

export default Users;

const styles = {
  input_ctr: {
    width: "90%",
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
