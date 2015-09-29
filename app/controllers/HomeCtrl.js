define(['angular', 'ngRoute','bootstrapTour'], function(angular, ngRoute, bootstrapTour) {
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
    var intro = "It can be hard to learn something new when you don't have a lot of time. Where do you begin? Who to trust? That's where Lexa comes in. Lexa provides a way for you to learn new skills without wasting your time rummaging through search results. All of the courses in Lexa's library are curated by experts and designed to maximize your time. Let's start with a tour.";

    $scope.unAuth = function() {
      ref.unauth();
    };

    $scope.libraryCourses = $firebaseArray(ref.child('publishedCourses'));
    $scope.userCourses = $firebaseArray(ref.child('users').child(uid).child('courses'));

    var tour = new Tour({
      onEnd: function (tour) {
        $scope.user.new = false;
        $scope.user.$save();
      },
      storage: false,
      steps: [
      {
        orphan: true,
        content: "<h1 class='tourIntro'>Meet</h1><div class='tourLogo'><span>L</span><span>E</span><span>X</span><span>A</span></div><div id='explanation'>Lexa provides a way for you to learn new skills without wasting your time rummaging through search results. All of the courses in Lexa's library are curated by experts and designed to maximize your time.<button class='btn btn-block' data-role='next'>Let's start with a tour</button><div>",
        backdrop: true
      },
      {
        element: "#currentCourses",
        content: "The courses you are currently taking will be displayed here<button class='btn btn-block' data-role='next'>Next</button>",
        backdrop: true,
        placement: 'top'
      },
      {
        element: "#completedCourses",
        content: "The courses you have completed will be displayed here<button class='btn btn-block' data-role='next'>Next</button>",
        backdrop: true,
        placement: 'top'
      },
      {
        element: "#homeTour",
        content: "These buttons will help you get around Lexa. The home button will bring you to the page we're currently on, where you can work on your current courses.<button class='btn btn-block' data-role='next'>Next</button>",
        placement: 'left'
      },
      {
        element: "#logoutTour",
        content: "When you're finished, you can click here to log out.<button class='btn btn-block' data-role='next'>Next</button>",
        placement: 'left'
      },
      {
        element: "#libTour",
        content: "The library is where you can select courses to take. Click on this button to go to the library and get started!",
        placement: 'left',
        reflex: true
      }
    ]});
    tour.init();

    $scope.user.$loaded(function() {
      if($scope.user.new) {
        tour.restart();
        setTimeout(function(){
          $(".tourIntro").slideUp();
        }, 5000);
      }
    });
  }]);
});
