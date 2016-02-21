require('dotenv').config({
  path: '../.env',
  silent: true
});
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');


var app = express();
app.set('port', (process.env.PORT || 8080));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', 'views')
app.engine('.hbs', exphbs({
  layoutsDir: 'views/layouts/',
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs');


app.use('/assets',  express.static('./assets'));


var homeController = require('./controllers/home');
var tapController = require('./controllers/tap');


app.get('/', homeController.getRoot);

app.post('/tap/single', tapController.single);
app.post('/tap/double', tapController.double);
app.post('/tap/hold', tapController.hold);
app.post('/tap/any', tapController.any);

// remote
var remoteController = require('./controllers/remote');;
app.get('/remote/single', remoteController.single);
app.get('/remote/double', remoteController.double);
app.get('/remote/hold', remoteController.hold);
app.get('/remote/any', remoteController.any);

app.get('*', function(req, res) {
  res.sendStatus(404);
});


var server = app.listen(app.get('port'), function () {
  console.log('the server is listening on port %s', app.get('port'));
});
