define(['angular', 'ngRoute'], function(angular, ngRoute) {
  return angular.module('LexaApp.LoginCtrl', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    });
  }])
  .controller('LoginCtrl', function($scope, $location, $rootScope) {
    
    $('#login-button').tooltip({
      title: 'Incorrect Email or Password. Try again.',
      trigger: 'manual',
      placement: 'right'
    });
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });

    var ref = new Firebase("https://lexa.firebaseio.com");

    $scope.login = function() {
      ref.authWithPassword({
        email    : $scope.email,
        password : $scope.password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
          $("#login-button").tooltip('show');
        } else {
          console.log("Authenticated successfully with payload:", authData);
          $scope.authData = authData;
          $location.path("#/").replace();
          $scope.$apply();
        }
      });
    };

    $scope.newUser = function() {
      $location.path("/create_account").replace();
    };

  });
});
