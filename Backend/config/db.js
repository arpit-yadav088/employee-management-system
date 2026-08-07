const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  ssl: {
    ca: fs.readFileSync(path.join(__dirname, "isrgrootx1.pem"), "utf8"),
  },
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Database Connected Successfully");
    conn.release();
  } catch (error) {
    console.error("Database Connection Failed");
    console.error(error.message);
  }
})();

module.exports = pool;

