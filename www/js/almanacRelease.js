//This stops web browsers from caching ajax calls!
$.ajaxSetup({
  cache: false
});

$(document).ready(function() {

  var CGIURL = "http://astro.ukho.gov.uk/pscript/";

  //Unsuccessful AJAX call
  var handleError = function(jqXHR, status, error) {
    //var errorTextHTMLString = jqXHR.responseText;
    var errorStatusText = jqXHR.statusText;
    var errorCode = jqXHR.status;
    //var errorText = errorTextHTMLString.match("<title>" + "(.*?)" + "</title>");
    //alert("Error: " + errorText[1] + "- E.g. Are you connected to the internet?");
    if (jqXHR.status == 0) {
      //alert(jqXHR.statusText)
      alert("Error: Request not intialised - Are you connected to the internet?");
    } else if (jqXHR.status == 404) {
      alert("Error: " + errorCode + " " + errorStatusText +
                      " - There is an issue running the script on the server." +
                      " Please contact the developer.");
    } else {
      alert("Error: " + errorCode + "are you connected to the internet?");
    }

  };

  function getPosition() {

    var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
    }

    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {

      $("#deviceLocLat").val(position.coords.latitude);
      $("#deviceLocLon").val(position.coords.longitude);
      // $("#deviceLocLat").val(position.coords.altitude);
      // $("#deviceLocLon").val(position.coords.altitudeAccuracy);
      // alert('Latitude: '          + position.coords.latitude          + '\n' +
      //    'Longitude: '         + position.coords.longitude         + '\n' +
      //    'Altitude: '          + position.coords.altitude          + '\n' +
      //    'Accuracy: '          + position.coords.accuracy          + '\n' +
      //    'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
      //    'Heading: '           + position.coords.heading           + '\n' +
      //    'Speed: '             + position.coords.speed             + '\n' +
      //    'Timestamp: '         + position.timestamp                + '\n');
    };

    function onError(error) {
      alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
  } //end function getPosition

  function getCurrentDate() {

    // var today = new Date().toISOString();
    var today = new Date();
    // alert(typeof(today));
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }
    // today = dd+'/'+mm+'/'+yyyy;
    today = dd + '/' + mm + '/' + yyyy;
    // document.write(today);
    // console.log(tot);
    // alert(today);
    // $('#dateIn').datepicker("setDate", "24-12-12" );
    // $("#dateIn").datepicker
    $('#dateIn').val(today);
  }

  $("#getLocation").click(function() {

    getPosition();

  }); //end click function - getLocation

  function objectID() {
    return {
      "Sun": "#sun-data",
      "Mercury": "#mercury-data",
      "Venus": "#venus-data",
      "Mars": "#mars-data",
      "Jupiter": "#jupiter-data",
      "Saturn": "#saturn-data",
      "Uranus": "#uranus-data",
      "Neptune": "#neptune-data",
      "Pluto": "#pluto-data",
      "Moon": "#moon-data"
    };
  }

  var handleSuccessAlmanac = function(data, status, jqXHR) {
    alert(jqXHR.readyState);
    // $("#almanacOutput").html(data);
    // alert(data[10].sun_rise);
    // alert(data[10].sun_set);
    // If data is returned display accordion for output
    // $("#almanacOutput").html(JSON.parse(data));
    // $("#almanacOutput").html(JSON.parse(data));
    var imag = new Image();
    // imag.src = data;
    // imag.width = "2500px";
    // imag.height = "2500px";
    // imag.src = "data:image/jpeg;base64," + data;
    // imag.src = "/pscript/jupiter_120.jpg";
    // $("#almanacOutput").html(imag);
    // $("#almanacOutput").html('<img src="data:image/jpeg;base64,' + data + '" />');
    $("#almanac-data").css("display", "inline");
    // alert(typeof(data));
    // var obj = JSON.parse(data);
    // alert(obj);

    var standardtime = "Standard Time = UT " + $("#tzIn").val().substring(0, 1) +
      " " + $("#tzIn").val().substring(1, 5);
    $("#sun-data-standard-time").html(standardtime);

    var table = "<table class=\'output\'>";

    table += "<tr id=\'rise-set-twt-heading\'>";
    table += "<td>Phenomena</td>";
    table += "<td id=\"almanacValues\">UT</td>";
    table += "</tr>";

    table += "<tr>";
    table += "<td>Start Astronomical Twilight</td>";
    table += "<td id=\"almanacValues\">" + data[10].ast_twt_start + "</td>";
    table += "</tr>";

    table += "<tr>";
    table += "<td>Start Nautical Twilight</td>";
    table += "<td id=\"almanacValues\">" + data[10].naut_twt_start + "</td>";
    table += "</tr>";

    table += "<tr>";
    table += "<td>Start Civil Twilight</td>";
    table += "<td id=\"almanacValues\">" + data[10].civ_twt_start + "</td>";
    table += "</tr>";

    table += "<tr>";
    table += "<td class=\"riseset\">Sunrise</td>";
    table += "<td class=\"riseset\" id=\"almanacValues\">" + data[10].sun_rise + "</td>";
    table += "</tr>";

    table += "<tr>";
    table += "<td class=\"riseset\">Sunset</td>";
    table += "<td class=\"riseset\" id=\"almanacValues\">" + data[10].sun_set + "</td>";
    table += "</tr>";

    table += "<tr>";
    table += "<td>End Civil Twilight</td>";
    table += "<td id=\"almanacValues\">" + data[10].civ_twt_end + "</td>";
    table += "</tr>";

    table += "<tr>";
    table += "<td>End Nautical Twilight</td>";
    table += "<td id=\"almanacValues\">" + data[10].naut_twt_end + "</td>";
    table += "</tr>";

    table += "<tr>";
    table += "<td>End Astronomical Twilight</td>";
    table += "<td id=\"almanacValues\">" + data[10].ast_twt_end + "</td>";
    table += "</tr>";
    // table += "<tr>";
    // table += "<td>Time zone</td>";
    // table += "<td>" + data[10].timezone + "</td>";
    // table += "</tr>";

    table += "</table>"

    $("#sun-data-riseset-twt").html(table);
    // For each object
    var objID = objectID();

    var hour = "h";
    var minute = "m";
    var second = "s";
    var degSym = "&deg;"
    var minSym = "\'";
    var secSym = "\"";
    var percentSym = "%";
    var au = "a.u.";
    var km = "km";

    var i = 0;
    $.each(objID, function(index, value) {

      var table = "<table class=\'output\'>";

      table += "<tr>";
      table += "<td>Right ascension</td>";
      // table += "<td>" + data[i].visibility + "</td>";
      table += "<td id=\"almanacValues\">" + data[i].ra_deg + hour.sup() + " " +
        data[i].ra_min + minute.sup() + " " +
        data[i].ra_sec + second.sup() + "</td>";
      table += "</tr>";

      table += "<tr>";
      table += "<td>Declination</td>";
      table += "<td id=\"almanacValues\">" + data[i].dec_deg + degSym.sup() + " " +
        data[i].dec_min + minSym.sup() + " " +
        data[i].dec_sec + secSym.sup() + "</td>";
      table += "</tr>";

      table += "<tr>";
      table += "<td>Azimuth</td>";
      table += "<td id=\"almanacValues\">" + data[i].az_deg + degSym.sup() + " " +
        +data[i].az_min + minSym.sup() + "</td>";
      table += "</tr>";

      table += "<tr>";
      table += "<td>Altitude</td>";
      table += "<td id=\"almanacValues\">" + data[i].alt_deg + degSym.sup() + " " +
        +data[i].alt_min + minSym.sup() + "</td>";
      table += "</tr>";

      table += "<tr>";
      table += "<td>Constellation</td>";
      table += "<td id=\"almanacValues\">" + data[i].constellation + "</td>";
      table += "</tr>";

      table += "<tr>";
      table += "<td>Distance</td>";
      if (i == 9) {
        table += "<td id=\"almanacValues\">" + data[i].distance + " " + km + "</td>";
      } else {
        table += "<td id=\"almanacValues\">" + data[i].distance + " " + au + "</td>";
      }
      table += "</tr>";

      table += "<tr>";
      table += "<td>Semi-diameter</td>";
      table += "<td id=\"almanacValues\">" + data[i].semi_diameter + secSym.sup() + "</td>";
      table += "</tr>";

      table += "<tr>";
      if (i == 9) {
        table += "<td>Illumination</td>";
        table += "<td id=\"almanacValues\">" + data[i].magnitude + percentSym + "</td>";
      } else {
        table += "<td>Magnitude</td>";
        table += "<td id=\"almanacValues\">" + data[i].magnitude + "</td>";
      }
      table += "</tr>";

      if (i != 0) {
        table += "<tr>";
        table += "<td>Elongation</td>";
        table += "<td id=\"almanacValues\">" + data[i].elongation_deg + degSym.sup() + " " +
          data[i].elongation_sign + "</td>";
        table += "</tr>";
      }

      table += "<tr>";
      table += "<td>Visibility</td>";
      table += "<td id=\"almanacValues\">" + data[i].visibility + "</td>";
      table += "</tr>";

      table += "</table>"

      $(value).html(table);
      i = i + 1;

    });

  };


  $("#almanac").click(function() {

    var dateIn = $("#dateIn").val().toString();
    var timeIn = $("#timeIn").val();
    var timezoneIn = $("#tzIn").val();
    // alert(timezoneIn);
    var latIn = $("#deviceLocLat").val();
    var lonIn = $("#deviceLocLon").val();

    if (dateIn == "" || timeIn == "" || timezoneIn == "" || latIn == "" || lonIn == "") {
      alert("One or more search field is blank. Please enter values.");
    } else {
      var searchFor = "date=" + dateIn +
        "&" +
        "time=" + timeIn +
        "&" +
        "timezone=" + timezoneIn +
        "&" +
        "lat=" + latIn +
        "&" +
        "lon=" + lonIn;

      //Ajax call to python script
      $.ajax({
        type: 'GET',
        url: CGIURL + 'getAlmanacDataRelease.py',
        async: false,
        data: searchFor,
        success: handleSuccessAlmanac,
        error: handleError,
        dataType: 'json'
      });
    }
  }); //end click function - almanac

  var onSuccessAlert = function(acceleration) {
    alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
  };
  // onError Callback receives a PositionError object
  //
  function onErrorAlert(error) {
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  }

  $("#alertPositionAttr").click(function() {

    var optionsPosition = {
      enableHighAccuracy: true,
      maximumAge: 0
    }

    var optionsAcc = { frequency: 3000 };  // Update every 3 seconds

    // navigator.geolocation.getCurrentPosition(onSuccessAlert, onErrorAlert, optionsPosition);
    var watchID = navigator.accelerometer.watchAcceleration(onSuccessAlert, onErrorAlert,optionsAcc);

  }); //end click function - getLocation

}); //close document ready
