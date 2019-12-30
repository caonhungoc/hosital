var q = require("q");
var db = require("../common/database");

var conn = db.getConnection();

function addPatient(user) {
    if(user) {
        var defer = q.defer();
        var query = conn.query('INSERT INTO device_value SET ?', user, function(err, result) {
            if(err) {
                defer.reject(err);
            }
            else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
    return false;
}

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
    return false;
}

function addDeviceValue(params, time) {
    if(params) {
        var defer = q.defer();
        let sql = "INSERT INTO device_value (device_id, heart_rate, pp, time) VALUES ("+params.device_id+","+params.heart_rate+","+ params.pp+","+time+")";
        var query = conn.query(sql, function(err, result) {
            if(err) {
                defer.reject(err);
            }
            else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
    return false;
}

module.exports = {
    addDeviceValue: addDeviceValue
}