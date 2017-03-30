var test = require('test-kit').tape()
var extend = require('.')

test('extend', function (t) {
    t.tableAssert([
        [ 'proto',         'extension',  'ignore',      'exp' ],
        [ {},              {},           null,          {} ],
        [ {a:0},           {},           'a',           {} ],
        [ {a:0},           {},           ['a'],         {} ],
        [ {a:0},           {},           ['b'],         {a:0} ],
        [ {a:0},           {},           null,          {a:0} ],
        [ {},              {a:0},        null,          {a:0} ],
        [ {a:1},           {a:1},        null,          {a:1} ],
        [ {a:1},           {a:2},        null,          {a:2} ],
        [ {a:1,b:7},       {a:2},        null,          {a:2,b:7} ],
        [ {a:1,b:7,c:8},   {a:2},        'b',           {a:2,c:8} ],
        [ {a:1,b:7,c:8},   {a:2},        ['b','c'],     {a:2} ],
        [ {a:1,b:7,c:8},   {a:2},        ['a','b','c'], {a:2} ],
    ], extend )
})

test('extend get/set', function (t) {
    var Extension = function Extension () {}
    var Proto = function Proto () {}
    var a = 'prop a'
    var b = function b () { return 'i am b!' }
    var overfn = function overfn() { return 'over fn' }

    var proto = {
        a: a,
        b: b,
        constructor: Proto,
        get c () { return this._c },
        set c (c) { this._c = c },
        get overget () { return 'orig get' },
        overfn: function over () { return 'orig fn' },
    }

    var extension = {
        constructor: Extension,
        get d () { return this._d },
        set d (d) { this._d = d },
        get overget () { return 'over get' },
        overfn: overfn,
    }

    var expect = {
        a: 'prop a',
        b: b,
        constructor: Extension,
        get c () { return this._c },
        set c (c) { this._c = c },
        get d () { return this._d },
        set d (d) { this._d = d },
        get overget () { return 'over get' },
        overfn: overfn,
    }

    var actual = extend(proto, extension)
    t.equal(actual.a, a, 'a')
    t.equal(actual.b, b, 'b')

    t.equal(actual._c, undefined, '_c unset')
    actual.c = 'C!'
    t.equal(actual._c, 'C!', '_c set')
    t.equal(actual.c, 'C!', 'c set')

    t.equal(actual._d, undefined, '_d unset')
    actual.d = 'D!'
    t.equal(actual._d, 'D!', '_d set')
    t.equal(actual.d, 'D!', 'd set')

    t.equal(actual.overget, 'over get', 'overget')
    t.equal(actual.overfn, overfn, 'overfn')

    t.end()
})

