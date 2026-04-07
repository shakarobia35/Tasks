# HTML Note

*一种用于创建网页的标准标记语言*.使用标记标签来描述网页。后缀名为`.html`和`.htm`*

![HTML](https://www.runoob.com/wp-content/uploads/2013/06/02A7DD95-22B4-4FB9-B994-DDB5393F7F03.jpg)

- HTML 标签是由*尖括号*包围的关键词，一个 HTML 元素包含了开始标签与结束标签。

- Web浏览器（如谷歌浏览器，Internet Explorer，Firefox，Safari）是用于读取HTML文件，并将其作为网页显示。浏览器可使用标签来决定如何展现HTML页面的内容给用户

- `<!DOCTYPE>`声明有助于浏览器中正确显示网页。`<!DOCTYPE html> `(这是HTML5通用声明)或 `<!DOCTYPE HTML>` 或` <!doctype html> `或 `<!Doctype Html>`均可。**之所以一定要写上` <!doctype html>`，就是为了防止浏览器的怪异模式，强制浏览器按照标准模式渲染网页**

- 在头部将字符声明为 UTF-8 或 GBK，可避免出现中文乱码的情况。`<meta charset="UTF-8" `有些浏览器(如 360 浏览器)会设置 GBK 为默认编码，则需要设置为` <meta charset="gbk">`。

  > 设置 <meta charset="utf-8" /> 后仍然出现网页乱码：通过 meta标签设置的编码和网页文件在保存时所使用的文档编码不相同

## 基础知识

**标题 **`<h1>...</h1>`同样有六级标题。

**段落 **`<p>...</p>`

**换行 **`<br>`

**水平线 **`<hr>`

**注释** `<!-- 这是注释 -->`

**链接 **`<a href="网址">链接说明</a>`

> 一个未访问过的链接显示为蓝色字体并带有下划线。
>
> 访问过的链接显示为紫色并带有下划线。
>
> 点击链接时，链接显示为红色并带有下划线。

**图像 **`<img src="网址" width="宽度设定" height="高度设定" />`

在HTML中，无法通过在 HTML 代码中添加额外的空格或换行来改变输出的效果。所有连续的空格或空行都会被算作一个空格。

**格式化** `<b>`粗体、`<i>`斜体( `<strong> `可替换`<b>` ,` <em>` 可替换 `<i>`.但b和i是定义字体，s和e是突出显示)

### HTML 元素

HTML 元素是从**开始标签（start tag）**到**结束标签（end tag）**之间的完整结构。部分元素为**空元素（empty element）**，没有内容。空元素通常在开始标签中自闭合（如 `<br />`）

大多数元素可以包含属性（Attributes）[^1]

[^1]:[属性](#HTML-属性)

**嵌套**包含`<p>` （段落）、`<body>`（主体）、`<html> `（根元素）

**空元素**如`<br>`（换行）、`<img>`（图片）、`<input>`（输入框）

> 推荐写法`<br />`

### HTML 属性

属性是 HTML 元素提供的附加信息，可以定义元素的行为、样式、内容或其他特性。以` name="value" `的形式书写。

属性和属性值对大小写不敏感。最好使用小写属性。[HTML 标签](https://www.runoob.com/tags/html-reference.html)

- 分类:全局属性、特定元素属性、布尔属性、自定义属性、事件处理属性。

HTML链接属性:

> `<a href="https://www.example.com" target="_blank" rel="noopener">新窗口打开 Example</a>`

- href定义链接目的地，可以是网页、文件、邮件、电话、JavaScript

- target定义链接打开方式.用 target 可定义被链接的文档在哪显示。

  - `_blank`: 在新窗口或新标签页中打开链接。

    `_self`: 在当前窗口或标签页中打开链接（默认）。

    `_parent`: 在父框架中打开链接。

    `_top`: 在整个窗口中打开链接，取消任何框架。

- rel定义链接和目标页面的关系

  - `noopener`: 防止新的浏览上下文（页面）访问`window.opener`属性和`open`方法。表示搜索引擎不应跟踪该链接，常用于外部链接。

    `noreferrer`: 不发送referer header（即不告诉目标网站你从哪里来的）。

    `noopener noreferrer`: 同时使用`noopener`和`noreferrer`。防止在新标签中打开链接时的安全问题。

- download：提示浏览器下载链接目标

- title：定义链接的额外信息，当鼠标悬停在链接上时显示的工具提示。

- id：可用于创建一个 HTML 文档书签(在 页面中不显示）。用于链接锚点，通常在同一页面中跳转到某个特定位置。

  ```
  <a id="tips">有用的提示部分</a>
  <a href="#tips">访问有用的提示部分</a>  
  /在HTML文档中创建一个链接到"有用的提示部分(id="tips"）"
  <a href="https://www.runoob.com/html/html-links.html#tips">
  访问有用的提示部分</a>
  /或从另一个页面创建链接到标记部分
  ```

- hreflang: 指定链接的目标URL的语言(比如es西班牙语)

- type: 指定链接资源的MIME类型(比如css)

- class: 用于指定元素的类名（CSS中定义）

- style: 直接在元素上定义CSS样式

用法:

1. 文本链接:`<a href="https://www.example.com">访问示例网站</a>`

2. 图像链接:

   ````
   <a href="https://www.example.com">
     <img src="example.jpg" alt="示例图片">
   </a>
   ````

3. 锚点链接:

   ```
   <a href="#section2">跳转到第二部分</a>
   <!-- 在页面中的某个位置 -->
   <a name="section2"></a>
   ```

4. 下载链接:`<a href="document.pdf" download>下载文档</a>`

### HTML `<head>`

可以添加在头部区域的元素标签为: 

`<title>`,`<base>`(默认链接地址),`<link>`(定义文档和外部资源之间的关系),`<style>`,` <meta>`(为搜索引擎定义关键词name=keywords,为网页定义描述内容description,定义网页作者author,每30秒钟刷新当前页面htttp-equiv=refresh),` <script>`(脚本文件),` <noscript>` `。

```
<base href="http://www.runoob.com/images/" target="_blank">

<link rel="stylesheet" type="text/css" href="mystyle.css">

<style type="text/css">
body {
    background-color:yellow;
}
p {
    color:blue
}
</style>

<meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript">


```

### HTML 样式-CSS

```
<!DOCTYPE html>
<html>
<head> 
<meta charset="utf-8"> 
<title>菜鸟教程(runoob.com)</title> 
</head>
<body>

<div style="opacity:0.5;position:absolute;left:50px;width:300px;height:150px;background-color:#40B3DF"></div>

<div style="font-family:verdana;padding:20px;border-radius:10px;border:10px solid #EE872A;">

<div style="opacity:0.3;position:absolute;left:120px;width:100px;height:200px;background-color:#8AC007"></div>

<h3>Look! Styles and colors</h3>

<div style="letter-spacing:12px;">Manipulate Text</div>

<div style="color:#40B3DF;">Colors
<span style="background-color:#B4009E;color:#ffffff;">Boxes</span>
</div>

<div style="color:#000000;">and more...</div>

</div>

</body>
</html>
```

![展示](C:\Users\User\Desktop\geek\typmarknote\tupian\screenshot_20260401_183924.jpg)

### CSS 可以通过<u>内联样式、内部样式表、外部引用</u>3种方式添加到HTML中

#### 内联样式

*在相关的标签(style)中使用<u>样式属性</u>(可包含任何 CSS 属性）。*

- 背景颜色(background-color）

  ```
  <body style="background-color:yellow;">
  <h2 style="background-color:red;">这是一个标题</h2>
  <p style="background-color:green;">这是一个段落。</p>
  </body>
  ```

- 字体(font-family），字体颜色(color)和大小(font-size)

  ```
  <h1 style="font-family:verdana;">一个标题</h1>
  <p style="font-family:arial;color:red;font-size:20px;">一个段落。</p>
  ```

- 文本对齐方式(text-align）

  ```
  <h1 style="text-align:center;">居中对齐的标题</h1>
  <p>这是一个段落。</p>
  ```

#### 内部样式表

*为单个文件设置特别样式。在`<head> ` 部分通过 `<style>`标签定义*

```
<head>
<style type="text/css">
body {background-color:yellow;}
p {color:blue;}
</style>
</head>
```

#### 外部样式表

*当样式要被应用到很多页面时使用。通过更改一个文件来改变整个站点的外观。*

```
<head>
<link rel="stylesheet" type="text/css" href="mystyle.css">
</head>
```

> ps: `<style>`定义文本样式，`<link>`定义资源引用地址。

#### 外部引入

两种方式:

- `<link>`:XHTML 标签

  `<link rel="stylesheet" href="标签路径">`

- `@import`:由CSS 提供的一种方式

  ```
  <style>
  @import url("标签路径")
  </style>
  ```

### HTML 图像

图像由`<img> `标签定义。`<img>` 是空标签,只包含属性，无闭合标签。

要在页面上显示图像，要使用源属性（src)——图像的 URL (存储图像的位置）地址。

`<img src="url" alt="some_text">`

如果名为 "pulpit.jpg" 的图像位于` www.runoob.com `的 images 目录中，那么其 URL 为` [http://www.runoob.com/images/pulpit.jpg](https://www.runoob.com/images/pulpit.jpg)`。

#### 可替换文本 Alt

*在浏览器无法载入图像时，替换文本属性告诉读者她们失去的信息*

`<img src="boat.gif" alt="Big Boat">`

#### 设置宽高

`<img src="pulpit.jpg" alt="Pulpit rock" width="304" height="228">`

> ps:`<map>`定义图像地图，`<area>`定义图像地图中可点击区域。

### 表格和列表

#### HTML 表格由 `<table> `标签来定义

tr-表格的一行，td-表格的数据单元格，th-表格的表头单元格.

- `<table>` 元素表示整个表格，它包含两个主要部分：`<thead> `和 `<tbody>`
  - `<thead>` 用于定义表格的标题.在 `<thead>` 中，使用` <th>` 元素定义列的标题.
  - `<tbody> `用于定义表格的主体.在` <tbody> `中，<u>使用 `<tr>` 元素定义行，并在每行中使用 `<td>`元素定义单元格数据</u>.

- `<table>`的<>里加入border="1"可以给每行加上白色边框；

  再加上cellpadding="10"可以设置单元格<u>边距</u>；

  加cellspacing="10"代表设置单元格<u>间距</u>为10(展现出来就是边框变粗)；

  在`<table>...</table>`里写`<caption>标题</caption>`可以为表格加上标题；

- 表格的表头使用` <th>` 标签进行定义。大多数浏览器会把表头显示为粗体居中的文本。

  在`<th>`里加上colspan="2"可实现<u>单元格跨两列</u>，就像这样:

  ``` 
  <th>Name</th>
    <th colspan="2">Telephone</th>
  ```

  在`<th>`里加上rolspan="2"可实现<u>单元格跨两行</u>.`<th rowspan="2">Telephone:</th>`

``` 
<table>
  <thead>
    <tr>
      <th>列标题1</th>
      <th>列标题2</th>
      <th>列标题3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>行1，列1</td>
      <td>行1，列2</td>
      <td>行1，列3</td>
    </tr>
    <tr>
      <td>行2，列1</td>
      <td>行2，列2</td>
      <td>行2，列3</td>
    </tr>
  </tbody>
</table>
```

#### HTML 列表

- 无序列表使用` <ul>...</ul>` 标签,是项目列表,用黑圆圈标记。每个列表项始于` <li> `标签。

  - 圆点`<ul style="list-style-type:disc">`
  - 圆圈`<ul style="list-style-type:circle">`
  - 正方形`<ul style="list-style-type:square">`

- 有序列表是`<ol>` 标签,也是项目列表,用数字标记。

  - 如果要用字母编号， 在`<ol>`里加上type="a"或"A"
  - 如果是罗马数字，type="i"或"I"

- 自定义列表是项目及其注释的组合,以` <dl> `开始。每项以` <dt> `开始,每项定义(注释)以` <dd>` 开始。

  ```
  <dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
  </dl> 
  ```

  显示为

  Coffee

  \- black hot drink

  Milk

  \- white cold drink

### `<div>`和`<span>`

*大多数 HTML 元素被定义为**块级元素**[^2]或**内联元素**[^3]。*

[^2]:(block-level)在浏览器显示时，通常会以新行来开始和结束.如`<h1>, <p>, <ul>, <table>`
[^3]:(inline)在显示时通常不会以新行开始,如`<b>, <td>, <a>, <img>`

`<div>`是块级元素，与 CSS 一同使用时可对大的内容块设置样式属性。浏览器中会显示折行。

`<span> `元素是内联元素，可用作文本的容器。与 CSS 一同使用时可为部分文本设置样式属性。

