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




app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/main.html');
});
