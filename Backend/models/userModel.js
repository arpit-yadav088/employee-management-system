const db = require("../config/db");

const createUser = (name, email, hashedPassword, callback) => {

  const sql = `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, email, hashedPassword], callback);
};

const findUserByEmail = async (email) => {
  const sql = "SELECT * FROM users WHERE email = ?";
   const [rows] = await db.query(sql, [email]);
   return rows;
}

module.exports = {
  createUser,
  findUserByEmail,
};