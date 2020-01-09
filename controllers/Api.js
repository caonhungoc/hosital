var express = require("express");
var bodyParser = require('body-parser');
var router = express.Router();

var api_md = require("../models/api");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/insert", function(req, res) {
    var params = req.body;
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var mi = today.getMinutes();
    var s = today.getSeconds();

    today = yyyy + '-' + mm + '-' + dd + ' '+ hh + ':' + mi+':'+s;
    //console.log("today is "+today+ " device id = "+ params.id + ", pp = " + params.pressure);
    api_md.addDeviceValue(params.id, params.heart_rate, params.pressure, today);
    res.json({data : "OK"});
});


module.exports = router;