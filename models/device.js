var q = require("q");
var db = require("../common/database");

const AVAILABLE = 0;
const BUSY = 1;

var conn = db.getConnection();

let getAllPass = () => { //Dựa vào mật khẩu để đảm bảo id gán cho thiết bị chính xác hơn
    let q = "SELET * from device";
    console.log(q+' devicee');
    return new Promise((resolve, reject) => {
        conn.query(sql, function(err, result) {
            if(err) {
                return reject(err);
            }
            else {
                resolve(result);
            }
        });
    })
}

let checkPassExist = (password) => {
    return new Promise((resolve, reject) => {
        getAllPass().then((passlist) => {
            passlist.forEach(element => {
                if(element.pass == password) {
                    return reject(new Error("Mật khẩu này đã được dùng! Vui lòng chọn lại."));
                }
            });
            resolve(password);
        })
        .catch((e) => {
            console.log(e + "");
        })
    })
}

let getDeviceIdByPass = (pass) => {
    let q = "SELET * from device where pass = '"+pass+"'" ;
    console.log(q+' deviceeeeee');
    return new Promise((resolve, reject) => {
        conn.query(sql, function(err, result) {
            if(err) {
                return reject(err);
            }
            else {
                resolve(result);
            }
        });
    })
}

let addDevice = (pass) => {
    if(pass != '') {
        checkPassExist(pass)
        .then((password) => {
            let q = "INSERT INTO device (status, pass) VALUES (0,'" + password +"')";
            console.log(q+' devicee');
            return new Promise((resolve, reject) => {
                conn.query(sql, function(err, result) {
                    if(err) {
                        return reject(err);
                    }
                    else {
                        resolve(pass);
                    }
                });
            })
        })
        .catch((e) => {
            console.log(e + "");
        })
    }
}

let addDevice1 = (pass) => {
    if(pass != '') {
        let q = "INSERT INTO device (status, pass) VALUES (0,'" + pass +"')";
        console.log(q+' devicee');
        return new Promise((resolve, reject) => {
            conn.query(sql, function(err, result) {
                if(err) {
                    return reject(err);
                }
                else {
                    resolve(result);
                }
            });
        })
    }
}

let deleteDevice = (id) => {
    if(id != '') {
        let q = "DELETE FROM device WHERE id = '" + id + "'";
        console.log(q+' devicee');
        return new Promise((resolve, reject) => {
            conn.query(sql, function(err, result) {
                if(err) {
                    return reject(err);
                }
                else {
                    resolve(result);
                }
            });
        })
    }
}

let updateDevice = (id, pass, status) => {
    if(id != '' && pass != '' && status != '') {
        let q = "UPDATE device SET pass = '"  + pass+"', status = '" + status + "' WHERE id = '"+ id+"'";
        console.log(q+' devicee');
        return new Promise((resolve, reject) => {
            conn.query(sql, function(err, result) {
                if(err) {
                    return reject(err);
                }
                else {
                    resolve(result);
                }
            });
        })
    }
}

module.exports = {
    addDevice: addDevice,
    deleteDevice: deleteDevice,
    updateDevice: updateDevice,
    getDeviceIdByPass: getDeviceIdByPass
}