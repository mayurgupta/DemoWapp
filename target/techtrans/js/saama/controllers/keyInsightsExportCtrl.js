// KeyInsight export Controller
function KeyInsightsExportCtrl($scope, $http, $timeout) {
  function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1, queryEnd = url.indexOf("#"), query = url.slice(queryStart, queryEnd), parms = {}, i, n, v, nv;
    query = decodeURIComponent(query);
    pairs = query.replace(/\+/g, " ").split("&");
    for (i = 0; i < pairs.length; i++) {
      nv = pairs[i].split("=");
      n = nv[0];
      v = nv[1];
      if (!parms.hasOwnProperty(n)) {
        parms[n] = [];
      }
      parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
  }
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
  $scope.enableSelectors();
  $scope.DhCluster = "DH Corporate";
  $scope.HeaderName = "Hospital";
  $scope.headingColor = "#428bca";
  $scope.currentSectionView = "Hospital View";
  $scope.currentIndex = 0;
  $scope.pageNumber = 1;
  var self = this;
  self.load = function() {
    var urlParams = parseURLParams(window.location.href) || {};
    var jsonObj = {};
    if (urlParams.slideIndex !== undefined) {
      $scope.currentIndex = urlParams.slideIndex[0];
    }
    if (urlParams.clusterIds !== undefined) {
      $scope.keyInsightSlides = $scope.dhSlides;
      $scope.currentSectionView = "DH Corporate";
      $scope.selectedSlideName = $scope.dhSlides[$scope.currentIndex].id;
      jsonObj.clusterIds = urlParams.clusterIds;
      $scope.HeaderName = "Dignity Health";
      $scope.headingColor = "#ED7320";
      $scope.bgimg = "url('img/dignityhealth-logo-orange.png')";
      $scope.bgcolor = "#fedcab";
    } else if (urlParams.hospitalId === undefined && urlParams.clusterId!== undefined) {
      $scope.keyInsightSlides = $scope.clusterSlides;
      $scope.currentSectionView = "Service Area";
      $scope.selectedSlideName = $scope.clusterSlides[$scope.currentIndex].id;
      jsonObj.clusterId = urlParams.clusterId[0];
      $scope.HeaderName = "Service Area";
      $scope.headingColor = "#09844F";
      $scope.bgimg = "url('img/dignityhealth-logo-bg_green.png')";
      $scope.bgcolor = "#D1F59F";
    } else if (urlParams.hospitalId !== undefined) {
      $scope.keyInsightSlides = $scope.hospitalSlides;
      $scope.currentSectionView = "Hospital View";
      $scope.selectedSlideName = $scope.hospitalSlides[$scope.currentIndex].id;
      jsonObj.hospitalId = urlParams.hospitalId[0];
      $scope.HeaderName = "Hospital";
      $scope.headingColor = "#428bca";
      $scope.bgimg = "url('img/dignityhealth-logo-bg_blue.png')";
      $scope.bgcolor = "#C7ECF2";
    }
    $scope.pageNumber = parseInt($scope.currentIndex, 10) + 1;
    jsonObj.selectedSlide = $scope.selectedSlideName;
    $scope.setActive($scope.currentIndex);
    $scope.getSlideDataFromServer(jsonObj);
  };

  $scope.getSlideDataFromServer = function(d) {
    var params = "";
    for ( var key in d) {
      if (key === "clusterIds") {
        for (var i = 0; i < d[key].length; i++) {
          params += key + "=" + d[key][i] + "&";
        }
      } else {
        params += key + "=" + d[key] + "&";
      }

    }
    params = params.substring(0, params.length - 1);
    $http({
      url: "api/dashboards/keyInsights/new?" + params,
      method: "GET",
      cache: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success(function(data, status) {

      console.log("in side export", data);
      $scope.subTabModel = data;
      $scope.date = $scope.subTabModel.keyInsightReport.date;
      $scope.pageNumber = parseInt($scope.currentIndex, 10) + 1;
      $scope.displayErrorDiv();
      $scope.callSelectedSlideFunction();
    }).error(function() {
    });
  };
  $scope.callSelectedSlideFunction = function() {

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
    }
    }
    $timeout(function() {
      $scope.barChart = bchart;
    }, 100);
    $timeout(function() {
      $(document).trigger('resize');
    }, 100);
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
        "0": "#b7b700",
        "1": "#9eb000",
        "2": "#87a900",
        "3": "#71a200",
        "4": "#5d9a00",
        "5": "#4a9300",
        "6": "#388C01",
        "7": "#288501",
        "8": "#1a7e01",
        "9": "#0c7701",
        "10": "#007001",
        "-10": "#ff0000",
        "-9": "#f71800",
        "-8": "#f03000",
        "-7": "#e94600",
        "-6": "#e25a00",
        "-5": "#db6d00",
        "-4": "#d47f00",
        "-3": "#cc8f00",
        "-2": "#c59e00",
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
  self.load();
}
