define(['jquery','jqueryUi','angular', 'ngRoute', 'uiAce', 'marked'], function($, jqueryUi, angular, ngRoute, uiAce, marked) {
  return angular.module('LexaApp.CreateCourseDetailCtrl', ['ngRoute', 'ui.ace', 'LexaApp.sortable'])
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
    
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    var courseId = $routeParams.id;
    var uid = currentAuth.uid;
    var ref = new Firebase("https://lexa.firebaseio.com");
    
    $scope.textInput = 'text';
    $scope.user = $firebaseObject(ref.child('users').child(uid)); 
    $scope.course = $firebaseObject(ref.child('courses').child(courseId));
    $scope.lessons = $firebaseArray(ref.child('courses').child(courseId).child('content').orderByChild('order'));
    $scope.tags = $firebaseArray(ref.child('tags'));

    $scope.addContent = function() {
      $("#addContent").modal('show');
    }

    $scope.compileMarkdown = function() {
      $scope.lesson.data = marked($scope.lesson.markdown);
    }

    $scope.saveLesson = function() {
      if ($("#text").hasClass('active')) {
        if ($scope.textInput === 'text') {
          $scope.text = "<pre>" + $scope.text + "</pre>";
          ref.child('courses').child(courseId).child('content').push({
          'data': $scope.text,
          'title': $scope.textTitle,
          'url': 'Original Content',
          'type': 'text',
          'done': false,
          'order': $scope.lessons.length+1
        });
        } else if ($scope.textInput === 'markdown') {
          $scope.markdown = $scope.text;
          $scope.text = marked($scope.text);
          ref.child('courses').child(courseId).child('content').push({
            'data': $scope.text,
            'markdown': $scope.markdown,
            'title': $scope.textTitle,
            'url': 'Original Content',
            'type': 'text',
            'done': false,
            'order': $scope.lessons.length+1
          });
        } else {
          ref.child('courses').child(courseId).child('content').push({
            'data': $scope.text,
            'title': $scope.textTitle,
            'url': 'Original Content',
            'type': 'text',
            'done': false,
            'order': $scope.lessons.length+1
          });
        }
        $scope.text = "";
        $scope.textTitle = "";
        $("#addContent").modal('hide');
      } else {
        ref.child('courses').child(courseId).child('content').push({
          'data': $scope.url,
          'title': $scope.urlTitle,
          'url': $scope.url,
          'type': 'url',
          'done': false
        });
        $("#addContent").modal('hide');
        $scope.url = "";
        $scope.urlTitle = "";
      }
    };

    $scope.setLesson = function(lesson) {
      $scope.lesson = $firebaseObject(ref.child('courses').child(courseId).child('content').child(lesson.$id));
      $('#myModal').modal('show');
    };

    $scope.reorder = function() {
      $('#reorderModal').modal('show');
    }

    $scope.saveOrder = function() {
      for (var i=0; i<$scope.lessons.length; i++) {
        $scope.lessons[i].order=i+1;
        $scope.lessons.$save(i);
      }
    }

    $scope.publishCourse = function() {
      var error = false;
      if (!$scope.course.title || $scope.course.title === "") {
        $("#titleInput").tooltip('show');
        $("html, body").animate({ scrollTop: 0 }, "slow");
        error = true;
      }
      if (!$scope.course.description || $scope.course.description === "") {
        $("#descriptionInput").tooltip('show');
        $("html, body").animate({ scrollTop: 0 }, "slow");
        error = true;
      }
      if ($scope.lessons.length === 0) {
        alert('The course must have content');
        $("html, body").animate({ scrollTop: 0 }, "slow");
        error = true;
      }
      if (!$scope.course.image || $scope.course.image === "") {
        $("#imageInput").tooltip('show');
        $("html, body").animate({ scrollTop: 0 }, "slow");
        error = true;
      }
      if (!$scope.course.tag || $scope.course.tag === "") {
        $("#tagInput").tooltip('show');
        $("html, body").animate({ scrollTop: 0 }, "slow");
        error = true;
      }
      if (!error) {
        ref.child('publishedCourses').push({
          'title': $scope.course.title,
          'description': $scope.course.description,
          'uid': $scope.course.uid,
          'content': $scope.course.content,
          'length': $scope.lessons.length,
          'image': $scope.course.image,
          'tag': $scope.course.tag
        });
        ref.child('courses').child(courseId).remove();
        $location.path("/create_courses");
      }
    };

    $('#titleInput').tooltip({
      title: 'Title is required',
      trigger: 'manual'
    });
    $('#descriptionInput').tooltip({
      title: 'Description is required',
      trigger: 'manual'
    });
    $('#imageInput').tooltip({
      title: 'Image is required',
      trigger: 'manual'
    });
    $('#tagInput').tooltip({
      title: 'Category is required',
      trigger: 'manual'
    });

  }]);
});