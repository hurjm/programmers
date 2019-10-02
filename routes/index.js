var express = require('express');
var session = require('express-session');
var router = express.Router();
// var {User} = require('../models');

router.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true
}));

router.post('/', function (req, res) {
  var time = new Date(req.body.mtime);
  console.log(req.body.mtime)
  req.session.time = time;
  res.send({ 'result': 'success', 'mtime': time });
});

router.get('/', function (req, res) {
  if (req.session.time == undefined) {
    req.session.time = new Date();
    console.log("new")
  }
  console.log("user.js")
  console.log(req.session.time);

  res.locals.time = req.session.time;

  res.render('index',
    {
      title: 'programmers 과제 테스트 템플릿 - Node.js'
    });
});

module.exports = router;
