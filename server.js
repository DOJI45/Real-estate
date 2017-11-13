var mysql      = require('mysql');
var url        = require('url');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var loginController = require('./server/controllers/loginController');
var homeController = require('./server/controllers/homeController');
var employeeController = require('./server/controllers/employeeController');
var multer = require('multer');
var fs = require('fs');
const fileUpload = require('express-fileupload');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@Shar1234',
  database : 'realestate'
});

var app = express();

var router = express.Router();


var server=app.listen(3000,function(){
  console.log("Real estate app is online at port no 3000");
})

app.use(fileUpload());

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(morgan('dev'));
app.use('/', express.static(__dirname + '/client/'));

app.post('/login', loginController.login);
app.post('/signup', loginController.signup);

app.post('/emplogin',employeeController.emplogin);
app.post('/verify',employeeController.verify);
app.get('/getverify',employeeController.getverify);

app.post('/addwishlist', homeController.addwishlist);
app.get('/getnotifications',homeController.getnotifications);
app.get('/getproperty',homeController.getproperty);
app.post('/interested',homeController.interested);

app.post('/uploadproperty', homeController.uploadproperty);

router.post('/uploadpropertya',function(req,res,next){
	///res.send(req.files);
  console.log('Sharath');
  connection.query('INSERT INTO property(propertyid,price,type,location,adress,image) values(?,?,?,?,?,?)',[req.body.propertyid,req.body.price,req.body.type,req.body.location,req.body.adress,'/client/upload/'+req.body.useid+req.files[0].fieldname+req.files[0].originalname],function(err,result){
    if(err) {
      console.log(err);
      res.send({success: false});
    }
    else {
      connection.query('INSERT INTO verification(documentid,employeeid) values(?,?)',[req.body.documentid,1],function(req,res){
        if(err) {
          console.log(err);
          res.send({success: false});
        }
        else {
          console.log('inserted documentid '+req.body.documentid + 'for verification');
        }
      });
      connection.query('INSERT INTO document values(documentid,type,propertyid,image) values(?,?,?,?)',[req.body.documentid,req.files[1].fieldname,req.body.propertyid,'/client/upload/'+req.body.useid+req.files[1].fieldname+req.files[1].originalname],function(err,result1){
        if(err) {
          console.log(err);
          res.send({success: false});
        }
        else {
          connection.query('INSERT INTO verification(documentid,employeeid) values(?,?)',[req.body.documentid,2],function(req,res){
            if(err) {
              console.log(err);
              res.send({success: false});
            }
            else {
              console.log('inserted documentid '+req.body.documentid + 'for verification');
            }
          });
          connection.query('INSERT INTO document values(documentid,type,propertyid,image) values(?,?,?,?)',[req.body.documentid,req.files[1].fieldname,req.body.propertyid,'/client/upload/'+req.body.useid+req.files[1].fieldname+req.files[1].originalname],function(err,result1){
            if(err) {
              console.log(err);
              res.send({success: false});
            }
            else {
              connection.query('INSERT INTO verification(documentid,employeeid) values(?,?)',[req.body.documentid,3],function(req,res){
                if(err) {
                  console.log(err);
                  res.send({success: false});
                }
                else {
                  console.log('inserted documentid '+req.body.documentid + 'for verification');
                }
              });
              connection.query('INSERT INTO document values(documentid,type,propertyid,image) values(?,?,?,?)',[req.body.documentid,req.files[1].fieldname,req.body.propertyid,'/client/upload/'+req.body.useid+req.files[1].fieldname+req.files[1].originalname],function(err,result1){
                if(err) {
                  console.log(err);
                  res.send({success: false});
                }
                else {
                    res.send({success:true});
                }
              });
            }
          });
        }
      });
    }
  });
});


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/main.html');
});
