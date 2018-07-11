import { createStore, IReducer, IState, IAction, Store } from './redux';


const reducer: IReducer = function (state, action) {
  return state as IState
}
const store = createStore(reducer);


const addTodo = function (actionType: string): IAction {
  return { type: actionType }
} 

// 定义一个log中间件
// 手动记录
{
  const action = addTodo('USE');
  console.log('dispatching', action)
  store.dispatch(action)
  console.log('next state', store.getState())
}

// 封装 Dispatch
{
  const action = addTodo('USE');
  function dispatchAndLog() {
    console.log('dispatching', action)
    store.dispatch(action)
    console.log('next state', store.getState())
  }
}

// 替换 Dispatch
{
  let next = store.dispatch
  store.dispatch = function dispatchAndLog(action) {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
}

// 封装为 Middleware
{
  const logger = (store: Store) => (next: Function) => (action: IAction) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
  // 接着使用 redux 提供的 applyMiddleware()
  // applyMiddleware() 作用在 createStore() 内
  // 所以不需要显示的传入 store ，构成闭包
  function applyMiddleware(middlewares: Function[]) {
    middlewares = middlewares.slice()
    middlewares.reverse()
    
    let dispatch = store.dispatch
    middlewares.forEach(middleware => dispatch = middleware(store)(dispatch))
  
    return { ...store, ...{ dispatch } }
  }
}