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

    window.mobilecheck = function() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    }
    if (window.mobilecheck) {
      $location.path('/mobile');
    }
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
