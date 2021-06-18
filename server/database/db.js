const mysql = require("mysql8");
const dotenv = require("dotenv");

const config = {
  host: "bywplvzc040imepwz4sc-mysql.services.clever-cloud.com",
  user: "uox2f7ue2mct8fhw",
  password: "YNAZXoQYGNT8zcnKG2Ul",
  database: "bywplvzc040imepwz4sc",
};

const conn = mysql.createConnection(config);
conn.connect((err) => {
  if (err) throw err;
  console.log("Database Connected....");
});

module.exports = conn;
