function bindCallbacks () {
  var instance = arguments[0]
  if (!instance) {
    throw new TypeError('bindCallbacks: instance not provided')
  }
  instance.callbacks = {}
  var i = 1
  var l = arguments.length
  var functionName
  var functionInstance
  for (i; i < l; ++i) {
    functionName = arguments[i]
    functionInstance = instance[functionName]
    if (!functionInstance) {
      throw new TypeError('bindCallbacks: one of the arguments is not a valid function name')
    }
    instance.callbacks[functionName] = functionInstance.bind(instance)
  }
}

module.exports = bindCallbacks
