var express = require("express");

var router = express.Router();

router.use("/doctor", require("./Doctor"));
router.use("/patient", require("./Patient"));
router.use("/api", require("./Api"));
router.use("/device", require("./Device"));

router.get("/", function (req, res) {
  res.render("./Patient/search", {
    data: {
      info: "NO INFO",
      name: "Anonymous",
      error: ""
    }
  });
});

module.exports = router;