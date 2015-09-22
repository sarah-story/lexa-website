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
    
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    var courseId = $routeParams.id;
    var uid = currentAuth.uid;
    var ref = new Firebase("https://lexa.firebaseio.com");
    $scope.user = $firebaseObject(ref.child('users').child(uid));
    
    $scope.course = $firebaseObject(ref.child('publishedCourses').child(courseId));
    $scope.lessons = $firebaseArray(ref.child('publishedCourses').child(courseId).child('content'));

    $scope.unAuth = function() {
      ref.unauth();
    }

    $scope.setLesson = function(lesson) {
      $scope.lesson = lesson;
      $('#myModal').modal('show');
    }

    $scope.takeCourse = function() {
      ref.child('users').child(uid).child('courses').push({
        'title': $scope.course.title,
        'description': $scope.course.description,
        'uid': $scope.course.uid,
        'content': $scope.course.content,
        'done': false,
        'id': $scope.course.$id,
        'length': $scope.course.length,
        'completed': 0,
        'image': $scope.course.image
      });
      ref.child('users').child(uid).child('courseList').push($scope.course.$id);
    };

  }]);
});