const db = require("../config/db");

const createUser = async(name, email, hashedPassword) => {
  const sql = `
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
  `;

  const [results] = await db.query(sql, [name, email, hashedPassword]);
  return results;
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

const deleteEmployee = async (id) => {
  const sql = "DELETE FROM employees WHERE id = ?";

  const [result] = await db.query(sql, [id]);
  return result;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  deleteEmployee,
};
