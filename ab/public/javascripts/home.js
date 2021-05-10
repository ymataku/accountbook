'use strict'
var hanber = document.getElementById('hanber');
var X = document.getElementById('X');
var p = document.querySelector('p');
var menu = document.getElementById('menu');
var container = document.getElementById("container");

function change(id){
    var categories,i;
    categories = document.getElementsByClassName('category');
    
    for(i = 0;i < categories.length;i++){
        var cat;
        cat = categories[i];
       
        if(cat.id == id){
            cat.className = "category show";
        }else{
            cat.className = 'category hidden';
        }
    }
}

hanber.addEventListener('click',function(){
    // hanber.classList.add("disapper");
    hanber.classList.add("disapper");
    X.classList.remove("disapper");
    menu.classList.remove('disapper');
    container.style.opacity = "0.1"
    // console.log('hello');

})
X.addEventListener('click',function(){
    X.classList.add("disapper");
    hanber.classList.remove("disapper");
    menu.classList.add("disapper");
    container.style.opacity = "1.0"
})






