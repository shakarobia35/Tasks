# CSS Note

## 语法

CSS 规则集（rule-set）由选择器和声明块组成。

选择器指向需要设置样式的 HTML 元素。

声明块包含一条或多条用分号分隔的声明。

每条声明都包含一个 CSS 属性名称和一个值，以冒号分隔。

多条 CSS 声明用分号分隔，声明块用花括号括起来。

## 选择器

- 元素选择器  根据元素名称来选择 HTML 元素。

- id 选择器  使用 HTML 元素的 id 属性来选择特定元素。要选择具有特定 id 的元素，写＃，后跟该元素 id。id 名称唯一且不能以数字开头。

- 类选择器  选择有特定 class 属性的 HTML 元素。要选拥有特定 class 的元素，就写一个`.`，后跟类名。

- 通用选择器（*）  选择页面上的所有的 HTML 元素。

- 分组选择器  选取所有具有相同样式定义的 HTML 元素。用逗号分隔每个选择器。


## 使用方法

#### 外部CSS

外部样式在 HTML 页面 `<head>` 部分内的` <link>` 元素中进行定义：

`<link rel="stylesheet" type="text/css" href="mystyle.css">`

外部样式表可以在任何文本编辑器中编写，并且必须以 .css 扩展名保存。外部 .css 文件不应包含任何 HTML 标签。

#### 内部CSS

内部样式在 HTML 页面的 `<head>`部分内的 `<style>` 元素中进行定义:

```
<head>
<style>
body {
  background-color: linen;
}

h1 {
  color: maroon;
  margin-left: 40px;
} 
</style>
</head>
```

#### 行内CSS

行内样式（也称内联样式）可用于为单个元素应用唯一的样式。行内样式在相关元素的 "style" 属性中定义。

`<h1 style="color:blue;text-align:center;">This is a heading</h1>`

#### 多个样式表

如果在不同样式表中为同一选择器（元素）定义了一些属性，则将使用最后读取的样式表中的值。(就近原则)

## CSS注释

`<style> `元素内的 CSS 注释，以 /* 开始，以 */ 结束。也可使用 `<!--...-->` 添加注释。

## 颜色

背景色 `<h1 style="background-color:DodgerBlue;">China</h1>`

文本颜色 `<h1 style="color:Tomato;">China</h1>`

边框颜色 `<h1 style="border:2px solid Tomato;">Hello World</h1>`

## 背景

background-color 

- 再加上opaciy可以设置透明度。取值范围0.0~1.0，但所有子元素都继承相同的透明度，不方便；

- 用 *RGBA* 颜色值可避免。

- ```css
  div {
    background: rgba(0, 128, 0, 0.3) /* 30% 不透明度的绿色背景 */
  }
  ```

background-image

- 加`: url("paper.gif")`设置图片；

background-repeat

- `background-repeat: repeat-x;`补充这个可以设置图像水平方向重复(垂直方向为y)；
- `background-repeat: no-repeat`指定只显示一次;

background-attachment `fixed`固定、`scroll`随页面其余部分滚动

background-position  `background-position: right top`指定背景位置(此次为右上)

> -origin:规定何处放置;-clip:规定背景绘制区域;-size:规定背景图像尺寸

## 边框

`border` 可指定元素边框的样式、宽度和颜色。

### 样式

`border-style` 属性指定要显示的边框类型。可以设置一到四个值。

允许以下值：

- `dotted` - 定义点线边框
- `dashed` - 定义虚线边框
- `solid` - 定义实线边框
- `double` - 定义双边框
- `groove` - 定义 3D 坡口边框。效果取决于 border-color 值
- `ridge` - 定义 3D 脊线边框。效果取决于 border-color 值
- `inset` - 定义 3D inset 边框。效果取决于 border-color 值
- `outset` - 定义 3D outset 边框。效果取决于 border-color 值
- `none` - 定义无边框
- `hidden` - 定义隐藏边框

### 宽度

`border-width` 属性指定四个边框的宽度（以 px、pt、cm、em 计或thin、medium 、thick）

## 颜色

`border-color` 属性可以设置一到四个值（用于上边框、右边框、下边框和左边框，顺序固定）。

## 各边

在style前加方位词可为不同的边框指定单独的样式(上边框、右边框、下边框和左边框，顺序固定）。

```
p {
  border-top-style: dotted;
  border-right-style: solid;
  border-bottom-style: dotted;
  border-left-style: solid;
}

p {
  border-style: dotted solid;
}
```

`border-radius` 属性用于向元素添加圆角边框

`margin` 属性用于在任何定义的边框之外，为元素周围创建空间。指定方向后，一些属性可用于设置元素每侧（上top、右、下bottom和左）的外边距。将 margin 属性设置为 `auto`可使元素水平居中。

若`margin` 属性设置三个值：

margin: 25px 50px 75px;

- 上外边距是 25px
- 右和左外边距是 50px
- 下外边距是 75px

使用 inherit 值，可继承父元素设置：

```
<!DOCTYPE html>
<html>
<head>
<style>
div {
  border: 1px solid red;
  margin-left: 100px;
}

p.ex1 {
  margin-left: inherit;
}
</style>
</head>
<body>

<h1>使用继承值</h1>
<p>左外边距继承自父元素：</p>

<div>
<p class="ex1">本段落继承了 div 元素的左外边距。</p>
</div>

</body>
</html>
```

外边距合并，即把两个垂直外边距合并成一个。







