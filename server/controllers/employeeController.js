var mysql      = require('mysql');
var url        = require('url');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@Shar1234',
  database : 'realestate'
});

//
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
