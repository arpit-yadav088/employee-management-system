const db = require("../config/db");

const createEmployee = async (
  name,
  email,
  phone,
  department,
  salary
) => {

  const sql = `INSERT INTO employees
  (name, email, phone, department, salary)
  VALUES (?,?,?,?,?)`;
  const [result] = await db.query(
    sql, [name, email, phone, department, salary]
  );
  return result;
};



const getAllEmployees = async () => {
   
  const sql = `SELECT * FROM employees ORDER BY created_at DESC`;

  const [rows] = await db.query(sql);
  return rows;
};


const getEmployeeById = async (id) => {

  const sql = `
    SELECT *
    FROM employees
    WHERE id = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
};


const updateEmployee = async ( id, name, email, phone, department, salary ) => {
  
  const sql = `UPDATE employees 
  set 
   name = ?, 
   email = ?, 
   phone = ?, 
   department = ?, 
   salary = ?
  WHERE id = ?
  `;

   const [result] = await db.query( sql, [name, email, phone, department, salary, id]
    );

    return result;
};


const deleteEmployee = async (id) => {

  const sql = `
    DELETE FROM employees
    WHERE id = ?
  `;
  const [result] = await db.query(sql, [id]);

  return result;
};


const searchEmployees = async ( search ) => {
  const sql = `SELECT *FROM employees
  WHERE 
  name LIKE ?
  OR email LIKE ?
  OR department LIKE ?
  ORDER BY created_at DESC`;

  const keyword = `%${search}%`;

  const [rows] = await db.query(
    sql, [keyword, keyword, keyword],
  );

  return rows;
};


const getEmployeesWithPagination = async ( limit, offset ) => {

  const sql = `SELECT * FROM employees 
  ORDER BY created_at DESC
    LIMIT ? OFFSET ?`

  const [rows] = await db.query(sql, [limit, offset]);
  return rows;
}


const getTotalEmployees = async() => {

  const sql = `
    SELECT COUNT(*) AS total
    FROM employees
  `;
  const [rows] = await db.query(sql);

  return rows;
};


const sortEmployees = async (field, order) => {

  const sql = `
    SELECT *
    FROM employees
    ORDER BY ${field} ${order}
  `;

  const [rows] = await db.query(sql);
  return rows;
};


const filterEmployeesByDepartment = async (department) => {

  const sql = `
    SELECT *   FROM employees
    WHERE department = ?
    ORDER BY created_at DESC
  `;
  const [rows] = await db.query(sql, [department]);
  return rows;
};

module.exports = { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, searchEmployees, getEmployeesWithPagination, getTotalEmployees, sortEmployees, filterEmployeesByDepartment, };