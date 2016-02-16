var obj = [];

angular.module('scrollspyDir', []).directive('scrollSpy', function($timeout, $window, $document, $rootScope) {
  return {
    restrict: 'A',
    link: function(scope, elem, attr) {
      var i = 0;
      var a = elem.context.children;
      for (i = 0; i < a.length; i++) {
        if (a[i].id !== "" && a[i].offsetTop !== 0 && (a[i].ownerDocument.mozVisibilityState === "visible" || !a[i].ownerDocument.mozVisibilityStatewebkitHidden)) {
          obj.push({
            id: a[i].id,
            offset: a[i].offsetTop
          });
        }
      }

      var offset = parseInt(attr.scrollOffset, 10);
      $window.onscroll = function() {
        scope.$apply(scope.doScroll($window));

        var activeDiv = document.getElementsByClassName("active tab-pane");
        var el = activeDiv[0].getElementsByClassName("hangingMenu");

        var active = null;
        for (i = 0; i < obj.length; i++) {
          if (window.scrollY >= obj[i].offset - 330) {
            var a = elem.context.children;
            active = obj[i];
          }
        }
        var liElement = el[0].getElementsByTagName("li");
        if (active) {
          for (i = 0; i < liElement.length; i++) {
            var attr = liElement[i].getElementsByTagName("a");
            var ahref = attr[0].attributes["scroll-to"];

            if (ahref.nodeValue.toString() === active.id.toString()) {
              for (var j = 0; j < liElement.length; j++) {
                liElement[j].classList.remove("active");
              }
              liElement[i].classList.add("active");
            }
          }
        }
        var scrollUp = document.getElementsByClassName("scrollUp")[0];
        if (window.scrollY >= 150) {
          scrollUp.classList.remove("hidden");
        } else {
          scrollUp.classList.add("hidden");
        }
      };
    }
  };
}).directive('preventDefault', function() {
  return function(scope, element, attrs) {
    jQuery(element).click(function(event) {
      event.preventDefault();
    });
  };
}).directive('scrollToTop', ["$window", function() {
  return {
    restrict: "AC",
    link: function($scope, $element, $attrs) {

      $scope.$watch("feeds", function() {
        if ($scope.feeds && $scope.feeds.length !== 0) {
          $element.scrollTop(0);
        }
      });
    }
  };
}]).directive("scrollTo", ["$window", function($window) {
  return {
    restrict: "AC",
    compile: function() {

      function scrollInto(elementId, clickCount) {
        if (!elementId)
          $window.scrollTo(0, 0);
        // check if an element can be found with id attribute
        var el = document.getElementById(elementId);
        var yPos = 0;
        if (el) {
          el.scrollIntoView();
        }
        var scrolly = window.scrollY;
        window.scrollTo(0, scrolly - 70);
      }

      return function(scope, element, attr) {
        var clickCount = 0;
        element.bind("click", function(event) {
          clickCount++;
          scrollInto(attr.scrollTo, clickCount);
        });
      };
    }
  };
}]);