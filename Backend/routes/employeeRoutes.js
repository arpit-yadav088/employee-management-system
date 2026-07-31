const express = require("express");
const {
  getDashboardStats,
  addEmployee,
  getEmployees,
  getEmployee,
  editEmployee,
  removeEmployee,
  searchEmployee,
  getEmployeesPagination,
  getSortedEmployees,
  getEmployeesByDepartment,
} = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, getDashboardStats);
router.post("/", authMiddleware, addEmployee);
router.get("/search", authMiddleware, searchEmployee);
router.get("/pagination", authMiddleware, getEmployeesPagination);
router.get("/sort", authMiddleware, getSortedEmployees);
router.get("/filter", authMiddleware, getEmployeesByDepartment);
router.get("/", authMiddleware, getEmployees);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, editEmployee);
router.delete("/:id", authMiddleware, removeEmployee);

module.exports = router;
