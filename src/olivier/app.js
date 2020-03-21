let app = new PIXI.Application({
        antialias: true,    // default: false
        transparent: false, // default: false
        forceCanvas: true,
        resolution: 1       // default: 1
    }
);

document.body.appendChild(app.view);

PIXI.loader
    .add("bart.png")
    .load(setup);

let skater;
let value;
let rectangle;
let texture;

function setup() {
    rectangle = new PIXI.Rectangle(0, 0, 65, 77);
    texture = PIXI.TextureCache["bart.png"];
    texture.frame = rectangle;
    skater = new PIXI.Sprite(texture);
    value = 0;
    skater.x = 200;
    skater.y = 200;
    app.stage.addChild(skater);
    app.renderer.render(app.stage);


    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    value += 1;
    if (value === 60) {
        rectangle.x += 80;
        value = 0;
    }
    if (rectangle.x === 880)
        rectangle.x = 0;
}