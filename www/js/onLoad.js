$(document).ready(function() {

  function getPosition() {

    var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
    }

    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {

      $("#deviceLocLat").val(position.coords.latitude);
      $("#deviceLocLon").val(position.coords.longitude);

    };

    function onError(error) {
      // alert(!!window.cordova);
      // Only alert if app as loaded
      if (!!window.cordova) {alert('code: ' + error.code + '\n' +
                                   'message: ' + error.message + '\n');}
    }
  } //end function getPosition

  // On load get device position
  getPosition();

}); //close document ready
