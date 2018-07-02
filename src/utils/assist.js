/**
 * @description 判断参数是否是其中之一
 * @param {*} value
 * @param {*} valueList
 */
export const oneOf = (value, valueList) => {
    return valueList.some(item => item === value)
}
/**
 * @description 判断数据类型
 * @param {*} obj 
 */
export const typeOf = (obj) => {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}
/**
 * @description 深度克隆
 * @param {*} data 
 */
export const deepCopy = (data) => {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}

/**
 * @description 随机生成字符串
 */
export const uniqueId = () => {
    return Math.random().toString(36).substring(7)
}