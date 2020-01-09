var express = require("express");
var bodyParser = require('body-parser');
var router = express.Router();

var user_md = require("../models/Patient");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/", function(req, res) {
        res.render("./Patient/search", {data: {name: "Patient page", error: '', info:'no info'}});
});

router.get("/search", function(req, res) {
    res.render("./Patient/search", {data: {name: "Patient page", error: '', info:'no info'}});
});

router.post("/search", urlencodedParser, function(req, res) {
   
    var params = req.body;
    
    if(params.patient_id.trim().length == 0) {
        
        res.render("./Patient/search", {data: {info:"no info", name: "Patient page", error: "ccc"}});
    }else {
        var data = user_md.getInfoForSearch(params.patient_id);
        if(data) {
            data.then(function(User) {
                var patient_info = User[0];
                
                
                let chart_value = user_md.getPatientSensorData(patient_info.id, patient_info.device_id);
                if(chart_value) {
                    chart_value.then(chart_data => {
                       
                        res.jsonp({
                            data: {
                                info:patient_info, 
                                error:'', 
                                name:"Patient page", 
                                chart_data: chart_data
                            }
                        });
                        //res.render("./Patient/search", {data: {info:patient_info, error:'', name:"Patient page", chart_data: chart_data}});
                    }).catch(e=>{
                        console.log(e);
                    });
                }
                
            }).catch(e=>{
                
                res.render("./Patient/search", {data: {info:"no info", name: "Patient page", error: "Không có người này."}});
            });
        }
    }
})

module.exports = router;