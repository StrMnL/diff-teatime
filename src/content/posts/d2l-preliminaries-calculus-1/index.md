---
title: "机器学习中的微分"
description: "机器学习中优化问题的求解还需要用到一些微分知识。偏微分茶会终于开始求微分了吗？"
published: 2026-02-05
# updated: 2026-02-05
tags: [机器学习, 深度学习, 数学, 微分]
category: 笔记
series: "动手学深度学习"
draft: false
---

:::important[免责声明]
- **这是一篇笔记**，内容整理自《动手学深度学习》的 PyTorch 版本和该书的[在线课程](https://space.bilibili.com/1567748478)．
- 文中也包含一些个人理解，惟笔记作者认知水平有限，**内容难免有疏漏、模糊之处**．  
- 同时，由于文中使用的 Python 包仍在不断更新，所以本文和原书的内容都**可能会在某一天过时**．
- 总之，如果对部分内容存在疑问，请查阅原书或最新的社区内容和权威文档．
:::

机器学习中优化问题的求解还需要用到微分的知识（**优化**是指用模型拟合已知数据的过程，与之相对的是**泛化**，即让模型能够预测训练集以外的数据）．

下面引入一些必要的微分相关知识．

## 标量函数和向量函数

### 标量函数

设 $\R$ 为实数集．$\R ^n$ 为 $n$ 维实欧氏空间，其元素为 $n$ 维实向量．集合 $D$ 是 $\R^n$ 的任一非空子集．

若映射 $f:D \rightarrow \R$，则称 $f$ 为**标量函数**，记作 $y=f(\mathbf{x}),\; \mathbf{x}=(x_1,x_2,\dots,x_n)^\top\in D\subset\mathbb{R}^n$．

当 $n\geq 2$ 时，$f$ 也可称为 $n$ 元函数，统称**多元函数**．这种说法将 $n$ 维实向量的每个分量视作自变量，所以函数也可以记作 $y=f(x_1,x_2,\dots,x_n)$．

当 $n=1$ 时，$f$ 就是我们所熟知的一元函数．

### 向量函数

若映射 $\mathbf{f}:D \rightarrow \R^m$，其中 $m\geq 2$ ，则称 $\mathbf{f}$ 为向量函数，记为 $\mathbf{y}=\mathbf{f}(\mathbf{x}),\; \mathbf{x}=(x_1​,x_2,\dots,x_n​)^\top \in D$．

:::tip[提示]
简单来说，标量函数表示**输入一个 $n$ 维实向量**（或者说 $n$ 维空间中的一个点）**，输出一个实数**的映射关系；向量函数表示**输入一个 $n$ 维实向量，输出一个 $m$ 维实向量**的映射关系．
:::

:::tip[提示]
前一节提到的线性映射就是一个向量函数．
:::

## 导数与微分

导数与微分的定义、基本初等函数的求导结果和求导的四则运算法则等内容比较基础，在此不做赘述．这一部分可以参考高等数学或微积分的教材，**初等数学教材也可以**．

### 偏导数

简单来说，偏导数是多元函数仅关于**一个**自变量变化，而其它自变量不变时的变化率：

$$
\frac{\partial f(\mathbf{x})}{\partial x_i} = \lim_{\Delta x_i \to 0} \frac{f(x_{1},...,x_{i}+\Delta x_i,...,x_{n}) - f(x_{1},...,x_{i},...,x_{n})}{\Delta x_i}，
$$

其中 $\mathbf{x} = [x_1, x_2, \cdots, x_n]^\top$．

偏导数的定义其实是将多元函数退化为了一元函数，因此偏导数的运算法则和一元函数导数一致，求偏导时将其它自变量视作常数即可．

多元函数在某点存在偏导数时未必连续，而只能说明函数沿对应自变量的坐标轴方向连续．

### 亚导数

有一些一元函数在某些点上（或在整个定义域上）不可微．

对于任意的一元**下凸**函数，可以定义**亚导数**（或次导数），作为「广义导数」．

设 $f$ 是区间 $I$ 上的一元下凸函数，$x_0 \in I$；

若 $\exists \: a \in \R, \; s.t. \; \forall \: x \in I, \; f(x) \geq f(x_0​) + a(x − x_0​)$，则称实数 $a$ 为 $f$ 在 $x_0​$ 处的一个亚导数．

:::tip[提示]
定义中的不等式等价于
$
\begin{cases}
    a \geq \frac{f(x)-f(x_0)}{x-x_0}, & \forall \: x \lt x_0 \: , \\
    \quad \\
    a \leq \frac{f(x)-f(x_0)}{x-x_0}, & \forall \: x \gt x_0 \: .
\end{cases}
$

即 $a$ 要大于等于函数左侧任意一点到该点的割线斜率，并小于等于函数右侧任意一点到该点的割线斜率．
:::

根据定义，一个一元下凸函数在定义域上处处存在亚导数．由于函数的下凸性，可导点处的亚导数即为导数，而不可导点的亚导数不唯一，其取值范围是一个闭区间．

记区间 $I$ 上的一元下凸函数 $f(x)$ 在 $x_0 \in I$ 处的**所有亚导数的集合**为亚微分 $\partial f(x_0)$．

:::tip[提示]
对于一元**上凸**函数，只要将定义中的不等式改为 $f(x) \leq f(x_0​) + a(x − x_0​)$，即可定义上凸函数的亚导数．
:::

## 向量导数

将函数和导数推广到向量，考虑以下情况：

### 标量对向量求导

假设有 $n$ 维**列**向量 $\mathbf{x} = [x_1, x_2, \cdots, x_n]^\top$，标量函数 $f(\mathbf{x})$ 以 $\mathbf{x}$ 为自变量．

我们希望刻画标量 $f(\mathbf{x})$ 关于向量 $\mathbf{x}$ **各个**分量变化的一个「整体趋势」，因此我们计算标量对向量每个分量的偏导数，再将这些偏导数按对应向量分量的顺序写成一个新的**列**向量，与原向量的「结构」保持一致．

由此定义 $f(\mathbf{x})$ 对 $\mathbf{x}$ 的导数为：

$$
\frac{\partial f(\mathbf{x})}{\partial \mathbf{x}} = \nabla_{\mathbf{x}} f(\mathbf{x}) = \left[\frac{\partial f(\mathbf{x})}{\partial x_1}, \frac{\partial f(\mathbf{x})}{\partial x_2}, \cdots,\frac{\partial f(\mathbf{x})}{\partial x_n}\right]^\top.
$$

其中 $\nabla$ 是 $Nabla$ 算子，形式上 $\nabla_\mathbf{x} = \left[\frac{\partial}{\partial x_1}, \frac{\partial}{\partial x_2}, \cdots,\frac{\partial}{\partial x_n}\right]^\top$．

我们也将 $\nabla_{\mathbf{x}} f(\mathbf{x})$ 称为这个标量函数的**梯度**．

### 向量对标量求导

设有向量函数 $\mathbf{g}(t)$，其中标量 $t$ 为自变量，函数的输出是一个 $m$ 维列向量．

我们可以将输出向量的每一分量视为独立于其他分量的关于标量的函数：

$$
\mathbf{g}(t) = [g_1(t),g_2(t),\cdots,g_m(t)]^\top.
$$

于是，当我们希望刻画 $\alpha$ 关于 $x$ 变化的趋势时，我们将向量的每个分量当作标量函数分别对自变量求导，同样将结果按对应向量分量的顺序写成一个新的列向量．

定义 $\mathbf{g}(t)$ 对 $t$ 的导数为：

$$
\frac{\mathrm{d}\mathbf{g}(t)}{\mathrm{d}t} = \left[\frac{\mathrm{d}g_1(t)}{\mathrm{d}t},\frac{\mathrm{d}g_2(t)}{\mathrm{d}t},\cdots,\frac{\mathrm{d}g_m(t)}{\mathrm{d}t}\right]^\top.
$$

### 向量对向量求导

设有向量函数 $\mathbf{f(x)}$，其中 $\mathbf{x} = (x_1,x_2,\dots,x_m)^\top$，函数的输出为 $n$ 维**列**向量．

类似地，将输出的 $n$ 个分量视为关于 $\mathbf{x}$ 的独立标量函数：

$$
\mathbf{f(x)} = [f_1(\mathbf{x}),f_2(\mathbf{x}),\cdots,f_n(\mathbf{x})]^\top.
$$

依次求 $f_1(\mathbf{x}),f_2(\mathbf{x}),\cdots,f_n(\mathbf{x})$ 对 $\mathbf{x}$ 的导数，只不过这里将结果**写成行向量**，形成一个 $n\times m$ 矩阵：

$$
\frac{\partial \mathbf{f}}{\partial \mathbf{x}} = \begin{bmatrix}
\frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} & \dots & \frac{\partial f_1}{\partial x_m} \\
\frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} & \dots & \frac{\partial f_2}{\partial x_m} \\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial f_n}{\partial x_1} & \frac{\partial f_n}{\partial x_2} & \dots & \frac{\partial f_n}{\partial x_m}
\end{bmatrix}.
$$

