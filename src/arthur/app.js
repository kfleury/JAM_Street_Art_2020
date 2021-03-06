let app;
let player;
let background;
let etat = 0;
let jumpValue = 20;

window.onload = function () {
    app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x0000ff
    });

    document.body.appendChild(app.view);

    background = new PIXI.Sprite.from("City1.png");
    background.anchor.set(0.5);
    background.x = app.view.width / 2;
    background.y = app.view.height / 2;

    app.stage.addChild(background);

    player = new PIXI.Sprite.from("monster.png");
    player.anchor.set(0.5, 0.5);
    player.x = app.view.width / 3;
    player.y = app.view.height / 1.25;

    app.stage.addChild(player);

    app.stage.interactive = true;
    app.stage.addListener('pointerdown', onTouchStart);

    function onTouchStart() {
        etat = 1;
    }

    app.start();

    app.ticker.add(() => {
        if (etat === 1) {
            player.y -= jumpValue;
            jumpValue -= 0.8;
        }
        if (player.y >= app.view.height / 1.25) {
            etat = 0;
            player.y = app.view.height / 1.25;
            jumpValue = 20;
        }
    });
}