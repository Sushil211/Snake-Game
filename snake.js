function init(){
	canvas = document.getElementById("mycanvas")
	W = canvas.width = 1000
	H = canvas.height = 1000

	pen = canvas.getContext('2d')
	game_over = false //variable that stores the state of the game, i.e game is over or not
	score = 0 // variable that stores the score
	cs = 66

	//creating an image objet for food
	food_img = new Image()
	food_img.src = "Assets/apple.png"

	//creating an image for trophy
	trophy_img = new Image()
	trophy_img.src = "Assets/trophy.png"

	food = getRandomFood() //generating the food object at any random location

	//Making a snake object
	snake = {
		init_length: 5,
		color: "blue",
		cells: [],
		direction: "right", //Initially the snake will move towards right

		//creating our snake
		createSnake: function(){
			for(var i=this.init_length; i>0; i--){
				this.cells.push({x:i, y:0}); //array of object and the object contains x co-odinate and y co-ordinate
			}
		},

		//draw the snake
		drawSnake: function(){
			for(var i=0; i<this.cells.length; i++){
				pen.fillStyle = this.color
				pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 3, cs - 3)
			}
		},

		//update the movement of the snake
		updateSnake: function(){

			var headX = this.cells[0].x //x co-ordinate of current head
			var headY = this.cells[0].y //y co-ordiante of current head

			//if snake has eaten the food then it's length will be increased and a new food will be generated
			//else the snake will move i.e we just need to shift the tail of the snake to it's head position

			if(headX == food.x && headY == food.y){
				food = getRandomFood()
				score++
			} 
			else{
				this.cells.pop()
			}

			var newX, newY

			if(this.direction == "right"){
				newX = headX + 1
				newY = headY
			} 
			else if(this.direction == "left"){
				newX = headX - 1
				newY = headY
			}
			else if(this.direction == "down"){
				newX = headX
				newY = headY + 1
			}
			else if(this.direction == "up"){
				newX = headX
				newY = headY - 1
			}

			this.cells.unshift({x: newX, y:newY})

			var last_x = Math.round(W/cs)
			var last_y = Math.round(H/cs)

			if(this.cells[0].x < 0 || this.cells[0].x >= last_x || this.cells[0].y < 0 || this.cells[0].y >= last_y){
				game_over = true
			}
		}

	}

	snake.createSnake() //calling the createSnake function

	//Adding eventListener that will basically response based on the key pressed
	function keyPressed(e){
		if(e.key == "ArrowRight"){
			snake.direction = "right" 
		}
		else if(e.key == "ArrowLeft"){
			snake.direction = "left"
		}
		else if(e.key == "ArrowUp"){
			snake.direction = "up"
		}
		else if(e.key == "ArrowDown"){
			snake.direction = "down"
		}
	}

	document.addEventListener("keydown", keyPressed)

}


function draw(){
	//clear the old frame first then only draw the new frame
	pen.clearRect(0, 0, W, H)
	snake.drawSnake()

	pen.fillStyle = food.color
	pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs)

	pen.drawImage(trophy_img, 18, 20, cs, cs)
	pen.fillStyle = "blue"
	pen.font = "20px Roboto"
	pen.fillText(score, 50, 50)
}


function update(){
	snake.updateSnake()
}


function getRandomFood(){
	var foodX = Math.round(Math.random() * (W - cs) / cs)
	var foodY = Math.round(Math.random() * (H - cs) / cs)

	var food = {
		x: foodX,
		y : foodY,
		color: "red"
	}
	return food
}


function gameLoop(){
	if(game_over == true){
		clearInterval(set)
		alert("game over")
		return
	}

	draw()
	update()
}


init()

var set = setInterval(gameLoop, 100) //calls the gameLoop function after each 100 ms