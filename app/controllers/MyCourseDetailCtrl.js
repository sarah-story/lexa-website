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
    $scope.lessons = $firebaseArray(ref.child('users').child(uid).child('courses').child(courseId).child('content'));

    $scope.unAuth = function() {
      ref.unauth();
    }

    $scope.setLesson = function(lesson) {
      console.log(lesson);
      $("#youtubeVideoPlayer").attr('src', $scope.srcUrl);
      $scope.lesson = lesson;
      $('#myModal').modal('show');
    }

    $scope.closeModal = function(type) {
      if (type==='video') {
        $scope.srcUrl = $('#youtubeVideoPlayer').attr('src');
        $('#youtubeVideoPlayer').attr('src', '');
      }
    }

  }]);
});