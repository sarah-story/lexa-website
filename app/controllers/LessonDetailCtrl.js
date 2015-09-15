define(['angular', 'ngRoute'], function(angular, ngRoute) {
  return angular.module('LexaApp.LessonDetailCtrl', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view_course/:id/view_lesson/:lessonId', {
      templateUrl: 'partials/lesson_detail.html',
      controller: 'LessonDetailCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    });
  }])
  .controller('LessonDetailCtrl',["$scope","$location","currentAuth","$firebaseObject","$firebaseArray","$firebaseAuth", "$routeParams",function($scope, $location, currentAuth, $firebaseObject, $firebaseArray, $firebaseAuth, $routeParams) {
    var lessonId = $routeParams.lessonId;
    var courseId = $routeParams.id;
    var uid = currentAuth.uid;
    var ref = new Firebase("https://lexa.firebaseio.com");
    $scope.user = $firebaseObject(ref.child('users').child(uid));

    $scope.lesson = $firebaseObject(ref.child('publishedCourses').child(courseId).child('content').child(lessonId));

  }]);
});