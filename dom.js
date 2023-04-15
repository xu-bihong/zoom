//给DOM元素添加事件
export const addEvent = function (el, event, func) {
  if (el.attachEvent) {
    el.attachEvent(`on${event}`, func);
  } else {
    el.addEventListener(event, func);
  }
};
