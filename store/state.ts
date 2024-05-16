//定义一个大写的State类型
export type State = {
  globalNum: number
  // 如有需要，可增加更多属性
}
// 实例化为state
export const state = reactive({ globalNum: 0 } as State)
// 定义修改属性值的方法
export const setGlobalNum = (num: number) => {
  state.globalNum = num
}
