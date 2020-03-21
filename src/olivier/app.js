let app = new PIXI.Application({
    antialias: true,    // default: false
    transparent: false, // default: false
    forceCanvas: true,
    resolution: 1       // default: 1
  }
);

document.body.appendChild(app.view);

app.renderer.backgroundColor = 0xFF00FF;
app.renderer.autoResize = true;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.resize(window.innerWidth, window.innerHeight);
app.stage

PIXI.loader
  .add("bird.png")
  .add("bart.png")
  .load(setup);

let skater;
let value;
let rectangle;
let texture;

function setup() {
    let sprite = new PIXI.Sprite(
        PIXI.loader.resources["bird.png"].texture
    );
    app.renderer.resize(window.innerWidth, window.innerHeight);
    app.stage.addChild(sprite);
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
    /*skater.x += 10 + delta;
    if (skater.x > window.innerWidth)
        skater.x = 10;*/
    value += 1;
    if (value == 60) {
        rectangle.x += 80;
        value = 0;
    }
    if (rectangle.x == 880)
        rectangle.x = 0;
}