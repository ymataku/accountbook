var app = new Vue({
    el:'#app',
    watch:{
        message:function(long){
            this.error.require = (long.length < 1) ? true : false; 
        }
    },
    data:{
        message:'',
        error:{
            require:false

        }

    }
})
var app2 = new Vue({
    el:'#app2',
    watch:{
        message:function(e,e2){
            this.error.require = (e.length < 1) ? true:false;
        }
    },
    data:{
        message:'',
        error:{
            require:false
        }
    }
})



