function dailyTemperatures(temperature: number[]): number[] {
    const n = temperature.length;

    // 初始化结果数组
    const answer: number[] = new Array(n).fill(0);
    // 定义一个栈，用来存储温度在数组中的下标
    const stack: number[] = [];

    for (let i = 0; i < n; i++) {
        const currentTemp = temperature[i];

        // 当前栈不为空，且当前温度大于栈顶索引对应的温度时
        while (stack.length > 0 && currentTemp > temperature[stack[stack.length - 1]]) {
            // 弹出栈顶索引
            const prevIndex = stack.pop()!;
            // 计算等待的天数：当前天数 - 之前的那一天
            answer[prevIndex] = i - prevIndex;
        }

        // 将当前当天的索引入栈
        stack.push(i);
    }

    return answer;
}