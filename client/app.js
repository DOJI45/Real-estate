var app = angular.module("realApp", ['ngResource', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: '/views/login.html',
    controller: 'loginController'
  })
  .when('/signup', {
    templateUrl: '/views/signup.html',
    controller: 'loginController'
  })
  .when('/home',{
    templateUrl: '/views/home.html',
    controller: 'homeController'

  })
  .when('/employee', {
    templateUrl: '/views/employee.html',
    controller: 'employeeController'
  })
  .when('/property', {
    templateUrl: '/views/property.html',
    controller: 'homeController'
  })
  .when('/upload', {
    templateUrl: '/views/upload.html',
    controller: 'homeController'
  })
  .when('/notification', {
    templateUrl: '/views/notification.html',
    controller: 'homeController'
  })
  .when('/wishlist', {
    templateUrl: '/views/wishlist.html',
    controller: 'homeController'
  })
  .when('/uploadproperty',{
    templateUrl: '/views/upload.html',
    controller: 'redirectController'
  })
  .otherwise({
    redirectTo: '/login'
  })
})

app.controller('mainController', function($scope) {
  $scope.main = "Real Estate Management";
})
