define(['angular', 'ngRoute'], function(angular, ngRoute) {
  return angular.module('LexaApp.MyCourseDetailCtrl', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/my_course/:id', {
      templateUrl: 'partials/my_course_detail.html',
      controller: 'MyCourseDetailCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    });
  }])
  .controller('MyCourseDetailCtrl',["$scope","$location","currentAuth","$firebaseObject","$firebaseArray","$firebaseAuth", "$routeParams",function($scope, $location, currentAuth, $firebaseObject, $firebaseArray, $firebaseAuth, $routeParams) {
    
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    var courseId = $routeParams.id;
    var uid = currentAuth.uid;
    console.log(uid);
    var ref = new Firebase("https://lexa.firebaseio.com");
    $scope.user = $firebaseObject(ref.child('users').child(uid));
    $scope.lesson = {};
    $scope.srcUrl = "";
    
    $scope.course = $firebaseObject(ref.child('users').child(uid).child('courses').child(courseId));
    $scope.lessons = $firebaseArray(ref.child('users').child(uid).child('courses').child(courseId).child('content').orderByChild('order'));

    $scope.unAuth = function() {
      ref.unauth();
    }

    $scope.setLesson = function(lesson) {
      console.log(lesson);
      $("#youtubeVideoPlayer").attr('src', $scope.srcUrl);
      $scope.lesson = lesson;
      $('#myModal').modal('show');
    }

    $scope.closeModal = function(lesson) {
      if (lesson.type==='video') {
        $scope.srcUrl = $('#youtubeVideoPlayer').attr('src');
        $('#youtubeVideoPlayer').attr('src', '');
      }
      ref.child('users').child(uid).child('courses').child(courseId).child('content').child(lesson.$id).update({'done': true});
      ref.child('users').child(uid).child('courses').child(courseId).update({'completed': $scope.course.completed + 1});
      if ($scope.course.length === ($scope.course.completed + 1)) {
        ref.child('users').child(uid).child('courses').child(courseId).update({'done': true});
        $("#ratingModal").modal('show');
      }
    }

    $scope.like = function() {
      ref.child('publishedCourses').child($scope.course.id).child('rating').transaction(function (current_value) {
        return (current_value || 0) + 1;
      });
      $("#ratingModal").modal('hide');
    }

    $scope.dislike = function() {
      ref.child('publishedCourses').child($scope.course.id).child('rating').transaction(function (current_value) {
        return (current_value || 0) - 1;
      });
      $("#ratingModal").modal('hide');
    }

  }]);
});