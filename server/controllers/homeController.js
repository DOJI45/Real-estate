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

//Updating the wishlist by the user
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

//GET all the relevant properties relevant to the user according to his wishlist
module.exports.getproperty = function(req,res) {
  connection.query('SELECT * FROM property where verified = 1 AND price >= (SELECT rlow FROM wishlist WHERE buyerid = ?) AND price<= (SELECT rhigh FROM wishlist WHERE buyerid = ? AND location = (SELECT location FROM wishlist WHERE buyerid = ?))',[req.body.userid,req.body.userid,req.body.userid],function(err,result){
    if(err) {
      console.log(err);
      res.send({success: false});
    }
    else {
        res.send(success:true,data:result);
    }
  });
}

//Record the act of the user if he is interested in some of the property
module.exports.interested = function(req, res) {
  connection.query('INSERT INTO interested(userid,propertyid) values(?,?)',[req.body.userid,req.body.propertyid],function(err,result){
    if(err) {
      console.log(err);
      res.send({success: false});
    }
    else {
          res.send(success:true,"message":"Your response is recorded");
    }
  });
}
