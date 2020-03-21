const canvas = document.getElementById('mycanvas');

let etat = 0;
let jumpValue = 20;

const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight,
});

app.stage.interactive = true;
app.stage.addListener('pointerdown', onTouchStart);

function create_sprite(pathfile) {
    const texture = PIXI.Texture.from(pathfile);
    const sprite = new PIXI.Sprite(texture);
    sprite.x = 0;
    sprite.y = 0;
    sprite.anchor.x = 0;
    sprite.anchor.y = 0;
    app.stage.addChild(sprite);
    return (sprite);
}

let sky = create_sprite('Sky.png');
let buildings = create_sprite('buildings.png');
let graph = create_sprite('wall_graph.png');
let road = create_sprite('road.png');
let spead = window.innerWidth / 150;
let player = create_sprite('monster.png');

player.x = app.view.width / 3;
player.y = app.view.height / 1.22;

function onTouchStart() {
    etat = 1;
};

app.ticker.add(() => {
    if (etat === 1) {
        player.y -= jumpValue;
        jumpValue -= 0.8;
    }
    if (player.y >= app.view.height / 1.22) {
        etat = 0;
        player.y = app.view.height / 1.22;
        jumpValue = 20;
    }
    if (sky.x < -1920)
        sky.x = 0;
    if (buildings.x < -1920)
        buildings.x = 0;
    if (graph.x < -(1920*2))
        graph.x = 0;
    if (road.x < -1920)
        road.x = 0;
    sky.x -= spead / 2;
    buildings.x -= spead / 1.8;
    graph.x -= spead / 1.4;
    road.x -= spead;
});