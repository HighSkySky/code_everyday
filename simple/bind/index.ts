// bind 接受两段参数：
// 1. thisArg 原函数运行时的 this 指向
// 2. arg1, arg2... 在绑定函数调用时，这些参数会提前作为实参传递给绑定的函数 
// 返回由指定的this值和初始化参数改造的原函数拷贝
Function.prototype.bind = function (obj, ...args) {
  const context = this;
  const bound = function (...newArgs: any[]) {
    return context.apply(obj, ...args, ...newArgs);
  }

  // bound 继承原函数的原型
  bound.prototype = Object.create(this.prototype);

  return bound;
}