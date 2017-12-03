'use strict'

const expect = require('chai').expect
const bindCallbacks = require('../')

class TestObject {
  constructor () {
    this.a = 1
  }
  increment () { this.a++ }
  decrement () { this.a-- }
}

describe('bindCallbacks', function () {
  let obj = new TestObject()

  it('works when instance methods exist', function () {
    expect(() => { bindCallbacks(obj, 'increment', 'decrement') }).to.not.throw()
  })

  it('throws when instance methods do not exist', function () {
    expect(() => { bindCallbacks(obj, 'increment', 'augment') }).to.throw(TypeError)
  })

  it('throws when context is undefined', function () {
    expect(() => { bindCallbacks(undefined, 'increment', 'decrement') }).to.throw(TypeError)
  })

  it('keeps context when deferring calls to bound methods', function (done) {
    bindCallbacks(obj, 'increment')
    setTimeout(obj.callbacks.increment, 1)
    setTimeout(() => {
      expect(obj.a).to.eq(2)
      done()
    }, 10)
  })
})
