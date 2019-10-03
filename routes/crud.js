var express = require('express');
var session = require('express-session');
var router = express.Router();
var {User} = require('../models');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true
}));

router.post('/create', function (req, res) {
    User.create({
        title: req.body.title,
        description: req.body.description,
        sTime: Number(req.body.sTime),
        eTime: Number(req.body.eTime),
        cycle: Number(req.body.cycle),
    }).then(function(result){
        console.log(result);
        res.send({ 'result': 'success'});
    }).catch(function(err){
        console.log(err);
        res.send({ 'result': 'fali'});
    });
    
});

router.post('/read', function (req, res) {
    var time = new Date(req.body.mtime);
    var start = new Date(req.body.start);
    var end = new Date(req.body.end);
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);
    end.setMilliseconds(999);
  
    console.log(2)
    console.log(start)
    console.log(end)
    console.log(2)
  
    req.session.time = time;
    
    User.findAll({
      where: {
        [Op.or]:[
          {
            [Op.and]: [
              {
                sTime: {
                  [Op.lt]: start.getTime()
                }
              },
              {
                eTime: {
                  [Op.gt]: end.getTime()
                }
              }
            ]
          },
          {
            sTime:{
              [Op.gte]: start.getTime(),
              [Op.lte]: end.getTime(),
            }
          },
          {
            eTime:{
              [Op.gte]: start.getTime(),
              [Op.lte]: end.getTime(),
            }
          }
        ]
      }
    }).then(function (result) {
      console.log(result)
  
      res.send({ 'result': 'success', 'data': result });
    }).catch(function(err){
      res.send({ 'result': 'fail', 'mtime': err });
    });
});

router.post('/update', function (req, res) {
    User.update({
        title: req.body.title,
        description: req.body.description,
        sTime: Number(req.body.sTime),
        eTime: Number(req.body.eTime),
        cycle: Number(req.body.cycle),
    },{
        where:{
            id:{
                [Op.eq]: req.body.id,
            }
        }
    }).then(function(result){
        console.log(result);
        res.send({ 'result': 'success'});
    }).catch(function(err){
        console.log(err);
        res.send({ 'result': 'fali'});
    });
    
});

router.post('/delete', function(req, res){
    User.destroy({
        where:{
            id: req.body.id
        }
    }).then(function(result){
        console.log(result)
        res.send({'result': 'success'});
    }).catch(function(err){
        console.log(err)
        res.send({'result': 'fail'});
    });
});

module.exports = router;
