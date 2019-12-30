// //require wanted module.
// var express = require("express");
// var bodyParser = require('body-parser');
// var mysql = require('mysql');
// var q = require("q");

// var app = express();

// // var conn = mysql.createConnection({
// //   database: 'hospital',
// //   host: "localhost",
// //   user: "root",
// //   password: ""
// // });
 
// conn.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "SELECT * FROM DOCTOR";
//   conn.query(sql, function (err,results, fields) {
//       if (err) throw err;
//       console.log(fields);
//   });
// });


// //app.use(bodyParser.urlencoded({ extended: false }))
// // create application/x-www-form-urlencoded parser
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

// //Config ejs
// app.set("view engine", "ejs");
// app.set("views", "./views");

// //Static folder
// app.use("/static", express.static(__dirname+"/public"));

// app.listen(3000);

// app.get("/doctor", (req, res) => {
//         var defer = q.defer();
//         var query = conn.query('SELECT * FROM DOCTOR WHERE ? ', {user_name: 'doctor1'}, function(err, result) {
//             if(err) {
//                 defer.reject(err);
//             }else {
//                 defer.resolve(result);
//             }
//         });

//         console.log("OK");
//     res.render("./Doctor", {data: ""});
// });

// app.get("/doctor/search", (req, res) => {
//     res.render("./Doctor/search", {data: ""});
// });

// app.post("/doctor/input", urlencodedParser, (req, res) => {
//     console.log(req.body.patient_name+' hh');
//     res.render("./Doctor/input", {data: "", err :"yes"});
// });

// app.get("/patient", (req, res) =>{
//     res.render("./Patient/search");
// });


// // POST /login gets urlencoded bodies
// app.post('/doctor', urlencodedParser, (req, res) => {
//     if(req.body.username != '')
//     res.render("./Doctor/input", {data: ""});
// });

// app.get("/chitiet", (req, res) => {
//     res.render("chitiet", {hoten: "Cao Nhu Ngoc"});
// })

// app.get("/", (req, res) => {
//     res.render("user");
// })



var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var session = require("express-session");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1);
app.use(session({
    secret: config.get("secret_key"),
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000}
}));

//Config ejs
app.set("view engine", "ejs");
app.set("views", "./views");

//Static folder
app.use("/static", express.static(__dirname+"/public"));

var controllers = require(__dirname+"/controllers");

app.use(controllers);

var host = config.get("server.host");
var port = config.get("server.port");

app.listen(port, host,  function() {
    console.log("Server is running on port", 3000);
    console.log(__dirname+"/public");
})