// 递归 for in 拷贝法
// 缺点 不能拷贝 function， Regex等特殊对象, 不能解决循环引用的问题
{
  const deepClone = (obj) => {
    const isArray = Array.isArray(obj)
    const cloneObj = isArray ? [] : {}
    for (let key in obj) {
      cloneObj[key] = typeof obj[key] === 'object'
      ? deepClone(obj[key])
      : obj[key]
    }
    return cloneObj
  }
}

// 序列化反序列方法
// 缺点： function 等特殊对象在转化为JSON的时候会丢失
// 循环引用会在转JSON的时候报错
// 只适用于已知对象与结构的拷贝
{
  const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj))
  }
}

// h5 结构化克隆算法
// 优点
// 可以复制 Regex, Blob, File, FileList等特殊对象
// 恶意正确的复制有循环引用的对象
// 缺点
// 无法复制 Function, Error, DOM对象
// 对象的特殊参数会丢失
// 原型链上的属性不会被追踪以及复制

// 利用 history API 实现结构化克隆 (未验证)
{
  const deepClone = (obj) => {
    const oldState = history.state
    history.replaceState(obj, document.title)
    const copy = history.state
    history.replaceState(oldState, document.title)
    return copy
  }
}

// 利用 WeekMap 解决循环引用
{
  const deepClone = (obj, hash = new WeakMap()) => {
    if (typeof obj !== 'object') return obj
    if (hash.has(obj)) return hash.get(obj)

    const cloneObj = Array.isArray(obj) ? [] : {}
    hash.set(obj, cloneObj)

    const result = Object.keys(obj).map(key => {
      cloneObj[key] = deepClone(obj[key], hash)
    })
    return cloneObj
  }
}