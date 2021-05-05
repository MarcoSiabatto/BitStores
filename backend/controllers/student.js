let Student = require("../models/student");

const registerStudent = (req, res) => {
  let params = req.body;
  let student = new Student();
  student.names = params.names;
  student.code = params.code;
  student.email = params.email;
  student.points = params.points;

  student.save((err, studentData) => {
    if (studentData) {
      res.status(200).send({ client: studentData });
    } else {
      res.status(500).send(err);
    }
  });
};

const listStudent = (req, res) => {
  Student.find((err, studentData) => {
    if (studentData) {
      res.status(200).send({ student: studentData });
    } else {
      res.status(403).send({ message: "No Students in the DataBase" });
    }
  });
};

const findStudent = (req, res) => {
  let id = req.params["id"];

  Student.findById(id, (err, studentData) => {
    if (studentData) {
      res.status(200).send({ student: studentData });
    }
  });
};

const editStudent = (req, res) => {
  let id = req.params["id"];
  let params = req.body;

  Student.findOneAndUpdate(
    id,
    {
      names: params.names,
      code: params.code,
      email: params.email,
      points: params.points,
    },
    (err, studentData) => {
      if (studentData) {
        res.status(200).send({ client: studentData });
      } else {
        res.status(500).send(err);
      }
    }
  );
};

const deleteStudent = (req, res) => {
  let id = req.params["id"];

  Student.findByIdAndRemove(id, (err, studentData) => {
    if (studentData) {
      res.status(200).send({ client: studentData });
    } else {
      res.status(500).send(err);
    }
  });
};

module.exports = {
  registerStudent,
  editStudent,
  listStudent,
  findStudent,
  deleteStudent,
};
