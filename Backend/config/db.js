const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

(async () => {
  try {
    const connection = await this.pool.getConnection();
    console.log("Database Connected Successfully");
    connection.release();
  } catch (error) {
    console.log("Database Connection Failed");
    console.log(error.message);   
  }
})

module.exports = connection;

