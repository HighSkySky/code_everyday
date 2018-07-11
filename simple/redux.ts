// 手写简化版redux

interface IState {
  // 自定义state
}

interface IAction {
  type: string,
  [other: string]: any
}

interface IReducer {
  (state: IState | undefined, action: IAction): IState
}

interface IListener {
  (state: IState): void
}

class Store {
  public store = {};
  public listener: Array<IListener> = [];
  public reducer: IReducer;

  constructor (reducer: IReducer) {
    this.reducer = reducer;
  }

  subscribe = (fn: IListener): void => {
    this.listener.push(fn);
  }

  dispatch = (action: IAction) => {
    const store = this.reducer(this.store, action);
    if (store !== this.store) {
      this.store = store;
      this.listener.forEach(fn => fn(this.store));
    }
  }
}

function createStore(reducer: IReducer) {
  return new Store(reducer);
}

// note
// redux 编写顺序
// state => actionType => action => reducer => create store

// redux 事件流
// store.dispatch(action) => (middleware) => reducer(state, action)  => return new store

// reducer
// reducer 必须保证为纯函数，保证输入输出，对于有副作用的方法放在 middleware 中实现

// middleware
// middleware 的本质是重写dispatch方法
