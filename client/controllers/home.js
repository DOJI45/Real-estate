var app = angular.module("realApp");

app.controller("homeController",function($scope, $http, $resource, $route,$window) {

  var notifications = $resource('/getnotifications?username='+$window.localStorage["user"]);
  notifications.query(function(result){
   $scope.notificationv = result[0].data.result1;
   $scope.notificationi = result[0].data.result2;
   console.log($scope.notificationv);
   console.log($scope.notificationi);

   })

  var property = $resource('/getproperty?username='+$window.localStorage["user"]);
  property.query(function(result){
    $scope.property = result[0].data;
    //console.log($scope.property);
  })

var data = {};
data.location = "Bengaluru";

$scope.user = $window.localStorage["user"];

  $scope.addwishlist = function(data){
    data.username = $window.localStorage["user"];
    $scope.cur = $window.localStorage["user"] | null;
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

  $scope.uploadproperty = function(data){
    data.username = $window.localStorage["user"];
    $http({
      url: '/uploadproperty',
      method: 'post',
      data:data
    }).then(function(data) {
      if(data.data.success) {
        alert("Property add SUCCESSFULLY");
      }
      else {
        alert(data.data.message);
      }
    }, function(err){});
  }


  $scope.interested = function(id){
    data = {};
    data.propertyid = id;
    data.username = $window.localStorage["user"];
    //alert(data.username);
    //alert(JSON.stringify(data));
    $http({
      url: '/interested',
      method: 'post',
      data:data
    }).then(function(data) {
      if(data.data.success) {
        alert("Your Interest is Recorded SUCCESSFULLY");
      }
      else {
        alert("Your Interest is Recorded SUCCESSFULLY");
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
