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
    console.log(req.body.title)
    res.send({ 'result': 'success'});
});

module.exports = router;
