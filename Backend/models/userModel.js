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
};

const findUserById = async (id) => {
  const sql = `
    SELECT id, name, email
    FROM users
    WHERE id = ?
  `;
  const [rows] = await db.query(sql, [id]);
  return rows;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
