var q = require("q");
var db = require("../common/database");

var conn = db.getConnection();

function getPatientByID(id) {
  if (id && db.IsNumeric(id)) {
    var defer = q.defer();
    let qq = "SELECT * FROM patient WHERE id_number ='" + id + "'";

    var query = conn.query(qq, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });

    return defer.promise;
  } else {
    return false;
  }
}

function getInfoForSearch(id_number) {
  if (id_number) {
    return new Promise((resolve, reject) => {
      let qq = "SELECT treat.treat_method, treat.doctor_guess, patient.name, patient.id as id, patient.device_id as device_id, treat.doctor_advice FROM treat, patient WHERE patient.id_number='" + id_number + "' and patient.date_out IS NULL and patient.id=treat.patient_id";

      conn.query(qq, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

function getPatientNoDateOut(id) {
  if (id && db.IsNumeric(id)) {
    var defer = q.defer();
    let qq = "SELECT * FROM patient WHERE id_number ='" + id + "' and date_out IS NULL";

    var query = conn.query(qq, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });
    return defer.promise;
  } else {
    return false;
  }
}

function getPatientSensorData(id, device_id) {
  if (id && db.IsNumeric(id)) {
    var defer = q.defer();
    let qq = "SELECT * FROM device_value WHERE patient_id ='" + id + "' and device_id='" + device_id + "'";

    var query = conn.query(qq, function (err, result) {
      if (err) {
        defer.reject(err);
      } else {
        defer.resolve(result);
      }
    });
    return defer.promise;
  } else {
    return false;
  }
}

module.exports = {
  getPatientByID: getPatientByID,
  getInfoForSearch: getInfoForSearch,
  getPatientNoDateOut: getPatientNoDateOut,
  getPatientSensorData: getPatientSensorData
}