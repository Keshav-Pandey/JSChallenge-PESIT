
var drawModule = (function () { 

  //draws a single cell at (x,y) co-ordinates that forms the entire snake 
  var drawSnakeCell = function(x, y) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x*snakeCellSize, y*snakeCellSize, snakeCellSize, snakeCellSize);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(x*snakeCellSize, y*snakeCellSize, snakeCellSize, snakeCellSize);
  }

var drawSnakeHead = function(x, y) {
    //This function should render the head of the snake as a black cell
    ctx.fillStyle = 'black';
    ctx.fillRect(x*snakeCellSize, y*snakeCellSize, snakeCellSize, snakeCellSize);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x*snakeCellSize, y*snakeCellSize, snakeCellSize, snakeCellSize);
  }

  //creates pizza at (x,y) co-ordinates inside the canvas
  var pizza = function(x, y) {
        //for background for the pizza
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakeCellSize, y*snakeCellSize, snakeCellSize, snakeCellSize);
        //internal color of pizza
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeCellSize+1, y*snakeCellSize+1, snakeCellSize-2, snakeCellSize-2);
  }

  //updates the scoreText
  var scoreText = function() {
    var score_text = "Score: " + score;
    ctx.fillStyle = 'blue';
    ctx.fillText(score_text, 145, h-5);
  }

  //initializes the snake array with 4 cells as the size
  var initSnake = function() {
      var length = 10;
      snake = [];
      for (var i = length-1; i>=0; i--) {
          snake.push({x:i, y:0});
      }
  }
    
  var paint = function(){

      ctx.fillStyle = 'lightblue';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, w, h);

      btn.setAttribute('disabled', true);
      helpText.innerHTML="Great going";
      btn.style.visibility='hidden';
      sadSnake.style.visibility = 'hidden';
      happySnake.style.visibility = 'visible';



      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      if (direction == 'right') { 
        snakeX++; }
      else if (direction == 'left') { 
        snakeX--; }
      else if (direction == 'up') { 
        snakeY--; 
      } else if(direction == 'down') { 
        snakeY++; }
      
      if(snakeX==-1 && direction!='right'){
           snakeX=w/snakeCellSize;
           direction='left';
         }
         if(snakeX>=w/snakeCellSize && direction!='left'){
           snakeX=-1;
           direction='right';
         }
 
         if(snakeY<=-1 && direction!='down'){
           snakeY=h/snakeCellSize;
           direction='up';
         }
         if(snakeY>=h/snakeCellSize && direction!='up'){
           snakeY=-1;
           direction='down';
         }

      //Check for collisions and restart game
      if (checkCollision(snakeX, snakeY, snake)) {
          //restart game
          btn.removeAttribute('disabled', true);
          helpText.innerHTML="I just ate myself :( ";
          btn.style.visibility='visible';
          sadSnake.style.visibility = 'visible';
          happySnake.style.visibility = 'hidden';


          ctx.clearRect(0,0,w,h);
          gameloop = clearInterval(gameloop);
          score=0;

          return;          
        }
        
        //successfully eaten the pizza
        if(snakeX == food.x && snakeY == food.y) {
          var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
          score ++;
          
          createFood(); //Create new food
        }
        //missed eating the pizza 
        else {
          var tail = snake.pop(); //pops out the last cell
          tail.x = snakeX; 
          tail.y = snakeY;
        }

        //The snake can now eat the food.
        snake.unshift(tail); //puts back the tail as the first cell

        for(var i = 0; i < snake.length; i++) {
          if(i==0){
            drawSnakeHead(snake[i].x,snake[i].y);
          }else{
          drawSnakeCell(snake[i].x, snake[i].y);
          }
        } 
        
        pizza(food.x, food.y); 
        scoreText();
  }

  //creates (x,y) co-ordinates where the pizza will be created
  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 30) + 1),
        y: Math.floor((Math.random() * 30) + 1)
      }

      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;
        //eaten the pizza, so recreating the pizza
        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 30) + 1);
          food.y = Math.floor((Math.random() * 30) + 1);
        }
      }
  }

  //checks if the snake has collided with itself
  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }

  var init = function(){
      direction = 'down';
      initSnake();
      createFood();
      gameloop = setInterval(paint, 80);
  }


    return {
      init : init
    };

    
}());
