var express = require("express");
var bodyParser = require('body-parser');
var router = express.Router();

var device_md = require("../models/device");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/add", function(req, res) {
    if(req.session.username) {
        res.render("./Device/add");
    }
    else {
        res.render("./Doctor/index", {data: {}});
    }
});

router.get("/delete", function(req, res) {
    if(req.session.username) {
        res.redirect("/device/delete");
    }
    else {
        res.render("./Doctor/index", {data: {}});
    }
});

router.get("/update", function(req, res) {
    if(req.session.username) {
        res.redirect("/device/update");
    }
    else {
        res.render("./Doctor/index", {data: {}});
    }
});

router.get("/", function(req, res) {
    if(req.session.username) {
        //res.redirect("/device");
        res.render("./Device/index");
    }
    else {
        res.render("./Doctor/index");
    }
});


router.post("/add", urlencodedParser, function(req, res) {
    var params = req.body;
    if(req.session.username && params.pass != '') {
        device_md.addDeviceAndReturn(params.pass)
        .then( device => {
            console.log(device + ' hello = ' + device.id);
            res.jsonp({
                data: {
                    device_id: device.id, 
                    error:'', 
                    password: device.pass
                }
            });
        }).catch(e => {
            //console.log(device + ' cccxx');
            res.jsonp({
                data: {
                    device_id: '', 
                    error: e + '', 
                    password: params.pass
                }
            });
        })
    }
    else {
        res.render("./Doctor/index", {data: {}});
    }
});

module.exports = router;