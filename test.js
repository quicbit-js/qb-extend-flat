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
