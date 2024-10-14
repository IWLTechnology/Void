

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function playMusic(){
  var mus = document.getElementById("notARickRoll");
  mus.volume = 0.2;
  mus.currentTime = 0.000000000000000000000000000000000000000000000000000000000000000;
  mus.play();
}



document.body.style.backgroundImage = "url('voidrealbg2.png')";
document.body.style.backgroundPosition = "bottom";
document.body.style.backgroundRepeat = "no-repeat";
document.body.style.backgroundSize = "2000px 1000px";

var playerhealth = 50

var audio2 = new Audio('theshogun.mp3');
audio2.play();

let player = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  width: 50,
  height: 50,
  speed: 20,
  health: 10,
  color: 'blue'
};

playerhealth = 50

let enemies = [];
let bullets = [];

function generateEnemy() {
  let enemy = {
    x: Math.random() * (canvas.width - 50),
    y: 0,
    width: 20,
    height: 20,
    speed: 5,
    health: 30,
    color: 'red',
    direction: Math.random() < 0.5 ? -1 : 1
  };
  enemies.push(enemy);
}


function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.moveTo(player.x + player.width / 2, player.y);
  ctx.lineTo(player.x + player.width, player.y + player.height / 2);
  ctx.lineTo(player.x + player.width * 0.75, player.y + player.height);
  ctx.lineTo(player.x + player.width * 0.25, player.y + player.height);
  ctx.lineTo(player.x, player.y + player.height / 2);
  ctx.lineTo(player.x + player.width / 2, player.y);
  ctx.closePath();
  ctx.fill();
}

function drawEnemies() {
  enemies.forEach((enemy) => {
    ctx.fillStyle = enemy.color;
    ctx.beginPath();
    ctx.moveTo(enemy.x, enemy.y + enemy.height);
    ctx.lineTo(enemy.x + enemy.width / 2, enemy.y);
    ctx.lineTo(enemy.x + enemy.width, enemy.y + enemy.height);
    ctx.closePath();
    ctx.fill();
  });
}

function drawBullets() {
  bullets.forEach((bullet) => {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

function moveEnemies() {
  enemies.forEach((enemy) => {
    enemy.y += enemy.speed;
    enemy.x += enemy.direction; // Add horizontal movement
    if (enemy.x < 0 || enemy.x > canvas.width - enemy.width) {
      enemy.direction *= -1; // Change direction when hitting the edge
    }
  });
}

function moveBullets() {
  bullets.forEach((bullet) => {
    bullet.y -= bullet.speed + 15 ;
  });
}

function handleBulletCollision() {
  bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        enemy.health -= 10;
        bullets.splice(bulletIndex, 1);
        if (enemy.health <= 0) {
          enemies.splice(enemyIndex, 1);
        }
      }
    });
  });
}

function handleEnemyCollision() {
  enemies.forEach((enemy) => {
    if (
      player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.y + player.height > enemy.y
    ) {
      playerhealth - 10;
      enemies.splice(enemies.indexOf(enemy), 5);
    }
  });
}

function shoot() {
  let bullet = {
    x: player.x + player.width / 2 - 2.5,
    y: player.y,
    width: 5,
    height: 10,
    speed: 1
  };
  bullets.push(bullet);
}



const keys = {};

document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

function updatePlayer() {
  if (keys['ArrowLeft'] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys['a'] && player.x > 0) {
    player.x -= player.speed;
  }
  if (keys['ArrowRight'] && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
  if (keys['d'] && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
  if (keys[' ']) {
    shoot();
    var audio = new Audio('shoot5.mp3');
    audio.play();
  }
  if (keys['w']) {
    shoot();
    var audio = new Audio('shoot5.mp3');
    audio.play();
  }
  if (keys['ArrowUp']) {
    shoot();
    var audio = new Audio('shoot5.mp3');
    audio.play();
  }
}
let score = 0;

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);
}

function handleBulletCollision() {
  bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        enemy.health -= 10;
        bullets.splice(bulletIndex, 1);
        if (enemy.health <= 0) {
          enemies.splice(enemyIndex, 1);
          enemyCount--;
          score += 10;
          var audio2 = new Audio('small-explosion.mp3');
          audio2.play();
        }
      }
    });
  });
}

let boss = null;
let bossBullets = [];
let enemyCount = 0;

function generateBoss() {
  boss = {
    x: canvas.width / 2 - 50,
    y: 0,
    width: 100,
    height: 100,
    speed: 1,
    health: 500,
    color: 'purple'
  };
}

function drawBoss() {
  if (boss) {
    ctx.fillStyle = boss.color;
    ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
  }
}

function moveBoss() {
  if (boss) {
    boss.y += boss.speed;
  }
}

function generateBossBullet() {
  if (boss) {
    let bullet = {
      x: boss.x + boss.width / 2 - 2.5,
      y: boss.y + boss.height,
      width: 5,
      height: 10,
      speed: 2
    };
    bossBullets.push(bullet);
  }
}


function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  updatePlayer();
  drawPlayer();
  drawEnemies();
  drawBullets();

  moveEnemies();  
  moveBullets();

  handleBulletCollision();
  handleEnemyCollision();


  if (Math.random() < 0.05) {
    generateEnemy();
  }

  requestAnimationFrame(update);
}

function drawBossBullets() {
  bossBullets.forEach((bullet) => {
    ctx.fillStyle = 'orange';
    ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
  });
}

function moveBossBullets() {
  bossBullets.forEach((bullet) => {
    bullet.y += bullet.speed;
  });
}

function handlePlayerBulletCollision() {
  bossBullets.forEach((bullet, bulletIndex) => {
    if (
      bullet.x < player.x + player.width &&
      bullet.x + bullet.width > player.x &&
      bullet.y < player.y + player.height &&
      bullet.y + bullet.height > player.y
    ) {
      player.health -= 10;
      bossBullets.splice(bulletIndex, 1);
      console.log(playerhealth)
    }
  });
}

function handleBulletCollision() {
  bullets.forEach((bullet, bulletIndex) => {
    enemies.forEach((enemy, enemyIndex) => {
      if (
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        enemy.health -= 10;
        bullets.splice(bulletIndex, 1);
        if (enemy.health <= 0) {
          enemies.splice(enemyIndex, 1);
          enemyCount--; // Decrease the enemy count
        }
      }
    });
  });
}

update();

update();
