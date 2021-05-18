let canvas = document.querySelector("#canvas");
let context = canvas.getContext("2d");
let rightPress = false;
let leftPress = false;
let enterPress = false;
let loss = false
let alive = true
let score = 0;
let collisionB = true;
let collisionBB = true;
let collisionPS = true;
let player = {
    x: 250, // position
    y: canvas.height - 50, //position
    h: 50,
    w: 50,
    dx: 0,
    dy: 0
};
function drawPlyer() {
    context.fillStyle = '#94d0cc';
    context.fillRect(player.x, player.y, player.w, player.h);
}

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (rightPress) {
        player.x += 10;
        if (player.x + player.w > canvas.width) {
            player.x = canvas.width - player.w;
        }
    }
    else if (leftPress) {
        player.x -= 10;
        if (player.x < 0) {
            player.x = 0;
        }
    }
    killEnemy()
    collision()
    collisionBlock()
    collisionBlockWithBig()
    enemiesMove()
    drawblock()
    drawPlyer()
    scoreDisplay()
    shooting()
    drawShots()
    drawEnemies()
    requestAnimationFrame(update);
}
function scoreDisplay() {
    context.fillStyle = '#583d72';
    context.font = '20px Verdana';
    context.fillText("Score : " + score, 20, 20);
    if (score > 49) {
        enemies.splice(0, enemies.length) // stop enemies generate when score is 50
        drawBigenemy()
        shootingEnemy() 
    }
    if (alive == false) { // if player touch enemy game over
        context.clearRect(0, 0, canvas.width, canvas.height);
        enemies.splice(0, enemies.length)
        context.fillText('Game Over!', canvas.width - 350, canvas.height / 2);
    }

}
let blocks = [];
let block = {
    total: 2,
    x: 50 + Math.random() * 250,
    y: 50 + Math.random() * 300
    // w: 100,
    // h: 50
}
function drawblock() {
    let count = 0 ;
    blocks.push(context.fillStyle = '#325288',
        context.fillRect(block.x, block.y, 120, 20))
    blocks.push(context.fillStyle = '#325288',
        context.fillRect(block.x + 200, block.y - 30, 120, 20))

       


            if (collisionB == false){
                enemies.splice(count,1);
                count++;
            }
        }

let shot = 10
let shots = []
function drawShots() { // draw shots
    if (shots.length) {
        for (let index = 0; index < shots.length; index++) {
            context.fillStyle = '#511281'
            context.fillRect(shots[index][0], shots[index][1], shots[index][2], shots[index][3]);
        }
    }
}
function shooting() {
    for (let index = 0; index < shots.length; index++) {
        if (shots[index][1] > -11) {
            shots[index][1] -= 10;
        } else if (shots[index][1] < -10) {
            shots.splice(index, 1); // if shooting end first round remove
        }
    }
}
let enemies = []
let enemy = {
    x: 50,
    y: 50,
    h: 50,
    w: 50,
    speed: 2
}
function drawEnemies() { // draw enemies
    if (enemies.length) {
        for (let index = 0; index < enemies.length; index++) {
            context.fillStyle = '#ffc2b4'
            context.fillRect(enemies[index][0], enemies[index][1], enemies[index][2], enemies[index][3]);
        }
    }
    for (let index = 0; index < 5; index++) {
        enemies.push([enemy.x, enemy.y, enemy.h, enemy.w, enemy.speed])
        enemy.x += 100
    }
}
function enemiesMove() {
    for (let index = 0; index < enemies.length; index++) {
        if (enemies[index][1] < 600) {
            enemies[index][1] += enemy.speed;
        } else if (enemies[index][1] > 600 - 1) {
            enemies[index][1] = -45;
        }
    }
}
function killEnemy() {
    let remove = false;
    for (let i = 0; i < shots.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
            if (shots[i][1] <= (enemies[j][1] + enemies[j][3]) && shots[i][0] >= enemies[j][0] && shots[i][0] <= (enemies[j][0] + enemies[j][2])) {
                remove = true;
                enemies.splice(j, 1);
                enemies.push([(Math.random() * 500) + 50, -45, enemy.w, enemy.h, enemy.speed]);
            }
        }
        if (remove == true) {
            shots.splice(i, 1);
            remove = false;
            score += 1
        }
    }
}

shotBigEnemy = [];
let bigEnemy = {
    x: 50,
    y: 80,
    h: 100,
    w: 100,
    moveX: Math.random() * 0.5 + 2 ,
    moveY: Math.random() * 0.5 + 3

}
function drawBigenemy() {
    context.fillStyle = '#693c72';
    context.fillRect(bigEnemy.x, bigEnemy.y, bigEnemy.w, bigEnemy.h);


if(alive == true){
  if (bigEnemy.x >= canvas.width - bigEnemy.w || bigEnemy.x <= 0)
    bigEnemy.moveX *= -1
  if (bigEnemy.y >= canvas.height - bigEnemy.h || bigEnemy.y <= 0)
    bigEnemy.moveY *= -1

    for (let i= 0; i< blocks.length; i++) {
        if (blocks[i] && !collisionBB) {
          bigEnemy.moveX *= -1
          bigEnemy.moveY *= -1
        }
      }



      bigEnemy.x += bigEnemy.moveX
      bigEnemy.y += bigEnemy.moveY

    }
}

function drawShotOfBoss() {
    if (shotBigEnemy.length) {
        for (let index = 0; index < shotBigEnemy.length; index++) {
            context.fillStyle = '#e84545'
            context.fillRect(shotBigEnemy[index][0], shotBigEnemy[index][1], shotBigEnemy[index][2], shotBigEnemy[index][3]);
            context.fillRect(shotBigEnemy[0][index], shotBigEnemy[1][index], shotBigEnemy[2][index], shotBigEnemy[3][index]);
        }
}
}
function shootingEnemy() {
    for (let i = 0; i < shotBigEnemy.length; i++) {
        shotBigEnemy[i].push(drawShotOfBoss())
   
    // Check collision big enmy with block
    for (let j = 0; j < blocks.length; j++) {
        if (shotBigEnemy[i] && !(collisionBB)){
          shotBigEnemy.splice(i, 1)
          i--
        }
      }
      // Check collision big enmy with player
      if (shotBigEnemy[i] && !(collisionPS)) {
        context.fillStyle = '#583d72';
        loss = true
        shotBigEnemy.splice(i, 1)
        i--
        context.fillText('Game Over!', canvas.width - 350, canvas.height / 2);
      }
    }  
}

