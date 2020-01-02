var q = require("q");
var db = require("../common/database");

var conn = db.getConnection();

function getPatientByID(id) {
    if(id) {
        var defer = q.defer();
        let qq = "SELECT * FROM patient WHERE id_number ='" + id+"'";
        console.log(qq);
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
    if(id) {
        return new Promise((resolve, reject) => {
            let qq = "SELECT * FROM patient WHERE device_id ='" + device_id+"' limit 1";
            console.log(qq + " no dateout");
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

function addDeviceValue(device_id, heart_rate, pp) {
    if(id) {
        getPatientNoDateOut(device_id)
        .then((user) => {
            isertDeviceValue(device_id, heart_rate, pp, time, user[0].id);
        }).catch(e => {
            console.log(e + "");
        })

        // let qq = "SELECT * FROM patient WHERE device_id ='" + device_id+"' and date_out IS NULL limit 1";
        // console.log(qq + " no dateout");
        // return new Promise( (resolve, reject) => {
        //     conn.query(qq, function(err, result) {
        //         if(err) {
        //             return reject(err);
        //         }else {
        //             resolve(result);
        //         }
        //     });
        // }).then( (user) => {
        //     let sql = "INSERT INTO device_value (device_id, heart_rate, pp, time, patient_id) VALUES ("+params.device_id+","+params.heart_rate+","+ params.pp+","+time+")";
        //     conn.query(sql, function(err, result) {
        //         if(err) {
        //             defer.reject(err);
        //         }
        //         else {
        //             defer.resolve(result);
        //         }
        //     });
        // }).catch(e => {
        //     console(e +"");
        // })
    }
    return false;
}

function isertDeviceValue(device_id, heart_rate, pp, time, patient_id) {
    if(params) {
        return new Promise((resolve, reject) => {
            let sql = "INSERT INTO device_value (device_id, heart_rate, pp, time, patient_id) VALUES ("+device_id+","+heart_rate+","+ pp+","+time+",'"+patient_id+"')";
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

module.exports = {
    addDeviceValue: addDeviceValue
}