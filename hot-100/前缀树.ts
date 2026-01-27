class Trie {
    // 使用对象来映射字符到子节点
    private children: { [key: string]: Trie };
    // 标记当前节点是否为单词的结尾
    private isEnd: boolean;

    constructor() {
        this.children = {};
        this.isEnd = false;
    }

    insert(word: string): void {
        let node: Trie = this;
        for (const char of word) {
            // 如果子节点不存在,创建一个新的 Trie 实例作为子节点
            if (!node.children[char]) {
                node.children[char] = new Trie();
            }
            // 向下移动
            node = node.children[char];
        }
        // 标记单词结束
        node.isEnd = true;
    }

    search(word: string): boolean {
        let node: Trie = this;
        for (const char of word) {
            // 如果路径断了，说明单词不存在
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        // 只有当 isEnd 为 true 时，才算完全匹配
        return node.isEnd;
    }

    startsWith(prefix: string): boolean {
        let node: Trie = this;
        for (const char of prefix) {
            // 如果路径断了，说明前缀不存在
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        // 只要前缀能走通，就返回 true
        return true;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */