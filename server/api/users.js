const router = require("express").Router();
const conn = require("../database/db");

router.get("/patients", async (req, res) => {
  conn.query(`SELECT * FROM patients_tbl`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/patient/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM patients_tbl JOIN village_tbl ON patients_tbl.patient_village_id=village_tbl.village_id
    JOIN parish_tbl ON village_tbl.parish_id=parish_tbl.parish_id JOIN sub_county_tbl ON parish_tbl.sub_county_id
    =sub_county_tbl.sub_county_id JOIN districts_tbl ON sub_county_tbl.district_id=districts_tbl.district_id
    JOIN next_of_kin_tbl ON patients_tbl.patient_number=next_of_kin_tbl.patient_id JOIN patient_units ON
    patients_tbl.patient_id=patient_units.patient_id
     WHERE patients_tbl.patient_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    }
  );
});

router.get("/patients_this_month", async (req, res) => {
  setTimeout(() => {
    res.send([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }, 4000);
});

router.get("/doctors_today", async (req, res) => {
  setTimeout(() => {
    res.send([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  }, 4000);
});

router.get("/pending_consultions", async (req, res) => {
  setTimeout(() => {
    res.send([1, 2, 3, 4]);
  }, 4000);
});

router.get("/tests", async (req, res) => {
  conn.query(`SELECT * FROM tests_tbl`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/users", async (req, res) => {
  conn.query(`SELECT * FROM system_users`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/departments", async (req, res) => {
  conn.query(`SELECT * FROM department_tbl`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/districts", async (req, res) => {
  conn.query(`SELECT * FROM districts_tbl`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

router.get("/subcounties/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM sub_county_tbl WHERE district_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/parishes/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM parish_tbl WHERE sub_county_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/villages/:id", async (req, res) => {
  conn.query(
    `SELECT * FROM village_tbl WHERE parish_id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/doctors", async (req, res) => {
  conn.query(
    `SELECT * FROM system_users WHERE user_role = 'doctor'`,
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

router.get("/referrals/:user_id", async (req, res) => {
  conn.query(
    `SELECT * FROM referrals_tbl JOIN patients_tbl ON referrals_tbl.patient_id =
  patients_tbl.patient_id JOIN system_users ON system_users.user_id=referrals_tbl.refer_to
  WHERE referrals_tbl.user_id = ?`,
    [req.params.user_id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

module.exports = router;
