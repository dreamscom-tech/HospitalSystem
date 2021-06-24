const router = require("express").Router();
const conn = require("../database/db");

router.get("/pnumber", (req, res) => {
  conn.query(
    "SELECT patient_number FROM patients_tbl ORDER BY patient_id DESC LIMIT 1",
    (err, sql_res) => {
      if (err) {
        console.log(err);
      } else {
        let last_id =
          sql_res.length > 0
            ? parseInt(sql_res[0].patient_number.substr(6)) + 1
            : 1;
        let id =
          last_id < 10
            ? "00" + last_id.toString()
            : last_id < 100
            ? "0" + last_id.toString()
            : last_id.toString();
        res.send({ status: true, _pnumber: getPatientNumber(id) });
        function getPatientNumber(id) {
          let date = new Date();
          return (
            (date.getDate() < 10
              ? "0" + date.getDate().toString()
              : date.getDate().toString()) +
            "/" +
            (date.getMonth() < 10
              ? "0" + (date.getMonth() + 1).toString()
              : (date.getMonth() + 1).toString()) +
            "/" +
            id
          );
        }
      }
    }
  );
});

router.post("/new_patient", async (req, res) => {
  let {
    patient_number,
    surname,
    other_names,
    dob,
    age,
    gender,
    phone_contact,
    email_address,
    pt_occupation,
    education_level,
    marital_status,
    religion,
    tribe,
    village,
    user,
    nk_surname,
    nk_first_name,
    nk_relationship,
    nk_address,
    nk_telephone,
    nk_occupation,
  } = req.body;

  conn.query(
    `INSERT INTO patients_tbl SET ?`,
    {
      first_name: other_names,
      surname: surname,
      phone_number: phone_contact,
      DOB: dob,
      age: age,
      gender: gender,
      patient_email: email_address,
      marital_status: marital_status,
      occupation: pt_occupation,
      education_level: education_level,
      religion: religion,
      tribe: tribe,
      village_id: parseInt(village),
      user: user,
      patient_number: patient_number,
      date: new Date(),
    },
    (err2, res2) => {
      if (err2) {
        console.log(err2);
        res.send({
          data: "An Error Occurred. Try Again",
          status: false,
        });
      } else {
        conn.query(
          `INSERT INTO next_of_kin_tbl SET ?`,
          {
            next_of_kin_first_name: nk_first_name,
            next_of_kin_surname: nk_surname,
            next_of_kin_relationship: nk_relationship,
            next_of_kin_address: nk_address,
            next_of_kin_occupation: nk_occupation,
            next_of_kin_phone: nk_telephone,
            patient_id: patient_number,
          },
          (err3, res3) => {
            if (err3) {
              console.log(err3);
              res.send({
                data: "An Error Occurred. Try Again",
                status: false,
              });
            } else {
              res.send({
                data: "Patient Added Successfully",
                status: true,
              });
            }
          }
        );
      }
    }
  );
});

router.post("/new_patient_unit", async (req, res) => {
  let {
    muac,
    height,
    weight,
    bmi,
    user,
    blood_pressure,
    blood_sugar,
    palliative_care,
    patient_classification,
    social_history,
    patient_number,
  } = req.body;

  conn.query(
    `SELECT patient_id FROM patients_tbl WHERE patient_number = ?`,
    [patient_number],
    (err0, res0) => {
      if (err0) {
        console.log(err0);
        res.send({ data: "An Error Occured", status: false });
      } else {
        conn.query(
          "INSERT INTO patient_units SET ?",
          {
            patient_id: parseInt(res0[0].patient_id),
            user_id: user,
            muac: muac,
            weight: weight,
            height: height,
            bmi: bmi,
            blood_pressure: blood_pressure,
            blood_sugar: blood_sugar,
            palliative_care: palliative_care,
            patient_classification: patient_classification,
            social_history: JSON.stringify(social_history),
            created_at: new Date(),
          },
          (err1, res1) => {
            if (err1) {
              console.log(err1);
              res.send({ data: "An Error Occurred. Try Again", status: false });
            } else {
              res.send({ data: "Patient Units Added", status: true });
            }
          }
        );
      }
    }
  );
});
router.post("/new_doctor_referral", async (req, res) => {
  let { patient, user, doctor, reason } = req.body;
  conn.query(
    `INSERT INTO referrals_tbl SET ?`,
    {
      user_id: user,
      patient_id: patient,
      refer_to: doctor,
      reason_for: reason,
      refer_date: new Date(),
    },
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ data: "An Error Occured.Try Again", status: false });
      } else {
        res.send({ data: "Patient Assign Added", status: true });
      }
    }
  );
});

module.exports = router;
