define(['angular', 'ngRoute'], function(angular, ngRoute) {
  return angular.module('LexaApp.CreateCourseDetailCtrl', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/create_course/:id', {
      templateUrl: 'partials/create_course_detail.html',
      controller: 'CreateCourseDetailCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    });
  }])
  .controller('CreateCourseDetailCtrl',["$scope","$location","currentAuth","$firebaseObject","$firebaseArray","$firebaseAuth", "$routeParams","$sce",function($scope, $location, currentAuth, $firebaseObject, $firebaseArray, $firebaseAuth, $routeParams) {
    
    var courseId = $routeParams.id;
    var uid = currentAuth.uid;
    var ref = new Firebase("https://lexa.firebaseio.com");
    $scope.user = $firebaseObject(ref.child('users').child(uid));
    
    $scope.course = $firebaseObject(ref.child('courses').child(courseId));
    $scope.lessons = $firebaseArray(ref.child('courses').child(courseId).child('content'));
    $scope.course.$loaded(function(data) {
      $scope.courseDescription = data.description;
    });
    $scope.lessons = $firebaseArray(ref.child('courses').child(courseId).child('content'));

    $scope.unAuth = function() {
      ref.unauth();
    }

    $scope.saveDescription = function() {
      ref.child('courses').child(courseId).child('description').set($scope.courseDescription);
    };

    $scope.addUrl = function() {
      ref.child('courses').child(courseId).child('content').push({
        'data': $scope.newUrl,
        'title': $scope.urlTitle,
        'url': $scope.newUrl,
        'type': 'url',
        'done': false
      });
      $scope.newUrl = "";
      $scope.urlTitle = "";
    }

    $scope.publishCourse = function() {
      ref.child('publishedCourses').push({
        'title': $scope.course.title,
        'description': $scope.course.description,
        'uid': $scope.course.uid,
        'content': $scope.course.content,
        'length': $scope.lessons.length
      });
      ref.child('courses').child(courseId).remove();
    };

  }]);
});