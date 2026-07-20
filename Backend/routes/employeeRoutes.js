const express = require("express");
const { addEmployee, getEmployees, getEmployee, editEmployee, removeEmployee, searchEmployee, getEmployeesPagination,
 } = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addEmployee);
router.get("/search", authMiddleware, searchEmployee);
router.get("/pagination", authMiddleware, getEmployeesPagination);
router.get("/:id", authMiddleware, getEmployee);
router.get("/", authMiddleware, getEmployees);
router.put("/:id", authMiddleware, editEmployee);
router.delete("/:id", authMiddleware, removeEmployee);

module.exports = router;