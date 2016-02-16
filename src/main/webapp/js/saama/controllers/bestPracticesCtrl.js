// Best Practice Controller
function bestPracticeCtrl($scope, $location, $route, $anchorScroll) {
  /* Sub Tabs */
  $scope.tabs = [{
    title: "Patient Experience",
    icon: "icon-patientExperience",
    hash: "patientexperience",
    url: 'partials/patientExperience.html'
  }, {
    title: "Communication",
    icon: "icon-communication",
    hash: "communication",
    url: 'partials/communication.html'
  }, {
    title: "Care Outcome",
    icon: "icon-careOutcome",
    hash: "careoutcome",
    url: 'partials/careOutcomes.html'
  }, {
    title: "General Operations",
    icon: "icon-generalOperations",
    hash: "generaloperations",
    url: 'partials/generalOperations.html'
  }, {
    title: "Change Management",
    icon: "icon-changeManagement",
    hash: "changemanagement",
    url: 'partials/changeManagement.html'
  }];

  $scope.currentActiveTab = $scope.tabs[0];

 $scope.$on("$routeChangeSuccess", function(event, current, previous) {
    $scope.disableSelectors();
    var hash = current.pathParams.subtab, f = $scope.tabs.filter(function(t) {
      return t.hash === hash;
    });
    if (f && f.length > 0) {
      $scope.currentActiveTab = f[0];
      f[0].active = true;
    }
  });

  $scope.changeTab = function(template) {
    $location.path("/" + $route.current.hash + "/" + template.hash);
  };

  $scope.scrollUp = function() {
    $location.hash('top');
    $anchorScroll();
  };
}
bestPracticeCtrl.$inject = ['$scope', '$location', '$route', '$anchorScroll'];