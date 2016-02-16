function AvatarCtrl($scope, $location, $route,$filter) {
  var self = this;
  $scope.noData = false;
  $scope.feeds = [];
  $scope.feedMaxCount = 0;

  /* Sub Tabs */
  $scope.tabs = [{
    title: "Avatar Health",
    icon: "icon-socialHealth",
    hash: "avatarHealth",
    url: 'partials/socialHealth.html',
    ctrl: avatarHealthCtrl,
    disabled: false
  }, {
    title: "Patient Voice",
    icon: "icon-patientVoice",
    hash: "avatarVoice",
    url: 'partials/patientVoice.html',
    ctrl: avatarVoiceCtrl,
    disabled: false
  }, {
    title: "Avatar Distribution",
    icon: "icon-avatarDistribution",
    hash: "avatarDistribution",
    url: 'partials/socialMedia.html',
    ctrl: avatarDistributionCtrl,
    disabled: false
  }, {
    title: "A-Index",
    icon: "icon-aIndex",
    hash: "aIndex",
    url: 'partials/pIndex.html',
    ctrl: aIndexCtrl,
    disabled: false
  }, {
    title: "Measures By Facilities",
    icon: "icon-measuresByFacilities",
    hash: "measuresByFacilities",
    url: 'partials/avatarMeasuresSummary.html',
    ctrl: avatarSummaryCtrl,
    disabled: false
  }];

  self.disableTabs = [];
  $scope.currentActiveTab = $scope.tabs[0];

  $scope.$on("$routeChangeSuccess", function(event,current) {
    var hash = current.pathParams.subtab;
    var f = $scope.tabs.filter(function(t) {
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
  });

  self.handleTabs = function() {
    if ($scope.hospitalModel && $scope.hospitalModel.name === "All") {
      $scope.tabs.forEach(function(i) {
        var index = self.disableTabs.indexOf(i.hash);
        if (index !== -1) {
          i.disabled = true;
        }
      });
    } else {
      $scope.tabs.forEach(function(i) {
        i.disabled = false;
      });
    }
  };

  $scope.$on("hospitalChange", function(hospital) {
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

  $scope.filterFeeds = function(feeds,type, name) {
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
      if (i === obj) {
        $scope.selectionModel[i] = ($scope.selectionModel[i] === 1) ? 0 : 1;
      } else {
        $scope.selectionModel[i] = 0;
      }
    }
  };

  $scope.isVisible = function(obj) {
    return $scope.selectionModel[obj] === 1;
  };

  $scope.getDate = function() {
    if ($scope.subTabModel && $scope.subTabModel.timeframe) {
      $scope.maxDate = $scope.subTabModel.timeframe.to;
      $scope.minDate = $scope.subTabModel.timeframe.from;
      var date = null;
      if (!$scope.minDate) {
        date = 'Last Updated on: ' + $filter('utcdate')($scope.maxDate);
      } else {
        date = 'From: ' + $filter('utcdate')($scope.minDate) + ' - To: ' + $filter('utcdate')($scope.maxDate);
      }
      return date;
    }
  };
}
AvatarCtrl.$inject = ['$scope', '$location', '$route','$filter'];

/* Avatar Health Controller */
function avatarHealthCtrl($scope, DashboardService) {
  var self = this;
  self._feed = null;
  self.filterFeeds = function(type, name) {
    $scope.feeds = $scope.$parent.filterFeeds(self._feed, event, type, name);
  };

  $scope.$on("feedFilter", function(event, type, name) {
    self.filterFeeds(event, type, name);
  });

  $scope.exportUrl = function() {
    return {
      limit: 10,
      sourceId: 9
    };
  };

  $scope.loadFeeds = function(offset) {
    DashboardService.feed.get({
      offset: offset || 0,
      sourceId: 9
    }, function(data) {
      $scope.feeds = data.feeds;
      self._feed = angular.copy($scope.feeds);
      $scope.feedMaxCount = data.maxCount;
    });
  };

  $scope.calculateRating = function() {
    var values = $scope.subTabModel.analysis.Rating, calculatedValue = 0, count = 0, total = 0, i;
    for (i in values) {
      if (i !== "$$hashKey") {
        total += values[i];
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
    if (Object.keys($scope.subTabModel.analysis.analysisAvg).length > 0) {
      $scope.topWords = $scope.subTabModel.key_words;
      $scope.total = 0;
      for ( var i in $scope.subTabModel.analysis.analysisDist.Opinion) {
        if($scope.subTabModel.analysis.analysisDist.Opinion.hasOwnProperty(i)){
          $scope.total += $scope.subTabModel.analysis.analysisDist.Opinion[i];
        }
      }
    }
  };

  self.load = function() {
    $scope.cluster = [];
    console.log($scope.cluster);
    $scope.$emit('processOptionsEvent', "dhDisabled");
    console.log($scope.cluster);
    $scope.subTabModel = undefined;
    DashboardService.dashboard.get({
      subTabName: "socialHealth"
    }, function(data) {
      $scope.subTabModel = data;
      if ($scope.subTabModel) {
        if (Object.keys($scope.subTabModel.analysis.analysisAvg).length > 0) {
          $scope.noData = false;
        }
        self.loadTab();
      }
    });
    if (!$scope.subTabModel) {
      $scope.noData = true;
    }
  };

  $scope.$on("update:avatarHealth", function() {
    self.load();
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "avatarHealth") {
    self.load();
  }
}
avatarHealthCtrl.$inject = ['$scope', 'DashboardService'];

/* Avatar Voice Controller */
function avatarVoiceCtrl($scope, DashboardService) {

  var self = this;
  self._filter = {};
  $scope.cPage = 1;

  $scope.$on("feedFilter", function(type, name) {
    self._filter = {};
    if (type) {
      self._filter.sourceId = $scope.common.getSourceByName(name).id;
    }
  });

  self.getParams = function(q) {
    var params = {
      topicName: $scope.rowSelectedModel
    };
    if (self._filter) {
      params = angular.extend(params, self._filter);
    }
    return angular.extend(params, q);
  };

  $scope.loadFeeds = function(offset) {
    DashboardService.feed.get(self.getParams({
      offset: offset || 0,
      sourceId: 9
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
    params.sourceId = 9;
    return params;
  };

  $scope.rowClick = function(value) {
    $scope.rowSelectedModel = value;
    self.update();
  };

  self.update = function() {
    var data = $scope.subTabModel.topics[$scope.rowSelectedModel];
    $scope.cPage = 1;
    $scope.selectedValue = {
      title: $scope.rowSelectedModel,
      avgRating: data.avgRating,
      overallScore: data.overallScore,
      patientVoiceRatingChart: $scope.commonChart.basicChart({
        dataSet: angular.copy(data.ratingChart),
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

  $scope.rowSelectedModel = null;
  $scope.feeds = [];
  $scope.feedMaxCount = 0;
  $scope.DhCluster = 'DH Corporate';

  self.load = function() {
    $scope.$emit('processOptionsEvent', "dhDisabled");
    $scope.$emit('processOptionsEvent', "addAll");
    $scope.clusterModel = $scope.cluster[0];
    $scope.subTabModel = undefined;
    DashboardService.dashboard.get({
      subTabName: "patientVoice"
    }, function(data) {
      $scope.subTabModel = data;

      if (Object.keys($scope.subTabModel.topics).length > 0) {
        $scope.noData = false;
      } else {
        $scope.noData = true;
      }
      /* Added to disable the section for DH Corporate */
      if ($scope.clusterModel.name === $scope.DhCluster) {
        $scope.noData = true;
      }
      /* Ends here */
      var arr = [];
      for ( var i in $scope.subTabModel.topics) {
        if($scope.subTabModel.topics.hasOwnProperty(i)){
          var obj = $scope.subTabModel.topics[i];
          obj.name = i;
          arr.push(obj);
        }
      }

      var topicsSorted = arr.sort(function(a, b) {
        if (a.avgRating <= b.avgRating) {
          return 1;
        }
        else {
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
    });

    if (!$scope.subTabModel) {
      $scope.noData = true;
    }
  };

  $scope.$on("update:avatarVoice", function() {
    if ($scope.hospitalModel) {
      self.load();
    }
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "avatarVoice") {
    self.load();
  }
}
avatarVoiceCtrl.$inject = ['$scope', 'DashboardService'];

/* Avatar Distribution Controller */
function avatarDistributionCtrl($scope, DashboardService) {
  var i = 0, self = this;

  self._filter = {};
  $scope.cPage = 1;
  self.ratingMap = {
    "One Rating": 1,
    "Two Rating": 2,
    "Three Rating": 3,
    "Four Rating": 4,
    "Five Rating": 5
  };

  self.filterFeeds = function(type, name) {
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
    }
  };

  $scope.getColor = function(value) {
    if (!value) { 
        return; 
    }
    if (value.indexOf('Rating') >= 0) {
        return $scope.common.getColorValues("rating", value);
    } else {
        return $scope.common.getColorValues("emotion", value);
    }
    };

  $scope.loadFeeds = function(offset) {
    var params = {
      offset: offset || 0,
      sourceId: 9
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
    params.sourceId = 9;
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
    params.subTabName = "socialMediaDistribution";

    if ($scope.timeLine) {
      params.timestamp = parseInt($scope.timeLine.min, 0);
      params.timestampMax = parseInt($scope.timeLine.max, 0);
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

  self.loadTab = function() {
    if ($scope.cPage && $scope.cPage !== 1) {
      $scope.cPage = 1;
    }
    $scope.selectedValue = "";
    var chartObj = {
      bar: true,
      bg: "rgba(243,241,242,1)",
      stacking: "percent",
      border: 1,
      allowPointSelect: false
    };
    chartObj.type = "Opinion";
    chartObj.dataSet = {};
    if ($scope.subTabModel.sentimentalDistribution) {
      chartObj.dataSet = $scope.subTabModel.sentimentalDistribution.Opinion;
    }
    $scope.chartOpinion = $scope.commonChart.basicChart(angular.copy(chartObj));

    chartObj.type = "Emotion";
    chartObj.dataSet = {};
    if ($scope.subTabModel.sentimentalDistribution) {
      chartObj.dataSet = $scope.subTabModel.sentimentalDistribution.Emotion;
    }
    $scope.chartEmotion = $scope.commonChart.basicChart(angular.copy(chartObj));

    chartObj.type = "Rating";
    chartObj.dataSet = {};
    if ($scope.subTabModel.sentimentalDistribution) {
      chartObj.dataSet = $scope.subTabModel.sentimentalDistribution.Rating;
    }
    $scope.chartRating = $scope.commonChart.basicChart(angular.copy(chartObj));

    $scope.chartBubble = $scope.subTabModel.bubbleChartData || [];
  };

  $scope.fetchFilter = function(data) {
    if (data.source && data.source.length > 0) {
      $scope.filterSource = data.source;
      $scope.toggleModel = $scope.filterSource.filter(function(item) {
        return $scope.selectedQuestions.indexOf(item) !== -1;
      });
    }

    if (data.careArea && data.careArea.length > 0) {
      $scope.filterTopics = data.careArea;
      $scope.toggleModel1 = $scope.filterTopics.filter(function(item) {
        return $scope.selectedQuestions.indexOf(item) !== -1;
      });
    }
  };

  self.load = function() {
    $scope.$emit('processOptionsEvent', "dhDisabled");
    $scope.$emit('processOptionsEvent', "addAll");
    $scope.clusterModel = $scope.cluster[0];
    $scope.noData = true;
    $scope.DhCluster = "DH Corporate";
    $scope.subTabModel = undefined;
    DashboardService.dashboard.get({
      subTabName: "socialMediaDistribution"
    }, function(data) {
      $scope.subTabModel = data;
      $scope.timeSeries = $scope.subTabModel.timeSeries;
      if ($scope.subTabModel.bubbleChartData) {
        $scope.noData = false;
      } else {
        $scope.noData = true;
      }
      /* Added to disable the section for DH Corporate */
      if ($scope.clusterModel.name === $scope.DhCluster) {
        $scope.noData = true;
      }
      /* Ends here */

      self.loadTab();
      var v = $scope.commonChart.showTimeSpan({
        dataSet: $scope.subTabModel.timeSeries,
        setExtremes: function(event) {
          $scope.timeLine = event;
          $scope.$apply($scope.filter());
        }
      });
      $scope.timeLineSliderFilter = v;

      DashboardService.filter.get({
        id: 'socialMediaDistribution',
        type: 'avatar'
      }, function(data) {
        $scope.subTabModelFilter = data;
        $scope.selectedQuestions = []; 
        $scope.fetchFilter(data);
      });

    });
  };

  $scope.$on("update:avatarDistribution", function() {
    if ($scope.hospitalModel) {
      self.load();
    }
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "avatarDistribution") {
    self.load();
  }
}
avatarDistributionCtrl.$inject = ['$scope', 'DashboardService'];

/* a Index Controller */
function aIndexCtrl($scope, $modal, $filter, DashboardService) {
  $scope.noQuestions = true;

  var self = this;
  self.showModal = function(data) {
    var modalInstance = $modal.open({
      templateUrl: 'modalCalculation.html',
      controller: function($scope, $modalInstance) {

        $scope.calculations = data;
        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      }
    });
    modalInstance.result.then();
  };

  self.load = function() {
    $scope.$emit('processOptionsEvent', "dhDisabled");
    $scope.$emit('processOptionsEvent', "addAll");
    $scope.clusterModel = $scope.cluster[0];
    $scope.subTabModel = undefined;
    DashboardService.dashboard
        .get({
          local: true,
          subTabName: $scope.currentActiveTab.hash
        }, function(data) {
          $scope.subTabModel = data;
          $scope.noData = false;
          var categories = [];
          data = [];
          if ($scope.subTabModel.overallPindex) {
            for ( var i in $scope.subTabModel.overallPindex) {
              if($scope.subTabModel.overallPindex.hasOwnProperty(i)){
                categories.push(i);
                data.push($scope.subTabModel.overallPindex[i]); 
              }
            }
            var chartObj = {
              dataSet: data,
              categories: categories,
              xLabelAlign: "right",
              dataLabelColor: '#000',
              dataLabelAlign: "right",
              xAxis: true,
              yAxisEnabled: true,
              setCategoryValue: true,
              headerFormat: '<strong>Facility</strong>: {point.x}<br/>',
              pointFormat: '<strong>Performance</strong>: {point.y}',
              labelX: -15,
              labelY: 20,
              titleStyle: {
                fontSize: '16px',
                fontWeight: 'bold'
              },
              plotBands: [{
                color: 'rgba(69,192,33,0.1)',
                from: -0.5,
                to: 4.5,
                label: {
                  text: 'Top Performing',
                  rotation: 90,
                  align: 'right',
                  textAlign: 'center',
                  x: -10,
                  style: {
                    color: 'green',
                    fontWeight: 'bold'
                  }
                }
              }, {
                color: 'rgba(221,55,55,0.1)',
                from: data.length - 5.5,
                to: data.length - 0.5,
                label: {
                  text: 'Bottom Performing',
                  rotation: 90,
                  align: 'right',
                  textAlign: 'center',
                  x: -10,
                  style: {
                    color: 'red',
                    fontWeight: 'bold'
                  }
                }
              }]
            };
            $scope.chartData = $scope.commonChart.basicChart(chartObj);
          } else {
            $scope.noData = true;
          }
          $scope.info = {};
          $scope.info.title = "A-index Details";
          $scope.info.description = "It shows the performance index of facilities across all the major dimensions. This score is calculated by normalizing the data across domain and across facility.A-index shows comparative performance of different facility and one can find which facility is performing better which is worst.";
          $scope.showModal = function() {
            self.showModal($scope.subTabModel.calculation);
          };
        });

    if ($scope.subTabModel) {
      $scope.noData = false;
    } else {
      $scope.noData = true;
    }
  };

  $scope.$on("update:aIndex", function() {
    if ($scope.hospitalModel) {
      self.load();
    }
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "aIndex") {
    self.load();
  }
}
aIndexCtrl.$inject = ['$scope', '$modal', '$filter', 'DashboardService'];

/* Avatar Summary Controller */
function avatarSummaryCtrl($scope, DashboardService) {
  var self = this;

  $scope.chartVisible = false;
  $scope.noData = false;
  $scope.redObjemergency = {};
  $scope.greenObjemergency = {};
  $scope.redObjfacility = {};
  $scope.greenObjfacility = {};

  $scope.getColor = function(value, type) {
    var getVal = $scope.subTabModel.summary[type][value];
    var colorVal;
    if (type === "emergency") {
      if (getVal < $scope.sum[type]) {
        colorVal = $scope.common.colorToHex($scope.redObjemergency[getVal]);
      } else {
        colorVal = $scope.common.colorToHex($scope.greenObjemergency[getVal]);
      }
    } else {
      if (getVal < $scope.sum[type]) {
        colorVal = $scope.common.colorToHex($scope.redObjfacility[getVal]);
      } else {
        colorVal = $scope.common.colorToHex($scope.greenObjfacility[getVal]);
      }
    }
    return colorVal;
  };

  // Dummy Data TODO
  $scope.showChart = function() {
    var chartData = {
      "emergency": {
        "name": "emergency",
        "data": [79.0, 77.2, 75.0, 73.0, 71.0, 65.0, 55.2, 51.3],
        "categories": ["Patient safety", "Entering Emergency", "Environment", "Key Results", "Discharge Call Study", "Waiting for Care", "Overall rating", "Attendees"]
      },
      "facility": {
        "name": "facility",
        "data": [90.0, 89.0, 89.0, 83.0, 81.0, 74.0, 69.0, 75.0, 65.0, 59.0],
        "categories": ["Doctors Communication", "Nurses Communication", "Pain Management", "Responsiveness of hospital staff", "Communication about medicines", "Communication about medicines",
            "Discharge information", "Cleanliness", "Quietness", "Overall rating"]
      }
    };

    if ($scope.chartVisible) {
      $scope.chartVisible = false;
    } else {
      $scope.chartVisible = true;
      var chartObj = {
        type: "Source",
        xAxis: true,
        yAxisEnabled: true,
        dataSet: chartData.facility.data,
        categories: chartData.facility.categories,
        title: "Facilities (IP) Factor",
        pointFormat: 'Score: <b>{point.y}</b><br/>'
      };
      $scope.columnFacilitychart = $scope.commonChart.basicChart(chartObj);
      $scope.categoriesFacility = chartData.facility.categories;

      chartObj.dataSet = chartData.emergency.data;
      chartObj.categories = chartData.emergency.categories;
      chartObj.title = "Emergency Rooms Factor";

      $scope.columnEmergencychart = $scope.commonChart.basicChart(chartObj);
      $scope.categoriesEmergency = chartData.emergency.categories;
    }
  };

  self.load = function() {
    $scope.$emit('processOptionsEvent', "dhDisabled");
    $scope.$emit('processOptionsEvent', "addAll");
    $scope.clusterModel = $scope.cluster[0];
    var redArrayEmergency = [], redArrayFacility = [], greenArrayEmergency = [], greenArrayFacility = [];
    $scope.subTabModel = undefined;
    DashboardService.dashboard.get({
      local: true,
      subTabName: $scope.currentActiveTab.hash
    }, function(data) {
      $scope.subTabModel = data;
      if ($scope.subTabModel) {
        $scope.noData = false;
      }

      if ($scope.subTabModel && $scope.subTabModel.summary) {
        $scope.sum = {};

        var sumtemp = 0, len = Object.keys($scope.subTabModel.summary.facility).length;
        for ( var cntFacility in $scope.subTabModel.summary.facility) {
          if($scope.subTabModel.summary.facility.hasOwnProperty(cntFacility)){
            sumtemp += $scope.subTabModel.summary.facility[cntFacility];  
          }
        }
        $scope.sum.facility = sumtemp / len;
        sumtemp = 0;
        for ( var cnt in $scope.subTabModel.summary.emergency) {
          if($scope.subTabModel.summary.emergency.hasOwnProperty(cnt)) {
            sumtemp += $scope.subTabModel.summary.emergency[cnt];  
          }
        }
        $scope.sum.emergency = sumtemp / len;
      }

      for ( var i in $scope.subTabModel.summary.emergency) {
        if ($scope.subTabModel.summary.emergency[i] < $scope.sum.emergency) {
          redArrayEmergency.push($scope.subTabModel.summary.emergency[i]);
        } else {
          greenArrayEmergency.push($scope.subTabModel.summary.emergency[i]);
        }
      }

      for ( var cntfacility in $scope.subTabModel.summary.facility) {
        if ($scope.subTabModel.summary.facility[cntfacility] < $scope.sum.facility) {
          redArrayFacility.push($scope.subTabModel.summary.facility[cntfacility]);
        } else {
          greenArrayFacility.push($scope.subTabModel.summary.facility[cntfacility]);
        }
      }

      $scope.redObjemergency = $scope.common.getGradient(redArrayEmergency, 'red');
      $scope.greenObjemergency = $scope.common.getGradient(greenArrayEmergency, 'green');

      $scope.redObjfacility = $scope.common.getGradient(redArrayFacility, 'red');
      $scope.greenObjfacility = $scope.common.getGradient(greenArrayFacility, 'green');
    });
    if (!$scope.subTabModel) {
      $scope.noData = true;
    }
  };

  $scope.$on("update:measuresByFacilities", function() {
    if ($scope.hospitalModel) {
      self.load();
    }
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "measuresByFacilities") {
    self.load();
  }
}
avatarSummaryCtrl.$inject = ['$scope', 'DashboardService'];