const canvas = document.getElementById('mycanvas');

const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight,
});

const texture = PIXI.Texture.from('image/ball.png');
const img = new PIXI.Sprite(texture);

img.x = app.renderer.width / 2;
img.y = app.renderer.height / 2;

img.anchor.x = 0.5;
img.anchor.y = 0.5;

app.stage.addChild(img);

app.ticker.add(() => {
    img.rotation += 0.01;
});
