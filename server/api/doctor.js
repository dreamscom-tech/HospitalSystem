const router = require("express").Router();
const conn = require("../database/db");

router.post("/new_clinical_info", async (req, res) => {
  let { patient_number, clinical_notes, therapy, user } = req.body;
  conn.query(
    `SELECT patient_id FROM patients_tbl WHERE patient_number = ?`,
    patient_number,
    (first_err, first_result) => {
      if (first_err) {
        throw first_err;
      } else {
        conn.query(
          `INSERT INTO clinical_tbl SET ?`,
          {
            patient_id: first_result[0].patient_id,
            clinical_notes: clinical_notes,
            therapy: therapy,
            user_id: user,
            date: new Date(),
          },
          (err1, res1) => {
            if (err1) {
              console.log(err1);
              res.send({ data: "An Error Occured. Try Again", status: false });
            } else {
              res.send({ data: "Clinical Notes Added.", status: true });
            }
          }
        );
      }
    }
  );
});

router.post("/new_diagnosis", async (req, res) => {
  let { patient_number, diagnosis, treatment_notes } = req.body;
  conn.query(
    `INSERT INTO diagnosis_tbl SET ?`,
    {
      patient_id: patient_number,
      treatment_notes: treatment_notes,
      diagnosis: diagnosis,
      user_id: 1,
      diagnosis_date: new Date(),
    },
    (err1, res1) => {
      if (err1) {
        console.log(err1);
        res.send({ data: "An Error Occured. Try Again", status: false });
      } else {
        res.send({ data: "Diagnosis Added.", status: true });
      }
    }
  );
});

router.post("/new_lab_request", async (req, res) => {
  let { patient_number, tests_required, user } = req.body;
  conn.query(
    `SELECT patient_id FROM patients_tbl WHERE patient_number = ?`,
    [patient_number],
    (err_first, res_first) => {
      if (err_first) {
        console.log(err_first);
        res.send({ data: "An Error Occurred. Try Again", status: false });
      } else {
        let tests = [];
        tests_required.forEach((e) => {
          tests.push({ test: e.test_id });
        });
        conn.query(
          `INSERT INTO lab_requests SET ?`,
          {
            patient_id: res_first[0].patient_id,
            test_required: JSON.stringify(tests),
            user_id: user,
            request_date: new Date(),
          },
          (err1, res1) => {
            if (err1) {
              console.log(err1);
              res.send({ data: "An Error Occured. Try Again", status: false });
            } else {
              res.send({ data: "Lab Request Sent", status: true });
            }
          }
        );
      }
    }
  );
});

router.post("/new_referral", async (req, res) => {
  let { patient_number, refer_to, reason } = req.body;
  conn.query(
    `INSERT INTO referrals_tbl SET ?`,
    {
      patient_id: patient_number,
      refer_to: refer_to,
      reason_for: reason,
      user_id: 1,
      refer_date: new Date(),
    },
    (err1, res1) => {
      if (err1) {
        console.log(err1);
        res.send({ data: "An Error Occured. Try Again", status: false });
      } else {
        res.send({ data: "Referral Submitted", status: true });
      }
    }
  );
});

router.get("/referrals/patients_clinical_info", async (req, res) => {
  conn.query(
    `SELECT * FROM clinical_tbl JOIN patients_tbl ON clinical_tbl.patient_id =
    patients_tbl.patient_id WHERE clinical_tbl.user_id = ?`,
    [req.query.doctor],
    (first_err, first_result) => {
      if (first_err) {
        throw first_err;
      } else {
        conn.query(
          `SELECT * FROM referrals_tbl JOIN patients_tbl ON referrals_tbl.patient_id =
    patients_tbl.patient_id JOIN system_users ON system_users.user_id=referrals_tbl.refer_to
    WHERE referrals_tbl.refer_to = ?`,
          [req.query.doctor],
          (next_err, next_result) => {
            if (next_err) {
              throw next_err;
            } else {
              let patients_without_clinical_info = [];
              next_result.forEach((e) => {
                let patient_exits = first_result.find(
                  (patient) => patient.patient_id === e.patient_id
                );
                if (!patient_exits) {
                  patients_without_clinical_info.push(e);
                }
              });
              res.send(patients_without_clinical_info);
            }
          }
        );
      }
    }
  );
});

module.exports = router;

router.get("/lab/patients_clinical_info", async (req, res) => {
  conn.query(
    `SELECT * FROM clinical_tbl JOIN patients_tbl ON clinical_tbl.patient_id =
    patients_tbl.patient_id WHERE clinical_tbl.user_id = ?`,
    [req.query.doctor],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        res.send(result);
      }
    }
  );
});

module.exports = router;
