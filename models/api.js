var q = require("q");
var db = require("../common/database");

var conn = db.getConnection();

function getPatientByID(id) {
    if(id) {
        var defer = q.defer();
        let qq = "SELECT * FROM patient WHERE id_number ='" + id+"'";
        
        var query = conn.query(qq, function(err, result) {
            if(err) {
                defer.reject(err);
            }else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
    else return false;
}

function getPatientNoDateOut(device_id) {
    if(device_id != '') {
        return new Promise((resolve, reject) => {
            let qq = "SELECT * FROM patient WHERE device_id ='" + device_id+"' and date_out IS NULL limit 1";
            
            conn.query(qq, function(err, result) {
                if(err) {
                    reject(err);
                }else {
                    resolve(result);
                }
            });
        })
    }
}

function insertDeviceValue(device_id, heart_rate, sys, dia, time, patient_id) {
    if(device_id != '' && heart_rate != '' && pp != '') {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO device_value (device_id, heart_rate, sys, dia, time, patient_id) VALUES ('"+device_id+"','"+heart_rate+"','"+ sys+"','"+dia+"', '"+time+"','"+patient_id+"')";
            
            conn.query(sql, function(err, result) {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        })
    }
}

function addDeviceValue(device_id, heart_rate, sys, dia, time) {
    if(device_id) {
        getPatientNoDateOut(device_id)
        .then((user) => {
            insertDeviceValue(device_id, heart_rate, sys, dia, time, user[0].id);
        }).catch(e => {
            console.log(e + "");
        })
    }
    return false;
}

module.exports = {
    addDeviceValue: addDeviceValue
}