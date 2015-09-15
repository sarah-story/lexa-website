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
  './controllers/CreateLessonDetailCtrl',
  './controllers/CourseDetailCtrl',
  './controllers/LessonDetailCtrl',
  './controllers/MyCourseDetailCtrl',
  './controllers/MyLessonDetailCtrl',
  './factories/Auth',
  './filters/unsafe'
  ], function(angular, ngRoute, _firebase, angularfire, LoginCtrl, CreateAccountCtrl, HomeCtrl, CreateCoursesCtrl, CreateCourseDetailCtrl, CreateLessonDetailCtrl, CourseDetailCtrl, LessonDetailCtrl, MyCourseDetailCtrl, MyLessonDetailCtrl, Auth, unsafe) {
    return angular.module('LexaApp', [
      "ngRoute",
      "firebase",
      "LexaApp.LoginCtrl",
      "LexaApp.CreateAccountCtrl",
      "LexaApp.HomeCtrl",
      "LexaApp.CreateCoursesCtrl",
      "LexaApp.CreateCourseDetailCtrl",
      "LexaApp.CreateLessonDetailCtrl",
      "LexaApp.CourseDetailCtrl",
      "LexaApp.LessonDetailCtrl",
      "LexaApp.MyCourseDetailCtrl",
      "LexaApp.MyLessonDetailCtrl",
      "LexaApp.Auth",
      "LexaApp.unsafe"
    ]).run(["$rootScope", "$location", function($rootScope, $location) {
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
      $routeProvider.otherwise({redirectTo: '/'});
    }]);
  });