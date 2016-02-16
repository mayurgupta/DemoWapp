var commonChartService = angular.module('commonChart', ['common']);

commonChartService
    .service('CommonChartService', [
        '$rootScope',
        function($rootScope) {
          function setChartOption() {
            var chart = Highcharts.setOptions({
              chart: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: "#DADADA",
                borderRadius: 0,
                ignoreHiddenSeries: true,
                style: {
                  fontFamily: 'arial,helvetica,sans-serif'
                }
              },
              credits: {
                enabled: false
              },
              title: {
                text: '',
                style: {
                  color: '#444',
                  fontWeight: 'bold'
                }
              },
              legend: {
                itemMarginBottom: 3,
                itemStyle: {
                  color: '#2970A6'
                }
              },
              scrollbar: {
                liveRedraw: false,
                barBackgroundColor: 'gray',
                barBorderRadius: 7,
                barBorderWidth: 0,
                buttonBackgroundColor: '#353535',
                buttonBorderWidth: 0,
                buttonBorderRadius: 7,
                trackBackgroundColor: 'none',
                trackBorderWidth: 1,
                trackBorderRadius: 8,
                trackBorderColor: '#fff'
              },
              xAxis: {
                labels: {
                  style: {
                    color: '#333'
                  }
                },
                title: {
                  style: {
                    color: '#666'
                  }
                }
              },
              yAxis: {
                labels: {
                  style: {
                    color: '#000'
                  }
                },
                title: {
                  text: '',
                  style: {
                    color: '#666'
                  }
                }
              },
              plotOption: {
                pie: {
                  borderWidth: 0,
                  innerSize: 100,
                  dataLabels: {
                    enabled: false
                  },
                  showInLegend: true
                },
                series: {
                  shadow: false
                }
              }
            });

            return chart;
          }

          /* TIMELINE SLIDER */
          function showTimeSpan(obj) {

            var chart = {
              chart: {
                backgroundColor: obj.bg || 'rgba(255, 255, 255, 0.1)',
                borderWidth: obj.border || 0,
                style: {
                  fontFamily: obj.style || 'arial,helvetica,sans-serif'
                }
              },
              colors: ['#fff', '#fff', '#fff', '#fff'],
              xAxis: {
                lineWidth: 0,
                tickLength: 0,
                minRange: 24 * 3600 * 1000,
                labels: {
                  enabled: false
                },
                events: {
                  setExtremes: obj.setExtremes
                }
              },
              yAxis: {
                height: 0,
                gridLineWidth: 0,
                labels: {
                  enabled: false
                }
              },
              tooltip: {
                enabled: false
              },
              rangeSelector: {
                selected: 0,
                inputStyle: {
                  color: '#0088CC',
                  fontWeight: 'bold'
                },
                enabled: true,
                inputDateFormat: '%Y-%m-%d',
                buttons: [{
                  type: 'all',
                  text: 'All'
                }, {
                  type: 'year',
                  count: 1,
                  text: '1y'
                }, {
                  type: 'month',
                  count: 6,
                  text: '6m'
                }],
                buttonTheme: {
                  'stroke-width': 0,
                  r: 0,
                  style: {
                    color: '#808080',
                    fontWeight: 'bold'
                  },
                  states: {
                    hover: {
                      fill: '#808080',
                      style: {
                        color: '#383838'
                      }
                    },
                    select: {
                      fill: '#383838',
                      style: {
                        color: '#fff'
                      }
                    }
                  }
                },
                labelStyle: {
                  r: 8,
                  color: 'silver',
                  fontWeight: 'bold'
                }
              },
              scrollbar: {
                buttonBackgroundColor: '#fff',
                buttonArrowColor: '#fff'
              },
              navigator: {
                series: {
                  color: 'white'
                }
              },
              series: [{
                data: obj.dataSet
              }]
            };
            return chart;
          }

          function getDefaultValues() {
            /* Set Default values */
            var ret = {
              title: "",
              titleStyle: "",

              isPolar: false,
              isBar: false,

              margin: [],
              bg: "rgba(255, 255, 255, 0.1)",
              border: 0,
              legend: false, 
              legendWidth: 200,
              legendLayout: "vertical",
              legendAlign: "right",
              legendVerticalAlign: "top",
              legendFloating: false,
              legendY: 0,
              legendX: 0

            };

            return ret;
          }

          function basicChart(obj) {
            var i = 0;

            /* user Inputs - if not provided it takes default values */

            /* Get Default values */
            var defaults = getDefaultValues();

            var title = obj.title || defaults.title, titleStyle = obj.titleStyle || defaults.titleStyle, isPolar = obj.polar || defaults.isPolar, isBar = obj.bar || defaults.isBar, margin = obj.margin || defaults.margin, bg = obj.bg || defaults.bg, border = obj.border || defaults.border, legend = obj.legend || defaults.legend, legendWidth = obj.legendWidth || defaults.legendWidth, legendLayout = obj.legendLayout || defaults.legendLayout, legendAlign = obj.legendAlign || defaults.legendAlign, legendVerticalAlign = obj.legendVerticalAlign || defaults.legendVerticalAlign, legendFloating = obj.legendFloating || defaults.legendFloating, legendY = obj.legendY || defaults.legendY, categories = obj.categories || defaults.categories,

            // x axis
            xAxis = obj.xAxis || false, xTitle = obj.xTitle || "", labelX = obj.labelX || 0, timeType = obj.timeType || null,xCategories = obj.xCategories || null,
            // y axis
            yAxisEnabled = obj.yAxisEnabled || false, yTitle = obj.yTitle || "", tickInterval = obj.tickInterval || null, yMin = obj.min || 0, yMax = obj.max || null, labelY = obj.labelY || '',

            defaultYAxis = {
              min: yMin,
              max: yMax,
              tickInterval: tickInterval,
              title: {
                text: yTitle
              },
              labels: {
                enabled: yAxisEnabled,
                y: labelY,
                formatter: function() {
                  return this.value;

                }
              }
            },

            yAxis = obj.yAxis || defaultYAxis,
            // other values
            minRange = obj.minRange || null, plotBands = obj.plotBands || [],
            // colorSet
            colorSet = obj.colorSet || ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'],
            // Plot options
            pointStart = obj.pointStart || null, pointInterval = obj.pointInterval || null,
            // Pie
            innerSize = obj.innerSize || "90%",
            // Bar
            dataLabelAlign = obj.dataLabelAlign || "center", stacking = obj.stacking || false, allowPointSelect = obj.allowPointSelect || false, labelFontSize = obj.labelFontSize || "13px",
            // column
            dataLabel = obj.dataLabel || false, crop = obj.crop || false, rangeselector = obj.rangeselector || false,
            // DataSet
            dataSet = obj.dataSet || [], colorType = obj.type || undefined;

            if (obj.startOnTick !== undefined) {
              startOnTick = obj.startOnTick;
            } else {
              startOnTick = true;
            }

            if (obj.endOnTick !== undefined) {
              endOnTick = obj.endOnTick;
            } else {
              endOnTick = false;
            }

            /* Basic Chart Object */
            var chart = {
              title: {
                text: title,
                style: titleStyle
              },
              chart: {
                margin: margin,
                polar: isPolar,
                backgroundColor: bg,
                borderWidth: border,
                style: {
                  fontFamily: 'arial,helvetica,sans-serif'
                },
                events: {}
              },
              tooltip: {
                enabled: true,
                followPointer: true
              },
              legend: {
                enabled: legend,
                width: legendWidth,
                layout: legendLayout,
                align: legendAlign,
                verticalAlign: legendVerticalAlign,
                floating: legendFloating,
                maxHeight: 300,
                y: legendY
              },
              xAxis: {
                type: timeType,
                title: {
                  text: xTitle
                },
                labels: {
                  enabled: xAxis,
                  // align: xLabelAlign,
                  x: labelX
                },
                categories: xCategories,
                showFirstLabel: true,
                showLastLabel: true,
                startOnTick: startOnTick,
                endOnTick: endOnTick,
                minRange: minRange,
                plotBands: plotBands
              },
              yAxis: yAxis,
              colors: colorSet,
              plotOptions: {
                line: {
                  marker: {
                    lineWidth: 2,
                    enabled: false
                  },
                  pointStart: pointStart,
                  pointInterval: pointInterval,
                  dataLabels: {
                    enabled: false
                  }
                },
                pie: {
                  borderWidth: 0,
                  innerSize: innerSize,
                  showInLegend: legend,
                  dataLabels: {
                    enabled: false
                  },
                  tooltip: {
                    headerFormat: '<small>{point.key}</small><br/>',
                    pointFormat: 'No. of Reviews: <b>{point.y}</b><br/>',
                    valueDecimals: 0
                  }
                },
                column: {
                  dataLabels: {
                    enabled: dataLabel,
                    crop: crop
                  },
                  stacking: stacking,
                  tooltip: {
                    headerFormat: '<small>{point.key}</small><br/>',
                    pointFormat: obj.pointFormat || '{series.name}: <b>{point.y}</b><br/>'
                  },
                  colorByPoint: obj.colorByPoint || false,
                  placement: 'between'
                },
                bar: {
                  borderWidth: 0,
                  stacking: stacking,
                  allowPointSelect: allowPointSelect,
                  dataLabels: {
                    inside: true,
                    align: dataLabelAlign,
                    enabled: true,
                    rotation: 0,
                    color: '#f0f0f0',
                    style: {
                      fontSize: labelFontSize,
                      fontFamily: 'century gothic'
                    },
                    formatter: function() {
                      if (this.y <= 0) {
                        return "";
                      } else {
                        if (stacking) {
                          if (Math.round(this.percentage) > 2) {
                            return Math.round(this.percentage * 10) / 10 + '%';
                          } else {
                            return "";
                          }
                        } else {
                          return this.y.toFixed(0);
                        }
                      }
                    }
                  },
                  point: {
                    events: {
                      click: function() {
                        if (obj.clickFunction) {
                          obj.clickFunction(chart.name, this.series.name, this);
                        }
                      }
                    }
                  },
                  tooltip: {
                    headerFormat: obj.headerFormat || '<small>' + obj.type + '</small>: {series.name}<br/>',
                    pointFormat: obj.pointFormat || 'No. of Reviews: <b>{point.y}</b>',
                    valueDecimals: 0
                  }
                },
                scatter: {
                  marker: {
                    symbol: "circle",
                    states: {
                      hover: {
                        enabled: false
                      }
                    }
                  },
                  tooltip: {
                    xDateFormat: '%Y',
                    headerFormat: '<small>{point.key}</small><br/>',
                    pointFormat: obj.pointFormat || 'No of Reviews:<b>{point.options.marker.radius}</b><br/>CSR: <b>{point.y}</b>',
                    valueDecimals: 0
                  }
                }
              },
              rangeSelector: {
                enabled: rangeselector,
                selected: 2,
                inputStyle: {
                  color: '#0088CC',
                  fontWeight: 'bold'
                },
                inputDateFormat: '%Y-%m-%d',
                buttons: [{
                  type: 'month',
                  count: 6,
                  text: '6m'
                }, {
                  type: 'year',
                  count: 1,
                  text: '1y'
                }, {
                  type: 'all',
                  text: 'All'
                }],
                buttonTheme: {
                  'stroke-width': 0,
                  r: 8,
                  style: {
                    color: '#808080',
                    fontWeight: 'bold'
                  },
                  states: {
                    hover: {
                      fill: '#808080',
                      style: {
                        color: '#383838'
                      }
                    },
                    select: {
                      fill: '#383838',
                      style: {
                        color: '#fff'
                      }
                    }
                  }
                },
                labelStyle: {
                  r: 8,
                  color: 'silver',
                  fontWeight: 'bold'
                }
              },
              navigator: {
                series: {
                  color: 'white'
                }
              },
              scrollbar: {
                buttonBackgroundColor: '#fff',
                buttonArrowColor: '#fff'
              },
              name: colorType || null,
              series: [{
                data: []
              }]
            };

            /* Add Data and color */
            if (Array.isArray(dataSet)) {
              if (colorType) {
                var tempArr = [];
                for (i = 0; i < dataSet.length; i++) {
                  tempArr.push($rootScope.common.getColorValues(colorType, dataSet[i].name));
                }
                chart.colors = tempArr;
              }
              if (dataSet.length > 0) {
                if (dataSet[0].hasOwnProperty('data')) {
                  chart.series = dataSet || [];
                  if (colorType === "Source") {
                    chart.series = dataSet || [];
                  }
                  if (dataSet[0].type === "scatter") {
                    for (i in dataSet) {
                      for ( var key1 in dataSet[i].data) {
                        var color = $rootScope.common.getColorValues(colorType, dataSet[i].name);
                        dataSet[i].data[key1].marker.lineColor = color;
                        dataSet[i].data[key1].marker.lineWidth = '1px';
                        dataSet[i].data[key1].marker.fillColor = $rootScope.common.convertHex(color, 30);
                      }
                    }
                  }
                } else {
                  for (i = 0; i < dataSet.length; i++) {
                    var colorval = $rootScope.common.getColorValues(colorType, dataSet[i].value);
                    if (dataSet[i].marker) {
                      dataSet[i].marker.fillColor = colorval;
                      dataSet[i].r = dataSet[i].marker.radius;
                    }
                  }
                  chart.series[0].data = dataSet || [];
                }
              } else {
                chart.series[0].data = [];
              }
            }

            // Custom Changes
            if (isPolar) { // Polar
              tickInterval = 360 / categories.length || 30;
              chart.pane = {
                startAngle: 0,
                endAngle: 360
              };
              chart.xAxis = {
                tickInterval: tickInterval,
                min: 0,
                max: 360,
                labels: {
                  formatter: function() {
                    this.value = (this.value / tickInterval) + 1;
                    return this.value.toFixed(0);
                  }
                }
              };
              chart.yAxis = {
                labels: {
                  enabled: true
                }
              };
              chart.plotOptions.series = {
                pointStart: 0,
                pointInterval: tickInterval
              };
              chart.tooltip = {
                formatter: function() {

                  var catergoryIndex = this.series.data.indexOf(this.point) + 1;
                  return '<b style="color:' + this.series.color + '; font-weight:bold">' + '(' + catergoryIndex + ') ' + obj.categories[catergoryIndex - 1] + '</b> <br> ' + $rootScope.common
                      .wordwrap(this.series.name, 80, "<br/>", true) + ": <b>" + this.y + '</b>';
                },
                style: {
                  width: '250px;'
                },
                positioner: function() {
                  return {
                    x: 10,
                    y: 0
                  };
                }
              };
              chart.plotOptions.column = {
                pointPadding: 0.1,
                groupPadding: 0.1,
                borderWidth: 0,
                stacking: "normal"
              };
            } else if (isBar) { // Bar

              chart.tooltip.positioner = function(boxWidth, boxHeight, point) {
                if (this.chart.options.series[0].data.length <= 1) {

                  if (point.plotX < 160) {
                    return {
                      y: 4,
                      x: point.plotX + 70
                    };
                  }  
                  else {
                    return {
                      y: 4,
                      x: point.plotX - 180
                    };
                 }   
                } else {
                	if (point.plotX < 160) {
                        return {
                          y: point.plotY - 2,
                          x: point.plotX + 150
                        };
                      }  
                      else {
                        return {
                          y: point.plotY - 2,
                          x: point.plotX - 150
                        };
                     }
                }
              };
            } else { 
              if (timeType) {
                for (i in dataSet) {
                  if (dataSet[i].name && obj.type) {
                    dataSet[i].color = $rootScope.common.getColorValues(obj.type, dataSet[i].name);
                  }
                }
                chart.xAxis.minRange = minRange || 24 * 3600 * 1000 * 30;
              } else {
                if (!categories) {
                  categories = [];
                  for (i in dataSet) {
                    categories.push(dataSet[i].year);
                  }
                } else if (!obj.setCategoryValue) {
                  var arr = [];
                  for (var k = 0; k <= categories.length; k++) {
                    arr.push(k + 1);
                  }
                  categories = arr;
                }
                chart.xAxis.categories = categories;
              }
              if (yTitle === "Ratings") { 
                var minRadius = 1;
                var maxRadius = 18;

                var getMax = function(data) {
                  var max = 0;
                  for (var i = 0; i < data.length; i++) {
                    if (max < data[i].r) {
                      max = data[i].r;
                    }
                  }
                  return max;
                };
                for (i = 0; i < chart.series[0].data.length; i++) {
                  var series = chart.series[0];
                  var max = getMax(chart.series[0].data);
                  var radius = minRadius + (chart.series[0].data[i].r) * (maxRadius - minRadius) / max;
                  chart.series[0].data[i].marker.radius = radius;
                }

                chart.tooltip.formatter = function() {
                  var a = this.point.marker.radius;
                  var max = getMax(this.series.data);
                  a = (a - minRadius) * max / (maxRadius - minRadius);
                  return '<small>' + this.x + '</small><br/>No of Reviews: <b>' + Math.round(a) + '</b><br/>CSR: <b>' + this.y + '</b>';
                };
              }
            }

            return chart;
          }

          function showLedgendData(obj) {
            var maxValue = "";
            var layoutValue = "vertical";
            var selectedVal = obj.tabName;
            if (selectedVal === "HCAHPS") {
              layoutValue = 'horizontal';
            }

            var chart = {
              chart: {
                margin: [100, 100, 0, 100],
                borderWidth: 0
              },
              plotOptions: {
                series: {
                  events: {
                    legendItemClick: obj.legendItemClick
                  }
                }
              },
              legend: {
                labelFormatter: function() {
                  return $rootScope.common.wordwrap(this.name, 120, "<br/>", true);
                },
                verticalAlign: 'top',
                layout: layoutValue,
                itemStyle: {
                  paddingBottom: '5px'
                },
                maxHeight: maxValue,
                navigation: {
                  activeColor: '#3E576F',
                  animation: true,
                  arrowSize: 12,
                  inactiveColor: '#CCC',
                  style: {
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '12px'
                  }
                }
              },
              series: obj.dataSet
            };
            return chart;
          }

          /* Returns */
          return {
            showTimeSpan: showTimeSpan,
            basicChart: basicChart,
            setChartOption: setChartOption,
            showLedgendData: showLedgendData
          };
        }]);