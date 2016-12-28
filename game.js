/**
 * Created by kesun on 12/28/16.
 */

var stage;
const ENEMIES_COUNT = 5;

function init() {
    stage = new createjs.Stage("demoCanvas");

    var enemies = addEnemyAssets();
    applyEnemyAnimations(enemies);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

function addEnemyAssets() {
    var enemies = [];

    for (var i = 0; i < ENEMIES_COUNT; i++) {
        var circle = new createjs.Shape();
        circle.graphics.beginFill("rgb(255,0,0)").drawRoundRect(0, 0, 50, 25, 10);
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