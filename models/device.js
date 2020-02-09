var q = require("q");
var db = require("../common/database");

const AVAILABLE = 0;
const BUSY = 1;

var conn = db.getConnection();

let getAllPass = () => { //Dựa vào mật khẩu để đảm bảo id gán cho thiết bị chính xác hơn
  let q = "SELECT * from device";
  return new Promise((resolve, reject) => {
    conn.query(q, function (err, result) {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(result);
      }
    });
  })
}

let getAllIdInUse = () => { //Dựa vào mật khẩu để đảm bảo id gán cho thiết bị chính xác hơn
  let q = `SELECT * FROM device where status = ${BUSY}`;
  
  return new Promise((resolve, reject) => {
    conn.query(q, function (err, result) {
      if (err) {
        reject(new Error(err));
      } else {
        resolve(result);
      }
    });
  })
}

function getAvailableDevices() {
  let query = `SELECT * FROM device WHERE status = ${AVAILABLE}`;
  return new Promise((resolve, reject) => {
    conn.query(query, (err, result) => {
      if (err) reject(new Error(err));
      else resolve(result);
    });
  });
}

let checkPassExist = (password) => {
  return new Promise((resolve, reject) => {
    getAllPass().then((passlist) => {
        passlist.forEach(element => {
          if (element.pass == password) {
            reject(new Error("Mật khẩu này đã được dùng! Vui lòng chọn lại."));
          }
        });
        resolve(password);
      })
      .catch((e) => {
        console.log(e + "");
      })
  })
}

let checkIdExist = (id) => {
  return new Promise((resolve, reject) => {
    getAllIdInUse().then((idlist) => {
      idlist.forEach(element => {
        if (element.id == id) {
          reject(new Error("Không thể xóa thiết bị đang được dùng"));
        }
      });
      resolve(id);
    })
  })
}

let getDeviceIdByPass = (pass) => {
  let q = "SELECT * from device where pass = '" + pass + "'";

  return new Promise((resolve, reject) => {
    conn.query(q, function (err, result) {
      if (err) {
        reject(new Error(err));
      } else {
        //console.log(result[0]);
        console.log(q + ' get device by pass in sql query');
        resolve(result[0]); //Trả về id và pass của thiết bị vừa mới được thêm vào
      }
    });
  })
}

let addDevice = (pass) => {
  if (pass != '') {
    let q = "INSERT INTO device (status, pass) VALUES (0,'" + pass + "')";

    return new Promise((resolve, reject) => {
      conn.query(q, function (err, result) {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(pass);
        }
      });
    })
  }
}

let addDeviceAndReturn = (password) => {
  return checkPassExist(password)
    .then(pass => addDevice(pass))
    .then(pass1 => getDeviceIdByPass(pass1))
}

let deleteDevice = (id) => { // Xóa thiết bị,nếu thiết bị đang được dùng thì không xóa!
  if (id != '') {
    let q = "DELETE FROM device WHERE id = '" + id + "'";

    return new Promise((resolve, reject) => {
      conn.query(q, function (err, result) {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(id); //Xóa thành công thì trả về id của thiết bị vừa xóa
        }
      });
    })
  }
}

let deleteDeviceAndReturn = (id) => { // Xóa thiết bị,nếu thiết bị đang được dùng thì không xóa!
  if (id != '') {
    return checkIdExist(id)
      .then(id_res => deleteDevice(id_res));
  }
}

let updateDevice = (id, pass) => {
  if (id != '' && pass != '') {
    let q = "UPDATE device SET pass = '" + pass + "' WHERE id = '" + id + "'";

    return new Promise((resolve, reject) => {
      conn.query(q, function (err, result) {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(pass);
        }
      });
    })
  }
}

let updateDeviceAndReturn = (id, password) => {
  return checkPassExist(password)
    .then(pass => updateDevice(id, pass))
}

module.exports = {
  addDevice: addDevice,
  deleteDevice: deleteDevice,
  updateDevice: updateDevice,
  getDeviceIdByPass: getDeviceIdByPass,
  addDeviceAndReturn: addDeviceAndReturn,
  deleteDeviceAndReturn: deleteDeviceAndReturn,
  updateDeviceAndReturn: updateDeviceAndReturn,
  getAvailableDevices: getAvailableDevices
}