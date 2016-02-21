var firebase = require('firebase');
var Constants = require('../constants');


var tapsRef = Constants.rootFirebaseRef;
var currentApp = null;


exports.single = function(req, res) {
  console.log('Watching for single...');

  _sendFireRequest(req, res, {
    type: 'single',
    user: 'test-user',
    app: currentApp
  });
};

exports.double = function(req, res) {
  console.log('Watching for double...');

  _sendFireRequest(req, res, {
    type: 'double',
    user: 'test-user',
    app: currentApp
  });
};

exports.hold = function(req, res) {
  console.log('Watching for hold...');

  _sendFireRequest(req, res, {
    type: 'hold',
    user: 'test-user',
    app: currentApp
  });
};

exports.any = function(req, res) {
  console.log('Watching for any...');

  _sendFireRequest(req, res, {
    type: 'any',
    user: 'test-user',
    app: currentApp
  });
};

function _sendFireRequest(req, res, payload) {
  _fireRequest({
    type: payload.type,
    user: payload.user,
    app: payload.app
  }, function(err) {
    if (err) {
      res.sendStatus(500);
    }

    res.sendStatus(200);
  });
}


function _fireRequest(payload, callback) {
  console.log('Firing ' + payload.type);

  // var path = 'test-users/' + payload.user + '/taps/' + payload.type;
  var path = 'test-users/' + 'test-user' + '/taps/' + payload.type;
  
  tapsRef.child(path).push({

  }, callback);
}

tapsRef.child('test-users/test-user/currentApp').on('value', function(fireCurrentApp) { // TODO: change this to correct endpoint
  currentApp = fireCurrentApp.val();
});
