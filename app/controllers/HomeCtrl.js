define(['angular', 'ngRoute'], function(angular, ngRoute) {
  return angular.module('LexaApp.HomeCtrl', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl',
      resolve: {
        "currentAuth": ["Auth", function(Auth) {
          return Auth.$requireAuth();
        }]
      }
    });
  }])
  .controller('HomeCtrl',["$scope","$location","$compile","currentAuth","$firebaseObject","$firebaseArray","$firebaseAuth",function($scope, $location, $compile, currentAuth, $firebaseObject, $firebaseArray, $firebaseAuth) {
    
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    var uid = currentAuth.uid;
    var ref = new Firebase("https://lexa.firebaseio.com");
    $scope.user = $firebaseObject(ref.child('users').child(uid));

    $scope.unAuth = function() {
      console.log('click');
      ref.unauth();
    };

    $scope.libraryCourses = $firebaseArray(ref.child('publishedCourses'));
    $scope.userCourses = $firebaseArray(ref.child('users').child(uid).child('courses'));

    $scope.takeCourse = function(course) {
      ref.child('users').child(uid).child('courses').push({
        'title': course.title,
        'description': course.description,
        'uid': course.uid,
        'content': course.content,
        'done': false,
        'id': course.$id,
        'length': course.length,
        'completed': 0
      });
      ref.child('users').child(uid).child('courseList').push({'id': course.$id});
    };

    $("#logout").click(function() {
      console.log('click');
    })

  }]);
});