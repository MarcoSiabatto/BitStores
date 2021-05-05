let Purchase = require("../models/purchase");
let DetailPurchase = require("../models/detailPurchase");
let Course = require("../models/course");

const makePurchase = (req, res) => {
  let params = req.body;
  let purchase = new Purchase();
  purchase.studentId = params.studentId;
  purchase.userId = params.userId;

  purchase.save((err, purchaseData) => {
    if (purchaseData) {
      let details = params.details;

      details.forEach((pur) => {
        let detailPurchase = new DetailPurchase();
        detailPurchase.courseId = pur.courseId;
        detailPurchase.quantity = pur.quantity;
        detailPurchase.purchaseId = purchaseData._id;

        detailPurchase.save((err, detailData) => {
          if (detailData) {
            Course.findById({ _id: pur.courseId }, (err, courseData) => {
              if (courseData) {
                Course.findByIdAndUpdate(
                  { _id: courseData._id },
                  {
                    slots: parseInt(courseData.slots) - parseInt(pur.quantity),
                  },
                  (err, courseData) => {
                    /* if (courseData) {
                        res.status(200).send({ message: "Purchase has been made successfully" });
                      } else {
                        res.status(401).send({ message: "Cannot register purchase, try again" });
                      } */
                      res.end();
                  }
                );
              } else {
                res.send(err);
              }
            });
          } else {
            res.send(err);
          }
        });
      });
    } else {
      res.send(err);
    }
  });
};

const purchaseData = (req, res) => {
  let id = req.params["id"];

  Purchase.findById(id)
    .populate("studentId")
    .populate("userId")
    .exec((err, purchaseData) => {
      if (purchaseData) {
        DetailPurchase.find({ purchase: purchaseData._id })
          .populate("courseId")
          .exec({ purchaseId: id }, (err, detailData) => {
            if (detailData) {
              res.status(200).send({
                data: {
                  purchase: purchaseData,
                  detail: detailData,
                },
              });
            }
          });
      }
    });
};

const listPurchase = (req, res) => {
  Purchase.find()
    .populate("studentId")
    .populate("userId")
    .exec((err, purchaseData) => {
      if (purchaseData) {
        res.status(200).send({ purchase: purchaseData });
      } else {
        res.status(404).send({ message: "There are no purchases to list" });
      }
    });
};

const purchaseDetails = (req, res) => {
  let id = req.params["id"];

  DetailPurchase.find({ _id: id })
    .populate("courseId")
    .exec((err, detailData) => {
      if (detailData) {
        res.status(200).send({ detail: detailData });
      } else {
        res.status(404).send({ message: "There are no purchases to list" });
      }
    });
};

module.exports = {
  makePurchase,
  purchaseData,
  listPurchase,
  purchaseDetails,
};
