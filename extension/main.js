console.log('Taptap main.js loaded.');

Firebase.INTERNAL.forceWebSockets();

var rootFirebaseRef = new Firebase('https://taptap-app.firebaseio.com');
var deviceId = getDeviceId(); // might be broken because of order
var currentApp = null;

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

var execClick = function(cssPath) {
  $(cssPath).click();
}

var onCorrectSite = function(target) {
  return target === '*' || target === getCurrentSite();
}

var commandListener = function() {
  console.log('Current app: ' + currentApp);

  var first = true;

  rootFirebaseRef.child('test-users/' + deviceId + '/taps').limitToLast(1).on('child_added', function(snapshot) { // TODO: change this to correct endpoint
    if (!first) {
      var lastCommand = snapshot.val();

      rootFirebaseRef.child('test-apps/' + currentApp).once('value', function(fireAppData) {
        console.log('tap');

        var appData = fireAppData.val();
        var site = appData['site'];
        var cssPath = appData['cssPath'];

        if (onCorrectSite(site)) {
          console.log('Executing click on: ' + cssPath);
          execClick(cssPath);
        }
      });
    } else {
      first = false;
    }
  });
};

var getCurrentApp = function() {
  rootFirebaseRef.child('test-users/' + deviceId + '/taps').limitToLast(1).on('child_added', function(snapshot) {
  };

  rootFirebaseRef.child('test-app-map').once('value', function(snapshot) { // TODO: change this to correct endpoint
    console.log('app got');

    var apps = snapshot.val();
    var keys = Object.keys(apps);

    for (var i = 0; i < keys.length; i++) {
      if (apps[keys[i]] === getCurrentSite()) {
        currentApp = keys[i];
        commandListener();
        break;
      }
    }
  });
};

var loadContentScript = function() {
  getCurrentApp();
};

// wait until we hear from the popup with the deviceId.
(function wait() {
  if (deviceId != null) {
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
