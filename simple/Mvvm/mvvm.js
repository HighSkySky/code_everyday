export default class Mvvm {
  constructor(options = {}) {
    this.$options = options
    this._data = this.$options.data || {}
    this._vm = this._initMvvm()
    this._initObserve()
    return this._vm
  }

  _initMvvm() {
    return new Proxy(this, {
      get: (target, key, receiver) => {
        return  this[key] || this._data[key]
      },
      set: (target, key, value) => {
        return Reflect.set(this._data, key, value)
      }
    })
  }

  _initObserve() {
    this._data = observe(this._data)
  }
}

function observe(data) {
  if (!data || typeof data !== 'object') return data
  return new Observe(data)
}

class Observe {
  constructor(data) {
    for (let key in data) {
      data[key] = observe(data[key])
    }
    return this.proxy(data)
  }

  proxy(data) {
    return new Proxy(data, {
      get: (target, key, receiver) => {
        // 在这里触发发布
        return Reflect.get(target, key, receiver)
      },
      set: (target, key, value) => {
        // 在这里触发订阅
        return Reflect.set(target, key, observe(value))
      }
    })
  }
}
