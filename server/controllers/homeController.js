var mysql      = require('mysql');
var url        = require('url');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '@Shar1234',
  database : 'realestate'
});

//GET the notifications
module.exports.getnotifications = function(req,res) {
  connection.query('SELECT propertyid FROM property WHERE userid = ? AND verified = 1',[req.body.userid],function(err,result){
    if(err) {
      console.log(err);
      res.send({success: false});
    }
    else {
      connection.query('SELECT username FROM users WHERE userid in (SELECT userid FROM interested WHERE propertyid in (SELECT propertyid FROM upload WHERE userid = ?))',[req.body.userid],function(err,res){
        if(err) {
          console.log(err);
          res.send({success: false});
        }
        else {
          res.send([{success: true,data:{result,res}}]);
        }
      });
    }
  });
}

module.exports.addwishlist = function(req, res) {
  connection.query('DELETE FROM wishlist WHERE buyerid = ?',[req.body.userid],function(err,result){
    if(err) {
      console.log(err);
      res.send({success: false});
    }
    else {
      connection.query('INSERT INTO wishlist(buyerid,type,rlow,rhigh,location) values(?,?,?,?,?)',[req.body.userid,req.body.type,req.body.rlow,req.body.rhigh,req.body.location],function(err,result){
        if(err) {
          console.log(err);
          res.send({success: false});
        }
        else {
          res.send(success:true,"message":"Your Wishlist is updated!");
        }
      });
    }
  });
}
