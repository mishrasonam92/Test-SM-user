
var path=require("path");
const contentful = require('contentful');
const mysql=require("mysql");
const express=require("express");
const app= express();
const routes = require('express').Router();
const bodyParser = require('body-parser');
require('dotenv').config();


var connection=mysql.createConnection({host:"127.0.0.1",user:"root",password:"",database:"node-test"});
routes.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname+ '/views/index.handlebars'));
    res.render("index");
  });
  routes.get('/createAccount', (req, res) => {
    //res.sendFile(path.join(__dirname+ '/views/index.handlebars'));
    res.render("createAccount");
  });
 /*  routes.get('/popup', (req, res) => {
    //res.sendFile(path.join(__dirname+ '/views/index.handlebars'));
    res.render("popup");
  }); */
routes.get('/login',(req, res) => {
    console.log("login.js executing");
    var username = req.query.username;
    var password = req.query.password;
    
    connection.query('Select * from user_validation where username = ?' ,[username],function(error, results, field){
        if(error){
            console.log(error);
            res.send({"code":400,"failed": error})
        }
       else{
           if(results.length>0)
           {
            console.log(" executing code");
               if(results[0].password==password){
                 
                //res.sendFile(path.join(__dirname+ '/views/layouts/home.handlebars'));
                if(results[0].role == 'admin')
                {
                  
                  
                  res.render('home',{username:username, popop:results[0].role,newtext: entryContent});
                }
              else{
                console.log("pathhhhhhhhhhhh" ,path.join(__dirname,'/public'));
                var p=path.join(__dirname,'/imgs/img1.jpg');
                 res.render('home',{username:username,p:p, newtext: entryContent});
              }
                
               }
               else{
               
                   //res.send('Email and password does not match!!');
             
                   //alert("Email and password does not match!");
                   res.render("index",{popup:'Email and password does not match!'});
               }
           }
           else
           {
               
               //alert("email does not exist!");
               res.render("index",{popup:'email does not exist!'});
           }
       }
    }

    )});
  module.exports = routes;
  var createProxyAgent = function createProxyAgent() {
    var proxyAgent = void 0;
  
    if (app.get('env') === 'development') {
      // eslint-disable-next-line global-require
      var HttpsProxyAgent = require('https-proxy-agent');
  
      // HTTP/HTTPS proxy to connect to
      // var proxy = process.env.PROXY || 'http://us_proxy_indy.xh1.lilly.com:9000';
      //var httpProxy = process.env.PROXY;
      
      //console.log('Using proxy server: %s', httpProxy);
      var proxy=process.env.PROXY;
      // create an instance of the `HttpsProxyAgent` class with the proxy server information
      proxyAgent = new HttpsProxyAgent(proxy);
      console.log(proxy);
    }
    //console.log("proxyagent", proxyAgent);
    return proxyAgent;
  };
  
  exports.createProxyAgent = createProxyAgent;


const client = contentful.createClient({
  space: 'aib46yg4glhg',
  accessToken: 'cce30da8b74a74b023a7d6b5eee31f4be2cb762022677d27517a7c72ef312ae9',
  host:'https://cdn.contentful.com',
  httpsAgent: createProxyAgent()
  
});
console.log("Contentful Started");

let entryContent;
console.log("Contentful entry");
client.getEntry('veGZZlGMpiUegUsOGQ2eI')
.then(function (entry) {
// logs the entry metadata
//console.log(entry.sys)

// logs the field with ID title
console.log(entry.fields.text2)
entryContent = entry.fields;
})

// routes.get('/', function(req, res, next) {
//   res.render('home', {newtext: entryContent });
// }); 
// client.getContentType('veGZZlGMpiUegUsOGQ2eI')
// .then((contentType) => console.log(contentType))
// .catch(console.error)


//Contentful ends