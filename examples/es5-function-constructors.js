// extend in ES5 with traditional stand-alone function constructors
// line up the examples and switch quickly between them to see the slight changes.
var extend = require('..')

function Shape (x, y) {
    this.x = x
    this.y = y
}
Shape.prototype = {
    constructor: Shape,
    moveTo (x, y) {
        this.x = x
        this.y = y
    },
    move (x, y) {
        this.x += x
        this.y += y
    }
    // more methods...
}

function Circle (x, y, radius) {
    Shape.call(this, x, y)
    this.radius = radius
}
Circle.prototype = extend(Shape.prototype, {
    draw: function (out) {
        out('circle, radius ' + this .radius + ' at [' + this.x + ', ' + this.y + ']' )
    },
    rotate: function (context, degrees) {
        // nothing to do for circle
    },
})

var circle = new Circle(3, 2, 10)
circle.draw(console.log)