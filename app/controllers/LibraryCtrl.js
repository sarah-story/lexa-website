define(['angular', 'ngRoute','ngAnimate','bootstrapTour'], function(angular, ngRoute, ngAnimate, bootstrapTour) {
  return angular.module('LexaApp.LibraryCtrl', ['ngRoute', 'ngAnimate'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/library', {
      templateUrl: 'partials/library.html',
      controller: 'LibraryCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    });
  }])
  .controller('LibraryCtrl',["$scope","$location","$compile","currentAuth","$firebaseObject","$firebaseArray","$firebaseAuth",function($scope, $location, $compile, currentAuth, $firebaseObject, $firebaseArray, $firebaseAuth) {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    var uid = currentAuth.uid;
    var ref = new Firebase("https://lexa.firebaseio.com");
    $scope.user = $firebaseObject(ref.child('users').child(uid));
    $scope.tags = $firebaseArray(ref.child('tags'));
    $scope.libraryCourses = $firebaseArray(ref.child('publishedCourses'));
    $scope.course = {};
    var list = $firebaseArray(ref.child('users').child(uid).child('courseList'));

    //Logout button
    $scope.unAuth = function() {
      ref.unauth();
    };

    //Add course to user's courses
    $scope.takeCourse = function(course) {
      ref.child('users').child(uid).child('courses').push({
        'title': course.title,
        'description': course.description,
        'uid': course.uid,
        'content': course.content,
        'done': false,
        'id': course.$id,
        'length': course.length,
        'completed': 0, 
        'image': course.image,
        'tag': course.tag
      });
      ref.child('users').child(uid).child('courseList').push(course.$id);
    };

    //Show course detail for selected course
    $scope.showDetail = function(course) {
      $scope.course = course;
      $('#detailModal').modal('show');
    }


    //Check to see if the user has taken the course.
    //If they have, disable 'take course' button
    $scope.takenCourse = function(course) {
      for (var i = 0; i < list.length; i++) {
        if (course.$id === list[i].$value) {
          return "disabled";
        }
      }
    }    

  }]);
});