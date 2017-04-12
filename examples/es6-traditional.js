// example using ES6 regular class contruction - just for comparison
// line up the examples and switch quickly between them to see the slight changes.



class Shape {
    constructor (x, y) {
        this.x = x
        this.y = y
    }
    moveTo (x, y) {
        this.x = x
        this.y = y
    }
    move (x, y) {
        this.x += x
        this.y += y
    }
    // more methods...
}

class Circle extends Shape {
    constructor(x, y, radius) {
        super(x, y)
        this.radius = radius
    }
    draw (out) {
        out('circle, radius ' + this .radius + ' at [' + this.x + ', ' + this.y + ']' )
    }
    rotate (context, degrees) {
        // nothing to do for circle
    }
}

var circ = new Circle.constructor(3, 2, 10)
circ.draw(console.log)
