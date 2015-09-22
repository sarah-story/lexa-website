define(['angular'], function(angular) {
  return angular.module('LexaApp.courseList', [])
  .filter('courseList', function() {
    return function(input, list) {
        return input.filter(function(input) {
            for (var i = 0; i < list.length; i++) {
                if (input.$id == list[i].$value) {
                    return false;
                }
            }
            return true;

        });
    };
  });
});