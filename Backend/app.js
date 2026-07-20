const express = require("express");
const authRoutes = require("./routes/authroutes");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/employees", employeeRoutes);

module.exports = app;