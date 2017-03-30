module.exports = function (proto, extension, ignore) {
    var enames = Object.getOwnPropertyNames(extension).concat(ignore || [])
    var pnames = Object.getOwnPropertyNames(proto).filter(function (p) {return !~enames.indexOf(p)})
    pnames.forEach(function (p) { Object.defineProperty(extension, p, Object.getOwnPropertyDescriptor(proto, p)) })
    return extension
}
