// Home Controller
function HomePageCtrl($scope, $location, $route, $rootScope) {
  var self = this;
  $rootScope.DhCluster = "DH Corporate";
  $scope.feeds = [];
  $scope.feedMaxCount = 0;
  $scope.view = {
    "Corporate": "Corporate",
    "Cluster": "Cluster"
  };
  /* Sub Tabs */
  $scope.tabs = [{
    title: "Social Health",
    icon: "icon-socialHealth",
    hash: "socialHealth",
    url: 'partials/socialHealth.html',
    ctrl: socialHealthCtrl,
    disabled: false
  }, {
    title: "Patient Voice",
    icon: "icon-patientVoice",
    hash: "patientVoice",
    url: 'partials/patientVoice.html',
    ctrl: patientVoiceCtrl,
    disabled: false
  }, {
    title: "Social Media Distribution",
    icon: "icon-socialMediaDistribution",
    hash: "socialMediaDistribution",
    url: 'partials/socialMedia.html',
    ctrl: socialMediaDistributionCtrl,
    disabled: false
  }, {
    title: "Timeline",
    icon: "icon-timeline",
    hash: "timeline",
    url: 'partials/timeline.html',
    ctrl: timelineCtrl,
    disabled: false
  }, {
    title: "Topic Analysis",
    icon: "icon-book",
    hash: "topicAnalysis",
    url: 'partials/topicAnalysis.html',
    ctrl: topicAnalysisCtrl,
    disabled: true
  }, {
    title: "National Rankings",
    icon: "icon-ranking",
    hash: "rankings",
    url: 'partials/ranking.html',
    ctrl: rankingsCtrl,
    disabled: false
  }, {
    title: "Competitor Analysis",
    icon: "icon-compititorAnalysis",
    hash: "compare",
    url: 'partials/competitiveAnalysis.html',
    ctrl: compareCtrl,
    disabled: false
  }, {
    title: "Employee Sentiment",
    icon: "icon-employeeSentiment",
    hash: "employeeSentiment",
    url: 'partials/employeeSentiment.html',
    ctrl: employeeSentimentCtrl,
    disabled: false
  }];

  self.disableTabs = ["rankings", "compare", "employeeSentiment"];

  self.enableTabs = ["topicAnalysis"];

  $scope.currentActiveTab = $scope.tabs[0];
  $scope.$on("$routeChangeSuccess", function(event, current, previous) {
    var hash = current.pathParams.subtab, f = $scope.tabs.filter(function(t) {
      return t.hash === hash;
    });
    if (f && f.length > 0) {
      $scope.currentActiveTab = f[0];
      self.handleTabs();
      if (self.disableTabs.indexOf($scope.currentActiveTab.hash) !== -1) {
        $scope.disableSelectAll();
      } else {
        $scope.enableSelectAll();
      }

      if ($scope.currentActiveTab.hash === "compare") {
        $scope.disableSelectors();
      } else {
        $scope.enableSelectors();
      }
      f[0].active = true;
    }
    $scope.tabs.forEach(function(i) {
      if ($location.path().split("/")[2] === i.hash) {
        var index1 = self.disableTabs.indexOf(i.hash);
        if (index1 !== -1) {
          $scope.hospital[$scope.hospital.length - 1].isinuse = true;
        } else {
          $scope.hospital[$scope.hospital.length - 1].isinuse = false;
        }
      }

    });
  });

  self.handleTabs = function() {

    if ($scope.hospitalModel && $scope.hospitalModel.name === "All") {

      $scope.tabs.forEach(function(i) {
        if ($scope.clusterModel && $scope.clusterModel.name === "DH Corporate") {
          var index1 = self.enableTabs.indexOf(i.hash);
          if (index1 !== -1) {
            i.disabled = false;
          }
        }
        var index = self.disableTabs.indexOf(i.hash);

        if (index !== -1) {
          i.disabled = true;
        }

      });
    } else {
      $scope.tabs.forEach(function(i) {
        i.disabled = false;
        var index1 = self.enableTabs.indexOf(i.hash);
        if (index1 !== -1) {
          i.disabled = true;
        }
      });
    }
  };

  $scope.$on("hospitalChange", function(event, hospital, isCluster) {
    if (hospital) {
      self.handleTabs();
      self.sendChangeEvent();
    }
  });

  $scope.changeTab = function(template) {
    $location.path("/" + $route.current.hash + "/" + template.hash);
  };

  self.sendChangeEvent = function() {
    $scope.$broadcast("update:" + $scope.currentActiveTab.hash, $scope.hospitalModel);
  };

  $scope.filterFeeds = function(feeds, event, type, name) {

    var filterdFeeds = [];
    if (type) {
      for (var i = 0; i < feeds.length; i++) {
        var val = type.toLowerCase();
        if (feeds[i][val].toLowerCase() === name.toLowerCase()) {
          filterdFeeds.push(feeds[i]);
        }
      }
      return filterdFeeds;
    }
    return angular.copy(feeds);
  };

  $scope.selectionModel = {};

  $scope.toggleVisibility = function(obj) {
    for ( var i in $scope.selectionModel) {
      if ($scope.selectionModel.hasOwnProperty(i)) {
        if (i === obj) {
          $scope.selectionModel[i] = ($scope.selectionModel[i] === 1) ? 0 : 1;
        } else {
          $scope.selectionModel[i] = 0;
        }
      }
    }
  };

  $scope.isVisible = function(obj) {
    return $scope.selectionModel[obj] === 1;
  };
}
HomePageCtrl.$inject = ['$scope', '$location', '$route', '$rootScope'];

