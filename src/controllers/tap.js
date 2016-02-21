var firebase = require('firebase');
var Constants = require('../constants');


var tapsRef = Constants.rootFirebaseRef.child('taps');


exports.single = function(req, res) {
  console.log('Watching for single...');

  // TODO parse userid & potentially find cooresponding firebase key

  _sendFireRequest(req, res, 'single');
};

exports.double = function(req, res) {
  console.log('Watching for double...');

  // TODO parse userid & potentially find cooresponding firebase key

  _sendFireRequest(req, res, 'double');
};

exports.hold = function(req, res) {
  console.log('Watching for hold...');

  // TODO parse userid & potentially find cooresponding firebase key

  _sendFireRequest(req, res, 'hold');
};

exports.any = function(req, res) {
  console.log('Watching for any...');

  // TODO parse userid & potentially find cooresponding firebase key

  _sendFireRequest(req, res, 'any');
};

function _sendFireRequest(req, res, type) {
  _fireRequest({
    type: type,
    user: 'test user'
  }, function(err) {
    if (err) {
      res.sendStatus(500);
    }

    res.sendStatus(200);
  });
}

function _fireRequest(payload, callback) {
  console.log('Firing ' + payload.type);

  tapsRef.child(payload.type).push({
    user: payload.user
  }, callback);
}
