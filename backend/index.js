// Module variables (global)
let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
// Connection port for server
/* Port must be between 3000 and 5000 for express backend */
let port = process.env.PORT || 3001;
// App variable
let app = express();
// Establish server connection
app.listen(port, () => {
  console.log("Backend Server Running on Port # " + port);
});

// Routes
let User = require("./routes/user");
let Category = require("./routes/category");
let Course = require("./routes/course");
let Student = require("./routes/student");
let Purchase = require("./routes/purchase");

// Database connection
mongoose
  .connect("mongodb://localhost:27017/bitstoredb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connection to MongoDB: ON"))
  .catch((err) => console.log("Connection to MongoDB: OFF"));
// Analyze the URL's
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Content-Type: application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

// Use routes API's
app.use("/api", User);
app.use("/api", Category);
app.use("/api", Course);
app.use("/api", Student);
app.use("/api", Purchase);

// Create file import module
module.exports = app;
