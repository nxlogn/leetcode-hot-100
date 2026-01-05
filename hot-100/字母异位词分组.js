/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    // strs本身就是空的
    if (strs.length === 0) return [['']];

    // 存储不同字母异位词
    const mp = new Map();

    // 遍历strs
    for (let str of strs) {
        // 按照字母序排序，再比较
        const sortedStr = str.split('').sort().join('');
        if (mp.has(sortedStr)) {
            mp.get(sortedStr).push(str);
        } else {
            mp.set(sortedStr, [str]);
        }
    }

    // 最后返回mp.values()
    return [...mp.values()];
};
