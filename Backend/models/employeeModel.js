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

module.exports = { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, }

