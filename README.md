# bind-callbacks

[![Maintainability](https://api.codeclimate.com/v1/badges/2245618c05ace03257d9/maintainability)](https://codeclimate.com/github/pauloddr/bind-callbacks/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/2245618c05ace03257d9/test_coverage)](https://codeclimate.com/github/pauloddr/bind-callbacks/test_coverage)

Bind instance methods of a class to its own object and use them around without having to resort to `.bind(this)`.

## Disclaimer

This may be considered an [over-optimization technique](https://en.wikipedia.org/wiki/Program_optimization#When_to_optimize), and thus an anti-pattern. Use at your own risk.

## Usage

Consider the following ES6 class:

```javascript
class Thing {
  constructor (value) {
    this.value = value
  }
  increment () {
    this.value = this.value + 1
  }
}
```

If you want to call an instance method using things like `setTimeout`, callbacks in general, event emitters, and so on, you have to resort to `bind()` like this:

```javascript
var thing = new Thing(5)
setTimeout(thing.increment.bind(thing), 100)
```

If you don't use `.bind(thing)` in the code above, the value of `this` will be lost inside the `increment()` method.

However, `bind()` returns a __new function__, [as stated in its documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind). This causes memory allocation, giving more work to the garbage collector later on, and increasing the chance of memory leaks.

This component provides a function that will create a `callbacks` property inside the object instance and then store those bound functions for your code to call later:

```javascript
const bindCallbacks = require('bind-callbacks')

class Thing {
  constructor (value) {
    this.value = value
    bindCallbacks(this, 'increment') // <-- assign bound callbacks
  }
  increment () {
    this.value = this.value++
  }
}
```

So now you can use it like this:

```javascript
var thing = new Thing(5)
setTimeout(thing.callbacks.increment, 100)
```

And the value of `this` will work as expected inside the `increment()` function.

## License

MIT
