console.log("login.js executing");
const mysql=require('mysql');
const routes = require('express').Router();
var connection=mysql.createConnection({host:"localhost",user:"root",password:"",database:"node-test"});
exports.login =function(req,res)
{
    var username = req.body.username;
    var password = req.body.password;
    connection.query('Select * from user_validation where username = ?' ,[username],function(error, results, field){
        if(error){
            res.send({"code":400,"failed": "error ocurred"})
        }
       else{
           if(results.length>0)
           {
            console.log(" executing code");
               if(resluts[0].password==password){
                   res.send({"code":200,"success":"login successfull!"});
               }
               else{
                   res.send({"code":204,"success":"username and password does not match"})
               }
           }
           else
           {
               res.send({"code":204, "success":"email does not exist"})
           }
       }
    }

    );
    


}
module.exports = routes;