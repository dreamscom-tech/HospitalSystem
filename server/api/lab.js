const router = require("express").Router();
const conn = require("../database/db");

router.post("/new_sample_collection", async (req, res) => {
  let { patient_number, test_reason, user, specimens, date } = req.body;
  conn.query(
    `SELECT patient_id FROM patients_tbl WHERE patient_number = ?`,
    patient_number,
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
        res.send({ data: "An Error Occured.Try Again", status: false });
      } else {
        conn.query(
          `INSERT INTO lab_sample_collection SET ?`,
          {
            user_id: user,
            patient_id: first_res[0].patient_id,
            specimens_taken: JSON.stringify(specimens),
            reason: test_reason,
            collection_date: date,
          },
          (err1, res1) => {
            if (err1) {
              console.log(err1);
              res.send({ data: "An Error Occured.Try Again", status: false });
            } else {
              res.send({ data: "Sample Collection Added.", status: true });
            }
          }
        );
      }
    }
  );
});

router.post("/new_lab_report", async (req, res) => {
  let { patient_number, tests_made, results } = req.body;
  console.log(req.body);
  conn.query(
    `INSERT INTO lab_results SET ?`,
    {
      result_description: results,
      patient_id: patient_number,
      tests_made: tests_made,
      user_id: 1,
      result_date: new Date(),
    },
    (err1, res1) => {
      if (err1) {
        console.log(err1);
        res.send({ data: "An Error Occured. Try Again", status: false });
      } else {
        res.send({ data: "Lab Results Sent", status: true });
      }
    }
  );
});

router.get("/patients_referred", (req, res) => {
  conn.query(
    `SELECT * FROM lab_requests
        JOIN patients_tbl 
        ON lab_requests.patient_id = patients_tbl.patient_id 
        WHERE lab_referred_to = ?`,
    req.query.user,
    (first_err, first_res) => {
      if (first_err) {
        console.log(first_err);
      } else {
        res.send(first_res);
      }
    }
  );
});
module.exports = router;
