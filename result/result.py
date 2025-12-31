import matplotlib.pyplot as plt
import numpy as np

# 数据
datasets = ['Cora', 'PubMed', 'Arxiv', 'Products']
iterations_1 = [0.8419, 0.9511, 0.6088, 0.6849]
iterations_2 = [0.8566, 0.9548, 0.7242, 0.7423]
iterations_3 = [0.8423, 0.9014, 0.7499, 0.7795]

# 计算整体最大/最小值，用于动态设置Y轴
max_acc = max(iterations_1 + iterations_2 + iterations_3)
min_acc = min(iterations_1 + iterations_2 + iterations_3)

# 设置字体
plt.rcParams['font.sans-serif'] = ['DejaVu Sans', 'Arial', 'sans-serif']
plt.rcParams['font.family'] = 'sans-serif'
plt.rcParams['axes.unicode_minus'] = False
plt.rcParams['axes.labelsize'] = 14
plt.rcParams['axes.titlesize'] = 16
plt.rcParams['xtick.labelsize'] = 12
plt.rcParams['ytick.labelsize'] = 12
plt.rcParams['legend.fontsize'] = 12

# 创建图形（加宽以容纳右侧差值箭头）
fig, ax = plt.subplots(figsize=(12, 7))

x = np.arange(len(datasets))
width = 0.25

# 增加柱子间隙
pos1 = x - width - 0.05
pos2 = x
pos3 = x + width + 0.05

# 绘制柱子
bars1 = ax.bar(pos1, iterations_1, width, label='1 iteration', color='#1f77b4', edgecolor='black', linewidth=1)
bars2 = ax.bar(pos2, iterations_2, width, label='2 iterations', color='#ff7f0e', edgecolor='black', linewidth=1)
bars3 = ax.bar(pos3, iterations_3, width, label='3 iterations', color='#2ca02c', edgecolor='black', linewidth=1)

# 添加数值标签（四位小数）
for bar in bars1 + bars2 + bars3:
    height = bar.get_height()
    ax.text(bar.get_x() + bar.get_width() / 2, height + 0.002,
            f'{height:.4f}', ha='center', va='bottom', fontsize=10)

# 👑 标记每组最高值（注意：如果有并列最高，只标记第一个）
for i in range(len(datasets)):
    vals = [iterations_1[i], iterations_2[i], iterations_3[i]]
    max_val = max(vals)
    if iterations_1[i] == max_val:
        pos = pos1[i] + width / 2
    elif iterations_2[i] == max_val:
        pos = pos2[i] + width / 2
    else:
        pos = pos3[i] + width / 2

# 差值标注：箭头放在每组右侧，避免遮挡柱子
for i in range(len(datasets)):
    vals = [iterations_1[i], iterations_2[i], iterations_3[i]]
    min_val = min(vals)
    max_val = max(vals)
    diff = max_val - min_val
    if diff > 0.005:  # 只显示明显差异
        arrow_x = x[i] + width * 1.8  # 右侧偏移
        ax.annotate('', xy=(arrow_x, min_val), xytext=(arrow_x, max_val),
                    arrowprops=dict(arrowstyle='<->', color='red', lw=1.5))
        mid_y = (min_val + max_val) / 2
        ax.text(arrow_x + 0.05, mid_y, f'{diff:.3f}',
                ha='left', va='center', fontsize=10, color='red', fontweight='bold')

# 坐标轴设置
ax.set_xlabel('Dataset', fontsize=14)
ax.set_ylabel('Accuracy', fontsize=14)
ax.set_xticks(x)
ax.set_xticklabels(datasets)

# 动态Y轴范围：底部略低于最小值，顶部留足空间给标注
ax.set_ylim(min_acc - 0.01, max_acc + 0.08)

# 网格 + 图例
ax.grid(True, axis='y', linestyle='--', alpha=0.6)
ax.legend(loc='upper right', frameon=True, fancybox=True)

plt.tight_layout()
plt.savefig('accuracy_iterations_fixed.png', dpi=300, bbox_inches='tight')
plt.show()