const db = require("../config/db");

const createEmployee = (
  name,
  email,
  phone,
  department,
  salary,
  callback
) => {

  const sql = `INSERT INTO employees
  (name, email, phone, department, salary)
  VALUES (?,?,?,?,?)`;
  db.query(
    sql, [name, email, phone, department, salary],callback
  );
};



const getAllEmployees = (callback) => {
   
  const sql = `SELECT * FROM employees ORDER BY created_at DESC`;

  db.query(sql, callback);
};


const getEmployeeById = (id, callback) => {

  const sql = `
    SELECT *
    FROM employees
    WHERE id = ?
    `;
    db.query(sql, [id], callback);
};


const updateEmployee = ( id, name, email, phone, department, salary, callback ) => {
  
  const sql = `UPDATE employees 
  set 
   name = ?, 
   email = ?, 
   phone = ?, 
   department = ?, 
   salary = ?
  WHERE id = ?
  `;

   db.query(
      sql,
        [name, email, phone, department, salary, id],
        callback
    );
}


const deleteEmployee = (id, callback) => {

  const sql = `
    DELETE FROM employees
    WHERE id = ?
  `;
  db.query(sql, [id], callback);
};


const searchEmployees = ( search, callback ) => {
  const sql = `SELECT *FROM employees
  WHERE 
  name LIKE ?
  OR email LIKE ?
  OR department LIKE ?
  ORDER BY created_at DESC`;

  const keyword = `%${search}%`;

  db.query(
    sql, [keyword, keyword, keyword],
    callback
  );
};


const getEmployeesWithPagination = ( limit, offset, callback ) => {

  const sql = `SELECT * FROM employees 
  ORDER BY created_at DESC
    LIMIT ? OFFSET ?`

  db.query(sql, [limit, offset], callback);
}


const getTotalEmployees = (callback) => {

  const sql = `
    SELECT COUNT(*) AS total
    FROM employees
  `;
  db.query(sql, callback);
};


const sortEmployees = (field, order, callback) => {
  const sql = `SELECT * FROM employees ORDER BY ${field} ${order}`

  db.query(sql, callback);
};

const filterEmployeesByDepartment = (department, callback) => {

  const sql = `
    SELECT *   FROM employees
    WHERE department = ?
    ORDER BY created_at DESC
  `;
  db.query(sql, [department], callback);
};

module.exports = { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, searchEmployees, getEmployeesWithPagination, getTotalEmployees, sortEmployees, filterEmployeesByDepartment, };