const express = require("express");
const { addEmployee, getEmployees, getEmployee, editEmployee, removeEmployee,
 } = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, addEmployee);
router.get("/", authMiddleware, getEmployees);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, editEmployee);
router.delete("/:id", authMiddleware, removeEmployee);

module.exports = router;