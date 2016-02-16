var filters = angular.module('filters', []);

filters.filter('join', function() {
  return function(name) {
    if (name) {
      name = name.replace(/[ ]/g, "").toLowerCase();
      return name;
    }
  };
}).filter('string', function() {
  return function(name) {
    if (name) {
      if (typeof name === "string") {
        return name.toLowerCase();
      } else {
        return "rating";
      }
    }
  };
}).filter('lowerFirstLetter', function() {
  return function(name) {
    if (name) {
      name = name.charAt(0).toLowerCase() + name.slice(1);
      return name.replace(" ", "");
    }
  };
}).filter('capFirstLetter', function() {
  return function(name) {
    if (name) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
      return name;
    }
  };
}).filter('addSpace', function() {
  return function(name) {
    if (name) {
      name = name.replace(/([A-Z])/g, ' $1');
      return name;
    }
  };
}).filter('colorValue', function() {
  return function(obj) {
    var name = self.colorSetValues[obj.type][obj.name.toLowerCase().replace(/[ .']/g, '') + "Color"];
    return name;
  };
}).filter('sortReview', function() {
  return function(list) {
    var arr = [];
    for ( var o in list) {
      arr.push(list[o]);
      arr.sort(compareReview);
    }
    return arr;
  };
}).filter('startFrom', function() {
  return function(input, start) {

    start = +start;

    var count = 0, obj = {};
    for ( var i in input) {
      if (count !== start) {
        count++;
      } else {
        obj[i] = input[i];
      }
    }
    return obj;
  };
}).filter('limitTo', function() {
  return function(input, limit) {
    // parse to int
    limit = +limit;

    var count = 0, obj = {};
    for ( var i in input) {
      if (count < limit) {
        obj[i] = input[i];
        count++;
      }
    }
    return obj;
  };
}).filter('hexToRgba', function() {
  return function(hex, opacity) {

    if (hex[0] === "#") {
      hex = hex.substr(1);
    }
    if (hex.length === 3) {
      var temp = hex;
      hex = '';
      temp = /^([a-f0-9])([a-f0-9])([a-f0-9])$/i.exec(temp).slice(1);
      for (var i = 0; i < 3; i++) {
        hex += temp[i] + temp[i];
      }
    }
    var triplets = /^([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/i.exec(hex).slice(1);
    var rgb = {
      red: parseInt(triplets[0], 16),
      green: parseInt(triplets[1], 16),
      blue: parseInt(triplets[2], 16)
    };

    if (opacity) {
      return 'rgba(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ',' + opacity + ')';
    } else {
      return 'rgba(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ', 1)';
    }
  };
}).filter('utcdate', ['$filter', function($filter) {
  var date = $filter("date");
  return function(d, f, utc) {
    if (!d) {
      return; 
    }
    if (!angular.isDefined(utc)) {
      utc = true;
    } else {
      utc = false;
    }
    if (utc) {
      d = d + new Date(d).getTimezoneOffset() * 60 * 1000;
    }
    if (!f) {
      f = "MMM-dd-yyyy";
    }
    return date(d, f);
  };
}]);