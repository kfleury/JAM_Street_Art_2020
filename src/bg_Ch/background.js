const canvas = document.getElementById('mycanvas');

let etat = 0;
let jumpValue = 20;
const random_pos = [680, 760];
let value = 0;
let playerSheet = {};
let score = 0;
let over = 0;

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

function create_score(score) {
    let text = new PIXI.Text(score.toString(),{fontFamily : 'Arial', fontSize: 24, fill : 0x00ff00, align : 'center'});
    text.anchor.x = 0;
    text.anchor.y = 0;
    text.scale.x = 5;
    text.scale.y = 5;
    app.stage.addChild(text);
    return (text);
}


app.loader.add("player", "bart.png");

let sky = create_sprite('Sky.png');
let buildings = create_sprite('buildings.png');
let graph = create_sprite('wall_graph.png');
let road = create_sprite('road.png');
let spead = window.innerWidth / 150;
let player;
let obstacle = create_obstacle('pigeon.png');
let scoring = create_score(score);

function doneLoading(e) {
    createPlayerSheet();
    createPlayer();
}
doneLoading();
function createPlayerSheet() {
    let ssheet = new PIXI.BaseTexture(app.loader.resources["player"].url);
    let  w = 80;
    let h = 80;

    playerSheet["running"] = [
        new PIXI.Texture(ssheet, new PIXI.Rectangle(0 *w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(6 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(8 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(9 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(10 * w, 0, w, h)),
        new PIXI.Texture(ssheet, new PIXI.Rectangle(11 * w, 0, w, h)),
    ];
};

function createPlayer() {
    player = new PIXI.AnimatedSprite(playerSheet.running);
    player.anchor.set(0.5);
    player.animationSpeed = .3;
    player.loop = true;
    player.x = app.view.width / 3;
    player.y = app.view.height / 1.22;
    player.scale.set(2);
    app.stage.addChild(player);
    player.play();
    console.log("oui");
}

function onTouchStart() {
    etat = 1;
}

app.ticker.add(() => {
    if (obstacle.x > player.x && obstacle.x < player.x + 80)
        if (player.y < obstacle.y + 80 && player.y > obstacle.y - 80) {
            let game_over = new PIXI.Text("Game Over",{fontFamily : 'Arial', fontSize: 50, fill : 0x00ff00, align : 'center'});
            game_over.anchor.set(0.5);
            game_over.x = app.view.width / 2;
            game_over.y = app.view.height / 2;
            over = 1;
            player.x = -1000;
            obstacle.x = -1000;
            app.stage.addChild(game_over);
        }
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
    if (obstacle.x < -10 && over != 1) {
        obstacle.x = 1920;
        obstacle.y = getRandomPos(random_pos);
    }
    if (buildings.x < -1920)
        buildings.x = 0;
    if (graph.x < -(1920 * 2))
        graph.x = 0;
    if (road.x < -1920)
        road.x = 0;
    sky.x -= spead / 2;
    buildings.x -= spead / 1.8;
    graph.x -= spead / 1.4;
    road.x -= spead;
    if (score / 100 > 12) {
        obstacle.x -= score / 100;//spead / 0.4;
    } else {
        obstacle.x -= 12;
    }
    if (over === 0) {
        score += 1;
        scoring.text = score.toString(10);
    }
});
