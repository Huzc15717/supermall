export function debounce(func, delay) {
    let timer = null;
    // 防抖动代码，定义延时处理方法，在触发前，如果又触发了这个方法，就会删除上一次的延时处理，重新生成新的延时处理方法
    return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}