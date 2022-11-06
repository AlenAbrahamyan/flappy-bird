const canvas = document.getElementById("game-canvas")
const ctx = canvas.getContext("2d")

canvas.width = 350
canvas.height = 650

const backgroundImg = document.createElement("img")
backgroundImg.src = "./images/background.png"

const birdImg = document.createElement("img")
birdImg.src = "./images/bird.png"

const pipeImg = document.createElement("img")
pipeImg.src = "./images/pipe.png"

const menu = document.createElement("img")
menu.src = "./images/menu.png"

const deltaTime = 0.4
const jumpSpeed = -7
const fallingConstant = 0.4

const game = {
  started: false,
  score: 0,
}

const bird = {
  width: 60,
  height: 45,
  x: 50,
  y: 150,
  vertSpeed: 0,
}

const hole = {
  width: 60,
  height: 200,
  x: 500,
  y: 250,
}

canvas.addEventListener("click", () => {
  bird.vertSpeed = jumpSpeed
  game.started = true
})

const moveHole = () => {
  hole.x -= 2

  if (hole.x < -1 * hole.width) {
    hole.x = canvas.width
    hole.y = Math.random() * 450
    game.score++
  }
}

const writeScore = () => {
  ctx.font = "70px Arial"
  ctx.strokeStyle = "white"
  ctx.fillText(game.score, 170, 60)
  ctx.strokeText(game.score, 170, 60)
}

const checkLose = () => {
  const birdLeftCoord = bird.x + bird.width
  const birdBottomCoord = bird.y + bird.height
  const holeLeftCoord = hole.x + hole.width
  const holeBottomCoord = hole.y + hole.height

  if (birdLeftCoord > hole.x && bird.x < holeLeftCoord) {
    if (bird.y <= hole.y || birdBottomCoord >= holeBottomCoord) {
      game.started = false
      game.score = 0
      hole.x = 500
      bird.y = 150
      bird.vertSpeed = 0
    }
  }
}

const updateGame = () => {
  requestAnimationFrame(updateGame)

  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)

  if (!game.started) {
    ctx.drawImage(menu, 0, 0, canvas.width, canvas.height)
    return
  }

  bird.y = bird.y + bird.vertSpeed * deltaTime
  bird.vertSpeed += fallingConstant * deltaTime
  moveHole()

  ctx.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)
  ctx.drawImage(pipeImg, hole.x, hole.y - 600, hole.width, 600)
  ctx.drawImage(pipeImg, hole.x, hole.y + hole.height, hole.width, 600)

  writeScore()
  checkLose()
}

updateGame()
