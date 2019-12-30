var express = require("express");

var router = express.Router();

router.use("/doctor", require("./Doctor"));
router.use("/patient", require("./Patient"));
router.use("/api", require("./Api"));

router.get("/", function(req, res) {
    //res.json({"message" : "This is home page"});
    res.render("index");
});


module.exports = router;