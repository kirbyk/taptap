console.log("Taptap main.js loaded.");

Firebase.INTERNAL.forceWebSockets();

var rootFirebaseRef = new Firebase('https://taptap-app.firebaseio.com');
var deviceId = getDeviceId(); // might be broken because of order
var currentPlugin = null;

var storeDeviceId = function(deviceId) {
  localStorage.setItem('taptap-deviceId', deviceId);
};

var getDeviceId = function() {
  return localStorage.getItem('taptap-deviceId');
};

var getCurrentSite = function() {
  var a = domainatrix.parse(window.location.host);
  return a.domain + '.' + a.publicSuffix;
};

var execFireAction = function(cssPath, action){
  if (action === 'click'){
    $(cssPath).click();
  } else if (action === 'raw_js'){
    window.eval(cssPath);
  }
}

var onCorrectSite = function(target) {
  if (target == '*') {
    return true;
  } else if(target == getCurrentSite()) {
    return true;
  } else {
    return false;
  }
}

var commandListener = function() {
  console.log('Current plugin: ' + currentPlugin);

  var first = true;

  rootFirebaseRef.child('plugins').child(currentPlugin).child('commands').limitToLast(1).on("child_added", function(snapshot) { // TODO: change this to correct endpoint
    if (!first) {
      var lastCommand = snapshot.val();

      rootFirebaseRef.child('plugins').child(currentPlugin).child('map').once('value', function(snapshot2) {
        var map = snapshot2.val();
        var site = map['site'];
        var cssPath = map['buttons'][lastCommand]['cssPath'];
        var action = map['buttons'][lastCommand]['action'];

        if (onCorrectSite(site)) {
          console.log('Executing action: ' + action + ', path: ' + cssPath);
          execFireAction(cssPath, action);
        }
      });
    } else {
      first = false;
    }
  });
};

var getCurrentPlugin = function() {
  rootFirebaseRef.child('plugin-map').once('value', function(snapshot) { // TODO: change this to correct endpoint
    var plugins = snapshot.val();
    var keys = Object.keys(plugins);

    for (var i = 0; i < keys.length; i++) {
      if (plugins[keys[i]] === getCurrentSite()) {
        currentPlugin = keys[i];
        commandListener();
        break;
      }
    }
  });
};

var loadContentScript = function() {
  getCurrentPlugin();
};

// wait until we hear from the popup with the deviceId.
(function wait() {
  if(deviceId != null){
    loadContentScript();
  } else {
    setTimeout(wait, 500);
  }
})();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request['action'] == 'redirectToMarketplace') {
    var win = window.open('http://www.taptap.tech', '_blank');
    win.focus();
  } else if(Object.keys(request)[0] == 'deviceId') {
    deviceId = request['deviceId'];
    storeDeviceId(deviceId);
  }
});
