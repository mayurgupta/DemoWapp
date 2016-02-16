function CmsCtrl($scope, $location, $route,DashboardService, $filter) {
  var self = this;
  $scope.feeds = [];
  $scope.feedMaxCount = 0;
  $scope.view = {
    "Cluster": "Cluster",
    "Hospital": "Hospital"
  };
  $scope.quartersHospCMS = [{
	    name: 'Q4_2011 - To - Q3_2012',
	    timestamp: '1348993800000'
	  }, {
	    name: 'Q2_2012 - To - Q1_2013',
	    timestamp: '1364718600000'
	  }, {
	    name: 'Q3_2012 - To - Q2_2013',
	    timestamp: '1372550400000'
	  },{
		    name: 'Q4_2012 - to - Q3_2013',
		    timestamp: '1380499200000'
		  },{
			    name: 'Q1_2013 - to - Q4_2013',
			    timestamp: '1380499200001'
			  }];
  $scope.quarterHospCMS = $scope.quartersHospCMS[4];
  /* Sub Tabs */
  $scope.tabs = [{
    title: "HCAHPS Measures DH-ST-NATL summary",
    /* icon: "icon-compititorAnalysis", */
    hash: "hcahpsSummary",
    url: 'partials/HCAHPSMeasuresSummary.html',
    ctrl: hcahpsSummaryCtrl,
    disabled: false
  }, {
    title: "Hospital CMS",
    /* icon: "icon-socialHealth", */
    hash: "hospitalCms",
    url: 'partials/hospitalCms.html',
    ctrl: hospitalCmsCtrl,
    disabled: false
  }, {
    title: "HCAHPS Correlation Matrix",
    /* icon: "icon-patientVoice", */
    hash: "hcahpsCorrelation",
    url: 'partials/correlationMatrix.html',
    ctrl: hcahpsCorrelationCtrl,
    disabled: false
  }, {
    title: "HCAHPS Regression",
    /* icon: "icon-socialMediaDistribution", */
    hash: "hcahpsregression",
    url: 'partials/HCAHPSRegression.html',
    ctrl: hcahpsregressionCtrl,
    disabled: false
  }, {
    title: "HCAHPS Detailed Timelines",
    /* icon: "icon-timeline", */
    hash: "hcahpsDetailedTimeLine",
    url: 'partials/detailedTimelines.html',
    ctrl: hcahpsDetailedTimeLineCtrl,
    disabled: false
  }, {
    title: "HCAHPS Measures by Facility",
    /* icon: "icon-compititorAnalysis", */
    hash: "measuresByFacility",
    url: 'partials/HCAHPSMeasures.html',
    ctrl: measuresByFacilityCtrl,
    disabled: false
  }, {
    title: "P index by facility",
    /* icon: "icon-compititorAnalysis", */
    hash: "pIndex",
    url: 'partials/pIndex.html',
    ctrl: pIndexCtrl,
    disabled: false
  }, {
    title: "Competitor Analysis",
    /* icon: "icon-employeeSentiment", */
    hash: "compare",
    url: 'partials/cmsCompetitorAnalysis.html',
    ctrl: cmsCompetitorCtrl,
    disabled: false
  }];
  if ($scope.clusterModel.name !== 'DH Corporate') {
    $scope.tabArray = ["hospitalCms", "hcahpsDetailedTimeLine", "measuresByFacility", "pIndex", "compare", "hcahpsCorrelation", "hcahpsregression"];
  } else {
    $scope.tabArray = ["hcahpsDetailedTimeLine", "measuresByFacility", "pIndex", "compare", "hcahpsCorrelation", "hcahpsregression"];
  }

  $scope.handleTabs = function() {
    if ($scope.hospitalModel) {
      if ($scope.hospitalModel.name === "All") {
        if ($scope.clusterModel.name === 'DH Corporate') {
          $scope.tabs.forEach(function(i) {
            var index = $scope.tabArray.indexOf(i.hash);
            if (index !== -1) {
              i.disabled = true;
            } else {
              i.disabled = false;
            }
          });
        } else {
          $scope.tabs.forEach(function(i) {
            var index = $scope.tabArray.indexOf(i.hash);
            if (index !== -1) {
              i.disabled = true;
            }
          });
        }

      } else {
        $scope.tabs.forEach(function(i) {
          i.disabled = false;
        });
      }
    }
  };
  $scope.handleTabs($scope.tabArray);

  $scope.currentActiveTab = $scope.tabs[0];
  $scope.$on("$routeChangeSuccess", function(event, current) {
    var hash = current.pathParams.subtab;
    var f = $scope.tabs.filter(function(t) {
      if (t.dropdown) {
        for (var i = 0; i < t.dropdown.length; i++) {
          return t.dropdown[i].hash === hash;
        }
      }
      return t.hash === hash;
    });

    if (f && f.length > 0) {
      $scope.currentActiveTab = f[0];
      $scope.handleTabs($scope.tabArray);
      if ($scope.tabArray.indexOf($scope.currentActiveTab.hash) !== -1) {
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
      self.loadPage();
    }
  });

  $scope.$on("hospitalChange", function(event, hospital) {
    if (hospital) {
      $scope.handleTabs($scope.tabArray);
      self.loadPage();
    }
  });

  $scope.changeTab = function(template, parent) {
    if (parent) {
      $scope.currentActiveTab = parent;
      return;
    }
    $location.path("/" + $route.current.hash + "/" + template.hash);
  };

  self.sendChangeEvent = function() {
    $scope.$broadcast("update:" + $scope.currentActiveTab.hash, $scope.subTabModel);
  };

  /* loadData change */
  self.loadPage = function() {

    if ($scope.hospitalModel) {

      if ($scope.clusterModel.name !== 'DH Corporate') {
        $scope.tabArray = ["hospitalCms", "hcahpsDetailedTimeLine", "measuresByFacility", "pIndex", "compare", "hcahpsCorrelation", "hcahpsregression"];
      } else {
        $scope.tabArray = ["hcahpsDetailedTimeLine", "measuresByFacility", "pIndex", "compare", "hcahpsCorrelation", "hcahpsregression"];
      }
      $scope.handleTabs($scope.tabArray);
      var jsonObj = {};
      if ($scope.currentActiveTab.hash !== "compare") {
        var hashName = $scope.currentActiveTab.hash;
        if ($scope.currentActiveTab.hash === "hospitalCms") {
          $scope.DhCluster = "DH Corporate";

          $scope.clusterIds = [];
          if ($scope.clusterModel.name === $scope.DhCluster) {
            // Get all clusterIds in array
            for ( var counter in $scope.cluster) {
              if ($scope.cluster[counter].name !== $scope.DhCluster) {
                $scope.clusterIds.push($scope.cluster[counter].id);
              }
            }
            if ($scope.pageView === undefined) {
              $scope.pageView = "Cluster";
            }
            jsonObj.endTime = $scope.quarterHospCMS.timestamp;
            jsonObj.view = $scope.pageView;
            jsonObj.clusterIds = $scope.clusterIds;
          }
        }

        jsonObj.subTabName = hashName;
        $scope.clusterVal = {};
        DashboardService.dashboard.get(jsonObj, function(data) {
          $scope.subTabModel = data;
          $scope.dataSize = Object.keys($scope.subTabModel).length;
          self.sendChangeEvent();
          var colorsArray = ['#C0C0C0 ', '#C0C0C0 ', '#C0C0C0', '#C0C0C0 ', '#C0C0C0 ', '#C0C0C0 ', '#C0C0C0 ', '#C0C0C0 ', '#C0C0C0 ', '#C0C0C0 '];
          if ($scope.clusterModel.name === $scope.DhCluster) {
            $scope.subTabModel = data;
            $scope.pageView = $scope.view.Cluster;
            $scope.clusterValues = $scope.subTabModel.clusters;


            $scope.facility = $scope.subTabModel.facility;
            $scope.facilitySelected = 'Nurses Communication';

            $scope.getCmsChartData(colorsArray);
          }

        });

      } else {
        DashboardService.filter.query({
          id: "comparitive",
          hospitalId: $scope.hospitalModel.id
        }, function(data) {
          $scope.subTabModel = data;
          $scope.dataSize = Object.keys($scope.subTabModel).length;
          self.sendChangeEvent();
        });
      }
    }
  };
  $scope.getCmsChartData = function(colorsArray) {
    var xCategories = "";
    var dataSet = "";
    var cmsChartObj1 = {};
    if ($scope.pageView === "Cluster") {
      if ($scope.subTabModel) {
        xCategories = $scope.subTabModel.cmsClusterChartObj.categories;
        dataSet = $scope.subTabModel.cmsClusterChartObj.ChartObj;
        cmsChartObj1 = {
          dataSet: dataSet,
          legend: true,
          legendLayout: "horizontal",
          legendAlign: "center",
          legendVerticalAlign: "bottom",
          legendWidth: 320,
          xAxis: true,
          yAxisEnabled: true,
          setCategoryValue: true,
          categories: xCategories,
          colorByPoint: true,
          colorSet: colorsArray
        };
      }

    } else {

      xCategories = $scope.subTabModel.cmsHospitalChartObj.categories;
      dataSet = $scope.subTabModel.cmsHospitalChartObj.ChartObj;

      cmsChartObj1 = {
        dataSet: dataSet,
        legend: true,
        legendLayout: "horizontal",
        legendAlign: "center",
        legendVerticalAlign: "bottom",
        legendWidth: 320,
        xAxis: true,
        yAxisEnabled: true,
        colorByPoint: true,
        colorSet: colorsArray
      };
    }
    cmsChartObj1.dataSet[0].index = 1;
    cmsChartObj1.dataSet[1].index = 2;
    cmsChartObj1.dataSet[2].index = 0;
    cmsChartObj1.dataSet[0].color = '#6DBF53';
    cmsChartObj1.dataSet[1].color = '#d9534f';
    cmsChartObj1.dataSet[2].color = '#C0C0C0';
    $scope.cmsChart = $scope.commonChart.basicChart(cmsChartObj1);
   

  };
  $scope.getDate = function() {
    if ($scope.subTabModel && $scope.subTabModel.timeframe) {
      $scope.maxDate = $scope.subTabModel.timeframe.to;
      $scope.minDate = $scope.subTabModel.timeframe.from;
      var date = null;
      if (!$scope.minDate && !$scope.maxDate) { 
          return null; 
      }
      if (!$scope.minDate) {
        date = 'Last Updated on: ' + $scope.common.getQuarter($filter('utcdate')($scope.maxDate, null, false));
      } else {
        date = $scope.common.getQuarter($filter('utcdate')($scope.minDate, "MM-yyyy", false)) + ' - To - ' + $scope.common.getQuarter($filter('utcdate')($scope.maxDate, "MM-yyyy", false));
      }
      return date;
    }
  };
}
CmsCtrl.$inject = ['$scope', '$location', '$route','DashboardService', '$filter'];

/* HCAHPS correlationMatrix Controller */
function hcahpsCorrelationCtrl($scope, DashboardService, $http) {
  var self = this;
  $scope.noData = false;
  $scope.getColor = function(value) {
    var color = "negative";
    if (value > 0.45) {
      color = "positive";
    } else if (value > 0.25 && value <= 0.45) {
      color = "neutral";
    }
    return $scope.common.getColorValues("opinion", color);
  };

  self.load = function() {
    $scope.$emit('processOptionsEvent', "dhDisabled");

    var dataObj = {};
    dataObj.userDetail = {};
    dataObj.cluster = {};

    $http({
      url: "api/users/me",
      method: "GET",
      cache: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success(function(data) {
      dataObj.userDetail = data.userDetail;
      dataObj.cluster = data.clusters;

    }).error(function() {

    });

    $scope.cluster = [];
    $scope.clusterModel = [];
    $scope.cluster = dataObj.cluster;
    $scope.clusterModel = $scope.cluster[0];
    $scope.common.setConfig(dataObj);

    $scope.noData = false;

    if ($scope.subTabModel.entity) {
      if ($scope.subTabModel.entity) {
        $scope.entity = $scope.subTabModel.entity;
        $scope.matrix = $scope.subTabModel.matrix;
      }
    } else {
      $scope.noData = true;
    }
  };

  $scope.$on("update:hcahpsCorrelation", function() {
    self.load();
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "hcahpsCorrelation") {
    if ($scope.subTabModel) {
        self.load();
    }
  }
}
hcahpsCorrelationCtrl.$inject = ['$scope', 'DashboardService', '$http'];

/* HCAHPS Regression Controller */
function hcahpsregressionCtrl($scope, DashboardService) {
  $scope.noData = false;
  $scope.items = [];
  $scope.loadRecord = function(choice) {
    if (choice !== $scope.items.active) {
      $scope.items.active = choice;
    }
  };
  $scope.getColor = function(index, value) {
    if (index === 0) {
      var color = "negative";
      if (value > 0.45) {
        color = "positive";
      } else if (value > 0.25 && value <= 0.45) {
        color = "neutral";
      }
      return $scope.common.getColorValues("opinion", color);
    } else {
      return "#333";
    }
  };
  $scope.$watch('items.active', function() {
    if ($scope.subTabModel && $scope.items.active) {
      $scope.entity = $scope.subTabModel[$scope.items.active].entity;
      $scope.matrix = $scope.subTabModel[$scope.items.active].matrix;
    }
  });

  var self = this;

  self.load = function() {
    $scope.$emit('processOptionsEvent', "dhDisabled");
    $scope.categories = "";
    $scope.noData = false;
    var i;
    if ($scope.subTabModel.Reccomendation || $scope.subTabModel.Ratings) {
      if ($scope.subTabModel[$scope.items.active]) {
        $scope.entity = $scope.subTabModel[$scope.items.active].entity;
        $scope.matrix = $scope.subTabModel[$scope.items.active].matrix;
      }
    } else {
      $scope.noData = true;
    }
    $scope.items = [];
    for (i in $scope.subTabModel) {
      if (i.substring(0, 1) !== "$") {
        if (i.toLowerCase() !== "timeframe") {
          $scope.items.push(i);
        }

      }
    }

    $scope.items.active = $scope.items[0];
  };

  $scope.$on("update:hcahpsregression", function() {
    self.load();
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "hcahpsregression") {
    if ($scope.subTabModel) {
      self.load();
      }
  }
}
hcahpsregressionCtrl.$inject = ['$scope', 'DashboardService'];

/* HCAHPS Controller */
function measuresByFacilityCtrl($scope) {

  $scope.grapActive = false;
  $scope.noData = false;
  $scope.fill = ["#E41A1C", "#E887A5", "#006469", "#616075", "#3d8a74", "#4CE8CE", "#5BC4DE", "#3F5BE8", "#E83F6F", "#E87D3F", "#377EB8"];
  var self = this;

  $scope.getColor = function(key, data) {
    if (data) {
      var value = data[key];
      return $scope.fill[value];
    }
  };

  // TODO COLOR
  $scope.changeColumnBG = function(index) {
    if ($scope.columnIndex === index){
      return '#ffa';}
  };

  $scope.setColumnIndex = function(index) {
    $scope.columnIndex = index;
  };

  self.load = function() {
    $scope.$emit('processOptionsEvent', "dhDisabled");
    $scope.noData = false;
    if ($scope.subTabModel.category) {
      $scope.chordData = $scope.subTabModel;
      $scope.index = 0;
      $scope.table = {
        column: [],
        row: []
      };

      for (var i = 0; i < $scope.chordData.category.length; i++) {
        $scope.chordData.category[i] = parseInt($scope.chordData.category[i], 0);
        var a = {
          "name": $scope.chordData.entity[i],
          "color": $scope.fill[$scope.chordData.category[i]],
          "data": []
        };
        if ($scope.chordData.category[i] === 0) {
          $scope.index = i;
          for (var j = 0; j < $scope.chordData.matrix[i].length; j++) {
            if ($scope.chordData.matrix[i][j] !== 0) {
              a.data.push($scope.chordData.matrix[i][j]);
            }
          }
          $scope.table.column.push(a);
        } else {
          $scope.table.row.push(a);
        }
      }
      var columnArr = ["heading", 'NursesCommunication', 'DoctorsCommunication', 'PainManagement', 'Responsivenessofhospitalstaff', 'Communicationaboutmedicines', 'Dischargeinformation',
          'Cleanliness', 'Quietness', 'Overallrating', 'Willingnesstorecommend'];
      var singleObj = {}, seriesObj = [];
      for ( var key in $scope.subTabModel.aaData) {
        if($scope.subTabModel.aaData.hasOwnProperty(key)){
        singleObj = {};
        for ( var key1 in $scope.subTabModel.aaData[key]) {
          singleObj[columnArr[key1]] = $scope.subTabModel.aaData[key][key1];
        }
        seriesObj.push(singleObj);
      }}
      $scope.arr = seriesObj;
    } else {
      $scope.noData = true;
    }
  };

  $scope.$on("update:measuresByFacility", function() {
    self.load();
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "measuresByFacility") {
    if ($scope.subTabModel) {
      self.load();
     } 
  }
}
measuresByFacilityCtrl.$inject = ['$scope', 'DashboardService'];

/* Hospital CMS Controller */
function hospitalCmsCtrl($scope, $location, DashboardService) {

  $scope.quartersHospCMS = [{
	    name: 'Q4_2011 - To - Q3_2012',
	    timestamp: '1348993800000'
	  }, {
	    name: 'Q2_2012 - To - Q1_2013',
	    timestamp: '1364718600000'
	  }, {
	    name: 'Q3_2012 - To - Q2_2013',
	    timestamp: '1372550400000'
	  },{
		    name: 'Q4_2012 - to - Q3_2013',
		    timestamp: '1380499200000'
		  },{
			    name: 'Q1_2013 - to - Q4_2013',
			    timestamp: '1380499200001'
			  }];
  $scope.quarterHospCMS = $scope.quartersHospCMS[4];

  $scope.noData = false;
  $scope.$watch('CMScriteriaModel', function() {
    if ($scope.CMScriteriaModel && $scope.CMScriteriaModel.data) {
      $scope.cmsQuestions = Object.keys($scope.CMScriteriaModel.data);
      $scope.cmsQuestion = $scope.cmsQuestions[0];
      updateQuestion();
    } else {
      $scope.cmsQuestions = null;
      $scope.cmsQuestion = null;
    }
  });

  $scope.$watch('cmsQuestion', function() {
    updateQuestion();
  });

  function updateQuestion() {
    if ($scope.cmsQuestion) {
      var CMScriteriaQuestionModel = $scope.CMScriteriaModel.data[$scope.cmsQuestion];
      var chartObj = {
        dataSet: CMScriteriaQuestionModel.data,
        categories: CMScriteriaQuestionModel.category,
        xAxis: true,
        type: "hospital",
        legend: true,
        legendLayout: "horizontal",
        legendAlign: "center",
        legendVerticalAlign: "bottom",
        legendWidth: 320,
        dataLabel: true,
        yTitle: $scope.common.capitaliseFirstLetter(CMScriteriaQuestionModel.format)
      };
      $scope.chartData = $scope.commonChart.basicChart(chartObj);
      $scope.categories = CMScriteriaQuestionModel.category;
    } else {
      $scope.cmsQuestions = null;
      $scope.cmsQuestion = null;
    }
  }
  var self = this;
  self.load = function(quarter) {
    $scope.$emit('processOptionsEvent', "dhEnabled");
    $scope.noData = false;
    $scope.DhCluster = "DH Corporate";
    if (quarter) {
      if ($scope.clusterModel.name !== $scope.DhCluster) {
        $scope.subTabModel = {};
        $scope.clusterIds = [];
        var hashName = $location.path().replace("/survey/", "");
        var jsonObj = {
          subTabName: hashName,
          endTime: quarter
        };
        DashboardService.dashboard.get(jsonObj, function(data) {
          $scope.subTabModel = data;
          if ($scope.subTabModel) {
            $scope.HospitalCMSdata = $scope.subTabModel;
            $scope.CMScriterias = $scope.HospitalCMSdata.chartData;
            $scope.hospitalRating = $scope.HospitalCMSdata.hospitalRating;
            $scope.hospialRecommendation = $scope.HospitalCMSdata.hospialRecommendation;
            $scope.criteria = $scope.CMScriterias[Object.keys($scope.CMScriterias)[0]];
            $scope.CMScriteriaModel = $scope.criteria;
          } else {
            $scope.noData = true;
          }
        });
      }
    }
  };
  $scope.pageView = $scope.view.Cluster;
  /* Function for page view change */
  $scope.pageViewChange = function() {
    var filterValues = '';
    $scope.CurrentpageView = $scope.pageView;
    var jsonObj = {};
    var hashName = $scope.currentActiveTab.hash;
    $scope.clusterIds = [];
    for ( var counter in $scope.cluster) {
      if($scope.cluster.hasOwnProperty(counter)){
      if ($scope.cluster[counter].name !== $scope.DhCluster) {
        $scope.clusterIds.push($scope.cluster[counter].id);
      }
    }}
    jsonObj.endTime = $scope.quarterHospCMS.timestamp;
    jsonObj.view = $scope.CurrentpageView;
    jsonObj.clusterIds = $scope.clusterIds;
    $scope.facilitySelected = 'Nurses Communication';
    jsonObj.subTabName = hashName;
    DashboardService.dashboard.get(jsonObj, function(data) {
      $scope.subTabModel = data;
      if ($scope.CurrentpageView === "Cluster") {
        filterValues = $scope.clusterVal.values;
        $scope.dataset = $scope.subTabModel.cmsClusterChartObj.ChartObj;
        $scope.categories = $scope.subTabModel.cmsClusterChartObj.categories;
      } else {
        filterValues = $scope.hospitalModelInner;
        $scope.dataset = $scope.subTabModel.cmsHospitalChartObj.ChartObj;
        $scope.categories = $scope.subTabModel.cmsHospitalChartObj.categories;
      }
      $scope.getCmschartData($scope.CurrentpageView, $scope.dataset, $scope.categories, filterValues); // Common
    });
  };
  $scope.facilityColorsArray = ['#d9534f', '#f0ad4e', '#5bc0de', '#5cb85c', '#428bca', '#d9534f', '#f0ad4e', '#5bc0de', '#5cb85c', '#428bca'];
  /* Function for change facility */
  $scope.changeFacility = function(facilityName, pageView, value) {
    $scope.facilitySelected = facilityName;
    var filterValues = value;
    var jsonObj = {};
    var hashName = $scope.currentActiveTab.hash;
    $scope.clusterIds = [];
    for ( var counter in $scope.cluster) {
      if($scope.cluster.hasOwnProperty(counter)){
      if ($scope.cluster[counter].name !== $scope.DhCluster) {
        $scope.clusterIds.push($scope.cluster[counter].id);
      }
    }}
    jsonObj.endTime = $scope.quarterHospCMS.timestamp;
    jsonObj.view = pageView;
    jsonObj.facility = facilityName;
    jsonObj.clusterIds = $scope.clusterIds;
    jsonObj.subTabName = hashName;
    DashboardService.dashboard.get(jsonObj, function(data) {
      $scope.subTabModel = data;
      if (pageView === "Cluster") {
        $scope.dataset = $scope.subTabModel.cmsClusterChartObj.ChartObj;
        $scope.categories = $scope.subTabModel.cmsClusterChartObj.categories;
      } else {
        $scope.dataset = $scope.subTabModel.cmsHospitalChartObj.ChartObj;
        $scope.categories = $scope.subTabModel.cmsHospitalChartObj.categories;
      }
      $scope.getCmschartData(pageView, $scope.dataset, $scope.categories, filterValues); // Common
    });
  };
  /* Ends here */
  $scope.quarterChangeView = function(pageView, filterAllValues) {
    var jsonObj = {};
    var filterValues = filterAllValues;
    var hashName = $scope.currentActiveTab.hash;
    $scope.clusterIds = [];
    for ( var counter in $scope.cluster) {
      if($scope.cluster.hasOwnProperty(counter)){
      if ($scope.cluster[counter].name !== $scope.DhCluster) {
        $scope.clusterIds.push($scope.cluster[counter].id);
      }
    }}
    jsonObj.endTime = $scope.quarterHospCMS.timestamp;
    jsonObj.view = pageView;
    jsonObj.clusterIds = $scope.clusterIds;
    jsonObj.subTabName = hashName;
    DashboardService.dashboard.get(jsonObj, function(data) {
      $scope.subTabModel = data;
      $scope.facilitySelected = 'Nurses Communication';
      if (pageView === "Cluster") {
        $scope.dataset = $scope.subTabModel.cmsClusterChartObj.ChartObj;
        $scope.categories = $scope.subTabModel.cmsClusterChartObj.categories;
      } else {
        $scope.dataset = $scope.subTabModel.cmsHospitalChartObj.ChartObj;
        $scope.categories = $scope.subTabModel.cmsHospitalChartObj.categories;
      }
      $scope.getCmschartData(pageView, $scope.dataset, $scope.categories, filterValues); // Common
    });
  };
  $scope.getCmschartData = function(pageView, dataset, categories, filterValues) {
    var xCategories = '';
    var colorsArray = ['#C0C0C0 ', '#C0C0C0 ', '#C0C0C0', '#C0C0C0 ', '#C0C0C0 ', '#C0C0C0 ', '#C0C0C0 ', '#C0C0C0 ', '#C0C0C0 ', '#C0C0C0 '];
    var cmsChartObj = {};
    if (pageView === "Cluster") {
      xCategories = categories;
      dataSet = dataset;
      if (filterValues !== '' && filterValues !== undefined) {
        var colorIndex = [];
        colorIndex = xCategories.indexOf(filterValues);
        for (var i = 0; i < colorsArray.length; i++) {
          colorsArray.splice(colorIndex, 1, '#428bca');
        }
      }
      cmsChartObj = {
        dataSet: dataSet,
        legend: true,
        legendLayout: "horizontal",
        legendAlign: "center",
        legendVerticalAlign: "bottom",
        legendWidth: 320,
        xAxis: true,
        yAxisEnabled: true,
        setCategoryValue: true,
        colorByPoint: true,
        categories: xCategories,
        colorSet: colorsArray
      };
    } else {
      xCategories = categories;
      dataSet = dataset;
      if (filterValues !== undefined && filterValues.length > 0) {
        var newArray = [];
        var FinalArray = [];
        newArray = filterValues;
        for (var j = 0, k = newArray.length; j < k; j++) {
          FinalArray.push(xCategories.indexOf(newArray[j]));
        }
        colorsArray = [];
        for (var p = 0; p < xCategories.length; p++) {
          colorsArray.push("#C0C0C0");
        }
        for (var n = 0; n < colorsArray.length; n++) {
          for (var m = 0; m < FinalArray.length; m++) {
            colorsArray.splice(FinalArray[m], 1, '#428bca');
          }
        }
      }
      cmsChartObj = {
        dataSet: dataSet,
        legend: true,
        legendLayout: "horizontal",
        legendAlign: "center",
        legendVerticalAlign: "bottom",
        legendWidth: 320,
        yAxisEnabled: true,
        setCategoryValue: true,
        colorByPoint: true,
        categories: xCategories,
        colorSet: colorsArray
      };
    }
    cmsChartObj.dataSet[0].index = 1;
    cmsChartObj.dataSet[1].index = 2;
    cmsChartObj.dataSet[2].index = 0;
    cmsChartObj.dataSet[0].color = '#6DBF53';
    cmsChartObj.dataSet[1].color = '#d9534f';
    cmsChartObj.dataSet[2].color = '#C0C0C0';
    $scope.cmsChart = $scope.commonChart.basicChart(cmsChartObj);
  };
  $scope.filterCluster = function(val, cmsPageView) {
    var filterValues = val.values;
    var jsonObj = {};
    var hashName = $scope.currentActiveTab.hash;
    $scope.clusterIds = [];
    for ( var counter in $scope.cluster) {
      if($scope.cluster.hasOwnProperty(counter)){
      if ($scope.cluster[counter].name !== $scope.DhCluster) {
        $scope.clusterIds.push($scope.cluster[counter].id);
      }
    }}
    jsonObj.endTime = $scope.quarterHospCMS.timestamp;
    jsonObj.view = cmsPageView;
    jsonObj.clusterIds = $scope.clusterIds;
    jsonObj.subTabName = hashName;
    DashboardService.dashboard.get(jsonObj, function(data) {
      $scope.subTabModel = data;
      if (cmsPageView === "Cluster") {
        $scope.dataset = $scope.subTabModel.cmsClusterChartObj.ChartObj;
        $scope.categories = $scope.subTabModel.cmsClusterChartObj.categories;
      } else {
        $scope.dataset = $scope.subTabModel.cmsHospitalChartObj.ChartObj;
        $scope.categories = $scope.subTabModel.cmsHospitalChartObj.categories;
      }
      $scope.getCmschartData(cmsPageView, $scope.dataset, $scope.categories, filterValues); // Common
    });
  };
  $scope.$on("update:hospitalCms", function() {
    self.load($scope.quarterHospCMS.timestamp);
  });
  $scope.changeHospital = function() {
    $scope.hospitalModelInner = [];
  };
  $scope.quarterHospCMSChange = function() {
    self.load($scope.quarterHospCMS.timestamp);
  };
  /* Highlight hospital view chart */
  $scope.filterClusterHspView = function(pageView, hspNames) {
    if (pageView === "Cluster") {
      $scope.dataset = $scope.subTabModel.cmsClusterChartObj.ChartObj;
      $scope.categories = $scope.subTabModel.cmsClusterChartObj.categories;
    } else {
      $scope.dataset = $scope.subTabModel.cmsHospitalChartObj.ChartObj;
      $scope.categories = $scope.subTabModel.cmsHospitalChartObj.categories;
    }
    $scope.getCmschartData(pageView, $scope.dataset, $scope.categories, hspNames); // Common
  };
  /* Ends here */
  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "hospitalCms") {
    if ($scope.subTabModel) {
      self.load($scope.quarterHospCMS.timestamp);
     }
  }
}
hospitalCmsCtrl.$inject = ['$scope', '$location', 'DashboardService'];
/* P-Index Controller */
function pIndexCtrl($scope, $modal, $filter, DashboardService) {
  $scope.grapActive = false;
  $scope.noData = false;
  $scope.noQuestions = true;
  $scope.updateSeries = function() {
    if ($scope.questions.length > 0) {
      $scope.noQuestions = false;
      var singleObj = {}, seriesObj = [];
      for (var i = 0; i < $scope.questions.length; i++) {
        singleObj = {};
        singleObj.name = $scope.questions[i];
        singleObj.data = $scope.pIndexData[$scope.questions[i]][0].data;
        seriesObj.push(singleObj);
      }
      var pIndexChartObj = {
        dataSet: seriesObj,
        timeType: "datetime",
        legend: true,
        legendAlign: "center",
        legendVerticalAlign: "bottom",
        legendWidth: 900,
        xAxis: true,
        yAxisEnabled: true,
        yTitle: "Performance Index",
        labelX: 20,
        title: 'Performance Index Trend',
        titleStyle: {
          fontSize: '16px',
          fontWeight: 'bold'
        },
        endOnTick: false
      };
      $scope.pIndexTrendingChart = $scope.commonChart.basicChart(pIndexChartObj);
      var chart1 = $scope.common.getChartFromSelector($scope.pIndexTrendingChartSLider);
      if (chart1) {
        var event = chart1.xAxis[0].getExtremes();
        chart1.xAxis[0].setExtremes(event.dataMin, event.dataMax);
        var date = null;
        var min = $scope.common.getQuarter($filter('utcdate')(event.dataMin, "MM-yyyy", false)), max = $scope.common.getQuarter($filter('utcdate')(event.dataMax, "MM-yyyy", false));
        date = min + ' - To - ' + max;
        $scope.variableDate = date;
      }
    } else {
      $scope.noQuestions = true;
    }
  };
  $scope.updateList = function() {
    if ($scope.questions.length > 2) {
    }
  };
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
    $scope.variableDate = $scope.getDate();
    $scope.noData = false;
    var categories = [], data = [];
    if ($scope.subTabModel.overallPindex) {
      $scope.pIndexData = $scope.subTabModel;
      $scope.questions = [];
      $scope.selectedQuestions = []; 
      $scope.questionsList = [];
      $scope.fetchQuestions = function() {
        for ( var key in $scope.pIndexData) {
          if($scope.pIndexData.hasOwnProperty(key)){
          if (key !== 'fullQuestion' && key !== 'overallPindex' && key !== 'timeframe') {
            if ($scope.pIndexData.hasOwnProperty(key)) {
              $scope.questionsList.push(key);
            }
          }
        }}
        $scope.questions = $scope.questionsList.filter(function(item) {
          return $scope.selectedQuestions.indexOf(item) !== -1;
        });
      };
      $scope.fetchQuestions();
      $scope.pIndexTrendingChart = {};
      $scope.questions.push($scope.questionsList[0]);
      $scope.updateSeries();
      $scope.pIndexTrendingChartSLider = $scope.commonChart.showTimeSpan({
        dataSet: $scope.pIndexData[$scope.questions[0]][0].data,
        setExtremes: function(event) {
          // Change the time in label
          var chart = $scope.common.getChartFromSelector($scope.pIndexTrendingChart);
          if (chart) {
            chart.xAxis[0].setExtremes(event.min, event.max);
            var date = null;
            if (!event.min) {
              date = 'Last Updated on: ' + $scope.common.getQuarter($filter('utcdate')(event.max, "MM-yyyy", false));
            } else {
              var min = $scope.common.getQuarter($filter('utcdate')(event.min, "MM-yyyy", false)), max = $scope.common.getQuarter($filter('utcdate')(event.max, "MM-yyyy", false));
              date = min + ' - To - ' + max;
            }
            $scope.variableDate = date;
            $scope.$apply($scope.variableDate);
          }
        }
      });
      for ( var i in $scope.subTabModel.overallPindex) {
        categories.push(i);
        data.push($scope.subTabModel.overallPindex[i]);
      }
      var chartObj = {
        dataSet: data,
        categories: categories,
        xLabelAlign: "right",
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
    $scope.info.title = "P-Index Details";
    $scope.info.description = "It shows the performance index of facilities across all the major dimensions. This score is calculated by normalizing the data across domain and across facility." + "Pindex shows comparative  performance of different facility and one can find which facility is performing better which is worst.";
    $scope.showModal = function() {
      self.showModal($scope.subTabModel.calculation);
    };
  };
  $scope.$on("update:pIndex", function() {
    self.load();
  });
  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "pIndex") {
    if ($scope.subTabModel) {
      self.load();
      }
  }
}
pIndexCtrl.$inject = ['$scope', '$modal', '$filter', 'DashboardService'];
/* Detailed Time line Controller */
function hcahpsDetailedTimeLineCtrl($scope, $modal, $filter) {
  $scope.noData = false;
  $scope.questions = [];
  $scope.selectedQuestions = ["1", "3", "3"];
  $scope.questionsList = [];
  $scope.showDivisionLine = false;
  $scope.showHeader = false;
  $scope.detailedTimeLineChartQuestion = {};
  $scope.noQuestions = false;
  var self = this, i = 0, j = 0, k = 0;
  var selectQuestions = function() {
    $scope.questions = $scope.questionsList.filter(function(item) {
      return $scope.selectedQuestions.indexOf(item) !== -1;
    });
  };
  $scope.fetchQuestions = function(data) {
    $scope.questionsList = data.fullQuestion;
    selectQuestions();
  };

  $scope.trendHCAHPSTimeline = function() {
    if ($scope.questions.length > 0) {
      $scope.variableDate = $scope.getDate();
      $scope.detailedTimeLineChartQuestion = {};
      var seqArray = ["Always", "Usually", "Sometimes", "Never"];
      var seqArray1 = ["Definitely yes", "Probably yes", "Probably no", "Definitely no"];
      var seqArray2 = ["Yes", "No"];
      var seqArray3 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      $scope.questions
          .forEach(function(q, i) {
            var sortedArray = [];
            for (var key = 0; key < $scope.subTabModel[q].length; key++) {
              if ($scope.subTabModel[q][key].name === "Always" || $scope.subTabModel[q][key].name === "Usually" || $scope.subTabModel[q][key].name === "Sometimes" || $scope.subTabModel[q][key].name === "Never") {
                if ($scope.subTabModel[q][key].name !== "Always"){
                  $scope.subTabModel[q][key].visible = false;}
                sortedArray[seqArray.indexOf($scope.subTabModel[q][key].name)] = $scope.subTabModel[q][key];
              } else if ($scope.subTabModel[q][key].name === "Definitely yes" || $scope.subTabModel[q][key].name === "Definitely no" || $scope.subTabModel[q][key].name === "Probably no" || $scope.subTabModel[q][key].name === "Probably yes") {
                if ($scope.subTabModel[q][key].name !== "Definitely yes"){
                  $scope.subTabModel[q][key].visible = false;}
                sortedArray[seqArray1.indexOf($scope.subTabModel[q][key].name)] = $scope.subTabModel[q][key];
              } else if ($scope.subTabModel[q][key].name === "Yes" || $scope.subTabModel[q][key].name === "No") {
                if ($scope.subTabModel[q][key].name !== "Yes"){
                  $scope.subTabModel[q][key].visible = false;}
                sortedArray[seqArray2.indexOf($scope.subTabModel[q][key].name)] = $scope.subTabModel[q][key];
              } else if ($scope.subTabModel[q][key].name === "0" || $scope.subTabModel[q][key].name === "1" || $scope.subTabModel[q][key].name === "2" || $scope.subTabModel[q][key].name === "3" || $scope.subTabModel[q][key].name === "4" || $scope.subTabModel[q][key].name === "5" || $scope.subTabModel[q][key].name === "6" || $scope.subTabModel[q][key].name === "7" || $scope.subTabModel[q][key].name === "8" || $scope.subTabModel[q][key].name === "9" || $scope.subTabModel[q][key].name === "10") {
                if ($scope.subTabModel[q][key].name !== "10"){
                  $scope.subTabModel[q][key].visible = false;}
                sortedArray[seqArray3.indexOf($scope.subTabModel[q][key].name)] = $scope.subTabModel[q][key];
              }
            }
            $scope.detailedTimeLineChartQuestion[q] = $scope.commonChart.basicChart({
              dataSet: sortedArray,
              timeType: "datetime",
              xAxis: true,
              yAxisEnabled: true,
              title: q,
              yTitle: "Percentage",
              legend: true,
              legendLayout: "horizontal",
              legendAlign: "center",
              legendVerticalAlign: "bottom",
              legendWidth: 350,
              labelX: 20
            });
            $scope.tempData = angular.copy($scope.subTabModel);
            if (i === 0) {
              $scope.detailedTimeLineSlider = $scope.commonChart.showTimeSpan({
                dataSet: $scope.subTabModel[q][0].data,
                setExtremes: function(event) {
                  // Change the time in label
                  var date = null;
                  if (!event.min) {
                    date = 'Last Updated on: ' + $scope.common.getQuarter($filter('utcdate')(event.max, "MM-yyyy", false));
                  } else {
                    var min = $scope.common.getQuarter($filter('utcdate')(event.min, "MM-yyyy", false)), max = $scope.common.getQuarter($filter('utcdate')(event.max, "MM-yyyy", false));
                    date = min + " - To - " + max;
                  }
                  $scope.variableDate = date;
                  $scope.$apply(self.calculateTopBottom(angular.copy($scope.subTabModel), event.min, event.max));
                  for (var i = 0; i < $scope.questions.length; i++) {
                    var chart = $scope.common.getChartFromSelector($scope.detailedTimeLineChartQuestion[$scope.questions[i]]);
                    chart.xAxis[0].setExtremes(event.min, event.max);
                  }
                }
              });
            }
          });
      $scope.noQuestions = false;
    } else {
      $scope.noQuestions = true;
    }
  };
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
  self.sortDataforTopBottom = function(data) {
    var seqArray = ["Always"];
    var seqArray1 = ["Definitely yes"];
    var seqArray2 = ["Yes"];
    var seqArray3 = ["10", "9"];
    var dat = data;
    var sortedArray = [];
    for (var key = 0; key < dat.length; key++) {
      if (dat[key].name === seqArray[0]) {
        sortedArray[seqArray.indexOf(dat[key].name)] = dat[key];
      } else if (dat[key].name === seqArray1[0]) {
        sortedArray[seqArray1.indexOf(dat[key].name)] = dat[key];
      } else if (dat[key].name === seqArray2[0]) {
        sortedArray[seqArray2.indexOf(dat[key].name)] = dat[key];
      } else if (dat[key].name === seqArray3[0] || dat[key].name === seqArray3[1]) {
        sortedArray[seqArray3.indexOf(dat[key].name)] = dat[key];
      }
    }
    return sortedArray;
  };
  self.calculateTopBottom = function(data, min, max) {
    var arr = [], questions = data.fullQuestion, short = data.shortQuestions,tempObj = {}, sq = {};
    var handleDate = (angular.isDefined(min) && angular.isDefined(max));
    for (i = 0; i < questions.length; i++) {
      if (data[questions[i]].length !== 0) {
        var tempArr = self.sortDataforTopBottom(data[questions[i]]);
        var sum = 0, avg = 0, count = 1;
        for (j = 0; j < tempArr.length; j++) {
          var l = 0;
          for (k = 0; k < tempArr[j].data.length; k++) {
            if (handleDate) {
              if (tempArr[j].data[k][0] >= min && tempArr[j].data[k][0] <= max) {
                sum += tempArr[j].data[k][1];
                l = l + 1;
              }
            } else {
              sum += tempArr[j].data[k][1];
              l = l + 1;
            }
          }
          avg = sum / l;
        }
        if (tempObj[short[i]]) {
          count = sq[short[i]];
          count++;
          avg += tempObj[short[i]];
        }
        tempObj[short[i]] = avg;
        sq[short[i]] = count;
      } else {
        return null;
      }
    }
    for (var cnt in tempObj) {
      if(tempObj.hasOwnProperty(cnt)){
      tempObj[cnt] = tempObj[cnt] / sq[cnt];
      if (tempObj.hasOwnProperty(cnt)) {
        arr.push({
          'key': cnt,
          'value': tempObj[cnt]
        });
      }
    }}
    arr.sort(function(a, b) {
      return b.value - a.value;
    });
    // set values
    $scope.top = [];
    $scope.bottom = [];
    for (i = 0; i < arr.length; i++) {
      if (i < 5) {
        $scope.top.push(arr[i]);
     } else {
        $scope.bottom.push(arr[i]);
        }
    }
  };
  self.load = function() {
    $scope.$emit('processOptionsEvent', "dhDisabled");
    $scope.variableDate = $scope.getDate();
    $scope.noData = true;
    if ($scope.subTabModel && $scope.subTabModel[$scope.subTabModel.fullQuestion[0]].length !== 0) {
      $scope.fetchQuestions($scope.subTabModel);
      $scope.questions.push($scope.questionsList[0]);
      $scope.noData = false;
      var sortedArray = $scope.trendHCAHPSTimeline();
      self.calculateTopBottom($scope.subTabModel);
    }
    $scope.showModal = function() {
      self.showModal("calculations");
    };
  };
  $scope.$on("update:hcahpsDetailedTimeLine", function() {
    self.load();
  });
  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "hcahpsDetailedTimeLine") {
    if ($scope.subTabModel) {
      self.load();
      }
  }
}
hcahpsDetailedTimeLineCtrl.$inject = ['$scope', '$modal', '$filter'];

/* HCAHPS Summary Controller */
function hcahpsSummaryCtrl($scope, $location, DashboardService) {
  $scope.quarters = [{
	    name: 'Q4_2011 - To - Q3_2012',
	    timestamp: '1348993800000'
	  }, {
	    name: 'Q2_2012 - To - Q1_2013',
	    timestamp: '1364718600000'
	  }, {
	    name: 'Q3_2012 - To - Q2_2013',
	    timestamp: '1372550400000'
	  },{
		    name: 'Q4_2012 - to - Q3_2013',
		    timestamp: '1380499200000'
		  },{
			    name: 'Q1_2013 - to - Q4_2013',
			    timestamp: '1380499200001'
			  }];
  $scope.quarter = $scope.quarters[4];

  $scope.noData = false;
  var self = this;
  $scope.getColor = function(index, value) {
    if ($scope.entity[index].indexOf("VS ") !== -1) {
      var color = "positive";
      if (value < 0) {
        color = "negative";
      } else if (value === 0) {
        color = "neutral";
      }
      return $scope.common.getColorValues("opinion", color);
    }
    return null;
  };
  self.load = function(quarter) {
    $scope.$emit('processOptionsEvent', "addAll");
    $scope.$emit('processOptionsEvent', "dhEnabled");
    $scope.noData = false;
    if (quarter) {
      $scope.subTabModel = {};
      var hashName = $location.path().replace("/survey/", "");
      DashboardService.dashboard.get({
        subTabName: hashName,
        endTime: quarter
      }, function(data) {
        $scope.subTabModel = data;
        if ($scope.subTabModel && $scope.subTabModel.summary) {
          if ($scope.subTabModel) {
            $scope.entity = Object.keys($scope.subTabModel.summary);
            var matrix = {};
            $scope.subTabModel.facility.forEach(function(f) {
              var data = [];
              $scope.entity.forEach(function(e) {
                var d = $scope.subTabModel.summary[e][f];
                data.push(d);
              });
              matrix[f] = data;
            });
            $scope.matrix = matrix;

          }
        } else {
          $scope.noData = true;
        }
      });
    }
  };
  $scope.quarterChange = function() {
    self.load($scope.quarter.timestamp);
  };
  $scope.$on("update:hcahpsSummary", function() {
    self.load($scope.quarter.timestamp);
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "hcahpsSummary") {
    if ($scope.subTabModel) {
      self.load($scope.quarter.timestamp);
      }
  }
}
hcahpsSummaryCtrl.$inject = ['$scope', '$location', 'DashboardService'];

/* Competitive Controller */
function cmsCompetitorCtrl($scope, $rootScope, DashboardService) {
  $scope.noData = false;
  $scope.quarters = [{
	    name: 'Q4_2011 - To - Q3_2012',
	    timestamp: '1348993800000'
	  }, {
	    name: 'Q2_2012 - To - Q1_2013',
	    timestamp: '1364718600000'
	  }, {
	    name: 'Q3_2012 - To - Q2_2013',
	    timestamp: '1372550400000'
	  },{
		    name: 'Q4_2012 - to - Q3_2013',
		    timestamp: '1380499200000'
		  },{
			    name: 'Q1_2013 - to - Q4_2013',
			    timestamp: '1380499200001'
			  }];
  $scope.quarter = $scope.quarters[4];
  var limit = 3;
  var count = 0, hospitalArr = [];
  var self = this;
  $scope.radioModel = "Comparator";
  $scope.switchPage = "Social Media Competitive Analysis";
  $rootScope.selectedCMSHospitals = $rootScope.selectedCMSHospitals || {};
  $scope.comparativeCluster = $scope.subTabModel;
  $scope.comparativeClusterModel = null;
  $scope.active = true;
  $scope.activeButton = true;
  $scope.items = ["Comparative Column", "Polar Stacked"];
  $scope.items.active = $scope.items[0];
  $scope.cms = {};
  $scope.cms.questionsList = [];
  $scope.cms.question = null;
  self._feeds = null;

  $scope.addHospital = function() {
    var flag = false;
    for ( var i in $rootScope.selectedCMSHospitals) {
     if($rootScope.selectedCMSHospitals.hasOwnProperty(i)){
      if ($scope.comparativeHospitalModel.name === i) {
        flag = true;
      }
    }}
    if (Object.keys($rootScope.selectedCMSHospitals).length < limit && !flag) {
      $rootScope.selectedCMSHospitals[$scope.comparativeHospitalModel.name] = {
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
  $scope.getColor = function(key, value) {
    if (key.indexOf("VS ") !== -1) {
      var color = "positive";
      if (value < 0) {
        color = "negative";
      } else if (value === 0) {
        color = "neutral";
      }
      return $scope.common.getColorValues("opinion", color);
    }
    return null;
  };

  $scope.deleteHospital = function(key) {
    var temp = hospitalArr.filter(function(h) {
      return h.id !== key.id;
    });
    hospitalArr = temp;
    delete $rootScope.selectedCMSHospitals[key.name];
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
      $scope.radioModel = 'Summary';
      $scope.items.active = $scope.items[0];
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
    $scope.getCmsComparatorData = function() {
      DashboardService.dashboard.get({
        subTabName: $scope.currentActiveTab.hash,
        subSubTabName: $scope.radioModel.toLowerCase(),
        endTime: $scope.quarter.timestamp,
        hosp: hospitalArr
      }, function(data) {
        if (data.timeframe === null) {
          $scope.noData = true;
        } else {
          $scope.noData = false;
          dataModelTemp[subTabName] = data;
          $scope.subsubTabModel = dataModelTemp[subTabName];
        }
      });
    };

    if ($scope.radioModel.toLowerCase() !== "comparator") {
      $scope.getCmsComparatorData();
    } else {
      if (count >= 2) {
        $scope.activeButton = false;
      }
    }
    $scope.subSubTabName = $scope.radioModel;
    $scope.$watch('quarter', function() {
      $scope.getCmsComparatorData();
    });
  });
  $scope
      .$watch('subsubTabModel', function() {
        $scope.selectedHospitalArr = hospitalArr;
        if ($scope.radioModel.toLowerCase() === "summary") {
          $scope.facility = $scope.subsubTabModel.facility;
          $scope.summary = $scope.subsubTabModel.summary;
        } else if ($scope.radioModel === "HCAHPS" || $scope.radioModel === "Time And Effective Care" || $scope.radioModel === "Readmissions,Complications And Death" || $scope.radioModel === "Use Of Medical Imaging") {
          if ($scope.subsubTabModel.comparative) {
            $scope.noData = false;
            $scope.dataNotAvailable = false;
            $scope.cms.questionsList = Object.keys($scope.subsubTabModel.comparative);
            $scope.cms.question = $scope.cms.questionsList[0];// first
            $scope.questionModel = $scope.subsubTabModel.comparative[$scope.cms.question];
          } else {
            $scope.noData = true;
            $scope.dataNotAvailable = true;
          }
        }
      });

  $scope.$watch("cms.question", function() {
    if ($scope.cms.question) {
      $scope.questionModel = $scope.subsubTabModel.comparative[$scope.cms.question];
      var a = $scope.subsubTabModel.fullQuestion.indexOf($scope.cms.question);
      if ($scope.subsubTabModel.format[a] === "pct") {
        $scope.format = "Percentage";
      } else {
        $scope.format = $scope.common.capitaliseFirstLetter($scope.subsubTabModel.format[a]);
      }
    }
  });

  $scope.$watch("questionModel", function() {
    if ($scope.questionModel) {
      var arr = [], hosp = (Object.keys($scope.selectedCMSHospitals));
      for (var i = 0; i < $scope.questionModel.data.length; i++) {
        var index = hosp.indexOf($scope.questionModel.data[i].name);
        arr[index] = $scope.questionModel.data[i];
      }
      var chartObj = {
        dataSet: arr,
        categories: $scope.questionModel.category,
        legend: true,
        xAxis: true,
        legendLayout: "horizontal",
        legendAlign: "center",
        legendVerticalAlign: "bottom",
        legendWidth: 300,
        dataLabel: true,
        title: $scope.cms.question,
        yTitle: $scope.format
      };
      $scope.columnChart = $scope.commonChart.basicChart(chartObj);
      $scope.items.active = $scope.items[0];
      $scope.columnActive = true;
    }
  });

  $scope.$watch('items.active', function() {
    var chartObj, legendClickFuntion = function legendItemClick() {
      var chart1 = $scope.common.getChartFromSelector($scope.polarChartData[$scope.selectedHospitalArr[0].name]);
      var chart2 = $scope.common.getChartFromSelector($scope.polarChartData[$scope.selectedHospitalArr[1].name]);
      if (!this.visible) {
        chart1.series[this.index].show();
        chart2.series[this.index].show();
      } else {
        chart1.series[this.index].hide();
        chart2.series[this.index].hide();
      }
    };
    switch ($scope.items.active) {
      case "Comparative Column":
        $scope.dataNotAvailable = true;
        if ($scope.questionModel) {
          $scope.dataNotAvailable = false;
          var arr = [], hosp = (Object.keys($scope.selectedCMSHospitals));
          for (var i = 0; i < $scope.questionModel.data.length; i++) {
            var index = hosp.indexOf($scope.questionModel.data[i].name);
            arr[index] = $scope.questionModel.data[i];
          }
          chartObj = {
            dataSet: arr,
            categories: $scope.questionModel.category,
            legend: true,
            xAxis: true,
            legendLayout: "horizontal",
            legendAlign: "center",
            legendVerticalAlign: "bottom",
            legendWidth: 300,
            dataLabel: true,
            title: $scope.cms.question,
            yTitle: $scope.format
          };
          $scope.columnChart = $scope.commonChart.basicChart(chartObj);
          $scope.items.active = $scope.items[0];
          $scope.columnActive = true;
        } else {
          $scope.dataNotAvailable = true;
          }
        break;
      case "Polar Stacked":
        $scope.dataNotPresent = {};
        $scope.columnActive = false;
        $scope.polarChartData = [];
        for (var j = 0; j < $scope.selectedHospitalArr.length; j++) {
          $scope.dataNotPresent[$scope.selectedHospitalArr[j].name] = true;
          var arrPolar = {}, iPolar = 0;
          arrPolar[$scope.selectedHospitalArr[j].name] = [];
          if ($scope.subsubTabModel.question) {
            for (iPolar = 0; iPolar < $scope.subsubTabModel.question.length; iPolar++) {
              arrPolar[$scope.selectedHospitalArr[j].name].push({
                name: $scope.subsubTabModel.question[iPolar].name,
                data: $scope.subsubTabModel.question[iPolar][$scope.selectedHospitalArr[j].name]
              });
            }
            for (iPolar = 0; iPolar < arrPolar[$scope.selectedHospitalArr[j].name].length; iPolar++) {
              var data = arrPolar[$scope.selectedHospitalArr[j].name][iPolar].data;
              for (var k = 0; k < data.length; k++) {
                if ($scope.dataNotPresent[$scope.selectedHospitalArr[j].name]) {
                  $scope.dataNotPresent[$scope.selectedHospitalArr[j].name] = true;
                }
                if (data[k] !== null) {
                  $scope.dataNotPresent[$scope.selectedHospitalArr[j].name] = false;
                  break;
                }
              }
            }
            chartObj = {
              polar: true,
              categories: $scope.subsubTabModel.shortQuestion,
              dataSet: arrPolar[$scope.selectedHospitalArr[j].name]
            };
            $scope.polarChartData[$scope.selectedHospitalArr[j].name] = $scope.commonChart.basicChart(chartObj);
            if (j === 0) {
              var nameArray = [];
              for (iPolar in $scope.polarChartData[$scope.selectedHospitalArr[j].name].series) {
                nameArray.push($scope.polarChartData[$scope.selectedHospitalArr[j].name].series[iPolar].name);
              }
              var seriesObj = [];
              var singleObj = {};
              for (iPolar in nameArray) {
                if (nameArray.hasOwnProperty(iPolar)) {
                singleObj = {};
                singleObj.name = nameArray[iPolar];
                singleObj.data = [];
                seriesObj.push(singleObj);
              }}
              if ($scope.subSubTabName === "Time And Effective Care" || $scope.subSubTabName === "Readmissions,Complications And Death" || $scope.subSubTabName === "Use Of Medical Imaging") {
                $scope.legendHeight = true;
              } else {
                $scope.legendHeight = false;
              }
              $scope.polarLegend = $scope.commonChart.showLedgendData({
                tabName: $scope.subSubTabName,
                dataSet: seriesObj,
                legendItemClick: legendClickFuntion
              });
            }
          }
        }
        break;
        default:break;
    }
  });
  self.load = function() {
    count = Object.keys($rootScope.selectedCMSHospitals).length;
    for ( var hn in $rootScope.selectedCMSHospitals) {
      if (hn !== "$$hashKey") {
        hospitalArr.push({
          name: $rootScope.selectedCMSHospitals[hn].name,
          id: $rootScope.selectedCMSHospitals[hn].id
        });
      }
    }
    if (count >= 2) {
      $scope.getDetail();
    }
    $scope.comparativeCluster = $scope.subTabModel;
    $scope.comparativeClusterModel = $scope.comparativeCluster[0];
  };

  $scope.$on("update:compare", function() {
    self.load();
  });

  if ($scope.hospitalModel && $scope.currentActiveTab.hash === "compare") {
    if ($scope.subTabModel) {
      self.load();
      }
  }
}
cmsCompetitorCtrl.$inject = ['$scope', '$rootScope', 'DashboardService'];