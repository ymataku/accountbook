'use strict'
var hanber = document.getElementById('hanber');
var X = document.getElementById('X');
var p = document.querySelector('p');
var menu = document.getElementById('menu');
var container = document.getElementById("container");
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

