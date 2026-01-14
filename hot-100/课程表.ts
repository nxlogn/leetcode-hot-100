function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    // 初始化数据结构
    // 入度数组，索引是课程id，值是先修课数量
    const inDegree = new Array(numCourses).fill(0);
    // 邻接表，索引是课程id，值是依赖它的后续课程列表
    const adj: number[][] = new Array(numCourses).fill(0).map(() => []);

    // 构建图
    for (const [course, pre] of prerequisites) {
        // pre -> course
        adj[pre].push(course);
        inDegree[course]++;
    }

    // 将所有入度为0的节点放入队列
    const queue: number[] = [];
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    // 开始bfs
    let count = 0; // 记录已完成的课程数量

    while (queue.length > 0) {
        const current = queue.shift()!;
        count++;

        // 遍历这门课解锁的后续课程
        for (const nextCourse of adj[current]) {
            inDegree[nextCourse]--;

            if (inDegree[nextCourse] === 0) {
                queue.push(nextCourse);
            }
        }
    }

    // 如果完成的课程数等于总课程数
    return count === numCourses;
};