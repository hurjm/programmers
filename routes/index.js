var express = require('express');
var session = require('express-session');
var router = express.Router();

router.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true
}));

router.get('/', function (req, res) {
  if (req.session.time == undefined) {
    var temp = new Date();
    temp.setHours(0);
    temp.setMinutes(0);
    temp.setSeconds(0);
    temp.setMilliseconds(0);
    req.session.time = temp;
  }

  res.locals.time = req.session.time;

  res.render('index',
    {
      title: 'programmers 과제 테스트 템플릿 - Node.js'
    });
});

module.exports = router;