/**
 * Created by kesun on 12/28/16.
 */

var stage;
const ENEMIES_COUNT = 5;
const SHAPE_WIDTH = 50;
const SHAPE_HEIGHT = 25;
const SHAPE_RADIUS = 10;

function init() {
    stage = new createjs.Stage("demoCanvas");

    var enemies = addEnemyAssets();
    applyEnemyAnimations(enemies);

    addHeroAsset();

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

function addEnemyAssets() {
    var enemies = [];

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
        enemy.y = 60 * index;

        createjs.Tween.get(enemy, {loop: true})
            .to({x:400}, 3000 / (index + 1), createjs.Ease.getPowInOut(2))
            .to({x:0}, 2000 / (index + 1), createjs.Ease.getPowInOut(2));
    });
}

function addHeroAsset() {
    var hero = new createjs.Shape();
    hero.graphics.beginFill("rgb(0,0,255)").drawRoundRect(0, 0, SHAPE_WIDTH, SHAPE_HEIGHT, SHAPE_RADIUS);
    hero.x = stage.canvas.width / 2 - SHAPE_WIDTH / 2;
    hero.y = stage.canvas.height - 30;

    stage.addChild(hero);
}