/* Social Health Controller */
function socialHealthCtrl($scope, $rootScope, DashboardService) {
  var self = this;
  self._feed = null;
  $scope.noFeedsData = false;
  self.filterFeeds = function(event, type, name) {
    $scope.feeds = $scope.$parent.filterFeeds(self._feed, event, type, name);
    if ($scope.feeds.length === 0) {
      $scope.noFeedsData = true;
    } else {
      $scope.noFeedsData = false;
    }
  };

  $scope.$on("feedFilter", function(event, type, name) {
    self.filterFeeds(event, type, name);
  });

  $scope.exportUrl = function() {
    return {
      limit: 10
    };
  };

  $scope.loadFeeds = function(offset) {
    DashboardService.feed.get({
      offset: offset || 0
    }, function(data) {
      $scope.feeds = data.feeds;
      self._feed = angular.copy($scope.feeds);
      $scope.feedMaxCount = data.maxCount;
    });
  };

  $scope.calculateRating = function() {
    var values = $scope.subTabModel.analysis.Rating, calculatedValue = 0, count = 0, total = 0, i = 0;
    for (i in values) {
      if (i !== "$$hashKey") {
        total += values[i];
      }
    }
    for (i in values) {
      if (i !== "$$hashKey") {
        calculatedValue += (values[i] * (count++));
      }
    }
    return calculatedValue / total;
  };

  $scope.calculateMaxValue = function(value) {
    value = $scope.common.calculatePercentage(value);
    $scope.maxPercent = value.maxPercent;
    $scope.maxKey = value.maxKey;
    $scope.list = value.list;
  };

  $scope.getTotal = function() {
    var total = 0;
    angular.forEach($scope.subTabModel.topReviews.donutChart, function(s) {
      total += s.y;
    });
    return total;
  };

  $scope.getColor = function(key, mainKey) {
    return $scope.common.getColorValues(mainKey, key);
  };

  $scope.refreshFeeds = function() {
    $scope.commentVisible = false;
    $scope.feeds = $scope.subTabModel.topReviews.feeds.feeds;
  };

  $scope.showComments = function() {
    $scope.commentVisible = $scope.commentVisible === true ? false : true;
  };

  self.loadTab = function() {
    if ($scope.subTabModel) {
      var chartObj = {
        dataSet: $scope.subTabModel.topReviews.donutChart,
        type: "Source",
        clickFunction: function(type, name) {
          $scope.$apply(self.filterFeeds(null, type, name));
        }
      };
      $scope.pieChart = $scope.commonChart.basicChart(chartObj);
      $scope.feeds = $scope.subTabModel.topReviews.feeds.feeds;
      self._feed = angular.copy($scope.feeds);
      $scope.feedMaxCount = $scope.subTabModel.topReviews.feeds.maxCount;
      $scope.topWords = $scope.subTabModel.key_words;
    }
  };

  self.load = function() {
    $scope.$emit('processOptionsEvent', "addAll");
    $scope.$emit('processOptionsEvent', "otherTabOtherTabsEnabled");
    if ($scope.hospitalModel) {
      $scope.clusterIds = [];
      $scope.socialMediaJsonObj = {};
      $scope.socialMediaJsonObj.subTabName = $scope.currentActiveTab.hash;
      $scope.DhCluster = $rootScope.DhCluster;
      if ($scope.clusterModel.name === $rootScope.DhCluster) {
        // get all clusterIds in array
        for ( var counter in $scope.cluster) {
          if ($scope.cluster[counter].name !== $scope.DhCluster) {
            $scope.clusterIds.push($scope.cluster[counter].id);
          }
        }
        $scope.socialMediaJsonObj.clusterIds = $scope.clusterIds;
      }
      DashboardService.dashboard.get($scope.socialMediaJsonObj, function(data) {
        $scope.subTabModel = data;
        self.loadTab();
      });
    }
  };

  $scope.$on("update:socialHealth", function() {
    self.load();
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "socialHealth") {
    self.load();
  }
}
socialHealthCtrl.$inject = ['$scope', '$rootScope', 'DashboardService'];

/* Patient Voice Controller */
function patientVoiceCtrl($scope, $rootScope, DashboardService) {

  var self = this;
  self._filter = {};
  $scope.cPage = 1;
  $scope.pageView = $scope.view.Corporate;
  $scope.DhCluster = $rootScope.DhCluster;
  $scope.clusterWidgets = true;
  $scope.$on("feedFilter", function(event, type, name) {
    self._filter = {};
    if (type) {
      self._filter.sourceId = $scope.common.getSourceByName(name).id;
    }
    $scope.loadFeeds(0);
  });

  $scope.showAll = function(value) {
    if (value) {
      $scope.twitterData = $scope.subTabModel.twitter.Hashtags;
    } else {
      $scope.twitterData = $scope.subTabModel.twitter.Hashtags.slice(0, 5);
    }
  };

  self.getParams = function(q) {

    var params = {};
    params.subTabName = $scope.currentActiveTab.hash;
    if ($scope.timeLine) {

      params.timestamp = parseInt($scope.timeLine.min, 0);
      params.timestampMax = parseInt($scope.timeLine.max, 0);
    }
    if ($scope.clusterModel.name === $scope.DhCluster) {
      params.clusterIds = $scope.clusterIds;
      if ($scope.pageView === "Cluster") {
        params.view = "Cluster";
      }
    }
    if (self._filter) {
      params = angular.extend(params, self._filter);
    }
    return angular.extend(params, q);
  };
  $scope.loadFeeds = function(offset) {
    DashboardService.feed.get(self.getParams({
      offset: offset || 0,
      topicName: $scope.rowSelectedModel
    }), function(data) {
      $scope.feeds = data.feeds;
      $scope.feedMaxCount = data.maxCount;
      if (offset === 0) {
        $scope.cPage = 1;
      }
    });
  };

  $scope.exportUrl = function() {
    var params = self.getParams();
    return params;
  };

  $scope.rowClick = function(value) {
    $scope.rowSelectedModel = value;
    self.update();
  };

  self.update = function() {
    $scope.feeds = $scope.subTabModel.feeds[$scope.rowSelectedModel].feeds;
    $scope.feedMaxCount = $scope.subTabModel.feeds[$scope.rowSelectedModel].maxCount;
    $scope.cPage = 1;

    var data = $scope.subTabModel.topics[$scope.rowSelectedModel];
    for ( var key in data.donutChart) {
      if (data.donutChart[key].visible === false) {
        data.donutChart[key].visible = true;
      }
    }
    var chartObj = {
      dataSet: data.donutChart,
      type: "Source",
      innerSize: 150
    };

    $scope.selectedValue = {
      title: $scope.rowSelectedModel,
      avgRating: data.avgRating,
      overallScore: data.overallScore,
      patientVoicePieChart: $scope.commonChart.basicChart(chartObj),
      patientVoiceRatingChart: $scope.commonChart.basicChart({
        dataSet: angular.copy(data.ratingChart),
        margin: [20, 20, 40, 40],
        yTitle: "Ratings",
        xTitle: "Years",
        xAxis: true,
        yAxisEnabled: true,
        min: 0,
        max: 5,
        tickInterval: 1
      }),
      ratingBySource: $scope.subTabModel.topics[$scope.rowSelectedModel].ratingBySource
    };

  };

  $scope.getTotal1 = function(key, clicked) {
    if ($scope.subTabModel.topics) {
      var data = key.donutChart, returnVal = 0, total = 0;
      if (!clicked) {
        angular.forEach(data, function(s) {
          total += s.y;
          returnVal = total;
        });
      } else {
        angular.forEach(data, function(s) {
          total += s.y;
        });
        angular.forEach(data, function(s) {
          if (clicked.toLowerCase() === s.name.toLowerCase()) {
            returnVal = s.y / total * 100;
          }
        });
      }
      return returnVal;
    }
  };
  // on patient voice view change
  $scope.pageViewChange = function() {
    self.load();
  };

  // show selected filter widgets on filter click
  $scope.filterCluster = function() {

    for ( var seriesCounter in $scope.clusterView.series) {
      if ($scope.clusterView.series.hasOwnProperty(seriesCounter)) {
        $scope.clusterView.series[seriesCounter].hide = true;
      }
    }
    for ( var seriesView in $scope.clusterModelView) {
      if ($scope.clusterModelView.hasOwnProperty(seriesView)) {
        $scope.clusterModelView[seriesView].hide = false;
      }
    }
    $scope.selectedCluster = $scope.clusterModelView;

  };
  $scope.clusterView = {};
  $scope.rowSelectedModel = null;
  $scope.feeds = [];
  $scope.feedMaxCount = 0;

  self.updateData = function(data) {
    $scope.subTabModel = data;
    var i = 0;
    var arr = [];
    for (i in $scope.subTabModel.topics) {
      if ($scope.subTabModel.topics.hasOwnProperty(i)) {
        var obj = $scope.subTabModel.topics[i];
        obj.name = i;
        arr.push(obj);
      }
    }

    var topicsSorted = arr.sort(function(a, b) {
      if (a.avgRating <= b.avgRating) {
        return 1;
      } else {
        return 0;
      }
    });
    $scope.topics = topicsSorted;
    for (i = 0; i < $scope.topics.length; i++) {
      if (i === 0) {
        $scope.rowSelectedModel = $scope.topics[i].name;
        self.update();
      }
    }
    if ($scope.topics.length === 0) {
      $scope.feeds = [];
      $scope.feedMaxCount = 0;
      $scope.cPage = 0;
      $scope.rowSelectedModel = null;
      $scope.selectedValue.title = "";
      $scope.noChartData = true;
    } else {
      $scope.noChartData = false;
    }

    if ($scope.subTabModel.twitter) {
      $scope.twitterData = $scope.subTabModel.twitter.Hashtags.slice(0, 5);
    }
  };

  self.load = function() {
    $scope.$emit('processOptionsEvent', "addAll");
    $scope.$emit('processOptionsEvent', "otherTabOtherTabsEnabled");
    $scope.clusterIds = [];
    var jsonObj = {};
    if ($scope.clusterModel.name === $scope.DhCluster) {
      // Get all clusterIds in array
      for ( var counter in $scope.cluster) {
        if ($scope.cluster[counter].name !== $scope.DhCluster) {
          $scope.clusterIds.push($scope.cluster[counter].id);
        }
      }
      jsonObj.clusterIds = $scope.clusterIds;
      if ($scope.pageView === "Cluster") {
        jsonObj.view = $scope.pageView;
      }
    } else {
      $scope.pageView = "Corporate";
    }
    jsonObj.subTabName = $scope.currentActiveTab.hash;
    DashboardService.dashboard.get(jsonObj, function(data) {

      $scope.updateFilterData(data);
      var v = $scope.commonChart.showTimeSpan({
        dataSet: $scope.subTabModel.timeSeries,
        setExtremes: function(event) {
          $scope.timeLine = event;
          $scope.filter();
        }
      });
      $scope.patientVoiceSliderFilter = v;

    });

  };

  $scope.filter = function() {
    DashboardService.dashboard.get(self.getParams(), function(data) {
      $scope.updateFilterData(data);
    });
  };

  $scope.updateFilterData = function(data) {
    if ($scope.pageView === "Cluster") {
      $scope.clusterView = data;
      if ($scope.selectedCluster === undefined) {
        $scope.clusterModelView = $scope.clusterView.series;
      } else {
        $scope.clusterModelView = [];
        for ( var seriesCnt in $scope.clusterView.series) {
          if ($scope.clusterView.series.hasOwnProperty(seriesCnt)) {
            $scope.clusterView.series[seriesCnt].hide = true;
          }
        }
        for ( var seriesCounter in $scope.selectedCluster) {
          if ($scope.selectedCluster.hasOwnProperty(seriesCounter)) {
            var oldClusterName = $scope.selectedCluster[seriesCounter].name;
            for ( var seriesCounter1 in $scope.clusterView.series) {
              if (oldClusterName === $scope.clusterView.series[seriesCounter1].name) {
                $scope.clusterView.series[seriesCounter1].hide = false;
                $scope.clusterModelView.push($scope.clusterView.series[seriesCounter1]);
              }
            }
          }
        }
      }
    } else {
      self.updateData(data);
    }
  };
  $scope.$on("update:patientVoice", function() {
    if ($scope.hospitalModel) {
      self.load();
    }
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "patientVoice") {
    self.load();
  }

}
patientVoiceCtrl.$inject = ['$scope', '$rootScope', 'DashboardService'];

/* Social Media Distribution Controller */
function socialMediaDistributionCtrl($scope, $rootScope, DashboardService) {
  var i = 0, self = this;
  $scope.pageView = "Corporate";
  $scope.DhCluster = $rootScope.DhCluster;
  $scope.categoryLength = 0;
  self._filter = {};
  $scope.cPage = 1;
  $scope.sentimentDist = {
    "values": {
      "opinion": "Opinion",
      "emotion": "Emotion",
      "rating": "Rating"
    }
  };
  $scope.sentimentDistribution = $scope.sentimentDist.values.emotion;
  self.ratingMap = {
    "One Star Rating": 1,
    "Two Star Rating": 2,
    "Three Star Rating": 3,
    "Four Star Rating": 4,
    "Five Star Rating": 5
  };

  self.filterFeeds = function(event, type, name) {
    if (type) {
      self._filter = {};
      if (type.toLowerCase() === "rating") {

        self._filter[type.toLowerCase()] = self.ratingMap[name];
      } else {
        self._filter[type.toLowerCase()] = name;
      }
    } else {
      self._filter = {};
    }
    if ($scope.cPage !== 1) {
      $scope.cPage = 1;
    } else {
      $scope.loadFeeds(0);
    }
  };

  $scope.getColor = function(value) {
    if (!value) { return; }
    if (value.indexOf('Rating') >= 0) {
      return $scope.common.getColorValues("rating", value);
    } else {
      return $scope.common.getColorValues("emotion", value);
    }
  };

  $scope.loadFeeds = function(offset) {
    var params = {
      offset: offset || 0
    };
    params = angular.extend(params, self._filter);
    params = angular.extend(params, self.getParams());

    DashboardService.feed.get(params, function(data) {
      $scope.feeds = data.feeds;
      $scope.feedMaxCount = data.maxCount;
      if (params.offset === 0 && $scope.cPage !== 1) {
        $scope.cPage = 1;
      }
    });
  };

  $scope.exportUrl = function() {
    var params = self.getParams();
    params = angular.extend(params, self._filter);
    return params;
  };

  $scope.refreshFeeds = function() {
    var chart3 = $scope.common.getChartFromSelector($scope.chartRating);
    for (i = 0; i < chart3.series.length; i++) {
      chart3.series[i].data[0].update({
        selected: false
      });
    }
    var chart2 = $scope.common.getChartFromSelector($scope.chartEmotion);
    for (i = 0; i < chart2.series.length; i++) {
      chart2.series[i].data[0].update({
        selected: false
      });
    }
    var chart1 = $scope.common.getChartFromSelector($scope.chartOpinion);
    for (i = 0; i < chart1.series.length; i++) {
      chart1.series[i].data[0].update({
        selected: false
      });
    }
    $scope.selectedValue = "";
    self.filterFeeds();
  };

  $scope.$on("feedFilter", function(event, type, name) {
    self.filterFeeds(event, type, name);
  });

  self.getParams = function() {
    var params = {};
    params.subTabName = $scope.currentActiveTab.hash;
    if ($scope.timeLine) {

      params.timestamp = parseInt($scope.timeLine.min, 0);
      params.timestampMax = parseInt($scope.timeLine.max, 0);
    }
    if ($scope.clusterModel.name === $scope.DhCluster) {
      params.clusterIds = $scope.clusterIds;
      if ($scope.pageView === "Cluster") {
        params.view = "Cluster";
      }
    }
    if ($scope.toggleModel && $scope.toggleModel.length > 0) {
      params.sourceId = [];
      for (i = 0; i < $scope.toggleModel.length; i++) {
        params.sourceId.push($scope.toggleModel[i].id);
      }
    }

    if ($scope.toggleModel1 && $scope.toggleModel1.length > 0) {
      params.topicName = [];
      for (i = 0; i < $scope.toggleModel1.length; i++) {
        params.topicName.push($scope.toggleModel1[i]);
      }
    }
    return params;
  };

  $scope.filter = function() {
    DashboardService.dashboard.get(self.getParams(), function(data) {
      $scope.subTabModel = data;
      self.loadTab();
    });
  };

  self.unSelectPoints = function(chartObj) {
    var selectedPoints = chartObj.getSelectedPoints();
    for (var i = 0; i < selectedPoints.length; i++) {
      selectedPoints[i].select(false);
    }
  };
  self.loadTab = function() {
    if ($scope.cPage && $scope.cPage !== 1) {
      $scope.cPage = 1;
    }
    $scope.selectedValue = "";
    $scope.feedMaxCount = $scope.subTabModel.feeds.maxCount;
    $scope.feeds = $scope.subTabModel.feeds.feeds;
    if ($scope.feeds.length === 0) {
      $scope.noData = true;
    } else {
      $scope.noData = false;
    }
    var setcatValue = "";
    var setxAxis = "";
    var xCategories = "";
    if ($scope.clusterModel.name === $scope.DhCluster && $scope.pageView === "Cluster") {
      setcatValue = true;
      setxAxis = true;
      xCategories = $scope.subTabModel.sentimentalDistribution.categories;
    } else {
      setcatValue = false;
      setxAxis = false;

    }
    var chartObj = {
      bar: true,
      bg: "rgba(243,241,242,1)",
      stacking: "percent",
      border: 1,
      xAxis: setxAxis,
      setCategoryValue: setcatValue,
      categories: xCategories,
      allowPointSelect: true,
      clickFunction: function(type, name, obj) {
        $scope.chart1 = $scope.common.getChartFromSelector($scope.chartOpinion);
        $scope.chart2 = $scope.common.getChartFromSelector($scope.chartEmotion);
        $scope.chart3 = $scope.common.getChartFromSelector($scope.chartRating);

        var currentObj = this;
        var prevChartObj;
        var val = obj.series.points[0].selected;
        if (!val || val === undefined) {
          $scope.selectedValue = name;
          $scope.$apply(self.filterFeeds(null, type, name));
        } else {
          $scope.selectedValue = "";
          self._filter = {};
          self.filterFeeds();
        }

        if ($scope.pageView === "Corporate") {
          if (type === "Opinion") {
            self.unSelectPoints($scope.chart2);
            self.unSelectPoints($scope.chart3);
          } else if (type === "Emotion") {
            self.unSelectPoints($scope.chart1);
            self.unSelectPoints($scope.chart3);
          } else if (type === "Rating") {
            self.unSelectPoints($scope.chart1);
            self.unSelectPoints($scope.chart2);
          }
        }
      }
    };
    chartObj.type = "Opinion";
    chartObj.dataSet = {};
    if ($scope.subTabModel.sentimentalDistribution) {
      chartObj.dataSet = $scope.subTabModel.sentimentalDistribution.Opinion;
      if ($scope.subTabModel.sentimentalDistribution.categories !== undefined) {
        chartObj.xCategories = $scope.subTabModel.sentimentalDistribution.categories;
        $scope.categoryLength = $scope.subTabModel.sentimentalDistribution.Opinion[0].data.length;
      }
    }

    $scope.chartBubble = $scope.subTabModel.bubbleChartData || [];

    if ($scope.pageView === "Corporate") {

      $scope.chartOpinion = $scope.commonChart.basicChart(angular.copy(chartObj));
      chartObj.type = "Emotion";
      chartObj.dataSet = {};
      if ($scope.subTabModel.sentimentalDistribution) {
        chartObj.dataSet = $scope.subTabModel.sentimentalDistribution.Emotion;
        $scope.chartEmotion = $scope.commonChart.basicChart(angular.copy(chartObj));
      }
      chartObj.type = "Rating";
      chartObj.dataSet = {};
      if ($scope.subTabModel.sentimentalDistribution) {
        chartObj.dataSet = $scope.subTabModel.sentimentalDistribution.Rating;
        $scope.chartRating = $scope.commonChart.basicChart(angular.copy(chartObj));
      }
    } else {
      /* Starts here */
      if (chartObj.type === "Opinion") {
        $scope.newDataSet = [];
        $scope.newDataSet[2] = chartObj.dataSet[1];
        $scope.newDataSet[1] = chartObj.dataSet[2];
        $scope.newDataSet[0] = chartObj.dataSet[0];
        chartObj.dataSet = $scope.newDataSet;
      }
      /* Ends here */

      $scope.chartOpinionForAvatar = $scope.commonChart.basicChart(angular.copy(chartObj));
      chartObj.type = "Emotion";
      chartObj.dataSet = {};
      if ($scope.subTabModel.sentimentalDistribution) {
        chartObj.dataSet = $scope.subTabModel.sentimentalDistribution.Emotion;
        chartObj.dataSet.reverse();
      }

      $scope.chartEmotionForAvatar = $scope.commonChart.basicChart(angular.copy(chartObj));
      chartObj.type = "Rating";
      chartObj.dataSet = {};
      if ($scope.subTabModel.sentimentalDistribution) {
        chartObj.dataSet = $scope.subTabModel.sentimentalDistribution.Rating;
        $scope.chartRatingForAvatar = $scope.commonChart.basicChart(angular.copy(chartObj));
      }
    }
    // on view change
    $scope.pageViewChange = function() {
      self.load();
    };
    if ($scope.pageView === "Corporate") {
      chartObj.xAxis = false;
      chartObj.yAxis = false;
    } else if ($scope.pageView === "Cluster") {
      chartObj.xAxis = true;
      chartObj.yAxis = true;
    }
  };

  $scope.fetchFilter = function(data) {
    $scope.filterSource = data.source;
    $scope.toggleModel = $scope.filterSource.filter(function(item) {
      return $scope.selectedQuestions.indexOf(item) !== -1;
    });

    $scope.filterTopics = data.careArea;

    $scope.toggleModel1 = $scope.filterTopics.filter(function(item) {
      return $scope.selectedQuestions.indexOf(item) !== -1;
    });
  };

  self.load = function() {
    $scope.$emit('processOptionsEvent', "addAll");
    $scope.$emit('processOptionsEvent', "otherTabOtherTabsEnabled");
    $scope.clusterIds = [];
    var jsonObj = {};
    if ($scope.clusterModel.name === $scope.DhCluster) {
      // Get all clusterIds in array
      for ( var counter in $scope.cluster) {
        if ($scope.cluster[counter].name !== $scope.DhCluster) {
          $scope.clusterIds.push($scope.cluster[counter].id);
        }
      }
      jsonObj.clusterIds = $scope.clusterIds;
      if ($scope.pageView === "Cluster") {
        jsonObj.view = $scope.pageView;
      }
    } else {
      $scope.pageView = "Corporate";
    }
    jsonObj.subTabName = $scope.currentActiveTab.hash;
    DashboardService.dashboard.get(jsonObj, function(data) {

      $scope.subTabModel = data;
      $scope.timeSeries = $scope.subTabModel.timeSeries;

      self.loadTab();
      var v = $scope.commonChart.showTimeSpan({
        dataSet: $scope.subTabModel.timeSeries,
        setExtremes: function(event) {
          $scope.timeLine = event;
          $scope.$apply($scope.filter());
        }
      });

      $scope.timeLineSliderFilter = v;

      if ($scope.clusterModel.name === $scope.DhCluster) {
        jsonObj = {};
        jsonObj.clusterIds = $scope.clusterIds;
      }
      jsonObj.id = 'socialMediaDistribution';
      DashboardService.filter.get(jsonObj, function(data, header) {
        $scope.subTabModelFilter = data;
        $scope.selectedQuestions = [];
        $scope.fetchFilter(data);
      });

    });
  };
  $scope.$on("update:socialMediaDistribution", function(event, data) {
    if ($scope.hospitalModel) {
      self.load();
    }
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "socialMediaDistribution") {
    self.load();
  }
}
socialMediaDistributionCtrl.$inject = ['$scope', '$rootScope', 'DashboardService'];

/* Timeline Controller */
function timelineCtrl($scope, $rootScope, DashboardService) {
  var chartObj = null, columnChartObj = {}, defaultSelection = "opinion";
  var self = this;

  $scope.timeLineChart = {};
  $scope.timeLineColumnChart = {};
  $scope.items = [];
  $scope.loadRecord = function(choice, index) {
    if (choice !== $scope.items.active) {
      $scope.items.active = choice;
    }
  };
  function changeChart() {

    var chart = $scope.common.getChartFromSelector($scope.timeLineSliderChart);
    if ($scope.subTabModel && chart) {
      $scope.timeLineSliderChart = $scope.commonChart.showTimeSpan({
        dataSet: $scope.subTabModel.timeSeries,
        setExtremes: function(event) {
          var columnChart = $scope.common.getChartFromSelector($scope.timeLineColumnChart);
          columnChart.xAxis[0].setExtremes(event.min, event.max);
          columnChart.xAxis[0].startOnTick = false;

          var chart = $scope.common.getChartFromSelector($scope.timeLineChart);
          chart.xAxis[0].setExtremes(event.min, event.max);
        }
      });

    }
    var min = null, max = null;
    if (chart) {
      var extremes = chart.xAxis[0].getExtremes();
      min = extremes.min;
      max = extremes.max;
    }

    if ($scope.items.active && $scope.subTabModel[$scope.items.active]) {
      var pointFormatStr = 'Total Reviews:<b>{point.options.marker.radius}</b><br/>Overall ' + $scope.items.active + ': <b>{series.name}</b><br/>CSR: <b>{point.y}</b>';
      if ($scope.clusterModel.name === 'DH Corporate') {
        pointFormatStr = 'Total Reviews:<b>{point.options.marker.radiusActual}</b><br/>Overall ' + $scope.items.active + ': <b>{series.name}</b><br/>CSR: <b>{point.y}</b>';
        var scatterLength = $scope.subTabModel[$scope.items.active].scatter.length;
        for (var i = 0; i < scatterLength; i++) {
          for (var j = 0; j < $scope.subTabModel[$scope.items.active].scatter[i].data.length; j++) {
            var marker;
            if ($scope.subTabModel[$scope.items.active].scatter[i].data[j].marker.radiusActual === undefined) {
              marker = angular.copy($scope.subTabModel[$scope.items.active].scatter[i].data[j].marker.radius);
            } else {
              marker = angular.copy($scope.subTabModel[$scope.items.active].scatter[i].data[j].marker.radiusActual);
            }
            $scope.subTabModel[$scope.items.active].scatter[i].data[j].marker.radiusActual = marker;
            $scope.subTabModel[$scope.items.active].scatter[i].data[j].marker.radius = (marker) / 10;
          }
        }
      }

      chartObj = {
        dataSet: $scope.subTabModel[$scope.items.active].scatter,
        timeType: "datetime",
        type: $scope.items.active,
        xAxis: true,
        yAxisEnabled: true,
        yTitle: "Customer Satisfaction Score",
        min: 1,
        max: 5,
        marker: true,
        minRange: 30 * 24 * 3600 * 1000,
        startOnTick: false,
        endOnTick: false,
        gridLineColor: '#e2e2e2',
        pointFormat: pointFormatStr
      };
      $scope.timeLineChart = $scope.commonChart.basicChart(chartObj);
      columnChartObj = {
        dataSet: $scope.subTabModel[$scope.items.active].column,
        timeType: "datetime",
        type: $scope.items.active,
        xAxis: true,
        yAxisEnabled: true,
        yTitle: "Number of Reviews",
        marker: true,
        stacking: 'normal',
        minRange: 30 * 24 * 3600 * 1000,
        startOnTick: false,
        endOnTick: false,
        gridLineColor: '#e2e2e2'
      };
      $scope.timeLineColumnChart = $scope.commonChart.basicChart(columnChartObj);
    }
  }

  $scope.$watch('items.active', function() {
    changeChart();
  });
  $scope.$watch('subTabModel', function() {
    changeChart();
  });

  self.load = function() {
    $scope.$emit('processOptionsEvent', "addAll");
    $scope.$emit('processOptionsEvent', "otherTabOtherTabsEnabled");
    $scope.clusterIds = [];
    var jsonObj = {};
    $scope.DhCluster = $rootScope.DhCluster;
    if ($scope.clusterModel.name === $scope.DhCluster) {
      $scope.socialMediaClusterView = true;
      // Get all clusterIds in array
      for ( var counter in $scope.cluster) {
        if ($scope.cluster[counter].name !== $scope.DhCluster) {
          $scope.clusterIds.push($scope.cluster[counter].id);
        }
      }
      jsonObj.subTabName = $scope.currentActiveTab.hash;
      jsonObj.clusterIds = $scope.clusterIds;
    } else {
      jsonObj.subTabName = $scope.currentActiveTab.hash;
    }

    DashboardService.dashboard.get(jsonObj, function(data) {
      $scope.subTabModel = data;
      $scope.timeLineSliderChart = $scope.commonChart.showTimeSpan({
        dataSet: $scope.subTabModel.timeSeries,
        setExtremes: function(event) {
          var columnChart = $scope.common.getChartFromSelector($scope.timeLineColumnChart);
          columnChart.xAxis[0].setExtremes(event.min, event.max);
          columnChart.xAxis[0].startOnTick = false;

          var chart = $scope.common.getChartFromSelector($scope.timeLineChart);
          chart.xAxis[0].setExtremes(event.min, event.max);
        }
      });
      $scope.items = [];
      for ( var i in $scope.subTabModel) {
        if (i.substring(0, 1) !== "$" && i !== "timeSeries") {
          $scope.items.push(i);
        }
      }
      $scope.items.active = defaultSelection;
    });
  };

  $scope.$on("update:timeline", function(event, data) {
    if ($scope.hospitalModel) {
      self.load();
    }
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "timeline") {
    self.load();
  }
}
timelineCtrl.$inject = ['$scope', '$rootScope', 'DashboardService'];

/* Ranking Controller */
function rankingsCtrl($scope, $modal, DashboardService) {
  var self = this;
  function showModal(data) {
    var modalInstance = $modal.open({
      templateUrl: 'modalZoomRanking.html',
      controller: function($scope, $modalInstance) {
        var dataObj = [];
        for ( var i in data.findTheBest.pie.data) {
          if (data.findTheBest.pie.data.hasOwnProperty(i)) {
            dataObj.push({
              name: i,
              y: data.findTheBest.pie.data[i]
            });
          }
        }
        var dataObjSorted = dataObj.sort(function(b, c) {
          return (+b.y < +c.y ? 1 : -1);
        });
        if (data) {
          var chartObj = {
            legend: true,
            innerSize: "0%",
            dataSet: dataObjSorted,
            legendWidth: 250
          };
          var a = $scope.commonChart.basicChart(chartObj);
          a.plotOptions.pie.tooltip.pointFormat = 'Ratings: <b>{point.y}%</b><br/>';
          $scope.chartData = a;
        }
        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
        $scope.smartRating = data.findTheBest.smartRating;
      }
    });
    modalInstance.result.then();
  }

  self.load = function() {
    $scope.$emit('processOptionsEvent', "addAll");
    $scope.$emit('processOptionsEvent', "otherTabOtherTabsEnabled");
    if ($scope.hospitalModel) {
      DashboardService.dashboard.get({
        subTabName: $scope.currentActiveTab.hash
      }, function(data) {
        $scope.subTabModel = data;
        $scope.showModal = function() {
          showModal($scope.subTabModel);
        };
      });
    }
  };

  $scope.$on("update:rankings", function(event, data) {
    self.load();
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "rankings") {
    self.load();
  }
}
rankingsCtrl.$inject = ['$scope', '$modal', 'DashboardService'];

/* Competitive Controller */
function compareCtrl($route, $scope, $rootScope, $modal, DashboardService, $timeout, $window, $document) {

  var limit = 3, count = 0, hospitalArr = [], self = this;

  $scope.radioModel = "Comparator";
  $scope.active = true;
  $scope.activeButton = true;

  self._filter = {};

  $scope.loadFeeds = function(offset, hospitalId, q) {
    var params = {
      hospitalId: hospitalId,
      offset: offset || 0
    };
    if (q) {
      params = angular.extend(params, q);
    }
    if (self._filter[hospitalId]) {
      params = angular.extend(params, self._filter[hospitalId]);
    }

    DashboardService.feed.get(params, function(data) {
      for (var i = 0; i < hospitalArr.length; i++) {
        if (hospitalArr[i].id === hospitalId) {
          $scope.feeds[hospitalArr[i].name] = data;
          break;
        }
      }
    });
  };

  $scope.exportUrl = function(hospitalId) {
    var params = {};
    params = {
      hospitalId: hospitalId
    };
    params = angular.extend(params, self._filter[hospitalId]);
    return params;
  };

  self.filterFeeds = function(event, type, name, hId) {
    if (hId) {
      if (type) {
        self._filter[hId] = {
          sourceId: $scope.common.getSourceByName(name).id
        };
      } else {
        self._filter[hId] = {};
      }
      $scope.loadFeeds(0, hId);
    }
  };

  $scope.$on("feedFilter", function(event, type, name) {
    var hId = null;
    if (type) {
      hId = event.targetScope.$parent.hospitalId;
    } else {
      hId = event.targetScope.hospitalId;
    }

    var fa = hospitalArr.filter(function(h) {
      return h.name === hId;
    });
    if (fa && fa.length > 0) {
      $scope.feedPage[fa[0].name].currentPage = 1;
      self.filterFeeds(event, type, name, fa[0].id);
    }
  });

  $scope.addHospital = function() {

    var flag = false;
    for ( var i in $rootScope.selectedHospitals) {
      if ($scope.comparativeHospitalModel.name === i) {
        flag = true;
      }
    }

    if (Object.keys($rootScope.selectedHospitals).length < limit && !flag) {
      $rootScope.selectedHospitals[$scope.comparativeHospitalModel.name] = {
        name: $scope.comparativeHospitalModel.name,
        id: $scope.comparativeHospitalModel.id,
        cluster: $scope.comparativeClusterModel.name
      };
      hospitalArr[count] = {
        name: $scope.comparativeHospitalModel.name,
        id: $scope.comparativeHospitalModel.id
      };
      count++;
    }
    if (count <= limit && count > 2) {
      $scope.activeButton = false;
    }
  };

  $scope.deleteHospital = function(key) {
    var temp = hospitalArr.filter(function(h) {
      return h.id !== key.id;
    });
    hospitalArr = temp;

    delete $rootScope.selectedHospitals[key.name];
    count--;
    if (count <= 2) {
      $scope.activeButton = true;
      $scope.active = true;
    } else {
      $scope.activeButton = false;
    }
  };

  $scope.getDetail = function() {
    if (count <= limit && count > 1) {
      $scope.active = false;
      $scope.radioModel = 'Sentiment';
    }
  };

  $scope.$watch('comparativeClusterModel', function() {
    if ($scope.comparativeClusterModel) {
      var outerArray = [];
      for (var counter = 0; counter < $scope.comparativeClusterModel.hospitals.length; counter++) {
        var tObj = {};
        var tmpObj = $scope.comparativeClusterModel.hospitals[counter];
        tObj.id = tmpObj.id;
        tObj.name = tmpObj.name;
        if (tmpObj.status === 0) {
          tObj.isinuse = true;
        } else {
          tObj.isinuse = false;
        }
        outerArray.push(tObj);
      }
      $scope.comparativeHospital = outerArray;
      $scope.comparativeHospitalModel = outerArray[0];
    }
  });

  $scope.$watch('radioModel', function() {

    var subTabName = $scope.currentActiveTab.title.toLowerCase() + "_" + $scope.radioModel.toLowerCase(), dataModelTemp = {};
    if ($scope.radioModel.toLowerCase() !== "comparator") {
      DashboardService.dashboard.get({
        subTabName: $scope.currentActiveTab.hash,
        subSubTabName: $scope.radioModel.toLowerCase(),
        hosp: hospitalArr
      }, function(data) {
        dataModelTemp[subTabName] = data;
        $scope.subsubTabModel = dataModelTemp[subTabName];
      });
    } else {
      if (count >= 2) {
        $scope.activeButton = false;
      }
    }
  });

  $rootScope.selectedHospitals = $rootScope.selectedHospitals || {};
  $scope.comparativeCluster = $scope.subTabModel;
  $scope.comparativeClusterModel = null;
  $scope.feedPage = {};

  self.document = $document[0];

  $scope.$watch('subsubTabModel', function() {
    var sort = function(a, b) {
      return data[b].avgRating - data[a].avgRating;
    };

    switch ($scope.radioModel) {
      case "Overview":
        $scope.selectedHospitalArr = hospitalArr;
        if ($scope.subsubTabModel[$scope.selectedHospitalArr[0].name]["hospital Type"] === null && $scope.subsubTabModel[$scope.selectedHospitalArr[1].name]["hospital Type"] === null) {
          delete $scope.subsubTabModel[$scope.selectedHospitalArr[0].name]["hospital Type"];
          delete $scope.subsubTabModel[$scope.selectedHospitalArr[1].name]["hospital Type"];
        }
        break;
      case "Sentiment":
        $scope.tdWidth = (self.document.body.clientWidth * 85 / (100 * hospitalArr.length)) + "px";
        $scope.barChart = [];
        $scope.pieChart = {};
        $scope.feeds = {};
        $scope.pieChartHospital = {};

        var bchart = [];
        for ( var i in $scope.subsubTabModel.sentimentData) {
          if ($scope.subsubTabModel.sentimentData.hasOwnProperty(i)) {
            bchart[i] = [];
            for ( var j in $scope.subsubTabModel.sentimentData[i].sentimentalDistribution) {
              if ($scope.subsubTabModel.sentimentData[i].sentimentalDistribution.hasOwnProperty(j)) {
                var chartObj = {
                  bar: true,
                  dataSet: $scope.subsubTabModel.sentimentData[i].sentimentalDistribution[j],
                  type: j,
                  stacking: "percent",
                  bg: "rgba(243,241,242,1)",
                  labelFontSize: "13px"
                };
                bchart[i].push($scope.commonChart.basicChart(chartObj));
              }
            }
          }
        }

        $timeout(function() {
          $scope.barChart = bchart;
        }, 200);
        $timeout(function() {
          $(document).trigger('resize');
        }, 200);

        var clickFunction = function(type, name) {
          $scope.$apply(self.filterFeeds(null, type, name, hospitalArr[i].id));
        };

        for (i = 0; i < hospitalArr.length; i++) {
          $scope.pieChart[hospitalArr[i].name] = $scope.commonChart.basicChart({
            dataSet: $scope.subsubTabModel.chartData[hospitalArr[i].name],
            type: "Source",
            clickFunction: clickFunction
          });
          $scope.pieChartHospital[hospitalArr[i].name] = hospitalArr[i].id;
          $scope.feeds[hospitalArr[i].name] = $scope.subsubTabModel.reviewData[hospitalArr[i].name];
          $scope.feedPage[hospitalArr[i].name] = {};
        }
        self._feeds = angular.copy($scope.feeds);

        break;
      case "Rating":
        $scope.getTotalRating = function(list) {
          var total = 0;
          if (list) {
            for (var i = 0; i < list.length; i++) {
              total += list[i].marker.radius;
            }
          }
          return total;
        };
        var sortedRatings = {};
        if ($scope.subsubTabModel) {
          for ( var RatingObj in $scope.subsubTabModel) {
            if ($scope.subsubTabModel.hasOwnProperty(RatingObj)) {
              var data = $scope.subsubTabModel[RatingObj];
              var dataKeys = Object.keys(data);
              dataKeys.sort(sort);
              sortedRatings[RatingObj] = dataKeys;
            }
          }
          $scope.sortedRatings = sortedRatings;
        }
        break;
      case "Ranking":
        break;
      default:
        break;
    }
  });

  function showModalInner(key, data) {
    var modalInstance = $modal.open({
      templateUrl: 'modalZoomRanking1.html',
      controller: function($scope, $modalInstance) {
        var dataObj = [];
        for ( var i in data[key].findTheBest.pie.data) {
          if (data[key].findTheBest.pie.data.hasOwnProperty(i)) {
            var obj = {};
            obj.name = i;
            obj.y = data[key].findTheBest.pie.data[i];
            dataObj.push(obj);
          }
        }
        if (data[key]) {
          var dataObjSorted = dataObj.sort(function(b, c) {
            return (+b.y < +c.y ? 1 : -1);
          });
          var chartObj = {
            legend: true,
            innerSize: "0%",
            dataSet: dataObj,
            legendWidth: 250,
            legendY: 20
          };
          var a = $scope.commonChart.basicChart(chartObj);
          a.plotOptions.pie.tooltip.pointFormat = 'Ratings: <b>{point.y}%</b><br/>';
          $scope.chartData = a;
        }

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
        $scope.smartRating = data[key].findTheBest.smartRating;
      }
    });
    modalInstance.result.then();
  }

  self.load = function() {
    if ($scope.hospitalModel) {
      DashboardService.filter.query({
        id: "comparitive"
      }, function(data) {
        $scope.subTabModel = data;
        count = Object.keys($rootScope.selectedHospitals).length;
        for ( var hn in $rootScope.selectedHospitals) {
          if ($rootScope.selectedHospitals.hasOwnProperty(hn)) {
            if (hn !== "$$hashKey") {
              hospitalArr.push({
                name: $rootScope.selectedHospitals[hn].name,
                id: $rootScope.selectedHospitals[hn].id
              });
            }
          }
        }
        if (count >= 2) {
          $scope.getDetail();
        }
        $scope.comparativeCluster = $scope.subTabModel;
        $scope.comparativeClusterModel = $scope.comparativeCluster[0];
        $scope.showModal = function(key) {
          showModalInner(key, $scope.subsubTabModel);
        };
      });
    }
  };

  $scope.$on("update:compare", function(event, data) {
    self.load();
  });

  if ($scope.currentActiveTab.hash === "compare") {
    self.load();
  }
}
compareCtrl.$inject = ['$route', '$scope', '$rootScope', '$modal', 'DashboardService', '$timeout', '$window', '$document'];

/* Employee sentiment Controller */
function employeeSentimentCtrl($scope, $rootScope, DashboardService, $modal) {
  var self = this;
  $scope.radioModel = "Sentiment";

  $scope.$watch('radioModel', function() {
    if ($scope.radioModel.toLowerCase() !== "sentiment") {
      var jsonObj = {};
      if ($scope.clusterModel.name === $scope.DhCluster) {
        jsonObj = $scope.getClusterIds();
        jsonObj.subTabName = "employeeActivityTrendz";
      } else {
        jsonObj = {};
        jsonObj.subTabName = "employeeActivityTrendz";
      }
      DashboardService.dashboard.get(jsonObj, function(data) {
        var seriesOptions = [], count = 0;

        for ( var i in data) {
          if (!data.hasOwnProperty(i)) {
            continue;
          }
          seriesOptions[count] = {
            name: i,
            data: data[i]
          };
          count++;
        }
        var chartObj = {
          timeType: "datetime",
          type: "hospital",
          dataSet: seriesOptions,
          legend: true,
          legendWidth: 1000,
          legendLayout: 'horizontal',
          legendAlign: 'center',
          legendVerticalAlign: 'bottom',
          yTitle: "No of Reviews",
          yAxisEnabled: true
        };
        $scope.employeeTimeLineChart = $scope.commonChart.basicChart(chartObj);
        $scope.employeeTimeLineChart.tooltip.formatter = function(e) {
          var d = new Date(this.x);
          var a = d.toGMTString().split(" ");
          return "<b>" + this.series.name + "</b><br><small>" + a[2] + "-" + a[3] + "</small><br>No. of Reviews: <b>" + this.y + "</b><br/>";
        };
        var arr = [];
        for (i = 0; i < seriesOptions.length; i++) {
          for (var j = 0; j < seriesOptions[i].data.length; j++) {
            arr.push(seriesOptions[i].data[j]);
          }
        }
        arr.sort();
        $scope.timeLineSliderChart = $scope.commonChart.showTimeSpan({
          dataSet: arr,
          setExtremes: function(event) {
            var chart = $scope.common.getChartFromSelector($scope.employeeTimeLineChart);
            chart.xAxis[0].setExtremes(event.min, event.max);
          }
        });
      });
    }
  });

  $scope.getGradient = function(item, key) {
    var gredientString = "";
    var perc = 0, gradientStr = "";
    var returnVal = $scope.common.calculatePercentage(item);
    var percentValues = returnVal.list;

    for ( var i in percentValues) {
      if (percentValues.hasOwnProperty(i)) {
        var colorVal = $scope.common.getColorValues(key.toLowerCase(), i);
        if (Object.keys(percentValues).length === 1) {
          gradientStr = colorVal + ' ' + '0%, ' + colorVal + ' 100% ';
        } else {
          gradientStr += colorVal + ' ' + perc + '%,';
          perc += percentValues[i];
          gradientStr += colorVal + ' ' + perc + '%,';
        }
      }
    }
    gradientStr = gradientStr.substring(0, gradientStr.length - 1);

    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    if (isSafari) {
      gredientString += "-webkit-linear-gradient(left," + gradientStr + ")";
    } else {
      gredientString += "linear-gradient(to right," + gradientStr + ")";
    }
    return gredientString;
  };

  function createCircle(data, key) {
    // function needs to be shifted to directives
    var containerWidth = 594;
    var output = {};
    var dataChart = data.chart;
    var dataFeeds = null;
    if (data.comments) {
      dataFeeds = data.comments.feeds;
      maxCount = data.comments.maxCount;
    }

    if (dataChart) {
      for ( var i in dataChart[key]) {
        if (dataChart[key][i] !== 0 && i !== "$$hashKey") {
          output[i] = dataChart[key][i];
        }
      }
    }

    var tempObj = $scope.common.calculatePercentage(output).list, objCount = Object.keys(tempObj).length, positionObjArray = [], positionalObj = {}, index = 0, totalPercent = 0, currentPercent = 0;
    var filterDataFeed = function(e, i) {
      var op = key.toLowerCase();
      if (e[op].toLowerCase() === key1.toLowerCase()) { return true; }
    };
    for ( var key1 in tempObj) {
      if (tempObj.hasOwnProperty(key1)) {
        currentPercent = tempObj[key1];
        totalPercent = totalPercent + tempObj[key1];
        positionalObj = {};
        var radius = 0, cx, cy, dy = "4px", fontSize = '12px';
        if (tempObj[key1] <= 30) {
          radius = 25;
          fontSize = '12px';
          dy = "4px";
        } else if (tempObj[key1] > 30 && tempObj[key1] <= 60) {
          radius = 30;
          fontSize = '13px';
          dy = "4px";
        } else if (tempObj[key1] >= 61 && tempObj[key1] <= 100) {
          radius = 35;
          fontSize = '14px';
        }
        positionalObj.radius = radius;
        cx = (containerWidth * totalPercent) / 100 - (containerWidth * currentPercent / 100) / 1.5;
        if (index % 2 === 1) {
          // shifting circle down and up alternatively
          cy = 102 - (2 * radius);
        } else {
          cy = 150 + radius + 7;
        }
        if (index === 0) {
          cx = 120;
        } else if (index === (objCount - 1)) {
          // if this is the last circle
          cx = 480;
          if (index % 2 === 1) {
            // quick fix : if the circle is last bottom last
            cy = cy + 10;
          }
        }
        positionalObj.keyId = key;
        positionalObj.keyName = key1;
        positionalObj.keyVal = tempObj[key1];
        positionalObj.cx = cx;
        positionalObj.cy = cy;
        positionalObj.fontSize = fontSize;
        positionalObj.fontFamily = "Candara";
        positionalObj.dy = dy;

        if (dataFeeds) {
          var feed = dataFeeds.filter(filterDataFeed);
          positionalObj.feed = feed;
          positionalObj.maxCount = feed.length;
          positionObjArray.push(positionalObj);
        }

        index++;
      }
    }
    return positionObjArray;
  }

  $scope.$watch('employeeClusterModel1', function() {
    if ($scope.employeeClusterModel1) {

      $scope.employeeHospital1 = $scope.employeeClusterModel1.hospitals;
      $scope.employeeHospitalModel1 = $scope.employeeHospital1[0];
    }
  });

  $scope.$watch('employeeHospitalModel1', function() {
    if ($scope.employeeHospitalModel1) {
      // render comarative chart1
      DashboardService.dashboard.get({
        subTabName: 'employeeSentiment',
        hospitalId: $scope.employeeHospitalModel1.id
      }, function(data) {
        if (data.chart) {
          $scope.compartitiveChart1 = $scope.getGradient(data.chart.emotion, "emotion");
        } else {
          $scope.compartitiveChart1 = null;
        }
        $scope.dataArray1 = createCircle(data, "emotion");
      });
    }
  });

  $scope.$watch('employeeClusterModel2', function() {
    if ($scope.employeeClusterModel2) {

      $scope.employeeHospital2 = $scope.employeeClusterModel2.hospitals;
      $scope.employeeHospitalModel2 = $scope.employeeHospital2[0];
    }
  });

  $scope.$watch('employeeHospitalModel2', function() {
    if ($scope.employeeHospitalModel2) {

      DashboardService.dashboard.get({
        subTabName: 'employeeSentiment',
        hospitalId: $scope.employeeHospitalModel2.id
      }, function(data) {
        if (data.chart) {
          $scope.compartitiveChart2 = $scope.getGradient(data.chart.opinion, "opinion");
        } else {
          $scope.compartitiveChart2 = null;
        }
        $scope.dataArray2 = createCircle(data, "opinion");
      });
    }
  });

  $scope.$on("bubbleClicked", function(e, c, i) {

    $modal.open({
      templateUrl: 'modalZoom.html',
      controller: function($scope, $modalInstance) {
        $scope.feeds = "";
        $scope.feedMaxCount = 10;
        $scope.value = c;

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
        $scope.ok = function() {
          $modalInstance.close();
        };

        $scope.exportUrl = function(hospitalId) {
          var params = {};
          params = {
            hospitalId: hospitalId,
            sourceId: 5
          };
          params[$scope.value.keyId] = $scope.value.keyName;
          return params;
        };

      }
    });

    var scrolly = window.scrollY, scrollx = window.scrollX;
    window.scrollTo(scrollx, scrolly + 1);
    window.scrollTo(scrollx, scrolly - 1);
  });

  $scope.getClusterIds = function() {
    $scope.clusterIds = [];
    var jsonObj = {};
    if ($scope.clusterModel.name === $scope.DhCluster) {
      // Get all clusterIds in array
      for ( var counter in $scope.cluster) {
        if ($scope.cluster[counter].name !== $scope.DhCluster) {
          $scope.clusterIds.push($scope.cluster[counter].id);
        }
      }
      jsonObj.clusterIds = $scope.clusterIds;

    }
    return jsonObj;
  };
  self.load = function() {
    $scope.$emit('processOptionsEvent', "addAll");
    $scope.$emit('processOptionsEvent', "otherTabOtherTabsEnabled");
    $scope.DhCluster = $rootScope.DhCluster;
    if ($scope.hospitalModel) {

      var jsonObj = $scope.getClusterIds();

      jsonObj.subTabName = $scope.currentActiveTab.hash;

      DashboardService.dashboard.get(jsonObj, function(data) {
        $scope.subTabModel = data;
        if ($scope.employeeCluster && $scope.employeeCluster.length > 0) {
          // First time initialize
          $scope.employeeClusterModel1 = $scope.employeeCluster[0];
          $scope.employeeClusterModel2 = $scope.employeeCluster[0];
        }

        selectedHospitalData = $scope.baseHospitalData = $scope.subTabModel.chart;
        $scope.dataArray = {
          emotion: createCircle($scope.subTabModel, "emotion"),
          opinion: createCircle($scope.subTabModel, "opinion")
        };

        $scope.close = function() {
          console.log("close");
        };
      });

      if ($scope.clusterModel.name === $scope.DhCluster) {
        jsonObj = $scope.getClusterIds();
        jsonObj.id = "comparitive";
      } else {
        jsonObj = {};
        jsonObj.id = "comparitive";
      }

      DashboardService.filter.query(jsonObj, function(data) {
        $scope.employeeCluster = data;
        $scope.employeeClusterModel2 = data[0];
        $scope.employeeClusterModel1 = data[0];
      });
    }
  };

  $scope.$on("update:employeeSentiment", function(event, data) {
    self.load();
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "employeeSentiment") {
    self.load();
  }
}
employeeSentimentCtrl.$inject = ['$scope', '$rootScope', 'DashboardService', '$modal'];

/* Topic analysis controller */
function topicAnalysisCtrl($scope, $rootScope, DashboardService) {
  var self = this;
  $scope.cPage = 1;
  self.getParams = function(q) {
    var params = {};
    params.subTabName = $scope.currentActiveTab.hash;
    params.topicName = $scope.topics;
    if ($scope.clusterModel.name === $scope.DhCluster) {
      params.clusterIds = $scope.clusterIds;

    }
    if (self._filter) {
      params = angular.extend(params, self._filter);
    }
    return angular.extend(params, q);
  };

  self.load = function() {
    $scope.$emit('processOptionsEvent', "topicsTabOtherTabsDisabled");
    $scope.loadTopics();

  };

  $scope.loadTopics = function() {
    $scope.clusterIds = [];
    $scope.DhCluster = $rootScope.DhCluster;
    if ($scope.clusterModel.name === $scope.DhCluster) {
      for ( var counter in $scope.cluster) {
        if ($scope.cluster[counter].name !== $scope.DhCluster) {
          $scope.clusterIds.push($scope.cluster[counter].id);
        }
      }
      var jsonObj = {};
      jsonObj.clusterIds = $scope.clusterIds;
      jsonObj.id = 'topicNames';
      DashboardService.filter.query(jsonObj, function(response, header) {
        $scope.topicsObj = response;
        $scope.topics = $scope.topicsObj[0];
        $scope.loadAllData(0);
      });
    }
  };
  $scope.topicChange = function() {
    $scope.loadAllData(0);
  };
  $scope.loadAllData = function(offset) {
    $scope.clusterIds = [];
    for ( var counter in $scope.clusterClone) {
      if ($scope.clusterClone[counter].name !== $scope.DhCluster) {
        $scope.clusterIds.push($scope.clusterClone[counter].id);
      }
    }
    console.log('$scope.clusterIds->>>', $scope.clusterIds);
    DashboardService.dashboard.get(self.getParams({
      clusterIds: $scope.clusterIds
    }), function(data) {
      $scope.feeds = data.feeds.feeds;
      $scope.feedMaxCount = data.feeds.maxCount;
      if (offset === 0) {
        $scope.cPage = 1;
      }
      $scope.loadData(data, offset);
    });
  };
  $scope.loadData = function(data) {
    $scope.ObjectKeys = [];
    $scope.subTabModel = data;
    $scope.clusterAnalysis = data.clusterAnalysis;
    $scope.ObjectKeys = $scope.notSortedTopics($scope.clusterAnalysis);

    var colorSet = ['#FF2000', '#7B4EA3', '#007B33', '#EDC500', '#F99E00', '#1F6CAD', '#00C0FF'];
    var seriesArr = [];
    var seriesObj = {};
    seriesObj.data = $scope.subTabModel.emotionalSentiment.data;
    seriesObj.name = "No. of Reviews";
    seriesArr.push(seriesObj);
    var columnChartObj = {
      dataSet: seriesArr,
      xAxis: true,
      setCategoryValue: true,
      categories: $scope.subTabModel.emotionalSentiment.categories,
      colorSet: colorSet,
      colorByPoint: true,
      dataLabel: true
    };

    var lineChartObj = {
      dataSet: $scope.subTabModel.yearlyAnalysis.data,
      xAxis: true,
      yAxisEnabled: true,
      setCategoryValue: true,
      yAxis: [{
        labels: {
          format: '{value}',
          enabled: true

        },
        title: {
          text: 'Polarity'

        },
        min: 0,
        max: 100
      }, {
        title: {
          text: 'Rating'

        },
        labels: {
          format: '{value}',
          enabled: true

        },
        min: 1,
        max: 5,
        opposite: true
      }],
      categories: $scope.subTabModel.yearlyAnalysis.years

    };

    lineChartObj.dataSet[0].yAxis = 0;
    lineChartObj.dataSet[1].yAxis = 1;

    $scope.columnChart = $scope.commonChart.basicChart(columnChartObj);
    $scope.lineChart = $scope.commonChart.basicChart(lineChartObj);
  };
  $scope.exportUrl = function() {
    var params = self.getParams();
    return params;
  };

  $scope.loadFeeds = function(offset) {
    var params = {
      offset: offset || 0
    };
    params = angular.extend(params, self._filter);
    params = angular.extend(params, self.getParams());

    DashboardService.feed.get(params, function(data) {
      $scope.feeds = data.feeds;
      $scope.feedMaxCount = data.maxCount;
      if (params.offset === 0 && $scope.cPage !== 1) {
        $scope.cPage = 1;
      }
    });
  };

  $scope.$on("feedFilter", function(event, type, name) {
    self.filterFeeds(event, type, name);
  });

  self.filterFeeds = function(event, type, name) {

    self._filter = {};
    if ($scope.cPage !== 1) {
      $scope.cPage = 1;
    } else {
      $scope.loadFeeds(0);
    }
  };

  $scope.$on("update:topicAnalysis", function() {
    if ($scope.hospitalModel) {
      self.load();
    }
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "topicAnalysis") {
    self.load();
  }

}
topicAnalysisCtrl.$inject = ['$scope', '$rootScope', 'DashboardService'];
/* Ends here */