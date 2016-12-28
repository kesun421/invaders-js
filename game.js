/**
 * Created by kesun on 12/28/16.
 */

var stage;
var hero, enemies = [], missiles = [];
const SCREEN_WIDTH = 500, SCREEN_HEIGHT = 500;
const ENEMIES_COUNT = 8;
const SHAPE_WIDTH = 50, SHAPE_HEIGHT = 25, SHAPE_RADIUS = 10;
const KEYCODE_LEFT = 37, KEYCODE_RIGHT = 39, KEYCODE_SPACEBAR = 32;

function init() {
    stage = new createjs.Stage("demoCanvas");

    var enemies = addEnemyAssets();
    applyEnemyAnimations(enemies);

    hero = createHeroAsset();

    this.document.onkeydown = keyPressed;

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", missileToEnemyCollisionDetection);
    createjs.Ticker.addEventListener("tick", displayWinningMessage);
}

function addEnemyAssets() {
    for (var i = 0; i < ENEMIES_COUNT; i++) {
        var circle = new createjs.Shape();
        circle.graphics.beginFill("rgb(255,0,0)").drawRoundRect(0, 0, SHAPE_WIDTH, SHAPE_HEIGHT, SHAPE_RADIUS);
        circle.x = 0;
        circle.y = 0;

        enemies.push(circle);
    }

    enemies.forEach(function (object){
        stage.addChild(object);
    });

    return enemies;
}

function applyEnemyAnimations(enemies) {
    enemies.forEach(function (enemy, index) {
        enemy.y = 30 * index;

        createjs.Tween.get(enemy, {loop: true})
            .to({x:400}, 3000 / (index + 1), createjs.Ease.getPowInOut(2))
            .to({x:0}, 3000 / (index + 1), createjs.Ease.getPowInOut(2));
    });
}

function createHeroAsset() {
    var hero = new createjs.Shape();
    hero.graphics.beginFill("rgb(0,0,255)").drawRoundRect(0, 0, SHAPE_WIDTH, SHAPE_HEIGHT, SHAPE_RADIUS);
    hero.x = stage.canvas.width / 2 - SHAPE_WIDTH / 2;
    hero.y = stage.canvas.height - 30;

    stage.addChild(hero);

    return hero;
}

function heroFire() {
    var x = hero.x + SHAPE_WIDTH / 2;
    var y = hero.y;
    const MISSILE_RADIUS = 10;

    var missile = new createjs.Shape();
    missile.graphics.beginFill("rgb(125,125,125)").drawCircle(0, 0, MISSILE_RADIUS);
    missile.x = x;
    missile.y = y;

    missiles.push(missile);

    stage.addChild(missile);

    createjs.Tween.get(missile, {loop: false})
        .to({y: 0}, 1000, createjs.Ease.getPowInOut(2))
        .call(function (){
            stage.removeChild(missile);
            missiles.splice(0, 1); // Clean up to avoid overloading...
        });
}

function missileToEnemyCollisionDetection() {
    missiles.forEach(function (missile){
        enemies.forEach(function (enemy) {
            var withinEnemyWidth = missile.x >= enemy.x && missile.x <= enemy.x + SHAPE_WIDTH;
            var withinEnemyHeight = missile.y >= enemy.y && missile.y <= enemy.y + SHAPE_HEIGHT;

            if (withinEnemyWidth && withinEnemyHeight) {
                enemy.hit = true;

                createjs.Tween.get(enemy, {loop: false})
                    .to({alpha: 0}, 500, createjs.Ease.getPowInOut(2))
                    .call(function (){
                        stage.removeChild(enemy);
                    });
            }
        });
    });
}

function displayWinningMessage() {
    if (enemies.some(e => !e.hit)) {
        return;
    }

    var text = new createjs.Text("You Win!!!", "40px Arial", "silver");
    text.x = SCREEN_WIDTH / 2 - 70;
    text.y = SCREEN_HEIGHT /2 - 20;

    stage.addChild(text);
}

function keyPressed(event) {
    switch(event.keyCode) {
        case KEYCODE_LEFT:
            if (hero.x <= 0) {
                hero.x = 0;
            }
            else {
                hero.x -= 20;
            }
            break;

        case KEYCODE_RIGHT:
            if (hero.x >= SCREEN_WIDTH - SHAPE_WIDTH) {
                hero.x = SCREEN_WIDTH - SHAPE_WIDTH;
            }
            else {
                hero.x += 20;
            }
            break;

        case KEYCODE_SPACEBAR:
            heroFire();
            break;
    }
}