var counter = 0;
var __indexOf = [].indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (i in this && this[i] === item) { return i; }
  }
  return -1;
};
angular
    .module('highchartDir', [])

    .directive('chosen', [
        '$timeout',
        function($timeout) {
          var CHOSEN_OPTION_WHITELIST, NG_OPTIONS_REGEXP, isEmpty, snakeCase;

          NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/;
          CHOSEN_OPTION_WHITELIST = ['noResultsText', 'allowSingleDeselect', 'disableSearchThreshold', 'disableSearch', 'enableSplitWordSearch', 'inheritSelectClasses', 'maxSelectedOptions',
              'placeholderTextMultiple', 'placeholderTextSingle', 'searchContains', 'singleBackstrokeDelete', 'displayDisabledOptions', 'displaySelectedOptions', 'width'];
          snakeCase = function(input) {
            return input.replace(/[A-Z]/g, function($1) {
              return "_" + ($1.toLowerCase());
            });
          };
          isEmpty = function(value) {
            var key, _i, _len;

            if (angular.isArray(value)) {
              return value.length === 0;
            } else if (angular.isObject(value)) {
              for (_i = 0, _len = value.length; _i < _len; _i++) {
                key = value[_i];
                if (value.hasOwnProperty(key)) { return false; }
              }
            }
            return true;
          };
          return {
            restrict: 'A',
            require: '?ngModel',
            terminal: true,
            link: function(scope, element, attr, ctrl) {
              var disableWithMessage, match, options, origRender, startLoading, stopLoading, valuesExpr, viewWatch;

              options = scope.$eval(attr.chosen) || {};
              angular.forEach(attr, function(value, key) {
                if (__indexOf.call(CHOSEN_OPTION_WHITELIST, key) >= 0) {
                  options[snakeCase(key)] = scope.$eval(value);
                  return options[snakeCase(key)];
                }
              });
              startLoading = function() {
                //return element.attr('disabled', true).trigger('chosen:updated');
              };
              stopLoading = function() {
                //return element.removeClass('loading').attr('disabled', false).trigger('chosen:updated');
              };
              disableWithMessage = function(message) {
                //return element.empty().append("<option selected>" + message + "</option>").attr('disabled', true).trigger('chosen:updated');
              };
              $timeout(function() {
                return element.chosen(options);
              });
              if (ctrl) {
                origRender = ctrl.$render;
                ctrl.$render = function() {
                  origRender();
                  return element.trigger('chosen:updated');
                };
                if (attr.multiple) {
                  viewWatch = function() {
                    return ctrl.$viewValue;
                  };
                  scope.$watch(viewWatch, ctrl.$render, true);
                }
              }
              if (attr.ngOptions) {
                match = attr.ngOptions.match(NG_OPTIONS_REGEXP);
                valuesExpr = match[7];
                if (angular.isUndefined(scope.$eval(valuesExpr))) {
                  startLoading();
                }
                return scope.$watch(valuesExpr, function(newVal, oldVal) {
                  if (newVal !== oldVal) {
                    stopLoading();
                    if (isEmpty(newVal)) {
                      console.log('In inEmpty new vale');
                    }
                  }
                });
              }
            }
          };
        }])
    .directive('circles', ['$timeout', 'CommonService', function($timeout, common) {
      return {
        restrict: "E",
        scope: {
          data: '='
        },
        template: "<div></div>",
        replace: true,
        link: function(scope, elm, attr) {

          var details = function(c, i) {
            scope.$emit("bubbleClicked", c, i);
          };

          var vis = d3.select(elm[0]).append("svg").attr("width", "100%").attr("height", "260px");
          scope.$watch('data', function(val) {
            if (val) {
              vis.selectAll("*").remove();

              var circle = vis.selectAll("g").data(scope.data).enter().append("g").attr("id", function(d) {
                return d.keyName.toLowerCase();
              });

              circle.append("circle").attr("class", "link").attr("cx", function(d) {
                return d.cx;
              }).attr("cy", function(d) {
                return d.cy;
              }).attr("stroke", function(d) {
                return common.getColorValues("emotion", d.keyName);
              }).attr("stroke-width", "4").attr("fill", "white").on("click", function(c, i) {
                details(c, i);
              }).transition().attr("r", function(d) {
                return d.radius;
              });

              circle.append("text").attr("class", "link").attr("fill", "#515151").attr("x", function(d) {
                return d.cx;
              }).attr("y", function(d) {
                return d.cy - 5;
              }).attr("text-anchor", "middle").text(function(d) {
                return d.keyName;
              }).attr("font-size", function(d) {
                return d.fontSize;
              }).attr("font-family", function(d) {
                return d.fontFamily;
              }).attr("dy", function(d) {
                return d.dy;
              }).on("click", function(c, i) {
                details(c, i);
              });

              circle.append("text").attr("class", "link").attr("fill", function(d) {
                return common.getColorValues("emotion", d.keyName);
              }).attr("text-anchor", "middle").text(function(d) {
                return Math.round(d.keyVal) + " %";
              }).attr("x", function(d) {
                return d.cx;
              }).attr("y", function(d) {
                return (d.cy + 10);
              }).attr("font-size", function(d) {
                return d.fontSize;
              }).attr("font-family", function(d) {
                return d.fontFamily;
              }).attr("dy", function(d) {
                return d.dy;
              }).on("click", function(c, i) {
                details(c, i);
              });
            }
          });
        }

      };
    }])

    .directive('chord', ['CommonService', function(common) {
      return {
        restrict: "E",
        scope: {
          data: '=data',
          fill: '=fill'
        },
        template: "<div></div>",
        replace: true,
        link: function(scope, elm, attr) {
          var svg = null;

          scope.$watch("data", function() {
            if (!scope.data) { return; }

            var matrix = scope.data.matrix;
            var entity = scope.data.entity;
            var entitySet = scope.data.category || [];
            var fill = scope.fill;

            var chord = d3.layout.chord().padding(0.05).sortSubgroups(d3.descending).matrix(matrix);
            var width = $("#chordChart").width();
            var height = $("#chordChart").height();

            d3.select(elm[0]).selectAll("*").remove();
            svg = d3.select(elm[0]).append("svg").attr("width", width).attr("height", height).append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
            var labelPosition = 1;

            // set the chart radii
            svg.innerRadius = Math.min(width - 0, height - 0) * 0.40;
            svg.outerRadius = svg.innerRadius * 1.1;
            // define the arc and
            // chord for the
            // transitions
            svg.svgArc = d3.svg.arc().innerRadius(svg.innerRadius).outerRadius(svg.outerRadius);
            svg.svgChord = d3.svg.chord().radius(svg.innerRadius);
            if (!svg.chord) {
              svg.chord = d3.layout.chord();
            }
            svg.chord.padding(2 / 100) // divide
            // by
            // 100
            // so
            // it
            // fits
            .sortSubgroups(d3.descending).matrix(matrix);

            // Arcs
            if (!svg.arcs) {
              svg.arcs = svg.append("g").attr("class", "arcs");
            }
            svg.arcGroups = svg.arcs.selectAll(".group").data(chord.groups);
            svg.arcGroups.enter().append("g").attr("class", "group").on("mouseover", function(g, i) {
              svg.selectAll(".chords path").style("opacity", function(d) {
                if (i <= 18) {
                  if (d.source.index !== i) {
                    return 0.2;
                  } else {
                    return 1;
                  }
                } else {
                  if (d.target.index !== i) {
                    return 0.2;
                  } else {
                    return 1;
                  }
                }

              });
            }).append("path").append("title").text(function(d, i) {
              var sum = 0;
              for (var j = 0; j < matrix[i].length; j++) {
                sum += matrix[i][j];
              }
              return entity[i] + " (Added inlet value is: " + parseInt(sum, 0) + ")";
            });
            svg.arcGroups.exit().transition().duration(0)
            // Speed
            .style("fill-opacity", 1e-6).style("stroke-opacity", 1e-6).remove();

            svg.arcPaths = svg.arcGroups.select("path");

            svg.arcPaths.attr("id", function(d, i) {
              return "group" + i;
            }).transition().duration(0).style("fill", function(d) {
              // TODO
              return fill[entitySet[d.index]];
            }).attr("d", d3.svg.arc().innerRadius(svg.innerRadius).outerRadius(svg.outerRadius)).attr("title", function(d, i) {
              var sum = 0;
              for (var j = 0; j < matrix[i].length; j++) {
                sum += matrix[i][j];
              }
              return " (Added inlet value is: " + parseInt(sum, 0) + ")";
            });

            // Labels
            svg.arcGroups.selectAll(".label").remove();
            if (labelPosition) {

              svg.labels = svg.arcGroups.append("svg:text").attr("class", "label").attr("dx", function(d) {
                if (labelPosition) {
                  return labelPosition;
                } else {
                  return 0;
                }
              }).attr("dy", 17);
              svg.labels.append("svg:textPath").attr("xlink:href", function(d, i) {
                return "#group" + i;
              }).text(function(d, i) {
                return i;
              }).attr("startOffset", 5);
            }

            // Chords
            if (!svg.chords) {
              svg.chords = svg.append("g").attr("class", "chords");
            }
            svg.chordPaths = svg.chords.selectAll("path").data(chord.chords);

            svg.chordPaths.enter().append("path").append("title").text(function(d, i) {
              var returnVal = entity[d.source.index] + "(" + d.source.index + ") -> (" + d.target.index + ")" + "\n Value -" + d.source.value + "%";
              return returnVal;
            });
            svg.chordPaths.on("mouseover", function(g, i) {
              svg.selectAll(".chords path").filter(function(d) {
                return d.source.index !== i && d.target.index !== i;
              }).transition().style("opacity", 1);
            }).on("mouseout", fade(1)).transition().duration(0).attr("title", function(d, i) {
            })

            .attr("d", d3.svg.chord().radius(svg.innerRadius)).style("fill", function(d) {
              // TODO
              return fill[entitySet[d.target.index]];
            }).style("fill-opacity", 0.9).style("opacity", 1);

          });

          // Returns an event handler for fading a
          // given chord group.
          function fade(opacity) {
            return function(g, i) {
              svg.selectAll(".chord path").filter(function(d) {
                return d.source.index !== i && d.target.index !== i;
              }).transition().style("opacity", opacity);
            };
          }
        }
      };
    }])

    .directive('chartinfo', [
        'CommonService',
        function(common) {
          return {
            restrict: 'E',
            scope: {
              chartData: "=value",
              feedData: "=feed",
              hospitalId: "=hospitalid"
            },
            controller: function($scope, $element, $attrs) {
              $scope.total = 0;
              $scope.centertotal = 0;
              $scope.refresh = function() {
                var chart = {};
                chart[$scope.hospitalId] = common.getChartFromSelector($scope.chartData);
                var series = chart[$scope.hospitalId].series[0];
                for (var i = 0; i < series.data.length; i++) {
                  series.data[i].setVisible(true);
                }
                $scope.$$childTail.clickedNav = null;
                $scope.centertotal = $scope.total;
                $scope.$emit("feedFilter");
              };
              $scope.$watch('chartData', function() {
                if ($scope.chartData) {
                  var data = $scope.chartData.series[0].data;
                  var t = 0;
                  for ( var i in data) {
                    t += data[i].y;
                  }
                  $scope.total = t;
                  $scope.centertotal = t;
                }
              });
            },
            compile: function($element, $attrs) {
              counter = counter + 1;
              var template = '<a class="viewAllComments link" data-ng-show="$$childTail.clickedNav" data-ng-click="refresh()"> Show All <i class="icon-repeat"></i></a>' + '<div class="chartBySources"><chart class="chartBySources" id="chartBySource' + counter + '" value="chartData" type="pie"></chart>' + '<div id="totalComments" class="totalComments"><span class="value">Total<br>{{centertotal}}</span></div></div>' + '<chartledgends id="chartlegends' + counter + '" value="chartData.series[0].data"></chartledgends>';
              $element.append(template);
            }
          };
        }])
    .directive('chartledgends', [
        'CommonService',
        function(common) {
          return {
            restrict: 'E',
            scope: {
              ledgendData: "=value"
            },
            template: '<div class="row-fluid sources"><div class="span3" data-ng-repeat="value in ledgendData" data-ng-click="click(value)">' + '<div style="border-top-color: {{getColor(value.name)}}" class="source" data-ng-class="{active: clickedNav==value.name}">{{value.name | capFirstLetter}}<div class="sourceScore">{{value.y/total*100 | number:1}}%</div>' + '<span class="ratings" title="Rating: {{value.rating | number:1}}"><i class="starsImg"><i style="width: {{value.rating*20 |number:0}}%" id="starRating"></i></i></span></div></div></div>',
            link: function($scope, $element, $attrs) {

              $scope.getColor = function(value) {
                var colorVal = common.getColorValues("source", value);
                return colorVal;
              };

              $scope.clickedNav = null;
              $scope.parentChart = null;

              $scope.total = 0;
              $scope.$watch('ledgendData', function() {

                $scope.parentChart = common.getChartFromSelector($scope.$parent.chartData);
                // console.log($scope.parentChart)
                if ($scope.ledgendData) {
                  var data = $scope.ledgendData;
                  var d = 0;
                  for ( var i in data) {
                    d += data[i].y;
                  }
                  $scope.total = d;
                  $scope.$parent.refresh();
                }
              });

              $scope.click = function(value) {
                if ($scope.clickedNav !== value.name) {
                  $scope.clickedNav = value.name;
                }

                // console.log($scope)
                var chart = $scope.parentChart;
                var series = chart.series[0];

                for (var i = 0; i < series.data.length; i++) {
                  series.data[i].setVisible(false);
                  if (value.name.toLowerCase() === series.data[i].name.toLowerCase()) {
                    series.data[i].setVisible(true);
                  }
                }
                $scope.$parent.centertotal = value.y;
              };

              $scope.$watch("clickedNav", function() {
                if ($scope.clickedNav) {
                  $scope.$emit("feedFilter", "source", $scope.clickedNav);
                }
              });
            }
          };
        }])
    .directive('chart', [
        'CommonService',
        '$window',
        function(common, $window) {
          function deepExtend(destination, source) {
            for ( var property in source) {
              if (source[property] && source[property].constructor && source[property].constructor === Object) {
                destination[property] = destination[property] || {};
                deepExtend(destination[property], source[property]);
              } else {
                destination[property] = source[property];
              }
            }
            return destination;
          }

          function setBubbleChart(data, common) {
            var container = document.getElementById("networkContainer");
            container.innerHTML = null;

            var dataIndeces = {};
            var gravityVariable = null;
            var lowlightColor = "#FFFFFF", highlightColor = "#000000";
            var radiMinWidth = 250;
            var dataNodes = data;
            var minRadius = 2;
            var maxRadius = 35;
            var maxReview = 0;
            var minReview = 0;

            data.forEach(function(d) {
              if (d["number of reviews"] > maxReview) {
                maxReview = d["number of reviews"];
              }
            });
            var w = container.offsetWidth, // Width
            h = container.offsetHeight, nodes = [], // Height
            vis = d3.select("#networkContainer").append("svg:svg").attr("width", w).attr("height", h + 100), // container
            force = d3.layout.force().nodes(nodes).links([]).gravity(-0.01).charge(function(n, i) {
              return (-Math.pow((nodes[i]["number of reviews"] / maxReview) * (maxRadius - minRadius), 2.15)) / 8;
            }).size([w, h + 50]);

            var pos = $(".labelBubble:eq(0)").position();

            var doc = document.getElementById("networkContainer");
            force.on("tick", function(e) {
              var k = 0.1 * e.alpha;
              nodes.forEach(function(o, i) {
                var attrInd = dataIndeces[gravityVariable].indexOf(o[gravityVariable]);
                pos = $(".labelBubble:eq(" + attrInd + ")").position();
                var newLeft = 0;
                var newTop = 0;
                if (typeof pos !== "undefined") {
                  newLeft = pos.left + ($(".labelBubble:eq(" + attrInd + ")").width() / 2);
                  newTop = pos.top - 115;
                }
                o.y += (newTop - o.y) * k;
                o.x += (newLeft - o.x) * k;
              });

              vis.selectAll("circle.node").attr("cx", function(d) {
                return d.x;
              }).attr("cy", function(d) {
                return d.y;
              });

              var svg = doc.getElementsByTagName("svg")[0], c = doc.getElementsByClassName("labelBubble"), length = c.length;

              if (length >= 1 && length <= 6) {
                svg.style.height = "360px";
              }

              doc.onscroll = function() {
                var top = doc.scrollTop;
                force.start();
                if (top >= 100) {
                  force.stop();

                }
              };

            });

            // Push
            $('#trendsTopMenu').empty();
            for ( var node in dataNodes) {
              for ( var attr in dataNodes[node]) {
                if (attr !== "number of reviews") {
                  // Set the gravityVariable to the
                  // first attribute/button.
                  if (typeof gravityVariable === "undefined")
                    gravityVariable = attr;

                  if (dataIndeces.hasOwnProperty(attr)) {
                    if (dataIndeces[attr].indexOf(dataNodes[node][attr]) === -1) {
                      dataIndeces[attr].push(dataNodes[node][attr]);
                    }

                  } else {
                    dataIndeces[attr] = [dataNodes[node][attr]];
                    var displayAttr = capInits(attr);
                    $('#trendsTopMenu').append('<div id="' + attr + '" class="btn btn-small">' + displayAttr + '</div>');
                  }
                }
              }

              $('#trendsTopMenu div').click(function() {
                gravityVariable = $(this).attr('id');
                force.start();
              });

              var newNode = dataNodes[node];
              nodes.push(newNode);

              force.start();

              data.forEach(function(d) {
                if (d["number of reviews"] > maxReview) {
                  maxReview = d["number of reviews"];
                }
                if (d["number of reviews"] < minReview) {
                  minReview = d["number of reviews"];
                }
              });

              vis.selectAll("circle.node").data(nodes).enter().append("svg:circle").attr("class", "node").attr("cx", function(d) {
                return d.x + 30;
              }).attr("cy", function(d) {
                return d.y + 150;
              }).attr("r", function(d) {
                return minRadius + (dataNodes[node]["number of reviews"]) * (maxRadius - minRadius) / maxReview;
              }).style("fill", function(d) {
                return common.getColorValues("opinion", dataNodes[node].opinion);
              }).style("stroke", lowlightColor).style("stroke-width", 1).on("mouseover", function() {
                d3.select(this).style("stroke", highlightColor);
                showDataPopup(this);
              }).on("mouseout", function() {
                d3.select(this).style("stroke", lowlightColor);
                $("#popupDisplayBubble").hide();
              }).on("click", function(d) {
              });
            }
            for ( var dataIndex in dataIndeces) {
              dataIndeces[dataIndex] = dataIndeces[dataIndex].sort(function(a, b) {
                if (dataIndex === "opinion") {
                  if (a === "Positive" && b === "Negative") {
                    return -1;
                  } else if (a === "Positive" && b === "Neutral") {
                    return -1;
                  } else if (a === "Neutral" && b === "Negative") {
                    return -1;
                  } else {
                    return 1;
                  }
                } 
                return a - b;
              });
            }
            var menuWidth = 2;
            $("#trendsTopMenu div").each(function() {
              menuWidth += $(this).outerWidth();

              $(this).click(function() {
                $("#trendsTopMenu div").removeClass("buttonSelected");
                $(this).addClass("buttonSelected");
                drawFociLabels($(this).attr("id"));
              });
            });
            $("#trendsTopMenu #opinion").click();

            // Draw the initial labels
            drawFociLabels();

            function focusPoints(attr) {
              var width = $("#networkContainer svg").width();
              var numOfFoci = dataIndeces[gravityVariable].length;
              var gravityInd = dataIndeces[gravityVariable].indexOf(attr) + 1;
              // var newX = 0;
              var newY = 10;

              var horizontalNumOfFoci = width / radiMinWidth;

              if (numOfFoci > horizontalNumOfFoci)
                numOfFoci = horizontalNumOfFoci;

              var position = {
                x: ((width / (numOfFoci + 1) * gravityInd) - 50),
                y: newY
              };

              return position;
            }

            function capInits(fullStr) {
              var words = String(fullStr).split(' ');
              for ( var word in words) {
                words[word] = words[word].substr(0, 1).toUpperCase() + words[word].substr(1).toLowerCase();
              }
              return words.join(" ");
            }

            function drawFociLabels(value) {
              $(".labelBubble").fadeOut().remove();

              for ( var attr in dataIndeces[gravityVariable]) {

                var pos = focusPoints(dataIndeces[gravityVariable][0]);
                var title = capInits(dataIndeces[gravityVariable][attr]);
                // Fix the position if there are too many to display
                // horizontally
                var width = $("svg").width();
                var newLeft = 1;
                var newTop = 1;
                var horizontalNumOfFoci = 3;

                // Add the label
                var visNewHeight = 600;
                $("svg").css('height', visNewHeight + 30);
                $("#networkContainer").append('<div class="labelBubble">' + title + '</div>');

                newTop = ((Math.floor(attr / horizontalNumOfFoci) + 1) * 200);

                newLeft = (pos.x * (Math.floor(attr % horizontalNumOfFoci) + 1)) - (($('.labelBubble').last().width() / 2));
                $(".labelBubble").last().css({
                  'left': newLeft,
                  'top': newTop
                }).fadeIn();
              }
            }

            function showDataPopup(elem) {
              var count = 0;
              var elemPos = $(elem).aPosition();
              var elemInd = $("circle").index(elem);
              var elemData = "";
              for ( var attr in dataNodes[elemInd]) {
                if (attr !== "index" && attr !== "weight" && attr !== "x" && attr !== "y" && attr !== "px" && attr !== "py" && attr !== "fixed") {
                  var dataTitle = capInits(attr);
                  var dataVal = dataNodes[elemInd][attr];
                  if (isNaN(dataVal)) {
                    dataVal = common.capitaliseFirstLetter(dataVal.toLowerCase());
                  }
                  elemData += '<div><span class="popupTitle">' + dataTitle + ' : </span>' + '<span class="popupData">' + dataVal + '</span></div>';
                  count++;
                }
              }

              var posLeft = $("#networkContainer").offset().left + elemPos.left + 300;
              var boxLeft = $("#networkContainer").offset().left + $("#networkContainer").width();

              if (elemPos.top > 400) {
                elemPos.top = 250;
              }
              if (posLeft >= boxLeft) {
                $("#popupDisplayBubble").html(elemData).css({
                  'top': Math.abs(elemPos.top),
                  'left': Math.abs((elemPos.left - 170))
                });
              } else {
                $("#popupDisplayBubble").html(elemData).css({
                  'top': Math.abs(elemPos.top),
                  'left': Math.abs((elemPos.left + 100))
                });
              }

              $("#popupDisplayBubble").show();
            }
          }

          jQuery.fn.aPosition = function() {

            var thisLeft = this.offset().left;
            var thisTop = this.offset().top;
            var thisParent = this.parent();
            var parentLeft = thisParent.offset().left;
            var parentTop = thisParent.offset().top;

            return {
              left: thisLeft - parentLeft,
              top: thisTop - parentTop
            };
          };

          return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
              chartData: "=value"
            },
            transclude: true,
            replace: true,

            link: function(scope, element, attrs) {
              var chartsDefaults = {
                chart: {
                  renderTo: element[0],
                  type: attrs.type || null,
                  height: attrs.height || null,
                  width: attrs.width || null
                }
              };
              // Update when charts data changes
              // TODO => will recreate chart object every time which is
              // inefficient
              var type = attrs.charttype || "highchart";
              scope
                  .$watch(function() {
                    return scope.chartData;
                  }, function(value) {
                    if (!value)
                      return;
                    if (type === "highchart" || type === "highstock") {
                      var newSettings = {};
                      newSettings = deepExtend(chartsDefaults, newSettings);
                      newSettings = deepExtend(scope.chartData, newSettings);
                      if (type === "highchart") {
                        chart = new Highcharts.Chart(newSettings);
                      } else {
                        chart = new Highcharts.StockChart(newSettings);
                      }
                    } else if (type === "bubbleChart") {
                      var t = '<div id="trendsTopMenu" class="btn-group"></div><div id="networkContainer"></div><div id="popupDisplayBubble"></div><div class="alert alert-info" style="margin-right: 10%; height: 20px; display: none;"><button type="button" class="close">&times;</button><span></span></div>';
                      element[0].innerHTML = null;
                      element[0].innerHTML = t;
                      var data = angular.copy(value);
                      setBubbleChart(data, common);
                    }
                  });
            }

          };
        }]);