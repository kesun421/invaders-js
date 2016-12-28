/**
 * Created by kesun on 12/28/16.
 */

var stage;

function init() {
    stage = new createjs.Stage("demoCanvas");

    var objects = addAssets();
    console.log("objects: " + objects);
    applyAnimations(objects);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", stage);
}

function addAssets() {
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);

    var circle1 = new createjs.Shape();
    circle1.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle1.x = 100;
    circle1.y = 100;
    stage.addChild(circle1);

    var circle2 = new createjs.Shape();
    circle2.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle2.x = 100;
    circle2.y = 100;
    stage.addChild(circle2);

    return [circle, circle1, circle2];
}

function applyAnimations(objects) {
    objects.forEach(function (object, index) {
        console.log(object + "," + index + ", " + (1000 / (index + 1)));
        createjs.Tween.get(object, {loop: true})
            .to({x:400}, (1000 / (index + 1)), createjs.Ease.getPowInOut(4))
            .to({alpha:0, y:175}, 500 / (index + 1), createjs.Ease.getPowInOut(2))
            .to({alpha:0, y:225}, 100 / (index + 1))
            .to({alpha:1, y:200}, 500 / (index + 1), createjs.Ease.getPowInOut(2))
            .to({x:100}, 800, createjs.Ease.getPowInOut(2));
    });

    // for (var object in objects) {
    //
    // }
}