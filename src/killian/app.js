const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
});

document.body.appendChild(app.view);

app.loader.add('bird', 'bird.png').load((loader, resources) => {
    const bird = new PIXI.Sprite(resources.bird.texture);

    bird.x = app.renderer.width / 2;
    bird.y = app.renderer.height / 2;

    bird.anchor.x = 0.5;
    bird.anchor.y = 0.5;

    app.stage.addChild(bird);

    app.ticker.add(() => {
        bird.rotation += 0.01;
    });
});
