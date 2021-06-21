const router = require("express").Router();
const conn = require("../database/db");

router.get("/patients", async (req, res) => {
  conn.query(`SELECT * FROM patients_tbl`, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
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

module.exports = router;
