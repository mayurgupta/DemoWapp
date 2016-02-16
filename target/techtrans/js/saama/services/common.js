var common = angular.module('common', []);

common.constant('API_BASE', 'api/').constant('APP_MODE', 'server');

common
    .service('CommonService', [function() {
      var self = this;
      self.local = false;
      self.authenticated = false;
      self.name = null;
      self.cluster = null;
      self.selectedHospital = null;

      // Set Color
      self.colorSetValues = {
        opinion: {
          positiveColor: "#32932B",
          neutralColor: "#F99E00",
          negativeColor: "#C00000",
          membershipgrowthColor: "#999"
        },
        emotion: {
          negativeColor: "#C00000",
          positiveColor: "#32932B",
          neutralColor: "#F99E00",
          disgustColor: "#7B4EA3",
          sadnessColor: "#1F6CAD",
          joyColor: "#EDC500",
          angerColor: "#FF2000",
          surpriseColor: "#00c0ff",
          fearColor: "#007B33",
          membershipgrowthColor: "#999"
        },
        rating: {
          fivestarratingColor: "#3a4c67",
          fourstarratingColor: "#485e80",
          threestarratingColor: "#5e7aa5",
          twostarratingColor: "#8499ba",
          onestarratingColor: "#9daec8",
          noratingColor: "#8499ba",
          ratingColor: "#FFD300"
        },
        source: {
          yelpColor: "#B91A07",
          googleColor: "#DF5C26",
          foursquareColor: "#1DAFEC",
          glassdoorColor: "#509420",
          angiesListColor: "#007B33",
          yahoolocalsColor: "#690079",
          facebookColor: "#2F4B88"
        },
        hospital: {
          bannerColor: "#6DBF53",
          bannergoodsamaritanhospitalColor: "#6DBF53",
          stjosephColor: "#6DBF53",
          stjosephshospitalandmedicalcenterColor: "#6DBF53",
          mercysanjuanmedicalcenterColor: "#6DBF53",
          mercygeneralhospitalColor: "#6DBF53",
          mercyhospitaloffolsomColor: "#6DBF53",
          methodisthospitalofsacramentoColor: "#6DBF53",
          sierranevadamemorialhospitalColor: "#9F005C",
          woodlandhealthcareColor: "#6DBF53",
          marktwainmedicalcenterColor: "#6DBF53",
          stjosephsmedicalcenterColor: "#6DBF53",
          arizonaColor: "#E53030",
          californiaColor: "#428BCA",
          navadaColor: "#000066",
          nevedaColor: "#D35B06",
          nationalColor: "#686666"
        },
        cityState: {
          usColor: "#000066",
          arizonaColor: "#910000"
        }
      };

      self.source = [{
        "name": "Google",
        "id": 1
      }, {
        "name": "Foursquare",
        "id": 2
      }, {
        "name": "Facebook",
        "id": 10
      }, {
        "name": "YahooLocals",
        "id": 3
      }, {
        "name": "Yelp",
        "id": 4
      }];

      // Properties
      self.properties = {
        hospitalName: "Dignity Health",
        serviceName: "Sixth SENSE",
        companyName: "Saama"
      };

      function getSourceByName(name) {
        if (name) {
          name = name.toLowerCase();
          var f = self.source.filter(function(s) {
            return s.name.toLowerCase() === name;
          });
          if (f) { return f[0]; }
        }
      }

      /**
       * ***************************** Functions ******************************
       */
      function setProperties(callback) {
        return callback(self.properties);
      }

      function setName(name) {
        self.name = name;
      }

      function getName() {
        return self.name;
      }

      function getColorSet() {
        return self.colorSetValues;
      }

      function setTab() {
        console.log($rootScope);
      }

      function setConfig(data) {
        self.name = data.userDetail.login;
        self.cluster = data.clusters;
      }

      function getConfig() {
        return self.cluster;
      }

      function chkDuplicates(arr) {
        var temp = arr, dupes = [];

        for ( var i in temp) {
          if (i !== "$$hashKey") {
            for ( var j in temp) {
              if (temp[j] === temp[i] && temp[j] !== 0 && dupes.indexOf(j) === -1 && dupes.indexOf(i) === -1 && i !== j) {
                dupes.push(i);
                dupes.push(j);
              }
            }
          }
        }
        return dupes;
      }

      function calculatePercentage(list) {
        var opinionType = false;
        for ( var key in list) {
          if (key === "Positive" || key === "Negative") {
            opinionType = true;
          }
        }
        var max = 0, sum = 0, returnObj = {};
        returnObj.maxKey = "";
        returnObj.maxPercent = 0;
        returnObj.list = {};
        for ( var i in list) {
          if (!isNaN(list[i]) && list.hasOwnProperty(i) && i !== "$$hashKey") {
            sum += list[i];
            if (list[i] >= max) {
              returnObj.maxKey = i;
              max = list[i];
            }
          }
        }
        if (opinionType === true) {
          if (list.Positive === list.Negative) {
            returnObj.maxKey = "Positive";
            max = list.Positive;
          }
        }

        for ( var j in list) {
          if (!isNaN(list[j]) && list.hasOwnProperty(j) && j !== "$$hashKey") {
            returnObj.list[j] = list[j] / sum * 100;
          }
        }
        returnObj.maxPercent = Math.round(max / sum * 100);
        return returnObj;
      }

      function getColorValues(type, value) {
        if (value) {
          if (type.toLowerCase() === "hospital") {
            var v = self.colorSetValues.hospital[value.toLowerCase().replace(/[ .']/g, '') + "Color"];
            if (!v) {
              v = "#6DBF53";
            }
            return v;
          }
          return self.colorSetValues[type.toLowerCase()][value.toLowerCase().replace(/[ .']/g, '') + "Color"];
        } else {
          return "#666";
        }
      }
      function convertHex(hex, opacity) {
        hex = hex.replace('#', '');
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);

        result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
        return result;
      }
      function colorToHex(color) {
        if (color) {
          if (color.substr(0, 1) === "#") { return color; }
          var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color), r = parseInt(nums[2], 10).toString(16), g = parseInt(nums[3], 10).toString(16), b = parseInt(nums[4], 10).toString(16);
          return "#" + ((r.length === 1 ? "0" + r : r) + (g.length === 1 ? "0" + g : g) + (b.length === 1 ? "0" + b : b));
        }
      }
      function getGradient(valueArray, color) {
        var divisor;
        if (color === "red") {
          valueArray.sort();
          divisor = 255 / valueArray.length;
        } else {
          valueArray.sort(function(a, b) {
            return b - a;
          });
          divisor = 255 / valueArray.length;
        }

        var count = 0, greenCount = 170, yellowCount = 0;

        var colorObject = {};
        for (var i = 0; i < valueArray.length; i++) {
          if (color === "red") {
            colorObject[valueArray[i]] = 'rgb(' + 255 + ', ' + Math.round(count) + ', ' + i + ')';
          }  
          else {
            if (color === "green") {
              colorObject[valueArray[i]] = 'rgb(' + Math.round(count) + ', ' + Math.round(greenCount + (2 * i) + i) + ', ' + Math.round(yellowCount + (3 * i) + i) + ')';
            }
          }
          count += divisor;
          yellowCount += i;
        }
        return colorObject;
      }
      function getChartFromSelector(chart) {
        if (chart && Highcharts.charts) {
          var f = Highcharts.charts.filter(function(c) {
            if (c && chart.chart.renderTo) { return chart.chart.renderTo.attributes["data-highcharts-chart"].value === c.renderTo.attributes["data-highcharts-chart"].value; }
            return false;
          });
          if (f && f.length > 0) { return f[f.length - 1]; }
        }
      }

      function capitaliseFirstLetter(s) {
        if (s) { return s[0].toUpperCase() + s.slice(1); }
        return s;
      }

      function wordwrap(str, int_width, str_break, cut) {
        var m = ((arguments.length >= 2) ? arguments[1] : 75);
        var b = ((arguments.length >= 3) ? arguments[2] : "\n");
        var c = ((arguments.length >= 4) ? arguments[3] : false);
        var i, j, l, s, r;
        str += '';
        if (m < 1) { return str; }
        for (i = -1, l = (r = str.split(/\r\n|\n|\r/)).length; ++i < l; r[i] += s) {
          for (s = r[i], r[i] = ""; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j)).length ? b : "")) {
            j = c === 2 || (j = s.slice(0, m + 1).match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c === 1 && m || j.input.length + (j = s.slice(m).match(/^\S*/)).input.length;
          }
        }
        return r.join("\n");
      }

      function getQuarter(val) {
        var trimDate = val.split("-");
        var returnVal = "Q" + parseInt(((trimDate[0] - 1) / 3) + 1, 0);
        return returnVal + "-" + trimDate[1];
      }
      /** ***************************** Return ****************************** */
      return {
        isLocal: function() {
          return self.local;
        },
        isAuthenticated: function() {
          return self.authenticated;
        },
        calculatePercentage: calculatePercentage,
        getChartFromSelector: getChartFromSelector,
        getName: getName,
        getColorValues: getColorValues,
        setProperties: setProperties,
        setConfig: setConfig,
        getConfig: getConfig,
        capitaliseFirstLetter: capitaliseFirstLetter,
        getSourceByName: getSourceByName,
        wordwrap: wordwrap,
        convertHex: convertHex,
        colorToHex: colorToHex,
        getGradient: getGradient,
        getQuarter: getQuarter
      };
    }])

    .factory('Feed', ["$resource", "API_BASE", function($resource, API_BASE) {
      return $resource(API_BASE + 'feeds/:id', {
        id: '@id'
      }, {
        put: {
          method: "PUT"
        }
      });
    }])

    .factory('Filter', ["$resource", "API_BASE", function($resource, API_BASE) {
      return $resource(API_BASE + 'filters/:id', {}, {
        get: {
          method: "GET",
          cache: true
        },
        query: {
          method: "GET",
          cache: true,
          isArray: true
        }
      });
    }])

    .factory('User', ["$resource", "API_BASE", function($resource, API_BASE) {
      return $resource(API_BASE + 'users/:id', {
        id: 'me'
      });
    }])

    .factory('Dashboard', ["$resource", "API_BASE", function($resource, API_BASE) {
      return $resource(API_BASE + 'dashboards/:tabName/:subTabName/:subSubTabName', {}, {
        get: {
          method: "GET",
          cache: true
        }
      });
    }])

    /* DashBoard Services */
    .service('DashboardService', [
        'API_BASE',
        'APP_MODE',
        '$injector',
        '$route',
        '$rootScope',
        function(API_BASE, APP_MODE, $injector, $route, $rootScope) {
          // Local Url
          var urlSetLocal = {
            "logout": "logout",
            "config": "config",
            "socialmedia": {
              "socialhealth": "P1_socialHealth",
              "patientvoice": "P1_patientVoice",
              "socialmediadistribution": "P1_socialMedia",
              "rankings": "P1_hospitalRanking",
              "timeline": "P1_timeline",
              "topicanalysis": "topicanalysis",
              "compare": {
                "overview": "competative_overView",
                "sentiment": "competative_sentiment",
                "rating": "competative_rating",
                "ranking": "competative_ranking"
              },
              "employeesentiment": "P1_employeeSentiment",
              "employeeactivitytrendz": "activityTrends"
            },
            "avatar": {
              "socialhealth": "avatar_socialHealth",
              "patientvoice": "avatar_patientVoice",
              "avatardistribution": "avatar_socialMedia",
              "aindex": "avatar_aindex",
              "measuresbyfacilities": "avatar_measuresByFacility",
              "socialmediadistribution": "avatar_socialMediaDistribution"
            },
            "survey": {
              "hcahpssummary": "P1_cmsSummary",
              "hospitalcms": "P1_hospitalCms",
              "hcahpscorrelation": "P1_hcahpsCorrelation",
              "hcahpsregression": "P1_hospitalRegression",
              "hcahpsdetailedtimeline": "P1_hcahpsDetailedTimeLine",
              "measuresbyfacility": "P1_measuresByFacility",
              "pindex": "P1_pIndex",
              "compare": {
                "summary": "competative_cmsSummary",
                "hcahps": "competative_hcaps",
                "timeandeffectivecare": "competative_effectiveCare",
                "readmissions,complicationsanddeath": "competative_readmission",
                "useofmedicalimaging": "competative_medicalImaging"
              }
            },
            "keyinsight": "P3_keyInsight"
          };

          var hospital = null;
          var isCluster = null;

          $rootScope.$on("hospitalChange", function(event, hospitalModel, cluster) {
            hospital = hospitalModel;
            isCluster = cluster;
          });

          function getPageTab() {
            var pageCtrl = $route.current.controller;
            pageCtrl = pageCtrl.replace("Ctrl", "").toLowerCase();
            return pageCtrl;
          }

          function getUrl(params) {
            params = params || {};
            if (params.url) { return params.url; }
            var urlString, tabName = params.tabName || $route.current.hash || $route.current.controller.replace("Ctrl", ""), subTabName = params.subTabName || undefined, subsubTabName = params.subSubTabName || undefined, hosp = params.hosp || [];

            if (subsubTabName && subTabName) {
              urlString = urlSetLocal[tabName.trim().toLowerCase()][subTabName.trim().toLowerCase()][subsubTabName.replace(/ /g, '').trim().toLowerCase()];
              urlString = urlString + "Vs_" + params.hosp[1].id;
              params.hospitalId = params.hosp[0].id;
            } else if (subTabName) {
              urlString = urlSetLocal[tabName.trim().toLowerCase()][subTabName.trim().toLowerCase()];
            } else {
              urlString = urlSetLocal[tabName.trim().toLowerCase()];
            }

            if ((urlString instanceof Object) === true || urlString === undefined) {
              return undefined;
            } else {
              addHospital(params);
              if (params.hospitalId) {
                urlString = "hospital/" + params.hospitalId + "/" + urlString;
              } else if (params.clusterId) {
                urlString = "cluster/" + params.clusterId + "/" + urlString;
              }
              urlString = "json/" + urlString + ".json";
            }
            return urlString;
          }

          /* Server Query */
          function getQueryParams(queryParams) {
            if (!queryParams) { return {}; }
            var params = {};
            for ( var k in queryParams) {
              if (k === "hosp") {
                if (angular.isArray(queryParams[k])) {
                  var hospitalIds = [];
                  for (var i = 0; i < queryParams[k].length; i++) {
                    hospitalIds.push(queryParams[k][i].id);
                  }
                  params.hospitalId = hospitalIds;
                } else {
                  params.hospitalId = queryParams[k].id;
                }
              } else {
                params[k] = queryParams[k];
              }
            }
            return params;
          }

          function addHospital(queryParams) {
            if (!queryParams.hospitalId && !queryParams.hosp && !queryParams.clusterId) {
              if (isCluster) {
                if (hospital.id !== 0) {
                  queryParams.clusterId = hospital.id;
                }
              } else {
                if (hospital) {
                  queryParams.hospitalId = hospital.id;
                }
              }
            }

            // for export in phantom
            try {
              if (queryParams.queryParamExport) {
                if (queryParams.hospitalIdExport !== 0) {
                  queryParams.hospitalId = queryParams.hospitalIdExport;
                } else {
                  queryParams.clusterId = queryParams.clusterIdExport;
                }
              }
            } catch (err) {
              console.log(err);
            }
            return queryParams;
          }

          function getDashboards(queryParams, success, failure) {
            if (queryParams.local || APP_MODE === "local") {
              var url = getUrl(queryParams);
              $http = $injector.get("$http");
              $http.get(url).success(function(data, headers) {
                success(data, headers);
              }).error(function() {

              });
            } else if (APP_MODE === "server") {
              if (!queryParams.tabName) {
                queryParams.tabName = $route.current.hash;
              }
              queryParams = addHospital(queryParams);
              return $injector.get("Dashboard").get(getQueryParams(queryParams), success, failure);
            } else {
              $http = $injector.get("$http");
              $http.get(getUrl(queryParams)).success(function(data, status, headers, config) {
                success(data, headers);
              }).error(function(data, status, headers, config) {
                failure(data, headers);
              });
            }
          }

          /* feed */
          function getFeeds(queryParams, success, failure) {
            if (APP_MODE === "server") {
              queryParams = queryParams || {};
              queryParams = addHospital(queryParams);
              return $injector.get("Feed").get(getQueryParams(queryParams), success, failure);
            } 
          }

          function getFilters(queryParams, success, failure) {
            if (APP_MODE === "server") {
              queryParams = queryParams || {};
              queryParams = addHospital(queryParams);
              return $injector.get("Filter").get(getQueryParams(queryParams), success, failure);
            } else {
              var url = getUrl(queryParams);
              $http = $injector.get("$http");
              $http.get(url).success(function(data, headers) {
                success(data, headers);
              }).error(function(data, status, headers, config) {
                failure(data, headers);
              });

            }
          }

          function queryFilters(queryParams, success, failure) {
            if (APP_MODE === "server") {
              queryParams = queryParams || {};
              queryParams = addHospital(queryParams);
              return $injector.get("Filter").query(getQueryParams(queryParams), success, failure);
            } else {
              $http = $injector.get("$http");
              $http.get("json/filter/filter.json").success(function(data, headers) {
                success(data, headers);
              }).error(function(data, headers) {
                failure(data, headers);
              });
            }
          }

          function getUsers(queryParams, success, failure) {
            if (APP_MODE === "server") {
              queryParams = getQueryParams(queryParams);
              delete queryParams.tabName;
              return $injector.get("User").get(queryParams, success, failure);
            } else {
              var url = getUrl(queryParams);
              $http = $injector.get("$http");
              $http.get(url).success(function(data, headers) {
                success(data, headers);
              }).error(function(data, headers) {
                failure(data, headers);
              });
            }
          }

          function exportUrl(params) {
            params = params || {};
            params = addHospital(params);

            var url = API_BASE + "reports/feeds?";

            for ( var k in params) {
              if (angular.isArray(params[k])) {
                for ( var v in params[k]) {
                  url = url + k + "=" + params[k][v] + "&";
                }
              } else {
                url = url + k + "=" + params[k] + "&";
              }
            }
            return url;
          }

          function logout(queryParams, success, failure) {
            if (APP_MODE === "server") {
              $http = $injector.get("$http");
              $http.post(API_BASE + 'logout').success(function(data, status) {
                if (success) {
                  success(data, status);
                }
              })(function(data, status, headers) {
                if (failure) {
                  failure(data, headers);
                }
              });
            } else {
              if (success) {
                success();
              }
            }
          }

          return {
            dashboard: {
              get: getDashboards
            },
            feed: {
              get: getFeeds
            },
            filter: {
              get: getFilters,
              query: queryFilters
            },
            user: {
              get: getUsers
            },
            logout: logout,
            buildExportUrl: exportUrl
          };
        }]);