---
title: "常用向量导数结果证明"
description: "补充对上一篇笔记中几个「常用向量导数结果」的证明．"
published: 2026-02-06
# updated: 2026-02-06
tags: [数学, 微分]
category: 笔记
series: "动手学深度学习"
draft: false
---

:::important[免责声明]
- 这是对上一篇笔记『[机器学习中的微分（上）](/posts/d2l-preliminaries-calculus-1/)』内容的补充．
- 笔记作者并不是数学系的学生，数学水平有限，**证明和表述可能存在疏漏、模糊、不严谨之处**．
:::

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

## 性质 1

线性映射 $\mathbf{y=Ax}$ 关于 $\mathbf{x}$ 求导，有：

$$
\frac{\partial \mathbf{y}}{\partial \mathbf{x}} = \mathbf{A}^\top .
$$

<h3>证明</h3>

设 $\mathbf{y=Ax} = [y_1, y_2, \dots, y_m]^\top$．

根据矩阵乘法规则，$\mathbf{y}$ 的任意第 $i$ 个分量

$$
y_i = \sum_{j=1}^n a_{ij}x_j, \; \forall i=1,2,\dots,m,
$$

将各个 $y_i$ 视作关于 $\mathbf{x} = [x_1, x_2, \dots, x_n]^\top$ 的标量函数，可以对 $\mathbf{x}$ 求导：

$$
\frac{\partial y_i}{\partial \mathbf{x}} = [a_{i1}, a_{i2}, \dots, a_{in}]^\top.
$$

因此，按列向量对列向量求导的规则：

$$
\frac{\partial \mathbf{(Ax)}}{\partial \mathbf{x}} = \begin{bmatrix}
a_{11} & a_{21} & \dots & a_{m1} \\
a_{12} & a_{22} & \dots & a_{m2} \\
\vdots & \vdots & \ddots & \vdots \\
a_{1n} & a_{2n} & \dots & a_{mn}
\end{bmatrix} = \mathbf{A}^{\top}. \quad\square
$$

## 性质 2

若 $\mathbf{A}$ 为方阵，则二次型 $\mathbf{x}^\top \mathbf{A} \mathbf{x}$ 的梯度为：

$$
\nabla \mathbf{x}^\top \mathbf{A} \mathbf{x} = (\mathbf{A} + \mathbf{A}^\top)\mathbf{x} .
$$

<h3>证明</h3>

为了方便，将二次型写成求和式：

$$
\mathbf{x}^\top \mathbf{A} \mathbf{x} = \sum_{i=1}^n \sum_{j=1}^n a_{ij} x_i x_j.
$$

先拿出其中任意一项 $a_{ij} x_i x_j$，将它关于 $\mathbf{x}$ 的任一分量 $x_k$ 求偏导：

$$
\frac{\partial (a_{ij} x_i x_j)}{\partial x_k} = a_{ij}\frac{\partial x_i }{\partial x_k} x_j + a_{ij}\frac{\partial x_j }{\partial x_k} x_i, \quad \forall k=1,2,\dots,n,
$$

考虑到任意 $\frac{\partial x_i }{\partial x_k}$ 的取值和 $i$ 与 $k$ 的关系有关：

$$
\frac{\partial x_i }{\partial x_k} = \begin{cases}
    1, & if \quad i=k, \\
    0, & if \quad i\neq k, \\
\end{cases}
$$

所以，整个二次型对这一分量 $x_k$ 的偏导数是：

$$
\begin{align}
    \frac{\partial (\mathbf{x}^\top \mathbf{A} \mathbf{x})}{\partial x_k} &= \sum_{i=1}^n \sum_{j=1}^n \frac{\partial (a_{ij} x_i x_j)}{\partial x_k} \nonumber \\
    &= \sum_{i=1}^n \sum_{j=1}^n (a_{ij}\frac{\partial x_i }{\partial x_k} x_j + a_{ij}\frac{\partial x_j }{\partial x_k} x_i) \nonumber \\
    &= \sum_{i=1}^n \sum_{j=1}^n a_{ij}\frac{\partial x_i }{\partial x_k} x_j + \sum_{i=1}^n \sum_{j=1}^n a_{ij}\frac{\partial x_j }{\partial x_k} x_i \\
    &= \sum_{j=1}^n a_{kj} x_j + \sum_{i=1}^n a_{ik} x_i  \\
    &= \sum_{i=1}^n a_{ki} x_i + \sum_{i=1}^n a_{ik} x_i \nonumber
\end{align}
$$

:::tip[提示]
- 在 (1) 中，利用求和的性质，将 $\frac{\partial x_i }{\partial x_k}$ 和 $\frac{\partial x_j }{\partial x_k}$ 分开成两项，每项只用关心 $i$ 与 $k$ 的关系或 $j$ 与 $k$ 的关系，而不用同时讨论 $i,j,k$ 三项的关系．
- 这样，前一项 $\sum_{i=1}^n \sum_{j=1}^n a_{ij}\frac{\partial x_i }{\partial x_k} x_j$ 可以去掉关于 $i$ 的一层求和，因为只有 $i=k$ 的项不为 0；同样地去掉后一项中关于 $j$ 的求和．这样就得到 (2)．
:::

设 
$
\mathbf{y=Ax} = \begin{bmatrix}
    y_1 \\ y_2 \\ \vdots \\ y_n
\end{bmatrix}
$
，
$
\mathbf{z=A^\top x} = \begin{bmatrix}
    z_1 \\ z_2 \\ \vdots \\ z_n
\end{bmatrix}
$．

注意到 $\mathbf{y}$ 的第 $k$ 个分量 $y_k = \sum_{i=1}^n a_{ki}x_i$，$\mathbf{z}$ 的第 $k$ 个分量 $z_k = \sum_{i=1}^n a_{ik}x_i$，

因此

$$
\frac{\partial (\mathbf{x}^\top \mathbf{A} \mathbf{x})}{\partial x_k} = y_k + z_k.
$$

二次型的梯度

$$
\nabla \mathbf{x}^\top \mathbf{A} \mathbf{x} =
\begin{bmatrix}
    \frac{\partial (\mathbf{x}^\top \mathbf{A} \mathbf{x})}{\partial x_1} \\ \frac{\partial (\mathbf{x}^\top \mathbf{A} \mathbf{x})}{\partial x_2} \\ \vdots \\ \frac{\partial (\mathbf{x}^\top \mathbf{A} \mathbf{x})}{\partial x_n}
\end{bmatrix} =
\begin{bmatrix}
    y_1+z_1 \\ y_2+z_2 \\ \vdots \\ y_n+z_n
\end{bmatrix}
= \mathbf{A} \mathbf{x} + \mathbf{A}^\top\mathbf{x}. \quad\square
$$

## 性质 3

$\mathbf{x}$ 模长的平方关于 $\mathbf{x}$ 的梯度为：

$$
\nabla \|\mathbf{x} \|^2 = [2x_1,2x_2,\dots,2x_n]^\top = 2\mathbf{x}.
$$

<h3>推论</h3>

设矩阵 
$
\mathbf{X} = \begin{bmatrix}
    x_{ij}
\end{bmatrix}_{n\times n}
$
，定义 
$
\nabla_{\mathbf{X}} \, y = \begin{bmatrix}
    \frac{\partial y}{\partial x_{ij}}
\end{bmatrix}_{n\times n}
$
，则 $\nabla \|\mathbf{X} \|_F^2 = 2\mathbf{X}.$

:::note[说明]
这个比较显然，不证了．
:::