---
title: "PyTorch 中的自动微分 (下)"
description: "这篇笔记主要介绍 PyTorch 中自动微分的使用方法。"
published: 2026-02-11
# updated: 2026-02-11
tags: [机器学习, 深度学习, PyTorch]
category: 笔记
series: "动手学深度学习"
draft: false
---

:::important[免责声明]
- **这是一篇笔记**，内容整理自《动手学深度学习》的 PyTorch 版本和该书的[在线课程](https://space.bilibili.com/1567748478)。
- 文中也包含一些个人理解，惟笔记作者认知水平有限，**内容难免有疏漏、模糊之处**。  
- 同时，由于文中使用的 Python 包仍在不断更新，所以本文和原书的内容都**可能会在某一天过时**。
- 总之，如果对部分内容存在疑问，请查阅原书或最新的社区内容和权威文档。
:::

## 标量求导

假设我们要将函数 $y=2\mathbf{x}\cdot \mathbf{x}$ 关于 $\mathbf{x}$ 求导。

创建一个向量 $\mathbf{x}$：

```python
import torch

x = torch.arange(4.0, requires_grad=True)
x
```

`x` 为 `tensor([0., 1., 2., 3.], requires_grad=True)`。

创建向量时，我们用 `requires_grad` 参数告诉 PyTorch，我们后面需要关于这个向量求导，于是 PyTorch 才会追踪它的计算过程并构建计算图（这是个需要耗费内存的操作，所以默认不会做）。

对于一个已有向量 `x`，我们也可以用 `x.requires_grad_(True)` 将它标记为需要求导。

:::warning[注意]
这里只做了一步运算，所以没有中间变量。如果你需要得到关于中间变量的导数，也需要用 `requires_grad_()` 将中间变量标记为需要求导，否则关于它的导数不会被保存。
:::

做以下计算：

```python
y = 2 * torch.dot(x, x)
y
```

这里 `y` 会被打印为 ```tensor(28., grad_fn=<MulBackward0>)```。因为它是由标记为需要求导的变量 `x` 运算得到的，所以它在运算时已经带上了它对上一个变量的求导函数 `grad_fn`。

:::warning[注意]
因为 `y` 是在运算过程中由 PyTorch 自动创建的，所以 PyTorch 会自动维护它的 `grad_fn` 属性。而手动创建的变量的 `grad_fn` 默认为 `None`。
:::

对 `y` 使用 `backward()` 方法就会执行自动求导，求它关于每个被标记为需要求导的向量的导数。然后用 `x.grad` 属性可以访问计算结果。

```python
y.backward()
x.grad
```

结果为 `tensor([ 0.,  4.,  8., 12.])`，考虑 $\frac{\partial y}{\partial \mathbf{x}}=4\mathbf{x}$，这个结果是对的（就不要纠结这到底是行向量还是列向量了）。

:::warning[注意]
PyTorch 默认会累加求导结果，这在一些情况下可以派上用场。

不过，如果你不需要累加，你需要先用 `x.grad.zero_()` 方法将原结果清零，再重新做其它梯度运算。

例如在进行了上面的操作后再求另一个导数：
```python
x.grad.zero_()
y = x.sum()
y.backward()
x.grad
```
:::

## 非标量求导

`backward()` 方法只能用来求梯度（标量对向量求导），而不能处理向量。幸运的是，我们用得最多的还是梯度。

如果要做向量对标量或向量对向量的求导，应使用 `torch.autograd.functional.jacobian()` 方法。需要注意，这个方法接受一个 Python 函数和这个函数的输入，所以写法和前面使用 `backward()` 不同。

例如将上面的 `y` 改为 `x * x`（按元素运算！），我们再将 `y` 对 `x` 求导：

```python
x.grad.zero_()
y = lambda a: a * a
torch.autograd.functional.jacobian(y,x)
```

得到雅可比矩阵：
```python showLineNumbers=false
tensor([[0., 0., 0., 0.],
        [0., 2., 0., 0.],
        [0., 0., 4., 0.],
        [0., 0., 0., 6.]])
```

不过，也许我们本就打算求标量对向量的梯度。只不过由于某些原因，我们得到的是向量 `y`，我们想把它「变成」标量再对 `x` 求梯度。

向量 `y` 也具有 `backward()` 方法，它可以先对向量各个分量求加权和，再对这个加权和求梯度。此时调用 `backward()` 需要一个 `gradient` 参数，它接受一个与 `y` 同形的对象，表示求加权和时的每个分量的权重。

例如下面这个例子中的 `backward()` 操作等价于 `y.sum().backward()`，即以全 `1` 权重求和然后求梯度。

```python
x.grad.zero_()
y = x * x
y.backward(torch.ones(len(x)))
y.sum().backward()
x.grad
```

## 从计算图上解离

假设有这样一个过程：

```python
x.grad.zero_()
y = x * x
z = y * x
z.sum().backward()
x.grad
```

计算图是 `x` -> `y=x*x` -> `z=y*x`。

这里 `z` 等于 `x * x * x`，所以 `x.grad` 等于 `x ** 2 * 3`。

但如果我们希望在 `z` 对 `x` 求导时，将由 `x` 算出的中间变量 `y` 当成一个常数 `u`，而不是 `x * x`，可以改写成：

```python
x.grad.zero_()
y = x * x
u = y.detach()
z = u * x
z.sum().backward()
x.grad
```

计算图是 `x` -> `z=u*x`。`u` 被当作一个常数，尽管它在数值上是关于 `x` 的。

这样 `x.grad` 会等于 `u`。

## Python 控制流

即使计算过程中使用了 Python 控制流，如循环、条件或某些函数，自动微分仍然可以工作。

---

## 参考文献

1. Zhang A, Lipton Z C, Li M, et al. Dive into Deep Learning. Cambridge University Press, 2023. [https://D2L.ai](https://D2L.ai).
2. Li M. (2021). Introduction to Deep Learning in Chinese. D2L Courses. [https://courses.d2l.ai/zh-v2/](https://courses.d2l.ai/zh-v2/).