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


const addEmployee = (req,res) => {
  const {name, email, phone, department, salary} = req.body;

  if ( !name || !email || !phone || !department || !salary ) {
  return res.status(400).json({
    success: false,
    message: "All fields are required",
  });
}

createEmployee(name, email, phone, department, salary, (error, result) => {

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
}

return res.status(201).json({
    success: true,
    message: "Employee Added Successfully",
  });
}
)
}


const  getEmployees = (req, res) => {
  getAllEmployees((error, results) => {
    
    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    };

    return res.status(200).json({
      success: true,
      count: results.length,
      employees: results,
    });
  });
};



const getEmployee =(req, res) => {
  const { id } = req.params;

  getEmployeeById(id, (error, results) => {
    if(error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    };

    if(results.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Employee Not Found",
        });
    };
    return res.status(200).json({
      success: true,
      message: results[0],
    });
  });
};



const editEmployee = (req, res) => {

  const { id } = req.params;

  const { name, email, phone, department, salary,
  } = req.body;

  if (!name || !email || !phone || !department || !salary) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  updateEmployee(
    id,
    name,
    email,
    phone,
    department,
    salary,
    (error, result) => {

      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

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

    }
  );

};


const removeEmployee = (req, res) => {
  const { id } = req.params;

  deleteEmployee(id, (error, result) => {

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

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
  });
};


const searchEmployee = (req, res) => {
  const { search } = req.query;

  if(!search) {
    return res.status(400).json({
      success: false,
      message: "Search keyword is requird",
    });
  };

  searchEmployees(search, (error, results) => {

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      employees: results,
    });
  });
};


const getEmployeesPagination = (req, res) => {
  let { page, limit } = req.query;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  const offset = (page - 1) * limit;

  getTotalEmployees((error, totalResult) => {

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    const totalEmployees = totalResult[0].total;
    const totalPages = Math.ceil(totalEmployees / limit);

    getEmployeesWithPagination(limit, offset, (error, results) => {

      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(200).json({
        success: true,
        page,
        limit,
        totalEmployees,
        totalPages,
        employees: results,
      });
    });
  });
};

const getSortedEmployees = (req, res) => {
  let { field, order} = req.query;

  field = field || "created_at";
  order = order || "DESC";

  const allowedFields = [
    "name",
    "email",
    "department",
    "salary",
    "created_at",
    ]
    const allowedOrders = ["ASC", "DESC"];

    if (!allowedFields.includes(field)) {
      return res.status(400).json({
        success: false,
        message: "invlaid sort field",
      });
    }
    order = order.toUpperCase();

    if(!allowedOrders.includes(order)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort order",
      });
    }

    sortEmployees(field, order, (error, results) => {
      
      if(error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(200).json({
        success: true,
        count: results.length,
        employees: results,
      });
    });
};


const getEmployeesByDepartment = (req, res) => {
  const { department } = req.query;

  if (!department) {
    return res.status(400).json({
      success: false,
      message: "Department is required",
    });
  }

  filterEmployeesByDepartment(department, (error, results) => {

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      count: results.length,
      employees: results,
    });
  });
};


module.exports = { addEmployee, getEmployees, getEmployee, editEmployee, removeEmployee, searchEmployee, getEmployeesPagination, getSortedEmployees, getEmployeesByDepartment, };

