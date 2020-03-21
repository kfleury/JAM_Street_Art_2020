const canvas = document.getElementById('mycanvas');

let etat = 0;
let jumpValue = 20;
const random_pos = [600, 800, 1000];
let value = 0;
let rectangle = new PIXI.Rectangle(0, 0, 65, 77);

const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight,
    antialias: true,
    transparent: false,
    forceCanvas: true,
    resolution: 1
});

app.stage.interactive = true;
app.stage.addListener('pointerdown', onTouchStart);

function getRandomPos(number) {
    let num = Math.floor(Math.random() * number.length);
    return number[num];
}

function create_obstacle(pathfile) {
    const texture = PIXI.Texture.from(pathfile);
    const sprite = new PIXI.Sprite(texture);
    sprite.x = 1920;
    sprite.y = getRandomPos(random_pos) + 100;
    sprite.anchor.x = 0;
    sprite.anchor.y = 0;
    sprite.scale.x = 0.1;
    sprite.scale.y = 0.1;
    app.stage.addChild(sprite);
    return (sprite);
}

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

function setup_player(pathfile) {
    const texture = new PIXI.Texture(pathfile, rectangle);
    const sprite = new PIXI.Sprite(texture);
    texture._updateUvs();
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
let player = setup_player('bart.png');
let obstacle = create_obstacle('pigeon.png');

player.x = app.view.width / 3;
player.y = app.view.height / 1.22;

function onTouchStart() {
    etat = 1;
}

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
    if (obstacle.x < 0) {
        obstacle.x = 1920;
        obstacle.y = getRandomPos(random_pos);
    }
    if (buildings.x < -1920)
        buildings.x = 0;
    if (graph.x < -(1920 * 2))
        graph.x = 0;
    if (road.x < -1920)
        road.x = 0;
    // sprite player
    value += 1;
    if (value === 60) {
        rectangle.x += 80;
        value = 0;
    }
    if (rectangle.x === 880)
        rectangle.x = 0;
    sky.x -= spead / 2;
    buildings.x -= spead / 1.8;
    graph.x -= spead / 1.4;
    road.x -= spead;
    obstacle.x -= spead / 0.4;
});
