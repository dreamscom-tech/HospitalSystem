const router = require("express").Router();
const conn = require("../database/db");

function num(l) {
  var rc = "ABCDEF1234";
  var r = "";
  for (var i = 0; i < l; i++) {
    r += rc.charAt(Math.floor(Math.random() * rc.length));
  }
  let date = new Date();
  return (
    (date.getDate() < 10
      ? "0" + date.getDate().toString()
      : date.getDate().toString()) +
    (date.getMonth() < 10
      ? "0" + (date.getMonth() + 1).toString()
      : (date.getMonth() + 1).toString()) +
    r
  );
}

router.post("/login", async (req, res) => {
  conn.query(
    `SELECT * FROM system_users WHERE user_username = ? AND user_password = ?`,
    [req.body.username, req.body.password],
    (err, result) => {
      if (err) {
        res.send({ status: false });
      } else {
        result.length == 0
          ? res.send({ status: false })
          : res.send({ status: true, user: result[0] });
      }
    }
  );
});

router.post("/new_test", async (req, res) => {
  let { test_name, amount } = req.body;

  conn.query(
    `SELECT * FROM tests_tbl WHERE test_name=?`,
    [test_name],
    (error, results) => {
      if (error) {
        console.log(error);
        res.send({ status: false });
      } else {
        results.length > 0
          ? res.send({ data: "Test Exists", status: false })
          : conn.query(
              `INSERT INTO tests_tbl SET ?`,
              {
                test_name: test_name,
                test_amount: parseFloat(amount),
              },
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.send({ status: false, data: "Error Occured. Try Again" });
                } else {
                  res.send({ data: "Test Added Successfully", status: true });
                }
              }
            );
      }
    }
  );
});

router.post("/new_department", async (req, res) => {
  let { depart_name } = req.body;
  conn.query(
    `SELECT * FROM department_tbl WHERE department_name=?`,
    [depart_name],
    (err1, res1) => {
      if (err1) {
        console.log(err1);
        res.send({ data: "An Error Occured", status: false });
      } else {
        res1.length > 0
          ? res.send({ data: "Department Exists.", status: false })
          : conn.query(
              `INSERT INTO department_tbl SET ?`,
              {
                department_name: depart_name,
              },
              (err2, res2) => {
                if (err2) {
                  console.log(err2);
                  res.send({
                    data: "Error Occured.",
                    status: false,
                  });
                } else {
                  res.send({
                    data: "Department Added Successfully",
                    status: true,
                  });
                }
              }
            );
      }
    }
  );
});

router.post("/new_user", async (req, res) => {
  let {
    surname,
    other_name,
    username,
    gender,
    phone_contact,
    email_address,
    role,
    department,
    password,
    confirm_password,
  } = req.body;
  conn.query(
    `SELECT * FROM system_users WHERE user_username = ?`,
    [username],
    (err1, res1) => {
      if (err1) {
        console.log(err1);
        res.send({ data: "An Error Occurred", status: false });
      } else {
        if (res1.length > 0) {
          res.send({ data: "Username Already Taken", status: false });
        } else {
          if (password !== confirm_password) {
            res.send({ data: "Passwords Do not Match", status: false });
          } else {
            if (password.length < 5) {
              res.send({
                data: "Password Should be atleast 5 characters",
                status: false,
              });
            } else {
              conn.query(
                `INSERT INTO system_users SET ?`,
                {
                  user_surname: surname,
                  user_other_name: other_name,
                  user_phone_number: phone_contact,
                  user_username: username,
                  user_email: email_address,
                  user_role: role,
                  user_department_id: parseInt(department),
                  user_gender: gender,
                  user_number: num(3),
                  user_password: password,
                },
                (err2, res2) => {
                  if (err2) {
                    console.log(err2);
                    res.send({ status: false });
                  } else {
                    res.send({ data: "User Added Successfully", status: true });
                  }
                }
              );
            }
          }
        }
      }
    }
  );
});

router.post("/new_address", async (req, res) => {
  let { id, name, address } = req.body;
  if (address === "1") {
    conn.query(
      `SELECT * FROM districts_tbl WHERE district_name = ?`,
      [name],
      (err1, res1) => {
        if (err1) {
          console.log(err1);
          res.send({ data: "An Error Occured", status: false });
        } else {
          if (res1.length > 0) {
            res.send({ data: "District Exists", status: false });
          } else {
            conn.query(
              `INSERT INTO districts_tbl SET ?`,
              {
                district_name: name,
              },
              (err2, res2) => {
                if (err2) {
                  console.log(err2);
                  res.send({ data: "Error Occured", status: false });
                } else {
                  res.send({
                    data: "District Added Successfully",
                    status: true,
                  });
                }
              }
            );
          }
        }
      }
    );
  } else if (address === "2") {
    conn.query(
      `SELECT * FROM sub_county_tbl WHERE sub_county_name = ?`,
      [name],
      (err0, res0) => {
        if (err0) {
          console.log(err0);
          res.send({ data: "Error Occured", status: false });
        } else {
          if (res0.length > 0) {
            res.send({ data: "Sub County Exits", status: false });
          } else {
            conn.query(
              `INSERT INTO sub_county_tbl SET ?`,
              {
                sub_county_name: name,
                district_id: parseInt(id),
              },
              (err3, res3) => {
                if (err3) {
                  console.log(err3);
                  res.send({ data: "Error Occured", status: false });
                } else {
                  res.send({ data: "Sub County Added", status: true });
                }
              }
            );
          }
        }
      }
    );
  } else if (address === "3") {
    conn.query(
      `SELECT * FROM parish_tbl WHERE parish_name=?`,
      [name],
      (err4, res4) => {
        if (err4) {
          console.log(err4);
          res.send({ data: "Error Occurred", status: false });
        } else {
          if (res4.length > 0) {
            res.send({ data: "Parish Exists", status: false });
          } else {
            conn.query(
              `INSERT INTO parish_tbl SET ?`,
              {
                parish_name: name,
                sub_county_id: parseInt(id),
              },
              (err_insert, res_insert) => {
                if (err_insert) {
                  console.log(err_insert);
                  res.send({ data: "Error Occured", status: false });
                } else {
                  res.send({ data: "Parish Added", status: true });
                }
              }
            );
          }
        }
      }
    );
  } else if (address === "4") {
    conn.query(
      `SELECT * FROM village_tbl WHERE village_name=?`,
      [name],
      (err4, res4) => {
        if (err4) {
          console.log(err4);
          res.send({ data: "Error Occurred", status: false });
        } else {
          if (res4.length > 0) {
            res.send({ data: "Village Exists", status: false });
          } else {
            conn.query(
              `INSERT INTO village_tbl SET ?`,
              {
                village_name: name,
                parish_id: parseInt(id),
              },
              (err_insert, res_insert) => {
                if (err_insert) {
                  console.log(err_insert);
                  res.send({ data: "Error Occured", status: false });
                } else {
                  res.send({ data: "Village Added", status: true });
                }
              }
            );
          }
        }
      }
    );
  }
});

module.exports = router;
