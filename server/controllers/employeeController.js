var mysql      = require('mysql');
var url        = require('url');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@Shar1234',
  database : 'realestate'
});

//Employee login
module.exports.emplogin = function(req, res) {
  console.log(req.body)
  connection.query('SELECT * FROM login WHERE (username = ?)', [ req.body.username ], function (error, result, fields) {
    if(error) console.log(error);
    else if(!result.length) {
      res.send({success: false, message: "INCORRECT USERNAME"})
    }
    else {
      if(result[0].password == req.body.password){
        res.send({success: true, message: "correct", type: result[0].type})
      }
      else {
        res.send({success: false, message: "INVALID credentials!"});
      }
    }
  });
}

//SEND the data to the employee to verify the documents
module.exports.getverify = function(req,res) {
  connection.query('SELECT * FROM document WHERE documentid in (SELECT verification.documentid WHERE verification.employeeid = ?)',[req.body.employeeid],function(err,result){
    if(err) {
      console.log(err);
      res.send({success: false});
    }
    else {
      res.send([{success: true,data:result}]);
    }
  });
}


module.exports.verify = function(req,res) {
  connection.query('UPDATE verification SET status = 1WHERE employeeid = ? AND documentid = ?',[req.body.employeeid,req.body.documentid],function(err,result){
    if(err) {
      console.log(err);
      res.send({success: false});
    }
    else {
      res.send([{success: true,data:result}]);
    }
  });
}
