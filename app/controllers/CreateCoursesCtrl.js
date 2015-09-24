define(['angular', 'ngRoute'], function(angular, ngRoute) {
  return angular.module('LexaApp.CreateCoursesCtrl', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/create_courses', {
      templateUrl: 'partials/create_courses.html',
      controller: 'CreateCoursesCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    });
  }])
  .controller('CreateCoursesCtrl',["$scope","$location","currentAuth","$firebaseObject","$firebaseArray","$firebaseAuth",function($scope, $location, currentAuth, $firebaseObject, $firebaseArray, $firebaseAuth) {
    
    var uid = currentAuth.uid;
    var ref = new Firebase("https://lexa.firebaseio.com");
    $scope.user = $firebaseObject(ref.child('users').child(uid));
    
    $scope.courses = $firebaseArray(ref.child('courses').orderByChild('uid').equalTo(uid));

    $scope.unAuth = function() {
      ref.unauth();
    };

    $scope.addCourse = function() {
      ref.child("courses").push({
        'title': $scope.newCourseTitle,
        'description': $scope.description,
        'uid': uid
      });
      $scope.newCourseTitle = "";
      $scope.description = "";
    };

    $scope.addModal = function() {
      $("#addModal").modal('show');
    }

  }]);
});