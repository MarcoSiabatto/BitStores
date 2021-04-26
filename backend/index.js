// Module variables (global)
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
// Connection port for server
let port =
  process.env.PORT || 3001; /* between 3000 and 5000 for express backend */
// App variable
let app = express();

// Routes
let User = require("./routes/user")

// Database connection
mongoose.connect("mongodb://localhost:27017/bitstoredb", {useUnifiedTopology:true, useNewUrlParser: true}, (err, res) => {
    if (err) {
    console.log(err);
    throw err;
    } else {
    console.log("DB Server: ON");
    app.listen(port, function () {
        console.log("Backend Server Running on Port # " + port);
    });
    }
});

// Analyze the URL's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// Use routes API's
app.use("/api", User)

// Create file import module
module.exports = app;
