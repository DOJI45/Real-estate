var app = angular.module("realApp");


app.controller("employeeController", function($scope, $http, $resource, $route,$window) {


    var getverify = $resource('/getverify');
    getverify.query(function(result){
      $scope.getverify = result[0].data;
    })

    $scope.verify = function(data){
      data.username = $window.localStorage["user"];
      alert(data.username);
      alert(JSON.stringify(data));
      $http({
        url: '/verify',
        method: 'post',
        data:data
      }).then(function(data) {
        if(data.data.success) {
          console.log('document is verified changes made in the database');
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
