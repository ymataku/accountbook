const express = require('express');
const router = express.Router();
const db = require('../models/index');
const {Op} = require('sequelize');

router.get('/login',(req,res,next)=>{
    var data = {
        title:'login page',
        
    }
    res.render('login',data);
})

router.post('/login',(req,res,next)=>{
    db.user.findOne({
        where:{
            name:req.body.name,
            pass:req.body.pass
        }
    }).then(us=>{
        if(us !=null){
            req.session.login = us;
            res.redirect('/');
        }else{
            var data = {
                title:'Try again'
            }
            res.render('login',data);
        }
    })
})

router.get('/create',(req,res,next)=>{
    var data = {
        title: 'acount create page',
    }
    res.render('acount',data);
})

router.post('/create',(req,res,next)=>{
    db.user.create({
        name:req.body.name,
        pass:req.body.pass
    })
    res.redirect('/user/login');
})


module.exports = router;