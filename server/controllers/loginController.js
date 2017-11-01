var mysql      = require('mysql');
var url        = require('url');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@Shar1234',
  database : 'realestate'
});


module.exports.signup = function(req, res) {
  connection.query('INSERT INTO users(username,email) value(?,?,?,?,?)', [req.body.username, req.body.email], function(err, result) {
    if(err) {
      console.log(err);
      res.send({"success": false, message: "USERNAME OR PASSWORD ALREADY TAKEN"});
    }
    else {
      connection.query('UPDATE users SET name = ? AND password = ? AND phone = ? WHERE username = ?',[req.body.name,req.body.password, req.body.phone, req.body.username], function (error, result, fields) {
        if(error) {
          console.log(error);
          res.send({success: false, message: "Unable to update to database"});
        }
        else {
          res.send({success: true, message: "SUCCESSFULLY REGISTERED"});
        }
      });
      })
    }
  });
}
