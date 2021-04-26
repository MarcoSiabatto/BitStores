// Variable to import user module
let User = require("../model/user");
// Declare variable to import ecnrypted password lib
let bcrypt = require("bcrypt-nodejs");
const { response } = require("express");

// Function to register a user
const registerUser = (req, res) => {
// Pull the parameters from the json Body (incoming API)
  let params = req.body;
// Use the user model (but must be clean)
  let user = new User();
// validate password in order to ecnrypt
  if (params.pass) {
// Use the bcrypt in order to encrypt the password
    bcrypt.hash(params.pass, null, null, function (err, hash) {
// If it encrypts the Hash worked
      if (hash) {
        user.names = params.names;
        user.lastName = params.lastName;
        user.age = params.age;
        user.email = params.email;
        user.pass = hash;
        user.role = params.role;
// Send the model to register with Mongo
        user.save((err, savedUser) => {
          if (err) {
//if there is an error
            res.status(500).send({ err: "The User was not registered" });
          } else {
            res.status(200).send({ user: savedUser });
          }
        });
      } else {
// Give response to the incoming ecrypt error if it happens
        res
          .status(400)
          .send({ err: "Could not encrypt password, Did not register user" });
      }
    });
  } else {
// Validate the incoming json data
    res.status(405).send({ err: "Could not save data" });
  }
};

// Login
const login = (req, res) => {
// Incoming parameter variable
  let params = req.body;
// Search for User in DB
  User.findOne({email: params.email}, (err, userData)=>{
    if (err) {
      res.status(500).send({message: "Server Error"});
    } else {
      if (userData) {
        bcrypt.compare(params.pass, userData.pass, function(err, confirm) {
          if (confirm) {
            if (params.getToken) {
              res.status(200).send({User: userData});
            } else {
              res.status(200).send({User: userData, message: "No Token"});
            }
          } else {
            res.status(401).send({message: "Email or Password incorrect"});
          }
        });
      } else {
        res.status(401).send({message: "Email or Password incorrect"});
      }
    }
  });
};

// Export module
module.exports = {
  registerUser,
  login,
};
