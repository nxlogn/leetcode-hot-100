class MinStack {

    // 主栈：存放所有数据
    private stack: number[];
    // 辅助栈：存放单调递减的最小值
    private minStack: number[];

    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(val: number): void {
        this.stack.push(val);

        // 核心逻辑
        // 如果辅助栈为空,或者新元素 <= 当前最小值,则将其推入辅助栈
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }

    pop(): void {
        // 从主栈弹出
        const val = this.stack.pop();

        // 如果弹出的值等于当前的最小值，辅助栈也要弹出
        if (val === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
    }

    top(): number {
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        return this.minStack[this.minStack.length - 1];
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */