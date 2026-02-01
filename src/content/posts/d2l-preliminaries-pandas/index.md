---
title: "用 pandas 进行数据预处理"
description: "在使用 PyTorch 这样的工具围绕数据开展工作之前，常常需要先将原始数据读入 Python，并做一些预处理，以便能够将数据表示为规范的 n 维数组。"
published: 2026-02-01
# updated: 2026-02-01
tags: [机器学习, 深度学习, PyTorch, 数据预处理, pandas]
category: 笔记
series: "动手学深度学习"
draft: false
---

:::important[免责声明]
- **本文是一篇笔记**，主要内容整理自《**动手学深度学习**》的 PyTorch 版本以及该书的交流社区。
- 文中也包含一些个人理解，惟笔记作者认知水平有限，**内容难免有疏漏、模糊之处**。  
- 同时，由于文中使用的 Python 包仍在不断更新，所以本文和原书的内容都**可能会在某一天过时**。
- 总之，如果对部分内容存在疑问，请查阅原书或最新的社区内容和权威文档。
:::

机器学习工作往往要利用大量的数据，这些数据储存在文件中，而且原始形式未必能直接用 n 维数组表示。

所以，在使用 PyTorch 这样的工具围绕数据开展工作之前，常常需要先将原始数据读入 Python，并做一些预处理，以便能够将数据表示为规范的 n 维数组。

Pandas 是一个开源的数据分析库，它以 NumPy 为底层。因此，用它来读取并处理数据后也可以方便地将数据转换为 `tensor` 对象。这里使用 pandas 库来进行简单的数据预处理。

## 从文件读取数据

:::note[补充]
CSV（Comma-Separated Values）是一种用于存储表格数据的纯文本格式。正如它的名字，它以逗号分隔字段，按行存储文本形式的数据。Panda 可以读取这种格式的数据。
:::

假设有这样一个 CSV 格式的数据集，它描述了 4 栋房屋的房间数量、巷子类型和价格：

```csv title="house_tiny.csv"
NumRooms,Alley,Price
NA,Pave,127500
2,NA,106000
4,NA,178100
NA,NA,140000
```

可以用 `pandas.read_csv()` 方法加载这个文件中的数据：

```python
# import torch
import pandas as pd

data = pd.read_csv(data_file)
data
```

这里，Jupyter Notebook 可以将 pandas 对象显示为表格。如果用 Python 内置的 `print()` 方法来打印，也可以看到类似的形式。

|   |NumRooms|Alley|Price |
|---|--------|-----|------|
|0  |NaN     |Pave |127500|
|1  |2.0     |NaN  |106000|
|2  |4.0     |NaN  |178100|
|3  |NaN     |NaN  |140000|

## 简单的数据预处理

由于各种原因，一些真实数据集可能包含残缺的数据。缺失值在原始 CSV 文件中缺失值被记为 `NA`，被 pandas 读取后则被记作 `NaN`（Not a Number）。

由于 n 维数组的元素必须是确定的数值，而且「不明确」的数据并不利于数据的进一步利用，所以我们希望在将 pandas 对象转换为 `torch.tensor` 之前先利用 pandas 的功能处理这些缺失值。

除此之外，对于取值为字符串的分类变量，我们希望可以将它化为若干个二值变量（布尔值，在转换为 `tensor` 时可表示为 `0` 和 `1`）。对于这一类变量，缺失值也可以当成一个类别来处理。

### 获取数据的子集

Pandas 对象可以像 n 维数组那样用索引访问其中的元素，只不过写法有点差异。我们使用 `data.iloc[]` 这样的写法（`iloc` 是 index location 的缩写）。

```python
inputs, outputs = data.iloc[:, 0:2], data.iloc[:, 2]
```

:::tip[提示]
这里实际上是一个实际例子：我们希望用房子的属性来预测价格，所以我们将属性的两列和价格的一列分别称作 `inputs` 和 `outputs`。不过这里只演示数据预处理，而暂时不做进一步的工作。
:::

### 类型变量的处理

`Alley` 是一个类型变量，取值是离散的字符串，只有 `Pave` 和 `NaN` 两个取值。我们希望将它表示为数值。

所以我们不妨将它拆成两个二值变量：`Alley_Pave` 和 `Alley_nan`。如果 `Alley` 是 `Pave`，那么 `Alley_Pave` 取 `True`，而 `Alley_nan` 取 `False`，反之则反。

Pandas 可以自动完成这一步：

```python
inputs = pd.get_dummies(inputs, dummy_na=True)
print(inputs)
```

得到：

```plaintext showLineNumbers=false
   NumRooms  Alley_Pave  Alley_nan
0       NaN        True      False
1       2.0       False       True
2       4.0       False       True
3       NaN       False       True
```

这种方式在处理取值更加复杂的离散属性时尤为方便。

### 数值变量的缺失值处理

处理缺失值的典型方法包括**插值法和删除法**。插值法用某种方法产生一个值来代替缺失值，而删除法则直接丢弃有缺失值的数据项。这里主要介绍插值法的操作。

然后，我们用 `inputs.mean()` 方法来计算 `inputs` 各列的均值，并传递给 `inputs.fillna()`，让 pandas 将缺失值替换为均值。

```python
inputs = inputs.fillna(inputs.mean())
print(inputs)
```

得到结果：

```plaintext showLineNumbers=false
   NumRooms  Alley_Pave  Alley_nan
0       3.0        True      False
1       2.0       False       True
2       4.0       False       True
3       3.0       False       True
```

:::caution[关于 pandas 的版本差异]
- 这里我使用的是 pandas 2.3.3，而原书使用的是更旧的版本。所以在原书中，`pd.get_dummies()` 的结果不是布尔值，而是 `1` 和 `0`。不过，后面转换为 `tensor` 时仍然会被处理为 `1` 和 `0`。
- 原书中的顺序是先 `inputs.fillna(inputs.mean())` 再 `pd.get_dummies(inputs, dummy_na=True)`，`mean()` 方法会忽略 `Alley` 一列。但在 pandas 2.x 中，`mean()` 方法会报错：  
  ````plaintext showLineNumbers=false
  TypeError: can only concatenate str (not "int") to str
  ````
  因此这里调整了两个操作的顺序。
:::

## 类型转换

最后我们希望将处理好的 pandas 对象转换为 `tensor`。

Pandas 对象的底层就是 `ndarray`，所以可以先用 pandas 对象的 `to_numpy()` 方法将其转换为 `ndarray`。然后再按[上一篇笔记](http://localhost:4321/posts/d2l-preliminaries-ndarray/)介绍的将 `ndarray` 转换为 `tensor` 的方式和注意事项操作即可。

```python
import torch

X = torch.tensor(inputs.to_numpy(dtype=float))
y = torch.tensor(outputs.to_numpy(dtype=float))
X, y
```

结果如下：

```plaintext showLineNumbers=false
(tensor([[nan, 1., 0.],
         [2., 0., 1.],
         [4., 0., 1.],
         [nan, 0., 1.]], dtype=torch.float64),
 tensor([127500., 106000., 178100., 140000.], dtype=torch.float64))
```

## 补充：关于包版本冲突

在运行原书本节的代码时，我遇到了这样的情况：先导入 `torch`，再导入 `pandas`，无事发生，一切都很好；把顺序反过来（就像上面那样），导入 `torch` 就会报错：

```plaintext showLineNumbers=false
OSError: [WinError 1114] 动态链接库(DLL)初始化例程失败。
Error loading "C:\ProgramData\anaconda3\envs\d2l\lib\site-packages\torch\lib\c10.dll" or one of its dependencies.
```

我最开始使用的是原书的 `d2l` 包要求的 pandas 2.0.3，这个版本发布距离笔记写作时已有两年多。而 torch 的版本是较新的 2.10.0+cu130，推测可能是兼容性问题所致。

后将 pandas 更新为 2025 年 9 月的 2.3.3 版本即可解决问题。

这个错误应该和 Microsoft VC++ 2019-2022 运行库有关。可能是先导入旧版的 `pandas` 会先加载其依赖的不兼容版本的某些 DLL，导致后续 `torch` 加载 `c10.dll` 时发生冲突。

---

## 参考文献

1. Zhang A, Lipton Z C, Li M, et al. Dive into Deep Learning. Cambridge University Press, 2023. [https://D2L.ai](https://D2L.ai).