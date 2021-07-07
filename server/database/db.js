const mysql = require("mysql8");

const config = {
  host: "35.226.114.255",
  user: "dreamscom",
  password: "dreamscom@256",
  database: "hospital_db_secure",
  // socketPath: "/cloudsql/hospitalsystem-318608:us-central1:hospitalsystem",
};

const conn = mysql.createConnection(config);
conn.connect((err) => {
  if (err) throw err;
  console.log("Database Connected....");
});

module.exports = conn;
