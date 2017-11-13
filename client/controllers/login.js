
var app = angular.module("realApp");

app.controller('loginController', function($scope,$resource, $location, $http,$window) {
$scope.main = "Login";
  $scope.username = "";
  $scope.password = "";
  $scope.type = "user";
    $scope.loginn = function() {
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
