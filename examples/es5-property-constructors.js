// example using extend and property constructors, similar to ES6 classes
// line up the examples and switch quickly between them to see the slight changes.
var extend = require('..')


var Shape = extend({}, {
    constructor: function Shape(x, y) {
        this.x = x
        this.y = y
    },
    moveTo (x, y) {
        this.x = x
        this.y = y
    },
    move (x, y) {
        this.x += x
        this.y += y
    }
    // more methods...
})

var Circle = extend(Shape, {
    constructor: function Circle (x, y, radius) {
        Shape.constructor.call(this, x, y)
        this.radius = radius
    },
    draw: function (out) {
        out('circle, radius ' + this .radius + ' at [' + this.x + ', ' + this.y + ']' )
    },
    rotate: function (context, degrees) {
        // nothing to do for circle
    },
})

var circle = new Circle.constructor(3, 2, 10)
circle.draw(console.log)
