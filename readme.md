# qb-extend-flat

[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][npm-url]
[![dependencies][proddep-image]][proddep-link]
[![dev dependencies][devdep-image]][devdep-link]
[![code analysis][code-image]][code-link]


[npm-image]:       https://img.shields.io/npm/v/qb-extend-flat.svg
[downloads-image]: https://img.shields.io/npm/dm/qb-extend-flat.svg
[npm-url]:         https://npmjs.org/package/qb-extend-flat
[proddep-image]:   https://www.bithound.io/github/quicbit-js/qb-extend-flat/badges/dependencies.svg
[proddep-link]:    https://www.bithound.io/github/quicbit-js/qb-extend-flat/master/dependencies/npm
[devdep-image]:    https://www.bithound.io/github/quicbit-js/qb-extend-flat/badges/devDependencies.svg
[devdep-link]:     https://www.bithound.io/github/quicbit-js/qb-extend-flat/master/dependencies/npm
[code-image]:      https://www.bithound.io/github/quicbit-js/qb-extend-flat/badges/code.svg
[code-link]:       https://www.bithound.io/github/quicbit-js/qb-extend-flat

A tiny function that takes a brutally flat approach to prototype 
inheritance.  

If you want to  inherit the properties (functions, accessors, etc) from one prototype into 
another, but have made the decision to avoid prototype chains, then
qb-extend-flat could be your friend.  It efficiently 
pancakes missing properties from one object onto another.

**Complies with the 100% test coverage and minimum dependency requirements** of 
[qb-standard](http://github.com/quicbit-js/qb-standard) . 

# Install

    npm install qb-extend-flat
    
# Usage

    var extend = require('qb-extend-flat')
    
    var childProto = extend( parentProto, {
        aFunction: function () {...},
        get anAccessor() {...},
        set aMutator() {...},
        //...
    })
    
... copies parentProto own properties *that don't exist in the given object literal*
onto the object literal and returns it\*.  Of course, this will create a broken
object if functions
are calling up the prototype chain using Object.getPrototypeOf(), super(), and the like - in which case
this may not be the function for you - unless you want to flatten your classes out and start migrating
towards functional.  

qb-extend-flat along with a handful of conventions can work well for light-weight static OOP needs in 
ES5.  The code can be *almost* as concise and simple as ES6 code:

ES6
```js
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
        constructor (x, y, radius) {
            super(x, y)
            this.radius = radius
        }
        draw (context) {
            //...
        }
        rotate (context, degrees) {
            // nothing to do for circle
        }
    }
```

ES5 with extend:
```js
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
        draw: function (context) {
            //...
        },
        rotate: function (context, degrees) {
            // nothing to do for circle
        },
    })
```

The resulting instantiated object can simpler to understand since it's just one prototype level
deep.  It can help with debugging.  

If you have deep class hierarchies, using qb-extend-flat may help with performance 
as well, though we havent tested this across different engines.  
If you use flat extension and it does help performance, we would love to hear about it.

\* Note that qb-extend-flat does not copy Symbols.

# This doesn't work for OOP!  What about object types and instanceof?  What about super()?

**Warning** - *Here I share some personal perspectives and biases.  No offense intended
to engineers and designers and academics out there who feel differently!*

Well, mixing types and function inheritance is a big can of worms.  It's a flawed
system for the simple reason that *behavior hierarchies, state hierarchies, and
type hierarchies (both semantic and constraint) are 
are only indirectly related.  They are not the same thing!*  I have found that this inconvenient truth 
likes to make itself known most often on large and expensive projects after much
of the type and behavior couplings have been laid down and built upon.  

"Hang on,
it seems like the methods we want are in that super-class, but we can't 
say that this is one of those types, can we?  That would be weird..."  

or 

"Huh.  This is 
clearly XYZ type, so why are most of the XYZ methods so not useful for it..."  

or

"Oh.  Looks like we need to create a dummy for that (state) in this case - make sure
that we handle the dummy specially now thoughout the system."

With more use, we find we need to break out more small responsibilities 
into ever-smaller interface
contracts until it starts to seem that it would be
easier if all those useful functions weren't burdened with type and design responsibility...

"*What if all those interfaced methods were just functions?*  We wouldn't maintain 
interface declarations or hold mind-bending type design
sessions, we could simply define these functions and, if they were pure, 
they could be swapped out
without major disruption to the design... and hey, these are much easier to test, why
in the world were we mocking all those classes when all we had to do was
test the functions?!!"

So yeah, my journey to the functional side of programming coincided
with shattered hope and perhaps some anger I felt toward a system that had failed me - but
before you start thinking that I've gone over to the dark side, first consider that the
the Sith had nothing to do with the transformation.  

Anyway, when I do use prototypes and objects, I prefer create a type system 
with property labels and other simple structures
tacked onto prototypes - which can 
be changed in any number of different ways *without simultaneously altering 
state or behavior inheritance pathways*

I could go on and into more detail, but I really need to get back to building something, and this is such 
a tiny function, it hardly seems worth all this readme text...