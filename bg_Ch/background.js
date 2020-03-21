const canvas = document.getElementById('mycanvas');

const app = new PIXI.Application({
    view: canvas,
    width: window.innerWidth,
    height: window.innerHeight,
});

function create_sprite(pathfile) {
    const texture = PIXI.Texture.from(pathfile);
    const sprite = new PIXI.Sprite(texture);
    sprite.x = window.innerWidth - 1920;
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

app.ticker.add(() => {
    if (sky.x < -1920)
        sky.x = window.innerWidth - 1920;
    if (buildings.x < -1920)
        buildings.x = window.innerWidth - 1920;
    if (graph.x < -(1920*2))
        graph.x = window.innerWidth - 1920;
    if (road.x < -1920)
        road.x = window.innerWidth - 1920;
    sky.x -= 3;
    buildings.x -= 4;
    graph.x -= 6;
    road.x -= 9;
});