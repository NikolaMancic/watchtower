var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var W = canvas.width;
var H = canvas.height;

var bgCanvas = document.createElement('canvas');
bgCanvas.width = W;
bgCanvas.height = H;
var bgCtx = bgCanvas.getContext('2d');

var sheet = new Image();
var SIZE = 32;

var sprites = {
    sand        : {x: 1, y: 1 },
    tower       : {x: 4, y: 1 },
    spotlightNW : {x: 3, y: 0 },
    spotlightN  : {x: 4, y: 0 },
    spotlightNE : {x: 5, y: 0 },
    spotlightE  : {x: 5, y: 1 },
    spotlightSE : {x: 5, y: 2 },
    spotlightS  : {x: 4, y: 2 },
    spotlightSW : {x: 3, y: 2 },
    spotlightW  : {x: 3, y: 1 },
    fenceNW     : {x: 0, y: 0 },
    fenceN      : {x: 1, y: 0 },
    fenceNE     : {x: 2, y: 0 },
    fenceE      : {x: 2, y: 1 },
    fenceSE     : {x: 2, y: 2 },
    fenceS      : {x: 1, y: 2 },
    fenceSW     : {x: 0, y: 2 },
    fenceW      : {x: 0, y: 1 }
};

function drawSprite(context, sprite, destX, destY) {
    'use strict';

    context.drawImage(sheet,
                      sprite.x * SIZE, sprite.y * SIZE, SIZE, SIZE,
                      destX * SIZE, destY * SIZE, SIZE, SIZE);
}
