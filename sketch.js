/**
 * Restore
 * author: Giuliano Conte
 *
 * A game about restoring a planet back to health.
 * Made for Ludum Dare 38 (4/21/2017 9PM EST - 4/23/2017 9PM EST)
 * with theme "A Small World".
 *
 * Hosted on <https://giulianoconte.github.io/Restore/>.
 */

var BUILD_TYPE = 1; //0 for local, 1 for web
var GAME_SIZE = 580;
var HALF_GAME_SIZE = GAME_SIZE / 2;
var PLANET_RADIUS = 120;

var cnv; //canvas

var KEY_W = false;
var KEY_S = false;
var KEY_A = false;
var KEY_D = false;

var planet;
var atmosphere;
var player;
var enemies = [];
var trees = [];
var grasses = [];
var testers = [];

function centerCanvas() {
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(GAME_SIZE, GAME_SIZE);
  centerCanvas();

	atmosphere = createAtmosphere(80.0);
	planet = createObject(0.0, 0.0, "world3.png");
	for (var i = 0; i < 8; i++) {
		enemies.push(createObject(PLANET_RADIUS + 130, 45*i, "enemy5.png"));
	}
	for (var i = 0; i < 30; i++) {
		trees.push(createObject(PLANET_RADIUS + 45, i*12, "tree1.png"));
	}
	for (var i = 0; i < 180; i++) {
		grasses.push(createObject(PLANET_RADIUS + 0, i*2, "grass1.png"));
	}
	player = createObject(PLANET_RADIUS + 25, 90, "player1.png");

	colorMode(RGB, 255, 255, 255, 1);
}

function windowResized() {
	centerCanvas();
}

function draw() {
	gameLoop();

	background(25);
  fill(0);
  drawSprites();
}

function getInput() {
	KEY_W = false; KEY_S = false; KEY_A = false; KEY_D = false;
	if (keyWentDown("w") || keyWentDown("W"))
		KEY_W = true;
	if (keyWentDown("s") || keyWentDown("S"))
		KEY_S = true;
	if (keyDown("a") || keyDown("A"))
		KEY_A = true;
	if (keyDown("d") || keyDown("D"))
		KEY_D = true;
}

var intense = 0.0;

function gameLoop() {
	getInput();
	if (KEY_A) {
		player.move(1);
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].move(-1);
		}
	}
	if (KEY_D) {
		player.move(-1);
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].move(1);
		}
	}
	if (keyDown("p")) {
		player.addMag(2);
	}
	if (keyDown("o")) {
		player.addMag(-2);
	}

	if (keyDown("j")) {
		intense += 0.01;
	}
	if (keyDown("k")) {
		intense -= 0.01;
	}
	atmosphere.setIntensity(intense);

	player.steer();
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].steer();
	}
}

function mousePressed() {
}
