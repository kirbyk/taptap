var firebase = require('firebase');
var Constants = require('../constants');


var firebaseRef = Constants.rootFirebaseRef;
currentApp = null;


exports.single = function(req, res) {
  console.log('Watching for single...');

  _sendFireRequest(req, res, {
    type: 'single',
    user: 'test-user'
  });
};

exports.double = function(req, res) {
  console.log('Watching for double...');

  _sendFireRequest(req, res, {
    type: 'double',
    user: 'test-user'
  });
};

exports.hold = function(req, res) {
  console.log('Watching for hold...');

  _sendFireRequest(req, res, {
    type: 'hold',
    user: 'test-user'
  });
};

exports.any = function(req, res) {
  console.log('Watching for any...');

  _sendFireRequest(req, res, {
    type: 'any',
    user: 'test-user'
  });
};

function _sendFireRequest(req, res, payload) {
  _fireRequest({
    type: payload.type,
    user: payload.user
  }, function(err) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }

    console.log('success');
    res.sendStatus(200);
  });
}


function _fireRequest(payload, callback) {
  console.log('Firing ' + payload.type);

  // var path = 'users/' + 'test-user' + '/taps/' + payload.type;
  var path = 'users/' + 'test-user' + '/taps';
  
  firebaseRef.child(path).push({
    app: currentApp
  }, callback);
}

firebaseRef.child('users/test-user/currentApp').on('value', function(fireCurrentApp) { // TODO: change this to correct endpoint
  currentApp = fireCurrentApp.val();
});
