const express=require("express");
const app= express();
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
//var router =express.Router();
const path= require("path");
const routes = require('./routes');
//require('dotenv').config();
//const login=require('./src/routes/login');
var mysql=require("mysql");
var bodyParser = require('body-parser');
const Pool=require('pg');
app.use(bodyParser.urlencoded({
  extended: false,
}));
/* const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432
}); */

var connection=mysql.createConnection({host:"127.0.0.1",user:"root",password:"",database:"node-test"});
//const login=require("");
//const exphbs = require('express-handlebars');
//const Handlebars = require('handlebars');
app.use(express.static(path.join(__dirname, '/public')));
app.use('/', routes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.set('views', path.join(__dirname, '/routes/views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//app.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+ '/views/layouts/index.html'));
//})
app.listen(4000,function(){
console.log("listenning to 3000")
});

app.post('/save',function(req,res){
  var username=req.body.username;
  var password=req.body.password;
  console.log(username);
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database node-test!");
    //var records=[username,password];
    //var sql = "INSERT INTO user_validation (username, password) VALUES ?", [records];
    connection.query("INSERT INTO user_validation (username,password) VALUES (?,?)",[username,password] ,function(error,results){
      if(error) throw error;
      //console.log('User registered successfully!');
      res.render("popup",{p:'user is successfully registered!',title:'user registered'});
    })
    //res.render('index');
  })
});
