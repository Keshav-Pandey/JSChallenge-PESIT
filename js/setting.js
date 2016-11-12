//Delare configuration details
var mycanvas = document.getElementById('mycanvas');
var ctx = mycanvas.getContext('2d');
// var snakeCellSize = 10; 
var w = 300;
var h = 300;
var score = 0;
var snake;
var food;
var home = document.getElementById('home');
var happySnake = document.getElementById('happySnake');
var sadSnake = document.getElementById('sadSnake');
var startHelpText = document.getElementById('startHelpText');