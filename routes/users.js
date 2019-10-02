var express = require('express');
var session = require('express-session');
var router = express.Router();

router.use(session({
  secret: 'test',
  resave: false,
  saveUninitialized: true
}));

router.post('/', function(req, res, next){
  var time = new Date(req.body.mtime);
  console.log(req.body.mtime)
  req.session.time = time;
  res.send({'result': 'success', 'mtime': time});
});

/* GET users listing. */
router.get('/', function (req, res, next) {
  if(req.session.time == undefined){
    req.session.time = new Date();
    console.log("new")
  }
  console.log("user.js")
  console.log(req.session.time);

  res.locals.time = req.session.time;

  res.render('test',
    {
      title: 'programmers 과제 테스트 템플릿 - Node.js'
    });
});

module.exports = router;
