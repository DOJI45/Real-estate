var mysql      = require('mysql');
var url        = require('url');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@Shar1234',
  database : 'realestate'
});

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
