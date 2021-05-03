const express = require('express');
const router = express.Router();
const db = require('../models/index');
const {Op} = require('sequelize');
const pnum = 10;

function check(req,res){
    if(req.session.login == null){
        res.redirect('/user/login');
        return true;
    }else{
        return false;
    }
}

router.get('/',(req,res,next)=>{
    res.redirect('/graph/home');
})
router.get('/add',(req,res,next)=>{
    res.redirect('add/1');
})
router.get('/add/:num',(req,res,next)=>{
    
    var num = req.params.num * 1;
    var data = {
        title:'graph source page',
        num : num
    }
    res.render('graph',data)
})
router.post('/add/:num',(req,res,next)=>{
    var num = req.params.num * 1;
   
    
    
    for(var i = 1;i <= (Object.keys(req.body).length - 3);i++){
        if(req.body[i][0] == ''){
            var data = {
                title:"plese sigh up all colum",
                num:num,
            }
            res.render('graph',data);
            res.redirect('/add/'+num);
        }
    }
   
    for(var i = 1;i <=num;i++){
        db.date.create({
            name:req.session.login.name,
            label:req.body[i][0],
            amount:req.body[i][1],
            year:req.body.year,
            month:req.body.month,
            day:req.body.day
        })
        
    }
    res.redirect('/graph/home');
    }
)
router.get('/graph/create/:year/:month/:day',(req,res,next)=>{
    var day = req.params.day * 1;
    var month = req.params.month * 1;
    var year = req.params.year * 1;
    
    db.date.findAll({
        where:{
            name:req.session.login.name,
            year:year,
            month:month,
            day:day
    }
    }).then(dat=>{
        
        var sum = 0;
        var sy = [];
        var la = [];
        for(var i in dat){
            sum += dat[i].amount;
            
        }
        
        
        for(var i in dat){
           
            sy.push(dat[i].amount/sum*100);
            la.push(dat[i].label);
            
           
        }
        
       
         
        
        
        var data = {
            title:'Drow Graph Page',
            content:dat,
            label:la,
            data:sy,
            sum:sum
           
        }
      
        
       
        res.render('draw',data);
    })
})
router.get('/graph/home',(req,res,next)=>{
    if(check(req,res)){
        return;
    }
    
    db.date.findAll({
        
        where:{
            name:req.session.login.name
        }
    }).then(dat=>{
        
       
        var date_list = [];
       
        
        for(var i in dat){
            
            date_list.push({'year':dat[i].year,'month':dat[i].month,'day':dat[i].day});
        }
       
       
        
     var redate_list = date_list.filter((element, index, self) => 
                            self.findIndex(e => 
                                           e.year === element.year &&
                                           e.month === element.month &&
                                           e.day ==element.day
                                          ) === index
                            );
                          


        var result = [];
    if(dat.length !=0){
        if(result.length==0){
            result.push(redate_list[0]);
        }
    }
    if(redate_list.length >= 7 ){
    for(var i = 1 ;i <= parseInt(redate_list.length/7,10);i++){
        result.push(redate_list[i*7-1]);
    }
}

        
       
       
        var data = {
            title:'Home',
            content:redate_list,
            junp:result
        }
        res.render('home',data);
    }).catch(err=>{
        var data = {
            message:'err',
            error:err
        }
        res.render('error',data);
    })
})
router.get('/graph/week/:year/:month/:day',(req,res,next)=>{
    if(check(req,res)){
        return;
    }
        var year = req.params.year * 1;
        var month = req.params.month * 1;
        var date = req.params.day * 1;
        
        db.date.findAll({
            where:{
                name:req.session.login.name,
                day:{
                    [Op.gt]:date - 1,
                    [Op.lt]:date + 7
                }

            }
        }).then(wk=>{
            var list = [];
            var k = 0;
            var sum = 0;
            var date_list = [];
            var month_list = [];
            
            // console.log(wk[0].month);
            for(var i in wk){
                if(wk[i].month != month){
                    list.push({'year':year,'month':month,'day':date,'sum':sum});
                    month = month + 1;
                    date = 1;
                    sum = 0;
                 
                    
                }
                
                if(wk[i].day != date){
                    
                    list.push({'year':year,'month':month,'day':date,'sum':sum});
                    date += 1;
                    sum = 0;
                   
                }
                
                sum += wk[i].amount;
                
            }
            list.push({'year':year,'month':month,'day':date,'sum':sum});
            
            for(var i in list){
                date_list.push(list[i].month+'月'+list[i].day+'日');
            }
           
            var final = []
            for(var i in list){
                final.push(list[i].sum);

            }

        
            var redate_list = [...new Set(date_list)]
            
            var data = {
              title:'week sum amount',
              content:final,
              date:date_list
          }
          res.render('week',data);
        }).catch(err=>{
            var data = {
                message:'err',
                error:err
            }
            res.render('error',data);
        })    
})

router.get('/graph/destroy',(req,res,next)=>{
    var data = {
        title:'Delete page',

    }
    res.render('delete',data);
})
router.post('/graph/destroy',(req,res,next)=>{
   
    var day = req.body.day;

    db.date.destroy({
        where:{
            name:req.session.login.name,
            year:day[0],
            month:day[1],
            day:day[2]
        }
    }).then(()=>{
     
    })
    res.redirect('/graph/home');


})

router.get('/graph/show',(req,res,next)=>{
    var pg = req.params.page * 1;
  console.log(req.session.login.name);
    db.date.findAll({
        where:{
            name:req.session.login.name
        }
    }).then(dat=>{
        var data = {
            title:'data show page',
            content:dat,
            num:pg
        }
        res.render('show',data);

    })
})


module.exports = router;