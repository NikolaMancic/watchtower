var Watchtower = function(ox, oy, cx, cy, r, s) {
    'use strict';

    this.origin = {x: ox, y: oy};
    this.spotlight = {x: cx, y: cy, r: r};

    this.speed = s || 1;
    this.pathIndex = 0;
    this.patrolPath = [{x: cx, y: cy}];
    this.direction = -1;
};

Watchtower.prototype.nextDestination = function() {
    'use strict';

    // change direction when reaching either end of the array
    if(this.pathIndex == 0 || this.pathIndex == this.patrolPath.length - 1) {
        this.direction *= -1;
    }

    this.pathIndex += this.direction;

    var dx = this.patrolPath[this.pathIndex].x - this.spotlight.x;
    var dy = this.patrolPath[this.pathIndex].y - this.spotlight.y;

    var distance = Math.sqrt(dx * dx + dy * dy);

    this.moves = distance / this.speed;

    this.unitsX = dx / this.moves;
    this.unitsY = dy / this.moves;
};

Watchtower.prototype.move = function() {
    'use strict';

    if(this.moves > 0) {
        this.spotlight.x += this.unitsX;
        this.spotlight.y += this.unitsY;

        this.moves -= this.speed;
    } else {
        this.nextDestination();
    }
};

Watchtower.prototype.getAngle = function() {
    'use strict';

    var dx = this.spotlight.x - this.origin.x;
    var dy = this.spotlight.y - this.origin.y;

    this.distance = Math.sqrt(dx * dx + dy * dy);

    var angle = Math.atan2(dy, dx) * 180 / Math.PI;

    // make sure angle is always positive
    angle = angle < 0 ? 360 + angle : angle;

    return angle;
};

Watchtower.prototype.drawLight = function() {
    'use strict';

    var angle = this.getAngle();

    var tangentAngle1 = (angle + 90) * Math.PI / 180;
    var tangentAngle2 = (angle - 90) * Math.PI / 180;

    var arcAngle = angle * Math.PI / 180;

    var tangent1 = {
        x: this.spotlight.x + this.spotlight.r * Math.cos(tangentAngle1),
        y: this.spotlight.y + this.spotlight.r * Math.sin(tangentAngle1)
    };
    var tangent2 = {
        x: this.spotlight.x + this.spotlight.r * Math.cos(tangentAngle2),
        y: this.spotlight.y + this.spotlight.r * Math.sin(tangentAngle2)
    };

    var arcPoint = {
        x: this.spotlight.x + this.spotlight.r * Math.cos(arcAngle),
        y: this.spotlight.y + this.spotlight.r * Math.sin(arcAngle)
    };

    var gradient = ctx.createRadialGradient(this.origin.x, this.origin.y, 0,
                                            this.origin.x, this.origin.y, this.spotlight.r + this.distance);
    gradient.addColorStop(0, 'rgba(255, 255, 150, 0.2');
    gradient.addColorStop(1, 'rgba(255, 255, 150, 0.0');

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(tangent1.x, tangent1.y);
    ctx.lineTo(this.origin.x, this.origin.y);
    ctx.lineTo(tangent2.x, tangent2.y);
    ctx.arcTo(arcPoint.x, arcPoint.y, tangent1.x, tangent1.y, this.spotlight.r);
    ctx.fill();
    ctx.closePath();
};

Watchtower.prototype.drawSpotlight = function() {
    'use strict';

    var angle = this.getAngle();

    var sprite;
    // find which 8th of 360 degrees the angle is in
    // adding 15 degrees make the transitions look better
    switch (Math.floor((angle + 15) / 45)) {
        case 0:
        case 8: // a consequence of adding 15 degrees
            sprite = sprites.spotlightE;
            break;
        case 1:
            sprite = sprites.spotlightSE;
            break;
        case 2:
            sprite = sprites.spotlightS;
            break;
        case 3:
            sprite = sprites.spotlightSW;
            break;
        case 4:
            sprite = sprites.spotlightW;
            break;
        case 5:
            sprite = sprites.spotlightNW;
            break;
        case 6:
            sprite = sprites.spotlightN;
            break;
        case 7:
            sprite = sprites.spotlightNE;
            break;
        default:
            sprite = sprites.tower;
    }

    ctx.drawImage(sheet,
                  sprite.x * SIZE, sprite.y * SIZE, SIZE, SIZE,
                  this.origin.x - 16, this.origin.y - 16, SIZE, SIZE);
};
