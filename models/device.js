var q = require("q");
var db = require("../common/database");

const AVAILABLE = 0;
const BUSY = 1;

var conn = db.getConnection();

let getAllPass = () => { //Dựa vào mật khẩu để đảm bảo id gán cho thiết bị chính xác hơn
    let q = "SELECT * from device";
    console.log(q+' get all pass');
    return new Promise((resolve, reject) => {
        conn.query(q, function(err, result) {
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
    let q = "SELECT * from device where pass = '"+pass+"'" ;
    console.log(q+' get device by pass');
    return new Promise((resolve, reject) => {
        conn.query(q, function(err, result) {
            if(err) {
               
                return reject(err);
            }
            else {
                //console.log(result[0]);
                console.log(q+' get device by pass in sql query');
                resolve(result[0]);//Trả về id và pass của thiết bị vừa mới được thêm vào
            }
        });
    })
}

let addDevice = (pass) => {
    if(pass != '') {
        let q = "INSERT INTO device (status, pass) VALUES (0,'" + pass +"')";
        console.log(q+' devicee');
        return new Promise((resolve, reject) => {
            conn.query(q, function(err, result) {
                if(err) {
                    return reject(err);
                }
                else {
                    resolve(pass);
                }
            });
        })
    }
}

let addDeviceAndReturn = (password) => { //  Cẩn thận với cái hàm mũi tên này, nếu chỉ có 1 dòng, nó tương đương với return, bay mẹ nó não
    return checkPassExist(password) // https://www.youtube.com/watch?v=FmsvKGYd9Kk&list=PLzrVYRai0riRaLjgZe00gPMyLI1NdWcpL&index=9
    .then(pass =>  addDevice(pass)) // Xem kỹ mấy bài đầu của link trên
    .then(pass1 =>  getDeviceIdByPass(pass1)) 
}

let deleteDevice = (id) => {
    if(id != '') {
        let q = "DELETE FROM device WHERE id = '" + id + "'";
        console.log(q+' devicee');
        return new Promise((resolve, reject) => {
            conn.query(q, function(err, result) {
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
            conn.query(q, function(err, result) {
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
    getDeviceIdByPass: getDeviceIdByPass,
    addDeviceAndReturn: addDeviceAndReturn
}