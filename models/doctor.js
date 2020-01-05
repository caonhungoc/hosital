var q = require("q");
var db = require("../common/database");

const AVAILABLE = 0;
const BUSY = 1;

var conn = db.getConnection();

function addPatient(user) {
    if(user) {
        var defer = q.defer();
        var query = conn.query('INSERT INTO User SET ?', user, function(err, result) {
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

function getDocctorByUsername(user_name) {
    if(user_name) {
        var defer = q.defer();
        let qq = "SELECT * FROM DOCTOR WHERE user_name ='" + user_name+"'";//// sql injection here????
        //console.log(qq);
        //console.log(qq);
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
        let qq = "SELECT treat.treat_method, treat.doctor_guess, patient.name, treat.doctor_advice, patient.id as patient_id FROM treat, patient WHERE patient.id_number='"+id_number+"' and patient.date_out IS NULL and patient.id=treat.patient_id";
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

function addPatient(params) {
    if(params) {
        var defer = q.defer();
        let sql = "INSERT INTO patient (name, id_number, date_in, device_id) VALUES ("+params.patient_name+","+params.id+","+ params.date_in+","+params.device_id+")";
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

function addTreat(params) {
    if(params) {
        var defer = q.defer();
        let sql = "INSERT INTO treat (doctor_id, patient_id, doctor_guess, treat_method) VALUES ("+params.doctor_id+","+params.patient_id+","+ params.doctor_guess+","+params.treat_method+")";
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

function addDeviceValue(params) {
    if(params) {
        var defer = q.defer();
        let sql = "INSERT INTO device_value (device_id, heart_rate, pp, time) VALUES ("+params.doctor_id+","+params.heart_rate+","+ params.pp+","+params.time+")";
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

function getPatientNoDateOut(id) {
    if(id) {
        var defer = q.defer();
        let qq = "SELECT * FROM patient WHERE id_number ='" + id+"' limit 1";
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

function getPatientNoDateOut1(id, callback) {
    if(id) {
        let qq = "SELECT * FROM patient WHERE id_number ='" + id+"' limit 1";
        console.log(qq + " no dateout11");
        var query = conn.query(qq, function(err, result) {
            if(err) {
               console.log(err+ " ccxx");
            }
            return callback(result);
        });  
    }
    return false;
}

function getFreeDeviceList(callback) {
    var defer = q.defer();
        let qq = "SELECT id FROM device WHERE status = 0";
        console.log(qq + " no dateout");
        var query = conn.query(qq, function(err, result) {
            if(err) {
                defer.reject(err);
            }else {
                defer.resolve(result);
            }
        });
        return callback(defer.promise);
}

function updateDateOut(patient_id, date, callback) {
    if(date !='' && patient_id != '') {
        var defer = q.defer();
        let qq = "update patient set date_out = '"+date+"' where id_number='"+patient_id+"' and date_out IS NULL";
        console.log(qq + " no dateout");
        var query = conn.query(qq, function(err, result) {
            if(err) {
                defer.reject(err);
                throw err;
            }else {
                defer.resolve(result);
            }
        });
        //update status of device to be free
        getPatientNoDateOut1(patient_id, (data) => {
            let q = "update device set status = '"+AVAILABLE+"' where id ='"+data[0].device_id+"'";
            console.log(q + "cc");
            conn.query(q, (e, r) => {
                if(e) {
                    console.log("Error: get patient no date out "+ e);
                    throw e;
                }
                return callback(defer.promise);
            });
        }) 
    }
    else {
        return false;
    }
}

//Add all info of patient(id, doctor's advice, device id, device value,...) to 3 tables of database
function addPatientInfo(params, callback) {
    /* Begin transaction */
    var defer = q.defer();
    conn.beginTransaction(function(err) {
    if (err) { throw err; }
    let date_in = params.date_in_d + " " + params.date_in_h;
    let sql = "INSERT INTO patient (name, id_number, date_in, device_id, birth_date) VALUES ('"+params.patient_name+"','"+params.patient_id+"','"+ date_in+"','"+params.device_id+"','"+params.birth_date+"')";
    console.log(sql + ' _1');
    conn.query(sql, function(err, result) {
      if (err) { 
        conn.rollback(function() {
          throw err;
        });
      }

    let data = getPatientNoDateOut(params.patient_id);
    var x=-1;
    if(data) {
        data.then(function(User) {
            var user = User[0];
            x = user.id;
            var sql = "INSERT INTO treat (doctor_id, patient_id, doctor_guess, treat_method, doctor_advice) VALUES ('"+params.doctor_id+"','"+ x +"','"+ params.doctor_diagnose+"','"+params.treat_method+"','"+params.doctor_advice+"')";
            console.log(sql + ' _2');
            conn.query(sql, function(err, result) {
              if (err) { 
                conn.rollback(function() {
                    console.log("err1");
                  throw err;
                });
              }  
      
              let sql = "INSERT INTO device_value (device_id, heart_rate, pp, time, patient_id) VALUES ('"+params.device_id+"','"+params.heart_rate+"','"+ params.pp+"','"+params.time+"','"+x+"')";
              console.log(sql + ' _3');
              conn.query(sql, function(err, result) {
                  if (err) { 
                      conn.rollback(function() {
                        console.log("err2");
                        throw err;
                      });
                  }  
                  conn.commit(function(err) {
                      if (err) { 
                        conn.rollback(function() {
                          defer.reject(err);
                          console.log("err3");
                          throw err;
                        });
                      }
                      
                      //defer.resolve(result);
                      console.log('Transaction Complete.');
                      
                  });
                  updateDeviceStatus(params.device_id, BUSY, ()=> {
                    return callback(result);///CAllBACK hell :((
                  })
                //defer.resolve(result);
              });
              //return defer.promise;
            });
        });
    }
        
    });
    //return defer.promise;
  });
  /* End transaction */
}

function updateDeviceStatus(id, status, callback) { // Cap nhat trang thai cua thiet bi, 0 la ranh~, 1 k ranh~
    let sql = "UPDATE device SET status = '"+ status + "' WHERE id = '"+id+"'";
    console.log(sql + " ccc");
    conn.query(sql, (err, res) => {
        if (err) {
            throw err;
        } 
        return callback();
    })
}

function getPatientSensorData(id, device_id) {
    if(id != '') {
        return new Promise((resolve, reject) => {
            let qq = "SELECT * FROM device_value WHERE patient_id ='" + id+"' and device_id='"+device_id+"'";
            console.log(qq + " no dateout");
            conn.query(qq, function(err, result) {
                if(err) {
                    return reject(err);
                }else {
                    resolve(result);
                }
            });
        })
    }
}

function getInfoForSearch(id_number) {
    if(id_number) {
        return new Promise((resolve, reject) => { 
            let qq = "SELECT treat.treat_method, treat.doctor_guess, patient.name, patient.id, patient.device_id, treat.doctor_advice FROM treat, patient WHERE patient.id_number='"+id_number+"' and patient.date_out IS NULL and patient.id=treat.patient_id";
            console.log(qq);
            conn.query(qq, function(err, result) {
                if(err) {
                    return reject(err);
                }else {
                    resolve(result);
                }
            });
        })
    }
}


module.exports = {
    addPatient: addPatient,
    getDocctorByUsername: getDocctorByUsername,
    getPatientByID: getPatientByID,
    addTreat: addTreat,
    addDeviceValue: addDeviceValue,
    getInfoForSearch: getInfoForSearch,
    addPatientInfo: addPatientInfo,
    updateDateOut: updateDateOut,
    getFreeDeviceList: getFreeDeviceList,
    updateDeviceStatus: updateDeviceStatus,
    getPatientNoDateOut1:getPatientNoDateOut1,
    getPatientSensorData: getPatientSensorData
}