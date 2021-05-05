// Import course model
let Course = require("../models/course");
// Import node module for File control
let fs = require("fs");
// Import path module for url paths
let path = require("path");
// Import moment for date timestamp
let moment = require("moment");

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
    params.subTotal &&
    params.purTotal &&
    params.slots &&
    params.idCategory &&
    params.points
  ) {
    // Create variable for loaded image
    let imgPath = req.files.image.path;
    // Create variable for date consecutive to name img's
    let imgName = moment().unix();
    // Create variable for new route
    let serverRoute = "./uploads/imgcourse/" + imgName + path.extname(imgPath);
    // Copy the img to new route
    fs.createReadStream(imgPath).pipe(fs.createWriteStream(serverRoute));
    // Create a variable to save complete file name
    let dbImg = imgName + path.extname(imgPath);

    // Send request data to the model
    course.names = params.names;
    course.description = params.description;
    course.image = dbImg;
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
          res.status(401).send({ message: "Course could not be registered" });
        }
      }
    });
  } else {
    res.status(401).send({ message: "You are missing fields!" });
  }
};

// List all courses
const listCourse = (req, res) => {
  // Filter by names
  let names = req.params["names"];
  // Search through courses
  Course.find({ names: new RegExp(names, "i") }).populate("idCategory").exec( (err, courseData) => {
    // If error when connecting to DB
    if (err) {
      res.status(500).send({ message: "Error connecting to the server" });
    } else {
      if (courseData) {
        res.status(200).send({ course: courseData });
      } else {
        res
          .status(401)
          .send({ message: "No courses to display" });
      }
    }
  });
};

// Obtain course

const getCourse = (req, res) => {
  console.log(req);
  let id = req.params["id"];

  Course.findOne({ _id: id }, (err, courseData) => {
    if (err) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (courseData) {
        res.status(200).send({ course: courseData });
      } else {
        res.status(403).send({ message: "Course does not exist" });
      }
    }
  });
};

// Editar curso

const editCourse = (req, res) => {
  let params = req.body;
  let id = req.params["id"];
  let img = req.params["img"];

  if (
    params.names &&
    params.description &&
    params.subTotal &&
    params.purTotal &&
    params.slots &&
    params.idCategory &&
    params.points
  ) {
    if (img || img != null || img != undefined) {
      fs.unlink("./uploads/imgcourse/" + img, (err) => {
        if (err) throw err;
      });
    }

    // Ruta donde quedara la imagen en el proyecto
    let imgPath = req.files.image.path;
    // Generamos un codigo para las imagenes
    let imgName = moment().unix();
    // creamos variable de la nueva ruta
    var serverRoute =
      "./uploads/imgcourse/" + imgName + path.extname(imgPath);
    // copiamos la imagen a la nueva ruta
    fs.createReadStream(imgPath).pipe(fs.createWriteStream(serverRoute));
    // Nombre del archivo que quedara en BD
    let dbImg = imgName + path.extname(imgPath);
    console.log(params);
    console.log(id);
    console.log(img);
    console.log(dbImg);
    Course.findByIdAndUpdate(
      { _id: id },
      {
        names: params.names,
        description: params.description,
        image: dbImg,
        subTotal: params.subTotal,
        purTotal: params.purTotal,
        slots: params.slots,
        idCategory: params.idCategory,
        points: params.points,
      },
      (err, courseData) => {
        console.log(courseData)
        if (err) {
          res.status(500).send({ message: "Server error" });
        } else {
          if (courseData) {
            res.status(200).send({ course: courseData });
          } else {
            res.status(403).send({ message: "Could not edit course" });
          }
        }
      }
    );
  } else {
    res.status(401).send({ message: "Missing fields!" });
  }
};

// Eliminamos curso
const deleteCourse = (req, res) => {
  let id = req.params["id"];

  Course.findOneAndRemove({ _id: id }, (err, courseData) => {
    if (err) {
      res.status(500).send({ message: "Server error" });
    } else {
      if (courseData) {
        fs.unlink("./uploads/imgcourse/" + courseData.image, (err) => {
          if (err) throw err;
        });
        res.status(200).send({ course: courseData });
      } else {
        res.status(403).send({ message: "Could not delete a registry" });
      }
    }
  });
};
// Export modules
module.exports = {
  registerCourse,
  listCourse,
  getCourse,
  editCourse,
  deleteCourse,
};
