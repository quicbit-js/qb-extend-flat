module.exports = function (proto, obj, ignore) {
  var pproto = null
  if (proto) {
    pproto = Object.getPrototypeOf(proto)
    var onames = Object.getOwnPropertyNames(obj).concat(ignore || [])
    var pnames = Object.getOwnPropertyNames(proto).filter(function (p) { return !~onames.indexOf(p) })
    if (~onames.indexOf('constructor')) { obj.constructor.prototype = obj }
    pnames.forEach(function (p) { Object.defineProperty(obj, p, Object.getOwnPropertyDescriptor(proto, p)) })
  }
  Object.setPrototypeOf(obj, pproto)
  return obj
}
