define(['angular', 'ngRoute'], function(angular, ngRoute) {
  return angular.module('LexaApp.CreateAccountCtrl', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/create_account', {
      templateUrl: 'partials/create_account.html',
      controller: 'CreateAccountCtrl'
    });
  }])
  .controller('CreateAccountCtrl', function($scope, $location) {
    var ref = new Firebase("https://lexa.firebaseio.com");

    $('#createName').tooltip({
      title: 'Name is required',
      trigger: 'manual',
      placement: 'right'
    });
    $('#createEmail').tooltip({
      title: 'Email is required',
      trigger: 'manual',
      placement: 'right'
    });
    $('#createPassword').tooltip({
      title: 'Password is required',
      trigger: 'manual',
      placement: 'right'
    });
    $('#create-button').tooltip({
      title: 'Account Exists',
      trigger: 'manual',
      placement: 'right'
    });
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

    $scope.create = function() {
      console.log($scope.name);
      console.log($scope.email);
      console.log($scope.password);
      var validUser = true;
      if ($scope.name === undefined) {
        $("#createName").tooltip('show');
        validUser = false;
      }
      if ($scope.email === undefined) {
        $("#createEmail").tooltip('show');
        validUser = false;
      }
      if ($scope.password === undefined) {
        $("#createPassword").tooltip('show');
        validUser = false;
      }
      if (validUser) {
        ref.createUser({
          email    : $scope.email,
          password : $scope.password
        }, function(error, userData) {
          if (error) {
            $("#create-button").tooltip('show');
            console.log("Error creating user:", error);
          } else {
            ref.child('users').child(userData.uid).set({
              'name': $scope.name,
              'email': $scope.email
            });
            ref.authWithPassword({
              email    : $scope.email,
              password : $scope.password
            }, function(error, authData) {
              if (error) {
                console.log("Login Failed!", error);
              } else {
                $scope.authData = authData;
                $location.path("#/").replace();
                $scope.$apply();
              }
            });
          }
        });
      }
    };
  });
});