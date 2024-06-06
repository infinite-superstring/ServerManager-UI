/**
 * 创建防抖函数
 * @param {Function}fun 需要防抖的函数
 * @param {Number}wait 防抖时间
 * @return {(function(...[*]): void)|*} 防抖的函数
 */
export const debounce = (fun, wait) => {
    let timer = null
    let flag = false;
    return function (...args) {
        clearTimeout(timer)
        function waitForExecution() {
            fun.apply(this, args)
        }
        if (flag){
            waitForExecution()
            flag = true
        }else{
            timer = setTimeout(waitForExecution, wait)
        }
    }
}
