console.log('Taptap main.js loaded.');

Firebase.INTERNAL.forceWebSockets();

var rootFirebaseRef = new Firebase('https://taptap-app.firebaseio.com');
// var deviceId = getDeviceId(); // might be broken because of order
var deviceId = 'test-user';
// var currentApp = null;


var apps = null;

rootFirebaseRef.child('apps').on('value', function(snapshot) {
  apps = snapshot.val();
  console.log(apps);
});



// var storeDeviceId = function(deviceId) {
//   localStorage.setItem('taptap-deviceId', deviceId);
// };
//
// var getDeviceId = function() {
//   return localStorage.getItem('taptap-deviceId');
// };

// var getCurrentSite = function() {
//   var a = domainatrix.parse(window.location.host);
//   return a.domain + '.' + a.publicSuffix;
// };

var execClick = function(cssPath) {
  console.log('clicking');
  console.log($(cssPath));
  console.log($(cssPath).click());
}

// var onCorrectSite = function(target) {
//   return target === '*' || target === getCurrentSite();
// }

var commandListener = function() {
  console.log('listener');
  var first = true;

  rootFirebaseRef.child('users/test-user/taps').limitToLast(1).on('child_added', function(snapshot) {
    console.log('listening');

    if (!first) {
      var tap = snapshot.val().app;
      var cssPath = apps[tap].cssPath;
    //   var site = appData['site'];
    //   var cssPath = appData['cssPath'];
    //
    // // if (onCorrectSite(site)) {
    //   console.log('Executing click on: ' + cssPath);
      execClick(cssPath);
    // // }
    } else {
      first = false;
    }
  });
};

commandListener();

// var getCurrentApp = function() {
//   rootFirebaseRef.child('test-users/' + deviceId + '/taps').limitToLast(1).on('child_added', function(snapshot) {
//   };
//
//   rootFirebaseRef.child('test-app-map').once('value', function(snapshot) { // TODO: change this to correct endpoint
//     console.log('app got');
//
//     var apps = snapshot.val();
//     var keys = Object.keys(apps);
//
//     for (var i = 0; i < keys.length; i++) {
//       if (apps[keys[i]] === getCurrentSite()) {
//         currentApp = keys[i];
//         commandListener();
//         break;
//       }
//     }
//   });
// };

// var loadContentScript = function() {
  // getCurrentApp();
// };

// // wait until we hear from the popup with the deviceId.
// (function wait() {
//   if (deviceId != null) {
//     loadContentScript();
//   } else {
//     setTimeout(wait, 500);
//   }
// })();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request['action'] == 'redirectToMarketplace') {
    var win = window.open('http://www.taptap.tech', '_blank');
    win.focus();
  // } else if(Object.keys(request)[0] == 'deviceId') {
  //   deviceId = request['deviceId'];
  //   storeDeviceId(deviceId);
  }
});
