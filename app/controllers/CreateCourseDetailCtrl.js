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
    
    $scope.textInput = "text";
    $scope.user = $firebaseObject(ref.child('users').child(uid)); 
    $scope.course = $firebaseObject(ref.child('courses').child(courseId));
    $scope.lessons = $firebaseArray(ref.child('courses').child(courseId).child('content'));

    $scope.addContent = function() {
      $("#addContent").modal('show');
    }

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

    $scope.saveLesson = function() {
      if ($("#text").hasClass('active')) {
        if ($scope.textInput == 'text') {
          $scope.text = "<pre>" + $scope.text + "</pre>";
        }
        ref.child('courses').child(courseId).child('content').push({
          'data': $scope.text,
          'title': $scope.textTitle,
          'url': 'Original Content',
          'type': 'text',
          'done': false
        });
        $scope.text = "";
        $scope.textTitle = "";
      } else {
        ref.child('courses').child(courseId).child('content').push({
          'data': $scope.url,
          'title': $scope.urlTitle,
          'url': $scope.url,
          'type': 'url',
          'done': false
        });
        $scope.url = "";
        $scope.urlTitle = "";
      }
    };

    $scope.setLesson = function(lesson) {
      $scope.lesson = lesson;
      $('#myModal').modal('show');
    };

    $scope.publishCourse = function() {
      ref.child('publishedCourses').push({
        'title': $scope.course.title,
        'description': $scope.course.description,
        'uid': $scope.course.uid,
        'content': $scope.course.content,
        'length': $scope.lessons.length,
        'image': $scope.course.image
      });
      ref.child('courses').child(courseId).remove();
    };

  }]);
});