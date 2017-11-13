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
  var url_parts = url.parse(req.url, true);
  req.body.username = url_parts.query.username;
  connection.query('SELECT userid FROM users WHERE username = ?',[req.body.username],function(err,result){
    if(err) {
      console.log(err);
      res.send({success: false});
    }
    else {
      req.body.userid = result[0].userid;
      connection.query('SELECT propertyid FROM property,upload WHERE userid = ? AND verified = 1',[req.body.userid],function(err,result1){
        if(err) {
          console.log(err);
          res.send({success: false});
        }
        else {
          connection.query('SELECT username FROM users WHERE userid in (SELECT userid FROM interested WHERE propertyid in (SELECT propertyid FROM upload WHERE userid = ?))',[req.body.userid],function(err,result2){
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
  });
}

//Updating the wishlist by the user
module.exports.addwishlist = function(req, res) {
  var username = req.body.username;
  connection.query('SELECT userid FROM users WHERE username = ?',[username],function(err,result){
    if(err) {
      console.log(err);
      res.send({success: false});
    }
    else {
      console.log(result);
      req.body.userid = result[0].userid;
      connection.query('DELETE FROM wishlist WHERE buyerid = ?',[req.body.userid],function(err,result){
        if(err) {
          console.log(err);
          res.send({success: false});
        }
        else {
          connection.query('INSERT INTO wishlist(buyerid,type,rlow,rhigh,location) values(?,?,?,?,?)',[req.body.userid,req.body.type,req.body.rlow,req.body.rhigh,req.body.location],function(err,result1){
            if(err) {
              console.log(err);
              res.send({success: false});
            }
            else {
              //console.log(result1);
              res.send({success:true,message:"Your Wishlist is updated!"});
            }
          });
        }
      });
    }
  });
}

//GET all the relevant properties relevant to the user according to his wishlist
module.exports.getproperty = function(req,res) {
  var url_parts = url.parse(req.url, true);
  req.body.username = url_parts.query.username;
  connection.query('SELECT userid FROM users WHERE username = ?',[req.body.username],function(err,result){
    if(err) {
      console.log(err);
      res.send({success: false});
    }
    else {
      req.body.userid = result[0].userid;
      connection.query('SELECT * FROM property where verified = 1 AND price >= (SELECT rlow FROM wishlist WHERE buyerid = ?) AND price<= (SELECT rhigh FROM wishlist WHERE buyerid = ? AND location = (SELECT location FROM wishlist WHERE buyerid = ?))',[req.body.userid,req.body.userid,req.body.userid],function(err,result1){
        if(err) {
          console.log(err);
          res.send({success: false});
        }
        else {
            res.send({success:true,data:result1});
        }
      });
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
          res.send({success:true,"message":"Your response is recorded"});
    }
  });
}

//Uploading the property detail
module.exports.uploadproperty = function(req, res) {
  //console.log(req.body);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

    req.body.khata = Math.floor(Math.random() * 1000000+1);
    req.body.tax = Math.floor(Math.random() * 1000000+1);
    req.body.encum = Math.floor(Math.random() * 1000000+1);

var image = req.files.image;
var khata = req.files.khata;
var tax = req.files.tax;
var encumberation = req.files.encumberation;
req.body.propertyid = Math.floor(Math.random() * 1000000+1);
image.mv('client/upload/'+req.body.propertyid+'image.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
    else {
      khata.mv('client/upload/'+req.body.propertyid+'khata.pdf',function(err){
        if(err)
          return res.status(500).send(err);
          else {
              tax.mv('client/upload/'+req.body.propertyid+'tax.pdf',function(err){
                if(err)
                  return res.status(500).send(err);
                else {
                  encumberation.mv('client/upload/'+req.body.propertyid+'encum.pdf',function(){
                    if(err)
                      return res.status(500).send(err);
                      else {
                        connection.query('SELECT userid FROM users WHERE username = ?',[req.body.username],function(err,result){
                          if(err) {
                            console.log(err);
                            res.send({success: false, message: "USER NOT FOUND"});
                          }
                          else{
                            req.body.userid = result[0].userid;

                          connection.query('INSERT INTO property(propertyid,price,type,location,adress,image) values(?,?,?,?,?,?)',[req.body.propertyid,req.body.price,req.body.type,req.body.location,req.body.adress,'/client/upload/'+req.body.propertyid+'image.jpg'],function(err,result){
                            if(err) {
                              console.log(err);
                              res.send({success: false, message: "FAILED TO UPDATE"});
                            }
                            else {

                              console.log(req.body);
                              connection.query('INSERT INTO document(documentid,type,propertyid,image) values(?,?,?,?)',[req.body.khata,'khata',req.body.propertyid,'/client/upload/'+req.body.propertyid+'khata.pdf'],function(err,result){
                                if(err) {
                                  console.log(err);
                                  res.send({success: false});
                                }
                                else {
                                  console.log('inserted documentid is '+ req.body.khata  );
                                  connection.query('INSERT INTO verification(documentid,employeeid) values(?,?)',[req.body.khata,1],function(err,result1){
                                    if(err) {
                                      console.log(err);
                                      res.send({success: false});
                                    }
                                    else {
                                      connection.query('INSERT INTO document (documentid,type,propertyid,image) values(?,?,?,?)',[req.body.tax,'tax',req.body.propertyid,'/client/upload/'+req.body.propertyid+'tax.pdf'],function(err,result1){
                                        if(err) {
                                          console.log(err);
                                          res.send({success: false});
                                        }
                                        else {
                                          console.log('inserted documentid '+req.body.tax );
                                          connection.query('INSERT INTO verification(documentid,employeeid) values(?,?)',[req.body.tax,2],function(err,result1){
                                            if(err) {
                                              console.log(err);
                                              res.send({success: false});
                                            }
                                            else {
                                              connection.query('INSERT INTO document (documentid,type,propertyid,image) values(?,?,?,?)',[req.body.encum,'encumberation',req.body.propertyid,'/client/upload/'+req.body.propertyid+'encum.pdf'],function(err,result){
                                                if(err) {
                                                  console.log(err);
                                                  res.send({success: false});
                                                }
                                                else {
                                                  console.log('inserted documentid '+req.body.encum );
                                                  connection.query('INSERT INTO verification(documentid,employeeid) values(?,?)',[req.body.encum,3],function(err,result){
                                                    if(err) {
                                                      console.log(err);
                                                      res.send({success: false});
                                                    }
                                                    else {
                                                      console.log("Success");
                                                      connection.query('INSERT INTO upload(userid,propertyid) values(?,?)',[req.body.userid,req.body.propertyid],function(err,response){
                                                        if(err) {
                                                          console.log(err);
                                                          res.send({success: false});
                                                        }
                                                        console.log("Executed successfully");
                                                        res.send({success:true,message:"Your property is uploaded"});
                                                      });

                                                    }
                                                  });
                                                }
                                              });

                                            }
                                          });
                                        }
                                      });

                                    }
                                  });
                                }
                              });

                            }
                          });
                          }
                        });
                      }
                  })
                }
              })
          }
      })
    }
  });
}
