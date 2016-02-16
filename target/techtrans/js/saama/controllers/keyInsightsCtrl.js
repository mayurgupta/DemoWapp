// KeyInsight Controller
function KeyInsightCtrl($scope, $location, DashboardService, $timeout) {

  $scope.dhSlides = [{
    htmlRef: 'partials/socialMediaDistribution.html',
    id: 'socialMediaDistribution'
  }, {
    htmlRef: 'partials/patientVoiceTopicAnalysis.html',
    id: 'patientVoiceTopicAnalysis'
  }, {
    htmlRef: 'partials/CorporatehcahpsSummaryForTwoOverallMeasures.html',
    id: 'HCAHPSforTwoOverallMeasuresDignityCorporate'
  }, {
    htmlRef: 'partials/CorporatehcahpsSummaryForEightMeasures.html',
    id: 'hcahpsSummaryForEightMeasures'
  }];
  $scope.clusterSlides = [{
    htmlRef: 'partials/socialMediaDistribution.html',
    id: 'socialMediaDistribution'
  }, {
    htmlRef: 'partials/patientVoiceTopicAnalysis.html',
    id: 'patientVoiceTopicAnalysis'
  }, {
    htmlRef: 'partials/hcahpsSummaryForTwoOverallMeasures.html',
    id: 'hcahpsSummaryForTwoOverallMeasures'
  }, {
    htmlRef: 'partials/hcahpsSummaryForEightMeasures.html',
    id: 'hcahpsSummaryForEightMeasures'
  }];

  $scope.hospitalSlides = [{
    htmlRef: 'partials/socialMediaDistribution.html',
    id: 'socialMediaDistribution'
  }, {
    htmlRef: 'partials/patientVoiceTopicAnalysis.html',
    id: 'patientVoiceTopicAnalysis'
  }, {
    htmlRef: 'partials/socialMediaCompetativeAnalysisOne.html',
    id: 'socialMediaCompetativeAnalysisOne'
  }, {
    htmlRef: 'partials/socialMediaCompetativeAnalysisTwo.html',
    id: 'socialMediaCompetativeAnalysisTwo'
  }, {
    htmlRef: 'partials/hcahpsSummaryForTwoOverallMeasures.html',
    id: 'hcahpsSummaryForTwoOverallMeasures'
  }, {
    htmlRef: 'partials/hcahpsSummaryForEightMeasures.html',
    id: 'hcahpsSummaryForEightMeasures'
  }, {
    htmlRef: 'partials/hcahpsCompetativeAnalysis.html',
    id: 'hcahpsCompetativeAnalysis'
  }];
  $scope.setActive = function(idx) {
    for (var i = 0; i < $scope.keyInsightSlides.length; i++) {
      $scope.keyInsightSlides[i].active = false;
    }
    $scope.keyInsightSlides[idx].active = true;
  };
  $scope.getCurrentIndex = function(currentView, nextView, currentIndex) {
    var currentSlideName, arrayIndex;
    if (currentView === "DH Corporate") {
      currentSlideName = $scope.dhSlides[currentIndex].id;
    } else if (currentView === "Service Area") {
      currentSlideName = $scope.clusterSlides[currentIndex].id;
    } else {
      currentSlideName = $scope.hospitalSlides[currentIndex].id;
    }

    if (nextView === "DH Corporate") {
      arrayIndex = $scope.getIndexFromArray($scope.dhSlides,currentSlideName);
    } else if (nextView === "Service Area") {
      arrayIndex =$scope.getIndexFromArray($scope.clusterSlides,currentSlideName);
    } else {
      arrayIndex = $scope.getIndexFromArray($scope.hospitalSlides,currentSlideName);
    }
    return arrayIndex === -1 ? 0 : arrayIndex;
  };
  
  $scope.getIndexFromArray=function(arraySlides,slideName){
    for(var i in arraySlides){
      if(arraySlides[i].id===slideName){
        return i;
      }
    }
    return -1;
  };

  $scope.getPageNumber = function(selectedSlideName) {
    var numberOfPages = [], slideArray = [];
    for (var slideno = 0; slideno < $scope.keyInsightSlides.length; slideno++) {
      numberOfPages.push(slideno);
      slideArray.push($scope.keyInsightSlides[slideno].id);
    }
    for ( var key in slideArray) {
      if ($scope.keyInsightSlides[key].id === selectedSlideName) {

      return parseInt(slideArray.indexOf(selectedSlideName) + 1, 10); }
    }
  };

  $scope.enableSelectors();
  $scope.DhCluster = "DH Corporate";
  $scope.HeaderName = "Hospital";
  $scope.headingColor = "#428bca";
  $scope.currentSectionView = "Hospital View";
  $scope.currentIndex = 0;
  $scope.pageNumber = 1;
  var self = this;
  self.load = function() {
    $scope.$emit('processOptionsEvent', "otherTabOtherTabsEnabled");
    $scope.$emit('processOptionsEvent', "addAll");
    if ($scope.clusterModel.name === $scope.DhCluster) {
      $scope.keyInsightSlides = $scope.dhSlides;
      $scope.currentSectionView = "DH Corporate";
      $scope.HeaderName = "Dignity Health";
      $scope.headingColor = "#ED7320";
    } else if ($scope.hospitalModel.name === "All" && $scope.clusterModel.name !== $scope.DhCluster) {
      $scope.keyInsightSlides = $scope.clusterSlides;
      $scope.currentSectionView = "Service Area";
      $scope.HeaderName = "Service Area";
      $scope.headingColor = "#09844F";
    } else if ($scope.hospitalModel.name !== "All") {
      $scope.keyInsightSlides = $scope.hospitalSlides;
      $scope.currentSectionView = "Hospital View";
      $scope.HeaderName = "Hospital";
      $scope.headingColor = "#428bca";
    }

    if ($scope.clusterModel.name === $scope.DhCluster) {
      $scope.emptySlideHeading = "Dignity Corporate";
    } else if ($scope.hospitalModel.name === "All") {
      $scope.emptySlideHeading = $scope.clusterModel.name;
    } else {
      $scope.emptySlideHeading = $scope.hospitalModel.name;
    }

    var jsonObj = {};
    var hashName = $location.path();
    $scope.clusterIds = [];
    for ( var counter in $scope.cluster) {
      if ($scope.cluster[counter].name !== $scope.DhCluster) {
        $scope.clusterIds.push($scope.cluster[counter].id);
      }
    }
    if (!$scope.selectedSlideName) {
      $scope.selectedSlideName = $scope.hospitalSlides[0].id;
    }
    $scope.getSelectedSlide();
    jsonObj.selectedSlide = $scope.selectedSlideName;
    jsonObj.subTabName = hashName.replace("/", "");
    jsonObj.subSubTabName = "new";
    if ($scope.clusterModel.name === $scope.DhCluster) {
      jsonObj.clusterIds = $scope.clusterIds;
    }
    $scope.setexportParam();
    DashboardService.dashboard.get(jsonObj, function(data) {
      $scope.subTabModel = data;
      $scope.pageNumber = parseInt($scope.currentIndex,10) + 1;
      $scope.displayErrorDiv();
      $scope.callSelectedSlideFunction();
    });
  };

  $scope.callSelectedSlideFunction = function() {
    if (!$scope.slidesLength) {
      $scope.slidesLength = 7;
    }
    var fnName = "fnSlideData_" + $scope.selectedSlideName;
    $scope[fnName]();
  };

  $scope.drawChart = function() {
    var chartObj = {
      bar: true,
      bg: "rgba(243,241,242,1)",
      stacking: "percent",
      border: 1
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
  };
  $scope.socialMediaCompetativeAnalysisOne = function() {
    $scope.topWords = $scope.subTabModel.key_words;
    $scope.barChart = [];
    var bchart = [];
    for ( var i in $scope.subTabModel.sentimentData) {
      if ($scope.subTabModel.sentimentData.hasOwnProperty(i)) {
      bchart[i] = [];
      for ( var j in $scope.subTabModel.sentimentData[i].sentimentalDistribution) {
        if ($scope.subTabModel.sentimentData[i].sentimentalDistribution.hasOwnProperty(j)) {
        var chartObj = {
          bar: true,
          dataSet: $scope.subTabModel.sentimentData[i].sentimentalDistribution[j],
          type: j,
          stacking: "percent",
          bg: "rgba(243,241,242,1)",
          labelFontSize: "13px"
        };
        bchart[i].push($scope.commonChart.basicChart(chartObj));
      }}
    }}
    $timeout(function() {
      $scope.barChart = bchart;
    }, 100);
    $timeout(function() {
      $(document).trigger('resize');
    }, 100);
  };

  $scope.$on("hospitalChange", function(event, hospital, isCluster) {
    if (hospital) {
      $scope.setHeaderName(hospital);
      var tempCurrentView = $scope.currentSectionView;
      if ($scope.clusterModel.name === $scope.DhCluster) {
        $scope.keyInsightSlides = $scope.dhSlides;
        $scope.currentSectionView = "DH Corporate";
      } else if ($scope.hospitalModel.name === "All" && $scope.clusterModel.name !== $scope.DhCluster) {
        $scope.keyInsightSlides = $scope.clusterSlides;
        $scope.currentSectionView = "Service Area";
      } else if ($scope.hospitalModel.name !== "All") {
        $scope.keyInsightSlides = $scope.hospitalSlides;
        $scope.currentSectionView = "Hospital View";
      }
      $scope.currentIndex = $scope.getCurrentIndex(tempCurrentView, $scope.currentSectionView, $scope.currentIndex);
      self.load();
      $scope.setActive($scope.currentIndex);
    }
  });
  $scope.setHeaderName = function(hospital) {
    if (hospital.name === "All" && $scope.clusterModel.name !== $scope.DhCluster) {
      $scope.HeaderName = "Service Area";
      $scope.headingColor = "#09844F";
    } else if ($scope.clusterModel.name === $scope.DhCluster) {
      $scope.HeaderName = "Dignity Health";
      $scope.headingColor = "#ED7320";
    } else {
      $scope.HeaderName = "Hospital";
      $scope.headingColor = "#428bca";
    }
  };
  $scope.$on("update:keyInsights", function() {
    self.load($scope.quarter.timestamp);
  });
  $scope.getSlideData = function() {
    var jsonObj = {};
    var hashName = $location.path();
    $scope.clusterIds = [];
    for ( var counter in $scope.cluster) {
      if ($scope.cluster[counter].name !== $scope.DhCluster) {
        $scope.clusterIds.push($scope.cluster[counter].id);
      }
    }
    if ($scope.clusterModel.name === $scope.DhCluster) {
      jsonObj.clusterIds = $scope.clusterIds;
    }
    $scope.getSelectedSlide();
    jsonObj.subTabName = hashName.replace("/", "");
    jsonObj.subSubTabName = "new";
    jsonObj.selectedSlide = $scope.selectedSlideName;
    DashboardService.dashboard.get(jsonObj, function(data) {
      $scope.subTabModel = data;
      $scope.displayErrorDiv();
      $scope.callSelectedSlideFunction();
    });
  };
  $scope.getSelectedSlideOnLoad = function() {
    if ($scope.clusterModel.name === $scope.DhCluster) {
      $scope.selectedSlideName = $scope.dhSlides[$scope.currentIndex].id;
    } else if ($scope.hospitalModel.name === "All" && $scope.clusterModel.name !== $scope.DhCluster) {
      $scope.selectedSlideName = $scope.clusterSlides[$scope.currentIndex].id;
    } else if ($scope.hospitalModel.name !== "All") {
      $scope.selectedSlideName = $scope.hospitalSlides[$scope.currentIndex].id;
    }
  };
  $scope.getSelectedSlide = function() {
    if ($scope.clusterModel.name === $scope.DhCluster) {
      $scope.selectedSlideName = $scope.dhSlides[$scope.currentIndex].id;
    } else if ($scope.hospitalModel.name === "All" && $scope.clusterModel.name !== $scope.DhCluster) {
      $scope.selectedSlideName = $scope.clusterSlides[$scope.currentIndex].id;
    } else if ($scope.hospitalModel.name !== "All") {
      $scope.selectedSlideName = $scope.hospitalSlides[$scope.currentIndex].id;
    }
  };
  $scope.hcahpsSummaryForEightMeasuresAndhcahpsCompetativeAnalysis = function() {
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
    $scope.getColor = function(index, value) {
      if ($scope.entity[index].indexOf("VS ") !== -1 || $scope.entity[index].indexOf("vs ") !== -1) {
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
    $scope.setBgColor = function(index, value) {
      var rowStyle = "";
      var colorObj = {
        "0": "#FFE500",
        "1": "#9eb000",
        "2": "#87a900",
        "3": "#71a200",
        "4": "#5d9a00",
        "5": "#4a9300",
        "6": "#388C01",
        "7": "#288501",
        "8": "#1a7e01",
        "9": "#0c7701",
        "10": "#5D9A00",
        "-10": "#FF0000",
        "-9": "#f71800",
        "-8": "#f03000",
        "-7": "#FFA000",
        "-6": "#FF8900",
        "-5": "#FF7200",
        "-4": "#FF5B00",
        "-3": "#FFCE00",
        "-2": "#FFB700",
        "-1": "#beab00"
      };
      if (value[1] !== null && value[1] !== undefined) {
        value[1] = Math.round(value[1]);
        if (value[1] < -10) {
          value[1] = -10;
        } else if (value[1] > 10) {
          value[1] = 10;
        }
        rowStyle = "background-color:" + colorObj[value[1]] + " !important";
      } else {
        rowStyle = "background-color:#ffffff!important";
      }
      return rowStyle;
    };
    $scope.setFnt = function(index, value) {
      var rowStylefont = "";
      if (value[2] > 0) {
        rowStylefont = "font-weight:bold !important";
      } else {
        rowStylefont = "font-weight:normal !important";
      }
      return rowStylefont;
    };
  };
  $scope.socialMediaCompetativeAnalysisTwo = function() {
    var sort = function(a, b) {
      return data[b].avgRating - data[a].avgRating;
    };
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
    if ($scope.subTabModel) {
      for ( var RatingObj in $scope.subTabModel.Topics) {
        if ($scope.subTabModel.Topics.hasOwnProperty(RatingObj)) {
        var data = $scope.subTabModel.Topics[RatingObj];
        var dataKeys = Object.keys(data);
        dataKeys.sort(sort);
        sortedRatings[RatingObj] = dataKeys;
      }}
      $scope.sortedRatings = sortedRatings;
    }
  };
  $scope.$on('gotoNextSlide', function(event, newIndex, slidesLength) {
    if ($scope.clusterModel.name === $scope.DhCluster) {
      $scope.currentIndex = newIndex;
    } else if ($scope.hospitalModel.name === "All" && $scope.clusterModel.name !== $scope.DhCluster) {
      $scope.currentIndex = newIndex;
    } else if ($scope.hospitalModel.name !== "All") {
      $scope.currentIndex = newIndex;
    }
    $scope.slidesLength = slidesLength;
    $scope.getSlideData(newIndex, slidesLength);
    $scope.pageNumber = parseInt($scope.currentIndex,10) + 1;
  });
  $scope.$on('gotoPrevSlide', function(event, newIndex, slideslength) {
    newIndex = newIndex - 1;
    if ($scope.clusterModel.name === $scope.DhCluster) {
      $scope.currentIndex = newIndex;
    } else if ($scope.hospitalModel.name === "All" && $scope.clusterModel.name !== $scope.DhCluster) {
      $scope.currentIndex = newIndex;
    } else if ($scope.hospitalModel.name !== "All") {
      $scope.currentIndex = newIndex;
    }
    $scope.slidesLength = slideslength;
    $scope.getSlideData(newIndex, slideslength);
    $scope.pageNumber =parseInt($scope.currentIndex,10) + 1;
  });
  $scope.displayErrorDiv = function() {
    if ($scope.subTabModel.keyInsightReport.flag === true) {
      $scope.noData = true;
      $scope.errMsg = "Insufficient amount of reviews for analysis";
      $scope.setClass = "container noDataDivCls";
    } else {
      $scope.noData = false;
    }
  };
  $scope.fnSlideData_socialMediaDistribution = function() {
    $scope.drawChart();
  };
  $scope.fnSlideData_patientVoiceTopicAnalysis = function() {
    $scope.topWords = $scope.subTabModel.key_words;
    var arr = [];
    for ( var i in $scope.subTabModel.topics) {
      if ($scope.subTabModel.topics.hasOwnProperty(i)) {
      var obj = $scope.subTabModel.topics[i];
      obj.name = i;
      arr.push(obj);
    }}
    var topicsSorted = arr.sort(function(a, b) {
      if (a.avgRating <= b.avgRating) {
        return 1;
      } else {
        return 0;
      }
    });
    $scope.topics = topicsSorted;
  };
  $scope.fnSlideData_socialMediaCompetativeAnalysisOne = function() {
    $scope.socialMediaCompetativeAnalysisOne();
  };
  $scope.fnSlideData_socialMediaCompetativeAnalysisTwo = function() {
    $scope.socialMediaCompetativeAnalysisTwo();
  };
  $scope.fnSlideData_hcahpsSummaryForTwoOverallMeasures = function() {
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
    $scope.getColor = function(index, value) {
      if ($scope.entity[index].indexOf("VS ") !== -1 || $scope.entity[index].indexOf("vs ") !== -1) {
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
  };
  $scope.fnSlideData_hcahpsSummaryForEightMeasures = function() {
    $scope.hcahpsSummaryForEightMeasuresAndhcahpsCompetativeAnalysis();
  };
  $scope.fnSlideData_hcahpsCompetativeAnalysis = function() {
    $scope.hcahpsSummaryForEightMeasuresAndhcahpsCompetativeAnalysis();
  };
  $scope.fnSlideData_HCAHPSforTwoOverallMeasuresDignityCorporate = function() {
    $scope.hcahpsSummaryForEightMeasuresAndhcahpsCompetativeAnalysis();
  };
  $scope.fnSlideData_hcahpsSummaryForEightMeasures = function() {
    $scope.hcahpsSummaryForEightMeasuresAndhcahpsCompetativeAnalysis();
  };
  $scope.setexportParam = function() {
    $scope.slideLengthModel = $scope.keyInsightSlides.length;
    if ($scope.clusterModel.name === $scope.DhCluster) {
      $scope.hospitalIdModel = null;
      $scope.clusterIdModel = null;
      $scope.clusterIdsModel = $scope.clusterIds;
    } else if ($scope.hospitalModel.name === "All" && $scope.clusterModel.name !== $scope.DhCluster) {
      $scope.hospitalIdModel = null;
      $scope.clusterIdModel = $scope.clusterModel.id;
      $scope.clusterIdsModel = null;
    } else if ($scope.hospitalModel.name !== "All") {
      $scope.hospitalIdModel = $scope.hospitalModel.id;
      $scope.clusterIdModel = null;
      $scope.clusterIdsModel = null;
    }
  };
  $scope.exportPdf = function() {
    $('#rxportParam').submit();
  };
  if ($scope.hospitalModel) {
    self.load();
  }
}
KeyInsightCtrl.$inject = ['$scope', '$location', 'DashboardService', '$timeout'];