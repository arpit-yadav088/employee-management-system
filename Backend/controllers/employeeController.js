const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
  getEmployeesWithPagination,
  getTotalEmployees,
  sortEmployees,
  filterEmployeesByDepartment,
} = require("../models/employeeModel");

const addEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, salary } = req.body;

    if (!name || !email || !phone || !department || !salary) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    await createEmployee(name, email, phone, department, salary);

    return res.status(201).json({
      success: true,
      message: "Employee Added Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmployees = async (req, res) => {
  try {
    let { page = 1, limit = 5, search = "", department = "" } = req.query;

    page = Number(page);
    limit = Number(limit);

    const offset = (page - 1) * limit;

    const result = await getAllEmployees(
      page,
      limit,
      offset,
      search.trim(),
      department.trim()
    );

    return res.status(200).json({
      success: true,
      employees: result.employees,
      totalEmployees: result.totalEmployees,
      totalPages: result.totalPages,
      currentPage: page,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await getEmployeeById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, phone, department, salary } = req.body;

    if (!name || !email || !phone || !department || !salary) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const result = await updateEmployee(
      id,
      name,
      email,
      phone,
      department,
      salary,
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const removeEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteEmployee(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const searchEmployee = async (req, res) => {
  try {
    const { search } = req.query;

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search keyword is required",
      });
    }

    const employees = await searchEmployees(search);

    return res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmployeesPagination = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;

    const offset = (page - 1) * limit;

    const totalResult = await getTotalEmployees();

    const totalEmployees = totalResult[0].total;
    const totalPages = Math.ceil(totalEmployees / limit);

    const employees = await getEmployeesWithPagination(limit, offset);

    return res.status(200).json({
      success: true,
      page,
      limit,
      totalEmployees,
      totalPages,
      employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSortedEmployees = async (req, res) => {
  try {
    let { field, order } = req.query;

    field = field || "created_at";
    order = order || "DESC";

    const allowedFields = [
      "name",
      "email",
      "department",
      "salary",
      "created_at",
    ];

    const allowedOrders = ["ASC", "DESC"];

    if (!allowedFields.includes(field)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort field",
      });
    }

    order = order.toUpperCase();

    if (!allowedOrders.includes(order)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort order",
      });
    }

    const employees = await sortEmployees(field, order);

    return res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getEmployeesByDepartment = async (req, res) => {
  try {
    const { department } = req.query;

    if (!department) {
      return res.status(400).json({
        success: false,
        message: "Department is required",
      });
    }

    const employees = await filterEmployeesByDepartment(department);

    return res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const result = await getAllEmployees(
      1,                  // page
      1000000,            // limit (sab employees lane ke liye)
      0,                  // offset
      "",                 // search
      ""                  // department
    );

    const employees = result.employees;

    const totalEmployees = employees.length;

    const totalDepartments = [
      ...new Set(employees.map((emp) => emp.department)),
    ].length;

    const totalSalary = employees.reduce(
      (sum, emp) => sum + Number(emp.salary),
      0
    );

    return res.status(200).json({
      success: true,
      stats: {
        totalEmployees,
        totalDepartments,
        totalSalary,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  getEmployee,
  editEmployee,
  removeEmployee,
  searchEmployee,
  getEmployeesPagination,
  getSortedEmployees,
  getEmployeesByDepartment,
  getDashboardStats,
};
