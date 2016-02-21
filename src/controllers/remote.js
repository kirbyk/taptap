var firebase = require('firebase');
var Constants = require('../constants');


var tapsRef = Constants.rootFirebaseRef.child('taps');


exports.single = function(req, res) {
  console.log('single tapped on web...');

  // TODO parse userid & potentially find cooresponding firebase key

 // _sendFireRequest(req, res, 'single');
	res.sendStatus(200);
};

exports.double = function(req, res) {
  console.log('double tapped on web...');

  // TODO parse userid & potentially find cooresponding firebase key

  //_sendFireRequest(req, res, 'double');
	res.sendStatus(200);
};

exports.hold = function(req, res) {
  console.log('hold on web...');

  // TODO parse userid & potentially find cooresponding firebase key

  //_sendFireRequest(req, res, 'hold');
	res.sendStatus(200);
};

exports.any = function(req, res) {
  console.log('any press on web...');

  // TODO parse userid & potentially find cooresponding firebase key

  //_sendFireRequest(req, res, 'any');
	res.sendStatus(200);
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
