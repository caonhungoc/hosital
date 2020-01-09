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