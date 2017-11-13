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
  var url_parts = url.parse(req.url, true);
  req.body.username = url_parts.query.username;
  connection.query('SELECT employeeid from employee where username = ?',[req.body.username],function(err,result){
    if(err) {
      console.log(err);
      res.send({success: false});
    }
    else {
      req.body.employeeid = result[0].employeeid;
      connection.query('SELECT * FROM document WHERE documentid in (SELECT verification.documentid WHERE verification.employeeid = ?)',[req.body.employeeid],function(err,result1){
        if(err) {
          console.log(err);
          res.send({success: false});
        }
        else {
          res.send({success: true,data:result1});
        }
      });
    }
  });

}

//Verify the property

module.exports.verify = function(req,res) {
    connection.query('SELECT employeeid from employee where username = ?',[req.body.username],function(err,result){
      if(err) {
        console.log(err);
        res.send({success: false});
      }
      else{
        req.body.employeeid = result[0].employeeid;
        connection.query('UPDATE verification SET status = 1 WHERE employeeid = ? AND documentid = ?',[req.body.employeeid,req.body.documentid],function(err,result1){
          if(err) {
            console.log(err);
            res.send({success: false});
          }
          else {
            connection.query('SELECT propertyid FROM document WHERE documentid = ?',[req.body.documentid],function(err,result2){
              if(err) {
                console.log(err);
                res.send({success: false});
              }
              else{
                req.body.propertyid = result2[0].propertyid;
                connection.query('SELECT COUNT(*) AS cnt FROM verification WHERE status = 1 AND propertyid = ?',[req.body.propertyid],function(err,result3){
                  if(err) {
                    console.log(err);
                    res.send({success: false});
                  }
                  else {
                    var cnt = result3[0].cnt;
                    if(cnt==3)
                    {
                        connection.query('UPDATE property SET verified = 1 WHERE propertyid = ?',[req.body.propertyid],function(err,result4){
                          if(err) {
                            console.log(err);
                            res.send({success: false});
                          }
                          else {
                            res.send({success: true,message:"Document is verified"});
                          }
                        });
                    }
                    else {
                      res.send({success: true,message:"Document is verified"});
                    }
                  }
                });
              }
            });
          }
        });
      }
    });
}
