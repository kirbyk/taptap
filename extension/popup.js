console.log('Taptap popup.js loaded.');

Firebase.INTERNAL.forceWebSockets();

var rootFirebaseRef = new Firebase('https://taptap-app.firebaseio.com');

var storeDeviceId = function(deviceId) {
  localStorage.setItem('taptap-deviceId', deviceId);
};

var getDeviceId = function() {
  return localStorage.getItem('taptap-deviceId');
};

$(function() {
  $('#deviceId').text(getDeviceId()); // might be val

  $('#add-button').on('click', function() {
    window.close(); // might be unecessary

    var deviceId = $('#deviceId').text(); // might be val
    storeDeviceId(deviceId);

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {'uniqueId': uniqueId});
    });
  });

  $('#marketplace-button').on('click', function() {
    window.close(); // might be unecessary
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'redirectToMarketplace'});
    });
  });
});

if (getDeviceId()) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {'uniqueId': uniqueId});
  });
}
