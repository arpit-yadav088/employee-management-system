const express = require("express");
const {
  getDashboardStats,
  addEmployee,
  getEmployees,
  getEmployee,
  editEmployee,
  removeEmployee,
  getSortedEmployees,
} = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/dashboard", authMiddleware, getDashboardStats);
router.post("/", authMiddleware, addEmployee);
router.get("/", authMiddleware, getEmployees);
router.get("/sort", authMiddleware, getSortedEmployees);
// router.get("/", authMiddleware, getEmployees);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, editEmployee);
router.delete("/:id", authMiddleware, removeEmployee);

module.exports = router;
