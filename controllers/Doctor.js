var express = require("express");
var bodyParser = require('body-parser');
var router = express.Router();

var user_md = require("../models/doctor");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/signin", function(req, res) {
    if(req.session.username) {
        res.redirect("/doctor/input");
    }
    else {
        res.render("./Doctor/index", {data: {}});
    }
});

router.post("/signin", urlencodedParser, function(req, res) {
    var params = req.body;

    if(params.username.trim().length == 0) {
        res.render("./Doctor/index", {data: {error: "Please enter an username !!!"}});
    }else {
        var data = user_md.getDocctorByUsername(params.username);
        if(data) {
            data.then(function(User) {
                var user = User[0];
                if(params.password != user.password) {
                    res.render("./Doctor/index", {data: {error: "Wrong password !!!"}});
                } else {
                    req.session.username = user.user_name;
                    req.session.doctorname = user.name;
                    req.session.doctor_id = user.id;
                    res.redirect("/doctor/input");
                }
            });
        }else {
            res.render("signin", {data: {error : "User not exist!"}});
        }
    }
    
})

router.post("/search", urlencodedParser, function(req, res) {
    if(req.session.username) {
        var params = req.body;
        
        if(params.patient_id.trim().length == 0) {
            console.log(params.patient_id+ " nnn");
            res.render("./Doctor/search", {data: {info:"no info", name:req.session.doctorname, error: "ccc"}});
        }else {
            var data = user_md.getInfoForSearch(params.patient_id);
            if(data) {
                data.then(function(User) {
                    var patient_info = User[0];
                    console.log(patient_info.name+ " nnn" + patient_info.doctor_advice);
                    res.render("./Doctor/search", {data: {info:patient_info, error:'', name:req.session.doctorname}});
                }).catch(e=>{
                    console.log("Eo co thang nay, ok?");
                    res.render("./Doctor/search", {data: {info:"no info", name:req.session.doctorname, error: "Eo co nguoi nay, ok? cmm"}});
                });
            }
        }
    }
    else res.redirect("/doctor/signin");
    
})

router.get("/input", function(req, res) {
    if(req.session.username) {
        var data = user_md.getFreeDeviceList();
        if(data) {
            data.then(function(result) {
                //res.render("./Doctor/input", {data: req.session.doctorname});
                res.render("./Doctor/input", {data: {doctor_name: req.session.doctorname, device_list: result}});
            }).catch(function(err){
                var data = {
                    error : "Không có thiết bị rãnh nào."
                };
                //console.log("ccc321312");
                res.render("./Doctor/input", {error: data});
            })
        }
    }
    else res.redirect("/doctor/signin");
});

router.get("/search", function(req, res) {
    if(req.session.username) {
        res.render("./Doctor/search", {data: {name: req.session.doctorname, error: '', info:'no info'}});
    }
    else res.redirect("/doctor/signin");
});

router.get("/signout", function(req, res) {
    if(req.session.username) {
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.redirect('/doctor/signin');
        });
    }
    else res.redirect("/doctor/signin");
});

router.get("/add_date_out", function(req, res) {
    if(req.session.username) {
        res.render("./Doctor/add_date_out", {data: req.session.username, error: ''});
    }
    else {
        res.render("./Doctor/index", {data: {}, error : ''});
    }
});

router.post("/add_date_out", urlencodedParser, function(req, res) {
    var params = req.body;
    if(req.session.username) {
        console.log("patient name = " + params.patient_id+', cmnd = '+params.date_out);
        var data = user_md.updateDateOut(params.patient_id, params.date_out);
        if(data) {
            data.then(function(User) {
                res.render("./Doctor/add_date_out", {data: {error:'Successful update', name:req.session.doctorname}});
            }).catch(e=>{
                res.render("./Doctor/add_date_out", {data: {error:'Can not update', name:req.session.doctorname}});
            });
        }
    }
    else {
        res.send("Access denied!");
    }
})

router.post("/input", urlencodedParser, function(req, res) {
    var params = req.body;
    params.doctor_id = req.session.doctor_id;
    console.log(params.device_id);
    
    if(req.session.username) {
        ///
        // var data = user_md.getFreeDeviceList();
        // if(data) {
        //     data.then(function(result) {
        //         if(params.patient_name != '' && params.device_id != '' && params.patient_name != '' && params.patient_id != '' && params.birth_date != '' && params.date_in_d != '' && params.heart_rate != '' && params.time_heart_rate != '' && params.pp != '' && params.time_pp != '') {// need check more params from form
        //             var data1 = user_md.addPatientInfo(params);
        //             console.log("cccv");
        //             data1.then(function(res) {
        //                 console.log("ccc");
        //                 res.render("./Doctor/input", {data:{doctor_name:  req.session.doctorname, error :"OK", device_list: result}}); 
        //             }).catch(function(err){
        //                 console.log("ccc321312");
        //                 res.render("./Doctor/input", {data:{doctor_name:  req.session.doctorname, error :"NOT OK1", device_list: result}});
        //             })
        //         }
        //         else { //Form điền không đủ dữ liệu thì k chèn vào database (db)
        //             console.log("ccc else");
        //             res.render("./Doctor/input", {data:{doctor_name:  req.session.doctorname, error :"NOT OK", device_list: result}});
        //         }
        //     }).catch(function(err){
        //         console.log("catch" + data + " --" + result);
        //         res.render("./Doctor/input", {data:{doctor_name:  req.session.doctorname, error :"NOT OK", device_list: result}});
        //     })
        // }
        ///  
        if(params.patient_name != '' && params.device_id != '' && params.patient_name != '' && params.patient_id != '' && params.birth_date != '' && params.date_in_d != '' && params.heart_rate != '' && params.time_heart_rate != '' && params.pp != '' && params.time_pp != '') {// need check more params from form
            var data = user_md.addPatientInfo(params);
            if(data != false) {
                console.log("cccv");
                var data1 = user_md.getFreeDeviceList();
                if(data1) {
                    data1.then(function(result) {
                        res.render("./Doctor/input", {data:{doctor_name:  req.session.doctorname, error :"OK", device_list: result}}); 
                    }).catch(function(e) {
                        console.log("eerrrr");
                        throw e;
                    })  
                }
            }
        }
        else {
            var data1 = user_md.getFreeDeviceList();
                if(data1) {
                    data1.then(function(result) {
                        res.render("./Doctor/input", {data:{doctor_name:  req.session.doctorname, error :"NOT OK", device_list: result}}); 
                    }).catch(function(e) {
                        console.log("eerrrr");
                        throw e;
                    })  
                }
        }

    }
    else {
        res.send("Access denied!");
    }
})

module.exports = router;