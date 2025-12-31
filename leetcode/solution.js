const rl = require("readline").createInterface({input: process.stdin, output: process.stdout});
const iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function solution(){
    let line = await readline();
    let input = line.trim().split(' ').map(Number);
    
    


    // 结束流
    rl.close();
}();