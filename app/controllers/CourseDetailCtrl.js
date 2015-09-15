define(['angular', 'ngRoute'], function(angular, ngRoute) {
  return angular.module('LexaApp.CourseDetailCtrl', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view_course/:id', {
      templateUrl: 'partials/course_detail.html',
      controller: 'CourseDetailCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    });
  }])
  .controller('CourseDetailCtrl',["$scope","$location","currentAuth","$firebaseObject","$firebaseArray","$firebaseAuth", "$routeParams",function($scope, $location, currentAuth, $firebaseObject, $firebaseArray, $firebaseAuth, $routeParams) {
    
    var courseId = $routeParams.id;
    var uid = currentAuth.uid;
    var ref = new Firebase("https://lexa.firebaseio.com");
    $scope.user = $firebaseObject(ref.child('users').child(uid));
    
    $scope.course = $firebaseObject(ref.child('publishedCourses').child(courseId));
    $scope.lessons = $firebaseArray(ref.child('publishedCourses').child(courseId).child('content'));

    $scope.unAuth = function() {
      ref.unauth();
    }

  }]);
});