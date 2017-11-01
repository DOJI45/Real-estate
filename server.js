var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var loginController = require('./server/controllers/loginController');
var homeController = require('./server/controllers/homeController');
var employeeController = require('./server/controllers/employeeController')

var app = express();

var server=app.listen(3000,function(){
  console.log("Real estate is online on port no 3000");
})

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use('/', express.static(__dirname + '/client/'));


app.post('/login', loginController.login);
app.post('/signup', loginController.signup);
app.post('/verify',employeeController.verify);
app.get('/forverify',employeeController.forverify)
app.post('/addwishlist', homeController.addwishlist);
app.get('/getnotifications',homeController.getnotifications);
app.post('/upload',homeController.upload)
app.get('/getproperty',homeController.getproperty);
app.post('/interested',homeController.interested);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/main.html');
});
