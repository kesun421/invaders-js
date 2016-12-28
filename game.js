/**
 * Created by kesun on 12/28/16.
 */

var stage;
const ENEMIES_COUNT = 5;

function init() {
    stage = new createjs.Stage("demoCanvas");

    var objects = addAssets();
    console.log("objects: " + objects);
    applyAnimations(objects);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

function addAssets() {
    var objects = [];

    for (var i = 0; i < ENEMIES_COUNT; i++) {
        var circle = new createjs.Shape();
        circle.graphics.beginFill("rgb(255,0,0)").drawRoundRect(0, 0, 50, 35, 10);
        circle.x = 0;
        circle.y = 0;

        objects.push(circle);
    }

    objects.forEach(function (object){
        stage.addChild(object);
    });

    return objects;
}

function applyAnimations(objects) {
    objects.forEach(function (object, index) {
        object.y = 60 * index;

        createjs.Tween.get(object, {loop: true})
            .to({x:400}, 3000 / (index + 1), createjs.Ease.getPowInOut(2))
            .to({x:0}, 2000 / (index + 1), createjs.Ease.getPowInOut(2));
    });
}