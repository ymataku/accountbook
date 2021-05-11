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
    var check_sum = 0;
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
        if(sum == 0){
            sum = 1;
            check_sum = 1;
        }
        for(var i in dat){
            sy.push((dat[i].amount/sum)*100);
            la.push(dat[i].label);
        }
       if(check_sum == 1){
           sum = 0;
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
        var month_list = [];
        for(var i in dat){
            date_list.push({'year':dat[i].year,'month':dat[i].month,'day':dat[i].day});
        } 
        for(var i in dat){
            month_list.push({'year':dat[i].year,'month':dat[i].month});
        }
     var redate_list = date_list.filter((element, index, self) => 
                            self.findIndex(e => 
                                           e.year === element.year &&
                                           e.month === element.month &&
                                           e.day ==element.day
                                          ) === index
                            );

    var remonth_list = month_list.filter((element,index,self)=>
                                    self.findIndex(e =>
                                            e.year === element.year&&
                                            e.month === element.month
                                            ) === index
    );


        var result = [];
        var result_month = [];
      
    if(dat.length !=0){
        if(result.length==0){
            result.push(redate_list[0]);
        }
    }
    
    if(redate_list.length > 7 ){
    for(var i = 1 ;i <= parseInt(redate_list.length/7,10);i++){
        result.push(redate_list[i*7]);
    }
    
}
    if(redate_list.length < 30){
        result_month.push(redate_list[0]);
       
    }
    if(redate_list.length > 30){
        for(var i = 1;i <= parseInt(redate_list.length/30);i++){
            result_month.push(redate_list[i*30]);
            
        }
    }
   
        var data = {
            title:'Home',
            content:redate_list,
            month:result_month,
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
            order:[
                ['month','ASC'],
                ['day','ASC']
            ],
            where:{
                name:req.session.login.name,
                month:{
                    [Op.gt]:month - 1,
                    [Op.lt]:month + 2,
                }
                
            
            }
                    
        }).then(wk=>{
          
            var list = [];
            var pre_list = [];
            var k = 0;
            var sum = 0;
            var date_list = [];
            var month_list = [];
            var all = 0;
           var month_sub = month;
           var date_sub = date;
           
            for(var i in wk){
                
                if(wk[i].month != month){
                    
                    month++;
                    date = 1;
                }
                if(wk[i].day >= date){
                    pre_list.push({'year':year,'month':wk[i].month,'day':wk[i].day,'amount':wk[i].amount})
                }
                
            }
           
            month = month_sub;
            date = date_sub;
            // console.log(pre_list[0].amount);
            for(var i in pre_list){
              
              
                if(pre_list[i].month != month){
                   
                    list.push({'year':pre_list[i - 1].year,'month':pre_list[i - 1].day,'day':pre_list[i - 1].day,'sum':sum});
                    
                    month = month + 1;
                    date = 1;
                    sum = 0;
                }
                if(pre_list[i].day != date){
                    list.push({'year':pre_list[i - 1].year,'month':pre_list[i - 1].month,'day':pre_list[i - 1].day,'sum':sum});
                    date += 1;
                    sum = 0;
                }
                if(list.length == 7){
                    break;
                }
                sum += pre_list[i].amount;
            }
            if(list.length < 7){
                list.push({'year':pre_list[pre_list.length - 1].year,'month':pre_list[pre_list.length - 1].month,'day':pre_list[pre_list.length - 1].day,'sum':sum});
            }
            for(var i in list){
                date_list.push(list[i].month+'月'+list[i].day+'日');
            }
            console.log(list);
            var final = []
            for(var i in list){
                final.push(list[i].sum);
            }
            var redate_list = [...new Set(date_list)]
            for(var i in final){
                all += final[i] 
            }
            var data = {
              title:'week sum amount',
              content:final,
              date:date_list,
              sum:all
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
router.get('/graph/month/:year/:month/:day',(req,res,next)=>{
    
    var year = req.params.year * 1;
    var month = req.params.month * 1;
    var date = req.params.day * 1;
    
    db.date.findAll({
        order:[
            ['month','ASC'],
            ['day','ASC']
        ],
        where:{
            year:year,
            month:{
                [Op.gt]:month - 1,
                [Op.lt]:month + 2
            },
            
          
        }
    }).then(dat=>{
        
        var label = ['第一','第二','第三','第四','第五']
        var sum_thismonth = [];
        var redate = [];
        var rr_date = [];
        var sum = 0;
        var long = 0;
        var count = 0;
        var check = 0;
     
        for(var i in dat){
            if(dat[i].month != month){
              
                month++; 
                date = 1
                
            }
            

            if(dat[i].day >= date){
                redate.push({'month':dat[i].month,'day':dat[i].day,'sum':dat[i].amount});
                
            }
            
        }
        for(var i = 0;i < redate.length - 1;i++){
            if(redate[i].day == redate[i+1].day){
                var sub = redate[i].sum + redate[i+1].sum;
                rr_date.push(sub);
                i++;
                continue;

            }
            rr_date.push(redate[i].sum)
            
        }
        console.log(rr_date.length);
        long = parseInt(rr_date.length/7);
        
        for(var l = 0;l < long;l++){
            
        for(var i = 0;i < 7; i++){
        
            count += 1;
            sum += rr_date[7*l + i];
            
            if(i == 6){
                sum_thismonth.push(sum);
                sum = 0;
            }else if(count == 30){
                sum_thismonth.push(sum);
                break;
                check = 1;
            }
        }
        if(check == 1){
            break;
        }
        
    }

     if(sum_thismonth.length < 5){
        var l = sum_thismonth.length;
    for(var i = 0; i < 5 - l;i++){
        sum_thismonth.push(0);
    }

     }
     for(var i in sum_thismonth){
         sum += sum_thismonth[i];
     }
     
        var data = {
            title:'amount of month',
            label:label,
            money:sum_thismonth,
            sum:sum

        }
        res.render('month',data);
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