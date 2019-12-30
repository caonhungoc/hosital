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
    return false;
}

function getInfoForSearch(id_number) {
    if(id_number) {
        var defer = q.defer();
        let qq = "SELECT treat.treat_method, treat.doctor_guess, patient.name, patient.id, patient.device_id, treat.doctor_advice FROM treat, patient WHERE patient.id_number='"+id_number+"' and patient.date_out IS NULL and patient.id=treat.patient_id";
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
}

function getPatientNoDateOut(id) {
    if(id) {
        var defer = q.defer();
        let qq = "SELECT * FROM patient WHERE id_number ='" + id+"'";
        console.log(qq + " no dateout");
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

function getPatientSensorData(id, device_id) {
    if(id) {
        var defer = q.defer();
        let qq = "SELECT * FROM device_value WHERE patient_id ='" + id+"' and device_id='"+device_id+"'";
        console.log(qq + " no dateout");
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

module.exports = {
    getPatientByID: getPatientByID,
    getInfoForSearch: getInfoForSearch,
    getPatientNoDateOut: getPatientNoDateOut,
    getPatientSensorData: getPatientSensorData
}