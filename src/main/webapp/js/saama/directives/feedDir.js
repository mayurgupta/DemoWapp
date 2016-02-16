angular
    .module('feedDir', [])
    .directive('feed', function() {
      return {
        restrict: 'E',
        template: '<span class="comment borderRight{{feed.emotion}}"><div class="commentData bg-none borderLeft {{feed.opinion | lowercase}}"><div class="commentWrapper">{{data}}<span data-ng-show="data" class="link"><a href ng-click="toggle()">{{action}}</a></span></div><span class="light-gray detailedInfo"><span>Opinion: <span class="gray">{{feed.opinion | capFirstLetter}}</span></span><span>Emotion: <span class="gray">{{feed.emotion | capFirstLetter}}</span></span><span>Rating: <span class="gray number">{{feed.rating}}</span></span><div class="clearfix"></div><span>Source: <span class="gray">{{feed.source | capFirstLetter}}</span></span><span>Date: <span class="gray number">{{feed.dateCreated | utcdate:"yyyy-MMM-dd"}}</span></span></span></div></span>',
        controller: function($scope, $attrs) {

          $scope.shortComment = function(full) {
            if (full && full.length >= 100) { return full.substring(0, 100) + " ..."; }
            return full;
          };

          $scope.toggle = function() {
            $scope.action = ($scope.action === "Show" ? "Hide" : "Show");
            var comment = $attrs.comment || "review";
            if ($scope.action === "Show") {
              $scope.data = $scope.shortComment($scope.feed[comment]);
            } else if ($scope.action === "Hide") {
              $scope.data = $scope.feed[comment];
            }
          };
        },

        link: function($scope, $attrs) {
          $scope.data = $scope.shortComment($scope.feed[$attrs.comment || "review"]);
          if ($scope.feed.review.length > 100) {
            $scope.action = "Show";
          }
        }
      };
    })

    .directive('feeds', [
        "DashboardService",
        function(DashboardService) {
          return {
            restrict: 'E',
            scope: {
              feeds: "=value",
              totalItems: "=feedmaxcount",
              parentPage: "=feedpage",
              exp: "=export"
            },
            template: '<div data-ng-switch on="totalItems>10"><pager data-ng-switch-when="true" on-select-page="pageChanged(page)" total-items="$parent.totalItems" page="$parent.parentPage" previous-text="&lsaquo; Previous" next-text="Next &rsaquo;"></pager><div data-ng-switch-default></div></div>' + '<div id="feeds" class="scrollToTop"><div data-ng-repeat="feed in feeds"><feed data-ng-model="feed" data-editable="{{isEditable}}" data-deletable="{{isDeletable}}"></feed></div></div>' + '<div class="exportLink" data-ng-show="isExportable"><a class="pull-right" href data-ng-click="exportUrl()" style="margin-right:5px; font-size:15px;" title="Export As Csv">Export<i class="icon-export"></i></a></div>',
            link: function($scope, $attrs) {

              $scope.isEditable = ($attrs.editable || false);
              $scope.isDeletable = ($attrs.deletable || false);

              $scope.$watch("parentPage", function(next) {
                if (!angular.isDefined(next) || !angular.isDefined($scope.feeds) || $scope.feeds.length === 0) { return; }
                if (next !== 0) {
                  if ($scope.feeds.length > 0) {
                    $scope.$parent.loadFeeds((next - 1) * 10, $scope.feeds[0].hospitalId);
                  }
                } else {
                  if ($scope.feeds.length > 0) {
                    $scope.$parent.loadFeeds(0, $scope.feeds[0].hospitalId);
                  }
                }
              });

              $scope.isExportable = true;
              $scope.$watch("feeds", function() {
                if ($scope.feeds) {
                  if ($scope.feeds[0]) {
                    $scope.isExportable = true;
                  } else {
                    $scope.isExportable = false;
                  }
                }
              });

              $scope.exportUrl = function() {
                if (angular.isDefined($scope.exp) && $scope.feeds[0]) {
                  var params = $scope.exp($scope.feeds[0].hospitalId);
                  window.location.href = DashboardService.buildExportUrl(params);
                  return;
                }
              };
            }
          };
        }]);