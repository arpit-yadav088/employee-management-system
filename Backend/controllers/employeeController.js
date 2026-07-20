const { createEmployee, getAllEmployees, getEmployeeById, updateEmployee, deleteEmployee, } = require("../models/employeeModel");

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

module.exports = { addEmployee, getEmployees, getEmployee, editEmployee, removeEmployee, };

