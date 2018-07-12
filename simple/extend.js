// 类式继承
{
  function SuperClass() {
    this.superValue = true
  }

  SuperClass.prototype.getSuperValue = function () {
    return this.superValue
  }

  function SubClass() {
    this.subValue = false
  }

  SubClass.prototype = new SuperClass()
  SubClass.prototype.getSuperValue = function () {
    return this.subValue
  }

  console.log(SubClass instanceof SuperClass) // false
  console.log(SubClass.prototype instanceof SuperClass) // true
}

// 构造函数继承
{
  function SuperClass(id) {
    this.books = ['JavaScript', 'html', 'css']
    this.id = id
  }
  
  SuperClass.prototype.showBooks = function() {
    console.log(this.books)
  }
  
  function SubClass(id) {
    SuperClass.call(this, id)
  }
}

// 组合继承
{
  function SuperClass(name) {
    // 值类型共有属性
    this.name = name
    this.books = ['html', 'css', 'JavaScript']
  }
  
  SuperClass.prototype.getName = function () {
    console.log(this.name)
  }
  
  function SubClass(name, time) {
    SuperClass.call(this, name)
    this.time = time
  }
  
  SubClass.prototype = new SuperClass()
}

// 原型式继承
{
  function inheritObject(o) {
    function F() {}
    F.prototype = o;
    return new F()
  }
}

// 寄生式继承
{
  function inheritObject(o) {
    function F() {}
    F.prototype = o;
    return new F()
  }
  const book = {
    name: 'js book',
    alikeBook: ['css book', 'html book']
  }
  function createBook(obj) {
    const o = new inheritObject(obj)
    o.getName = function () {
      console.log(name)
    }
    return o
  }
}

// 寄生组合式继承
{
  function inheritObject(o) {
    function F() {}
    F.prototype = o;
    return new F()
  }
  function inheritPrototype(subClass, superClass) {
    const p = inheritObject(superClass.prototype)
    p.constructor = subClass
    subClass.prototype = p
  }
}

// 最优解
// 优点： 
// 1. 只调用一次SubperClass 
// 2. instanceof 和 isPrototypeOf 正常
{
  if (Object.create === undefined) {
    Object.create = function (obj) {
      function f() {}
      f.prototype = obj
      return f
    }
  }
  function SuperClass() {  }
  function SubClass() {
    SuperClass.call(this)
  }
  SubClass.prototype = Object.create(SuperClass.prototype)
}