const bcrypt = require("bcrypt");
const { createUser, findUserByEmail } = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const register = (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  findUserByEmail(email, (error, results) => {

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    bcrypt.hash(password, 10, (error, hashedPassword) => {

  if (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

    createUser(name, email, hashedPassword, (error, result) => {

      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }

      return res.status(201).json({
        success: true,
        message: "User Registered Successfully",
      });

    });

  });
  });
};



const login = (req, res) => {
  const {email, password} = req.body;

  if(!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required",
    });
  };

  findUserByEmail(email, (error, results) =>{
    if(error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    };
    if( results.length === 0 ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
      });
    };

    const user = results[0];

    bcrypt.compare(password, user.password, (error, isMatch) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      };
      if(!isMatch){
        return res.status(400).json({
          success: false,
          message: "Invalid Email or Password",
        });
      };
      const token = generateToken(user.id);

      return res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
      })
    })
  })
}

module.exports = { register, login, };