function collision() { // check collision between player and enemy
    let playerXW = player.x + player.w,
        playerYH = player.y + player.h;
    for (let i = 0; i < enemies.length; i++) {
        if (player.x > enemies[i][0] && player.x < enemies[i][0] + enemy.w && player.y > enemies[i][1] && player.y < enemies[i][1] + enemy.y) {
            alive = false;
        }
        if (playerXW < enemies[i][0] + enemy.w && playerXW > enemies[i][0] && player.y > enemies[i][1] && player.y < enemies[i][1] + enemy.y) {
            alive = false;
        }
        if (playerYH > enemies[i][1] && playerYH < enemies[i][1] + enemy.y && player.x > enemies[i][0] && player.x < enemies[i][0] + enemy.w) {
            alive = false;
        }
        if (playerYH > enemies[i][1] && playerYH < enemies[i][1] + enemy.y && playerXW < enemies[i][0] + enemy.w && playerXW > enemies[i][0]) {
            alive = false;
        }
    }
}
function collisionBlock() { // check collision between block and enemy
    let blockXW = block.x + block.w,
        blockYH = block.y + block.h;
    for (let i = 0; i < enemies.length; i++) {
        if (block.x > enemies[i][0] && block.x < enemies[i][0] + enemy.w && block.y > enemies[i][1] && block.y < enemies[i][1] + enemy.y) {
            collisionB = false;
            
        }
         if (blockXW < enemies[i][0] + enemy.w && blockXW > enemies[i][0] && block.y > enemies[i][1] && block.y < enemies[i][1] + enemy.y) {
            collisionB = false;
            
        }
         if (blockYH > enemies[i][1] && blockYH < enemies[i][1] + enemy.y && block.x > enemies[i][0] && block.x < enemies[i][0] + enemy.w) {
            collisionB = false;
            
        }
         if (blockYH > enemies[i][1] && blockYH < enemies[i][1] + enemy.y && blockXW < enemies[i][0] + enemy.w && blockXW > enemies[i][0]) {
            collisionB = false;
        
        }
    }
}
function collisionBlockWithBig() { //check collision between block and Big enemy
    let blockXW = block.x + block.w,
        blockYH = block.y + block.h;
    for (let i = 0; i < shotBigEnemy.length; i++) {
        if (block.x > shotBigEnemy[i][0] && block.x < shotBigEnemy[i][0] + block.w && block.y > shotBigEnemy[i][1] && block.y < shotBigEnemy[i][1] + block.y) {
            collisionBB = false;
        }
        if (blockXW < shotBigEnemy[i][0] + block.w && blockXW > shotBigEnemy[i][0] && block.y > shotBigEnemy[i][1] && block.y < shotBigEnemy[i][1] + block.y) {
            collisionBB = false;
        }
        if (blockYH > shotBigEnemy[i][1] && blockYH < shotBigEnemy[i][1] + block.y && block.x > shotBigEnemy[i][0] && block.x < shotBigEnemy[i][0] + block.w) {
            collisionBB = false;
        }
        if (blockYH > shotBigEnemy[i][1] && blockYH < shotBigEnemy[i][1] + block.y && blockXW < shotBigEnemy[i][0] + block.w && blockXW > shotBigEnemy[i][0]) {
            collisionBB = false;
        }
    }
}
function collisionPlayerWithBigEnmey(){
    let playerXW = player.x + player.w,
        playerYH = player.y + player.h;
        for (let i = 0; i < shotBigEnemy.length; i++) {

        if (player.x > shotBigEnemy[i][0] && player.x < shotBigEnemy[i][0] + bigEnemy.w && player.y > shotBigEnemy[i][1] && player.y < shotBigEnemy[i][1] + bigEnemy.y) {
            collisionPS = false;
            }
        if (playerXW < shotBigEnemy[i][0] + bigEnemy.w && playerXW > shotBigEnemy[i][0] && player.y > shotBigEnemy[i][1] && player.y < shotBigEnemy[i][1] + bigEnemy.y) {
            collisionPS = false;
        }
        if (playerYH > shotBigEnemy[i][1] && playerYH < shotBigEnemy[i][1] + bigEnemy.y && player.x > shotBigEnemy[i][0] && player.x < shotBigEnemy[i][0] + bigEnemy.w) {
            collisionPS = false;
        }
        if (playerYH > shotBigEnemy[i][1] && playerYH < shotBigEnemy[i][1] + bigEnemy.y && playerXW < shotBigEnemy[i][0] + bigEnemy.w && playerXW > shotBigEnemy[i][0]) {
            collisionPS = false;
        }
    }
}
document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowRight" || e.key === "Right") {
     
        rightPress = true
    }
    else if (e.key === "ArrowLeft" || e.key === "Left") {
      
        leftPress = true
    }
    else if (e.key === "Enter" && shots.length <= shot) { // when i press enter shooting
        enterPress = true
        if (enterPress && shots.length <= shot) {
            shots.push([player.x + 25, player.y - 20, 4, 20]);
        }
    }
})
document.addEventListener('keyup', (e) => {
    if (e.key === "ArrowRight" || e.key === "Right") {
       
        rightPress = false
    }
    else if (e.key === "ArrowLeft" || e.key === "Left") {
        
        leftPress = false
    }
})
update()