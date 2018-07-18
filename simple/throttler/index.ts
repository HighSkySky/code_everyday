// 函数节流
// 确定函数的执行间隔，避免过多的执行

{
  window.addEventListener('resize', resizeThrottler, false);

  // setTimeOut 返回的是定时器的编号
  let resizeTimeout: number | null = null;

  function resizeThrottler() {
    if (resizeTimeout === null) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        actualResizeHandler();
        // 1000 / 30 = 66 , 约等于 30 帧
      }, 66);
    }
  }

  function actualResizeHandler() {
    // 在这里触发 resize 事件的回调
  }
}