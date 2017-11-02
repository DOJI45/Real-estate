var mysql      = require('mysql');
var url        = require('url');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@Shar1234',
  database : 'realestate'
});


module.exports.login = function(req, res) {
  console.log(req.body)
  console.log('sharah');
  connection.query('SELECT * FROM users WHERE (username = ?)', [ req.body.username ], function (error, result, fields) {
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

module.exports.signup = function(req, res) {
  connection.query('INSERT INTO users(username,email) values(?,?)', [req.body.username, req.body.email], function(err, result) {
    if(err) {
      console.log(err);
      res.send({"success": false, message: "USERNAME OR PASSWORD ALREADY TAKEN"});
    }
    else {
      connection.query('UPDATE users SET name = ?,password = ?,phone = ? WHERE username = ?',[req.body.name,req.body.password, req.body.phone, req.body.username], function (error, result, fields) {
        if(error) {
          console.log(error);
          res.send({success: false, message: "Unable to update to database"});
        }
        else {
          res.send({success: true, message: "SUCCESSFULLY REGISTERED"});
        }
      });

    }
  });
}
