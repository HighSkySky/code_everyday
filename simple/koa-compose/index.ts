//  调用 app.use(fn) 之后， 会生成一个存放 middleware 的 array

function compose(middlewares: Function[]) {
  return function (context: any, next?: Function) {
    let index = -1;
    function dispatch(i: number) {
      // 确保 next() 在一个 middleware 中只调用一次
      if (i <= index) return Promise.reject(new Error('next() 只能调用一次'));
      // 在 index 保存当前执行的 middleware 的下标
      index = i;
      //  根据下标取出一个 middleware
      let fn: Function | undefined = middlewares[i];
      if (i === middlewares.length) fn = next;
      // 所有 middleware 调用结束之后，结束函数
      if (!fn) return Promise.resolve();
      try {
        // 在调用第一个 middleware 的时候(index = 0)，next 指向 middlewares[1]
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return dispatch(0);
  }
}

// 功能测试代码
{
  class App {
    private middlewares: Function[] = [];

    use(middleware: Function) {
      this.middlewares.push(middleware);
    }

    listen(port: number) {
      return compose(this.middlewares)({});
    }
  }

  const app = new App();
  app.use((ctx: any, next: Function) => {
    console.log(1);
    next();
    console.log(3);
  });
  app.use((ctx: any, next: Function) => {
    console.log(2);
    next();
  });
  app.listen(3000);

  // 输出顺序 1,2,3
}