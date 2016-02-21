Tap Tap
=======

Control your browser with the push of a button!

Installation
------------

```bash
$ cp env.sample .env          # and modify if necessary
$ npm install -g bower gulp
$ npm install
$ bower install
```

Deployment
----------

#### Development

```bash
$ npm run start:dev
$ browser http://localhost:8080
```

#### Production

```bash
$ npm run deploy
$ browser https://taptap-app.herokuapp.com/
```
