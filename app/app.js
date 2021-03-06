define([
  'angular',
  'ngRoute',
  '_firebase',
  'angularfire',
  'bootstrap',
  './controllers/LoginCtrl',
  './controllers/CreateAccountCtrl',
  './controllers/HomeCtrl',
  './controllers/CreateCoursesCtrl',
  './controllers/CreateCourseDetailCtrl',
  './controllers/MyCourseDetailCtrl',
  './controllers/LibraryCtrl',
  './factories/Auth',
  './filters/unsafe',
  './filters/url',
  './filters/courseList',
  './directives/sortable'
  ], function(angular, ngRoute, _firebase, angularfire, LoginCtrl, CreateAccountCtrl, HomeCtrl, CreateCoursesCtrl, CreateCourseDetailCtrl, MyCourseDetailCtrl, LibraryCtrl, Auth, unsafe, url, courseList, sortable) {
    return angular.module('LexaApp', [
      "ngRoute",
      "firebase",
      "LexaApp.LoginCtrl",
      "LexaApp.CreateAccountCtrl",
      "LexaApp.HomeCtrl",
      "LexaApp.CreateCoursesCtrl",
      "LexaApp.CreateCourseDetailCtrl",
      "LexaApp.MyCourseDetailCtrl",
      "LexaApp.LibraryCtrl",
      "LexaApp.Auth",
      "LexaApp.unsafe",
      "LexaApp.url",
      "LexaApp.courseList",
      "LexaApp.sortable"
    ]).run(["$rootScope", "$location", function($rootScope, $location) {
      $rootScope.$on("$routeChangeStart", function(event, next, previous) {
        $("body").tooltip({ selector: '[data-toggle=tooltip]' });
      });
      $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
          $location.path("/login");
        }
      });
    }]).config(['$routeProvider', function($routeProvider) {
      //The main page is declared here, but all other routes are declared in
      //their controllers
      $routeProvider.when('/mobile', {
        templateUrl: 'partials/mobile.html'
      }).otherwise({redirectTo: '/'});
    }]);
  });
