const express = require("express");
const authRoutes = require("./routes/authroutes");
const employeeRoutes = require("./routes/employeeRoutes");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/api/auth",authRoutes)
app.use("/api/employees", employeeRoutes);

module.exports = app;