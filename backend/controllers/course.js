// Import course model
let Course = require("../models/course");

// Register a new course
const registerCourse = (req, res) => {
  // Obtain data incoming from JSON file
let params = req.body;
  // Instance course model
let course = new Course();
  // Validate fields before registering
if (
    params.names &&
    params.description &&
    params.image &&
    params.subTotal &&
    params.purTotal &&
    params.slots &&
    params.idCategory &&
    params.points
) {
    // Send request data to the model
    course.names = params.names;
    course.description = params.description;
    course.image = params.image;
    course.subTotal = params.subTotal;
    course.purTotal = params.purTotal;
    course.slots = params.slots;
    course.idCategory = params.idCategory;
    course.points = params.points;
    // Register the new course
    course.save((err, courseData) => {
    if (err) {
        res.status(500).send({ message: "Error connecting to the server" });
    } else {
        if (courseData) {
        res.status(200).send({ course: courseData });
        } else {
        res.status(401).send({ message: "Category could not be registered" });
        }
    }
    });
} else {
    res.status(401).send({message: "You are missing fields!"})
}
};
// Export modules
module.exports = {
registerCourse,
};
