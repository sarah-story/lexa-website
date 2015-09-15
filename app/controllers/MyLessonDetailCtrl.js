define(['angular', 'ngRoute'], function(angular, ngRoute) {
  return angular.module('LexaApp.MyLessonDetailCtrl', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/my_course/:id/view_lesson/:lessonId', {
      templateUrl: 'partials/my_lesson_detail.html',
      controller: 'MyLessonDetailCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    });
  }])
  .controller('MyLessonDetailCtrl',["$scope","$location","currentAuth","$firebaseObject","$firebaseArray","$firebaseAuth", "$routeParams",function($scope, $location, currentAuth, $firebaseObject, $firebaseArray, $firebaseAuth, $routeParams) {
    var lessonId = $routeParams.lessonId;
    var courseId = $routeParams.id;
    var uid = currentAuth.uid;
    var ref = new Firebase("https://lexa.firebaseio.com");
    $scope.user = $firebaseObject(ref.child('users').child(uid));

    $scope.course = $firebaseObject(ref.child('users').child(uid).child('courses').child(courseId));
    $scope.lesson = $firebaseObject(ref.child('users').child(uid).child('courses').child(courseId).child('content').child(lessonId));

    $scope.done = function() {
      ref.child('users').child(uid).child('courses').child(courseId).child('content').child(lessonId).update({'done': true});
    }
  }]);
});