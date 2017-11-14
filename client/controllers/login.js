
var app = angular.module("realApp");

app.controller('loginController', function($scope,$resource, $location, $http,$window) {

    $scope.main = "Login";
    $scope.username = "";
    $scope.password = "";
    $scope.type = "user";

  var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");


  $scope.passwordStrength = {
                    "float": "left",
                    "width": "200px",
                    "height": "15px",
                    "margin-left": "160px"
                };
  $scope.analyze = function(value) {
                    if(strongRegex.test(value)) {
                        $scope.passwordStrength["background-color"] = "green";
                    } else if(mediumRegex.test(value)) {
                        $scope.passwordStrength["background-color"] = "orange";
                    } else {
                          $scope.passwordStrength["background-color"] = "red";
                    }
                  }
    $scope.loginn = function() {
      if($scope.type=="user"){
        $http({
          url: '/login',
          method: 'post',
          data: {
            "username": $scope.username,
            "password": $scope.password
          }
        }).then(function(data) {
          if(data.data.success) {
            $location.path('/home');
            $window.localStorage["user"] = $scope.username;
          }
          else {
            alert(data.data.message);
          }
        }, function(err){})
      }
      else {
        $http({
          url: '/emplogin',
          method: 'post',
          data: {
            "username": $scope.username,
            "password": $scope.password
          }
        }).then(function(data) {
          if(data.data.success) {
            $location.path('/employee');
            $window.localStorage["user"] = $scope.username;
          }
          else {
            alert(data.data.message);
          }
        }, function(err){})
      }
    }



  $scope.signup = function(data1) {
    data1.type="user";
    $http({
      url: '/signup',
      method: 'post',
      data: data1
    }).then(function(data) {
      alert(data.data.message)
      if(data.data.success) {
        $location.path('/login');
      }
    }, function(err){})
  }
});





app.controller("redirectController",function($scope, $http, $resource, $route,$window,$location) {
  $location.path('/upload');
});
