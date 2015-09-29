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
    var ref = new Firebase("https://lexa.firebaseio.com");
    $scope.user = $firebaseObject(ref.child('users').child(uid));
    $scope.lesson = {};
    $scope.srcUrl = "";
    $scope.course = $firebaseObject(ref.child('users').child(uid).child('courses').child(courseId));
    $scope.lessons = $firebaseArray(ref.child('users').child(uid).child('courses').child(courseId).child('content').orderByChild('order'));

    //Logout button
    $scope.unAuth = function() {
      ref.unauth();
    }

    //Set lesson for modal when user clicks on a lesson
    $scope.setLesson = function(lesson) {
      $("#youtubeVideoPlayer").attr('src', $scope.srcUrl);
      $scope.lesson = lesson;
      $('#myModal').modal('show');
    }

    //When the lesson detail modal is closed
    $scope.closeModal = function(lesson) {
      //Remove src from video to stop video from playing. Save src in case the user opens the 
      //lesson detail modal again
      if (lesson.type==='video') {
        $scope.srcUrl = $('#youtubeVideoPlayer').attr('src');
        $('#youtubeVideoPlayer').attr('src', '');
      }
      //Mark lesson as completed
      ref.child('users').child(uid).child('courses').child(courseId).child('content').child(lesson.$id).update({'done': true});
      ref.child('users').child(uid).child('courses').child(courseId).update({'completed': $scope.course.completed + 1});
      //if all lessons are now complete, mark course as done and show rating modal
      if ($scope.course.length === ($scope.course.completed + 1)) {
        ref.child('users').child(uid).child('courses').child(courseId).update({'done': true});
        $("#ratingModal").modal('show');
      }
    }

    //For rating modal
    $scope.like = function() {
      ref.child('publishedCourses').child($scope.course.id).child('rating').transaction(function (current_value) {
        return (current_value || 0) + 1;
      });
      $("#ratingModal").modal('hide');
    }

    //For rating modal
    $scope.dislike = function() {
      ref.child('publishedCourses').child($scope.course.id).child('rating').transaction(function (current_value) {
        return (current_value || 0) - 1;
      });
      $("#ratingModal").modal('hide');
    }

  }]);
});