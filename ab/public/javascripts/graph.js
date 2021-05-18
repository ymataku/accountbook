var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();

var app3 = new Vue({
    el:'#app3',
    
    data:{
        message:year,
        message2:month + 1,
        message3:day,

    }
})

