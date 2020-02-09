var express = require("express");
var bodyParser = require('body-parser');
var router = express.Router();

var user_md = require("../models/patient");
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.get("/", function (req, res) {
  res.render("./Patient/search", {
    data: {
      info: 'no info',
      name: "Patient page",
      error: '',
    }
  });
});

router.get("/search", function (req, res) {
  res.render("./Patient/search", {
    data: {
      info: 'no info',
      name: "Patient page",
      error: ''
    }
  });
});

router.post("/search", urlencodedParser, function (req, res) {
  var params = req.body;
  if (params.patient_id.trim().length == 0) {
    res.render("./Patient/search", {
      data: {
        info: "no info",
        name: "Patient page",
        error: "No Patient info"
      }
    });
  } else {
    user_md.getInfoForSearch(params.patient_id)
      .then(User => {
        var patient_info = User[0];
        if (User[0] != undefined) {
          user_md.getPatientSensorData(User[0].id, User[0].device_id)
            .then(data_chart => {
              res.jsonp({
                data: {
                  info: patient_info,
                  error: '',
                  name: req.session.doctorname,
                  chart_data: data_chart
                }
              });
            })
            .catch(e => {
              res.jsonp({
                data: {
                  info: '',
                  error: e,
                  name: req.session.doctorname,
                  chart_data: ''
                }
              });
            })
        } else {
          res.jsonp({
            data: {
              info: '',
              error: "NOT FOUND!",
              name: req.session.doctorname,
              chart_data: ''
            }
          });
        }
      })
  }
})

module.exports = router;