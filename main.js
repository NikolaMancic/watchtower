function drawBackground() {
    'use strict';

    for (var col = 0; col < (W / SIZE); col++) {
        for (var row = 0; row < (H / SIZE); row++) {
            drawSprite(bgCtx, sprites.sand, col, row)
        }
    }

    for(var i = 1; i < 14; i++) {
        drawSprite(bgCtx, sprites.fenceN, i, 0);
        drawSprite(bgCtx, sprites.fenceS, i, 11);
    }

    for(var i = 1; i < 11; i++) {
        drawSprite(bgCtx, sprites.fenceW,  0, i);
        drawSprite(bgCtx, sprites.fenceE, 14, i);
    }

    drawSprite(bgCtx, sprites.fenceNW,  0, 0);
    drawSprite(bgCtx, sprites.fenceNE, 14, 0);
    drawSprite(bgCtx, sprites.fenceSW,  0, 11);
    drawSprite(bgCtx, sprites.fenceSE, 14, 11);

    drawSprite(bgCtx, sprites.tower,  2, 2);
    drawSprite(bgCtx, sprites.tower, 12, 2);
    drawSprite(bgCtx, sprites.tower,  2, 9);
    drawSprite(bgCtx, sprites.tower, 12, 9);
}

function draw() {
    'use strict';

    ctx.drawImage(bgCanvas, 0, 0);

    // draw light beams
    topLeft.drawSpotlight();
    topRight.drawSpotlight();
    bottomLeft.drawSpotlight();
    bottomRight.drawSpotlight();

    // darken background
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // draw light beams
    topLeft.drawLight();
    topRight.drawLight();
    bottomLeft.drawLight();
    bottomRight.drawLight();
}

function update() {
    'use strict';

    topLeft.move();
    topRight.move();
    bottomLeft.move();
    bottomRight.move();

    draw();

    window.requestAnimationFrame(update);
}

var topLeft     = new Watchtower(80,  80,  30,  200, 10);
var topRight    = new Watchtower(400, 80,  360, 180, 20);
var bottomLeft  = new Watchtower(80,  304, 200, 350, 30);
var bottomRight = new Watchtower(400, 303, 320, 325, 40);

topLeft.patrolPath.push({x: 180, y: 180});
topLeft.patrolPath.push({x: 180, y: 30});

topRight.patrolPath.push({x: 300, y: 160});
topRight.patrolPath.push({x: 240, y: 60});

bottomLeft.patrolPath.push({x: 180, y: 260});
bottomLeft.patrolPath.push({x: 80, y: 200});

bottomRight.patrolPath.push({x: 360, y: 250});
bottomRight.patrolPath.push({x: 450, y: 260});


sheet.addEventListener('load', function() {
    'use strict';

    drawBackground();
    update();
});
sheet.src = 'watchtower.png';
