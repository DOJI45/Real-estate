var app = angular.module("realApp");
//var app = angular.module("realApp", ['ngResource', 'ngRoute']);

app.controller("homeController",['$scope','$http','$resource','$route','$window'] function($scope, $http, $resource, $route,$window) {


    var notifications = $resource('/getnotifications');
    notifications.query(function(result){
     $scope.notifications = result[0].data;
    })

    var property = $resource('/getproperty');
    property.query(function(result){
      $scope.property = result[0].data;
    })


    $scope.uploadproperty = function(data){
      data.username = $window.localStorage["user"];
      alert(data.username);
      alert(JSON.stringify(data));
      $http({
        url: '/uploadproperty',
        method: 'post',
        data:data
      }).then(function(data) {
        if(data.data.success) {
          alert("Property uploaded SUCCESSFULLY");
        }
        else {

          alert(JSON.stringify(data.data));
        }
      }, function(err){});
    }

    $scope.addwishlist = function(data){
      data.username = $window.localStorage["user"];
      alert(data.username);
      alert(JSON.stringify(data));
      $http({
        url: '/addwishlist',
        method: 'post',
        data:data
      }).then(function(data) {
        if(data.data.success) {
          alert("Wishlist updated SUCCESSFULLY");
        }
        else {
          alert(data.data.message);
        }
      }, function(err){});
    }

    $scope.interested = function(data){
      data.username = $window.localStorage["user"];
      alert(data.username);
      alert(JSON.stringify(data));
      $http({
        url: '/interested',
        method: 'post',
        data:data
      }).then(function(data) {
        if(data.data.success) {
          alert("Wishlist updated SUCCESSFULLY");
        }
        else {
          alert(data.data.message);
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