这个矩阵称为 $Jacobi$ 矩阵．不过，机器学习中更习惯将向量对向量求导结果写成 $Jacobi$ 矩阵的转置：

$$
\frac{\partial \mathbf{f}}{\partial \mathbf{x}} = \begin{bmatrix}
\frac{\partial f_1}{\partial x_1} & \frac{\partial f_2}{\partial x_1} & \dots & \frac{\partial f_n}{\partial x_1} \\
\frac{\partial f_1}{\partial x_2} & \frac{\partial f_2}{\partial x_2} & \dots & \frac{\partial f_n}{\partial x_2} \\
\vdots & \vdots & \ddots & \vdots \\
\frac{\partial f_1}{\partial x_m} & \frac{\partial f_2}{\partial x_m} & \dots & \frac{\partial f_n}{\partial x_m}
\end{bmatrix}.
$$

机器学习中，**对向量函数求导有时也用 $\nabla$ 来表示**，如这里 $\frac{\partial \mathbf{f}}{\partial \mathbf{x}}$ 会写成 $\nabla_{\mathbf{x}} \mathbf{f(x)}$．此时的 $Nabla$ 算子不是它的原始含义，因为原始的 $Nabla$ 算子不能直接作用于向量（需要明确是点乘还是叉乘）．

:::important[重要]
- 后面会统一使用 $Jacobi$ 矩阵**的转置**来表示**列**向量对**列**向量的求导结果，这会导致一些结果与数学上的惯例不同．
- 我们规定，**行**向量对**行**向量求导的结果是将它们**按列向量**求导结果**的转置**．
- 在[线性映射的导数](#线性映射的导数)部分会看到以上两点．
:::

## 常用向量导数结果

设 $n$ 维实向量
$
\mathbf{x} = \begin{bmatrix}
x_1 \\ x_2 \\ \vdots \\ x_n
\end{bmatrix}
$
，
$\mathbf{A} = \begin{bmatrix}
a_{11} & a_{12} & \dots & a_{1n} \\
a_{21} & a_{22} & \dots & a_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \dots & a_{mn}
\end{bmatrix}$
 是任一与 $\mathbf{x}$ 无关的 $m\times n$ 实矩阵．

有以下常用结论：

1. 线性映射 $\mathbf{y=Ax}$ 关于 $\mathbf{x}$ 求导，有：

$$
\frac{\partial \mathbf{y}}{\partial \mathbf{x}} = \mathbf{A}^\top .
$$

:::warning[注意]
根据前面关于**行**向量对**行**向量求导的规定，若将这个线性映射写成行向量的形式 $\mathbf{y^\top = x^\top A^\top}$，则求导的结果也转置，即 $\frac{\partial \mathbf{y^\top}}{\partial \mathbf{x^\top}} = \mathbf{A}. $
:::

2. 若 $m = n$，则二次型 $\mathbf{x}^\top \mathbf{A} \mathbf{x}$ 关于 $\mathbf{x}$ 的梯度为：

$$
\nabla \mathbf{x}^\top \mathbf{A} \mathbf{x} = (\mathbf{A} + \mathbf{A}^\top)\mathbf{x} .
$$

3. $\mathbf{x}$ 模长的平方关于 $\mathbf{x}$ 的梯度为：

$$
\nabla \|\mathbf{x} \|^2 = [2x_1,2x_2,\dots,2x_n]^\top = 2\mathbf{x}.
$$

:::note[补充]
这个结论可以推广到矩阵的 $F$ 范数，即 $\nabla \|\mathbf{X} \|_F^2 = 2\mathbf{X}$．

矩阵没有严格意义上的梯度，这里用 $\nabla$ 来表示标量 $\|\mathbf{X} \|_F^2$ 关于矩阵 $\mathbf{X}$ 求导，方式与[标量对向量求导](#标量对向量求导)类似．
:::

## 链式法则

一元情况下的复合函数求导遵循链式法则．若 $y=f(u)$ 和 $u=g(x)$ 可微，则

$$
\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{\mathrm{d}y}{\mathrm{d}u} \cdot \frac{\mathrm{d}u}{\mathrm{d}x}.
$$

推广到多元的情况，首先考虑两层复合，假设有可微函数 $y=(u_1, u_2, \dots, u_m)$，而每个 $u_i$ 是以 $x_1, x_2, \dots, x_n$ 为自变量的可微函数．那么 $y$ 也是关于 $x_1, x_2, \dots, x_n$ 的函数，可以对每个 $x_i$ 求偏导．此时求导的结果为对每个 $u_i$ 应用链式法则，然后求和：

$$
\frac{\partial y}{\partial x_i} = \sum_{j=1}^m \frac{\partial y}{\partial u_j}\cdot\frac{\partial u_j}{\partial x_i}.
$$

拓展到三层复合，设有可微函数 $z = f(u_1, u_2, \dots, u_p)$，其中每个 $u_k = g_k(v_1, v_2, \dots, v_q)$ 是可微函数，每个 $v_l = h_l(x_1, x_2, \dots, x_n)$ 也是可微函数．求 $z$ 对 $x_i$ 的偏导，则是要包含所有由 $z$ 按链式法则「到达」$x_i$ 的「路径」，即下式中 $k$, $l$ 取值的所有组合，然后求和：

$$
\frac{\partial z}{\partial x_i} = \sum_{k,l} \frac{\partial z}{\partial u_k} \cdot \frac{\partial u_k}{\partial v_l} \cdot \frac{\partial v_l}{\partial x_i}.
$$

更多层的复合遵循同样的法则．

---

## 参考文献

1. Zhang A, Lipton Z C, Li M, et al. Dive into Deep Learning. Cambridge University Press, 2023. [https://D2L.ai](https://D2L.ai).
2. Li M. (2021). Introduction to Deep Learning in Chinese. D2L Courses. [https://courses.d2l.ai/zh-v2/](https://courses.d2l.ai/zh-v2/).