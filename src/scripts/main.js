console.log('js loaded');

var myFirebaseRef = new Firebase("https://taptap-app.firebaseio.com/users/test-user");
console.log('js loaded 2');


$(document).on("click", ".app", function(event) {
	var app = event.target.id;
  var isSet;
  myFirebaseRef.once("value", function(snap) {
    isSet = snap.val()[app];
  });
  var message = {};
  message[app] = !isSet; 
  myFirebaseRef.update(message);
});
