var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();

var app3 = new Vue({
    el:'#app3',
    
    data:{
        message:year,
        message2:month,
        message3:day,

    }
})

