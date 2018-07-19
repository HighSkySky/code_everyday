// 函数去抖
// 就是指函数延迟运行回调

{
  window.addEventListener('resize', resizeThrottler, false);

  // setTimeOut 返回的是定时器的编号
  let resizeTimeout: number | null = null;

  function resizeDebounce() {
    if (resizeTimeout !== null) {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        actualResizeHandler();
      }, 200);
    }
  }

  function actualResizeHandler() {
    // 在这里触发 resize 事件的回调
  }
}