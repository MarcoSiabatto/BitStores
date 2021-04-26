// Variable to import JWT
let jwt = require("jwt-simple");
// Import date library
let moment = require("moment");
// Secret passcode to use in development
let secret = "bitStore96";

exports.createToken = function(user){
    let payload = {
        _id: user._id,
        names: user.names, 
        lastName: user.lastName,
        age: user.age,
        email: user.email,
        iat: moment().unix(),
    }
    return jwt.encode(payload, secret);
};