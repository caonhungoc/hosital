var express = require("express");
var bodyParser = require('body-parser');
var router = express.Router();

var device_md = require("../models/device");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/add", function(req, res) {
    if(req.session.username) {
        res.redirect("/device/add");
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
        device_md.addDevice(params.pass)
        .then((pass) => {
            device_md.getDeviceIdByPass(pass).then((device) =>{
                //device[0].id;
                res.jsonp({
                    data: {
                        device_id: device[0].id, 
                        error:'', 
                        password: pass
                    }
                });
            }).catch(e => {
                console.log(e + ' catch 1');
            })
        }).catch(e => {
            console.log(e + ' catch 2');
        });
    }
    else {
        res.render("./Doctor/index", {data: {}});
    }
});

module.exports = router;