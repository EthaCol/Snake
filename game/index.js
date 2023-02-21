const gameBoard = document.getElementById("game-board");
const scoreElement = document.getElementById("score");

let snake = [{x: 5, y: 5}];
let food = {x: 10, y: 10};
let score = 0;
let direction = "right";
let gameLoop;

function update() {
  moveSnake();
  if (checkFoodCollision()) {
    score++;
    generateFood();
    scoreElement.textContent = score;
  }
  if (checkWallCollision() || checkSelfCollision()) {
    clearInterval(gameLoop);
    alert("Game Over");
  }
  draw();
}

function moveSnake() {
  const head = {x: snake[0].x, y: snake[0].y};
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }
  snake.unshift(head);
  snake.pop();
}

function checkFoodCollision() {
  if (snake[0].x === food.x && snake[0].y === food.y) {
    return true;
  }
  return false;
}

function generateFood() {
  food = {
    x: Math.floor(Math.random() * (gameBoard.offsetWidth/10)),
    y: Math.floor(Math.random() * (gameBoard.offsetHeight/10))
  };
}

function checkWallCollision() {
  if (snake[0].x < 0 || snake[0].x >= gameBoard.offsetWidth/10 ||
      snake[0].y < 0 || snake[0].y >= gameBoard.offsetHeight/10) {
    return true;
  }
  return false;
}

function checkSelfCollision() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}

function draw() {
  gameBoard.innerHTML = "";
  snake.forEach(segment => {
    const snakeElement = document.createElement("div");
    snakeElement.classList.add("snake");
    snakeElement.style.left = segment.x * 10 + "px";
    snakeElement.style.top = segment.y * 10 + "px";
    gameBoard.appendChild(snakeElement);
  });
  const foodElement = document.createElement("div");
  foodElement.classList.add("food");
  foodElement.style.left = food.x * 10 + "px";
  foodElement.style.top = food.y * 10 + "px";
  game
