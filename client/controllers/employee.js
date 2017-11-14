var app = angular.module("realApp");
//var app = angular.module("realApp", ['ngResource', 'ngRoute']);
app.controller("employeeController", function($scope, $http, $resource, $route,$window) {


    var getverify = $resource('/getverify?username='+$window.localStorage["user"]);
    getverify.query(function(result){
      $scope.getverify = result[0].data;
      console.log($scope.getverify);
    })

    $scope.verify = function(id){
      data = {};
      data.username = $window.localStorage["user"];
      data.documentid = id;
      $http({
        url: '/verify',
        method: 'post',
        data:data
      }).then(function(data) {
        if(data.data.success) {
          alert("document is verified changes made in the database");
        }
        else {
          alert(JSON.stringify(data.data));
        }
      }, function(err){});
    }


        $scope.changepassword = function(changepass) {
            changepass.username = $window.localStorage["user"];
          $http({
            url: '/changepassword',
            method: 'post',
            data: changepass
          }).then(function(data) {
            if(data.data.success) {
              alert("PASSWORD CHANGES SUCCESSFULLY");
              $scope.newrecord = {}
            }
            else {
              alert("FAILED TO CHANGE PASSWORD")
            }
          }, function(err){});
        }
});
