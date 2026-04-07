# JavaScript Note

## 基本语法

>  每个语句以`;`结束，语句块用`{...}`
>
> 花括号`{...}`内的语句具有缩进，通常是4个空格。`{...}`还可以嵌套，形成层级结构。
>
> 以`//`开头直到行末的字符被视为行注释，块注释是用`/*...*/`把多行字符包裹起来。
>
> JavaScript不区分整数和浮点数，统一用Number表示，也就是说，`12.00 === 12`。整数最大范围是±2^53
>
> `''`或`""`不是字符串的一部分.字符串`'abc'`只有`a`，`b`，`c`这3个字符。

- **逻辑运算符**`&&`与  `||`或  `！`非

- **比较运算符**`==`比较会自动转换数据类型再比较

​	`===`比较不会自动转换数据类型.若数据类型不一致，返回`false`；一致，再比较。

- **NaN**`NaN`（特殊Number）与所有其他值都不相等，包括它自己。判断`NaN`的方法是通过`isNaN()`函数  `isNaN(NaN); // true`

- **浮点数**`1 / 3 === (1 - 2 / 3); // false`浮点数在运算过程中会产生误差。要比较两个浮点数是否相等，只能计算它们之差的绝对值是否小于某个阈值

  `Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001; // true`

- **biglnt**要精确表示比253还大的整数，可以使用内置的BigInt类型.

  ```
  // 使用BigInt:
  var bi1 = 9223372036854775807n;//法1
  var bi2 = BigInt(12345);//法2
  var bi3 = BigInt("0x7fffffffffffffff");
  console.log(bi1 === bi2); // false
  console.log(bi1 === bi3); // true
  console.log(bi1 + bi2);
  
  ```

  BigInt可以正常进行加减乘除，结果仍为BigInt。但不能把一个BigInt和一个Number放在一起运算

- **null**`null`表示一个“空”的值，它和`0`以及空字符串`''`不同，`0`是一个数值，`''`表示长度为0的字符串，而`null`表示“空”。`undefined`表示“未定义”,它仅在判断函数参数是否传递的情况下有用.

- 


## 数据类型与变量

### 数据类型

1. Number：整数、浮点数、科学计数法（1.23e3）、NaN（非数值）、Infinity。
2. String：用 ' 或 " 括起来的文本。
3. Boolean：true / false。
4. null：空值（表示“没有对象”）。
5. undefined：未定义（变量声明未赋值时）。
6. Symbol（ES6 新增，初学者可暂略）。

### 变量

用于存储数据，可以修改存储的值
 - 声明方式：  

 ```javascript  
   // ES6推荐方式（块级作用域）
   let age = 18;
   // 常量（不可修改）
   const PI = 3.14159;
   // 旧方式（函数级作用域，不推荐）
   var name = "Ce";  
 ```

```javascript
let name = '小明';
let age = 18;
let isStudent = true;
```

### 常量

用 const 声明，不可重新赋值。

```javascript
const PI = 3.14;
```

### 字符串

常用方法

```javascript
let s = 'Hello, world!';
s.length;              // 13
s[0];                  // 'H'
s.toUpperCase();       // 'HELLO, WORLD!'
s.toLowerCase();       // 'hello, world!'
s.indexOf('world');    // 7
s.substring(0, 5);     // 'Hello'
```

### 数组

JavaScript的数组可以包括任意数据类型。

```
创建数组的两种方法
[1, 2, 3.14, 'Hello', null, true];
new Array(1, 2, 3); // 创建了数组[1, 2, 3]
```

​	出于代码的可读性考虑建议直接使用`[]`

​	数组的元素可以通过索引来访问,索引的起始值为`0`.

```
var arr = [1, 2, 3.14, 'Hello', null, true];
arr[0]; // 返回索引为0的元素，即1
arr[5]; // 返回索引为5的元素，即true
arr[6]; // 索引超出了范围，返回undefined
console.log(arr[0], arr[5], arr[6]);
```

### 对象

JavaScript的对象是由键-值组成的无序集合.键都是字符串类型，值可以是任意数据类型.每个键又称为对象的属性.

要获取一个对象的属性,应该用`对象变量.属性名`的方式。

· 无序的键值对集合，键是字符串。

```javascript
let person = {
  name: '张三',
  age: 20,
  'middle-school': 'No.1 High'   // 特殊属性名需引号
};

// 访问
person.name;                // '张三'
person['middle-school'];    // 必须用 []
person.age = 21;            // 修改
delete person.age;          // 删除属性
'name' in person;           // true，但会查原型链
person.hasOwnProperty('name'); // true，只判断自身属性
```

### 条件判断与循环

 if / else if / else

```javascript
let age = 18;
if (age >= 18) {
  console.log('成年');
} else {
  console.log('未成年');
}
```

 for 循环

```javascript
// 普通 for
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// for ... of (遍历数组/字符串/Map/Set)
let arr = ['A', 'B', 'C'];
for (let item of arr) {
  console.log(item);
}

// for ... in (遍历对象属性，不推荐用于数组)
let obj = {a:1, b:2};
for (let key in obj) {
  console.log(key, obj[key]);
}
```

 while 和 do ... while

```javascript
let n = 0;
while (n < 3) {
  console.log(n);
  n++;
}

let x = 0;
do {
  console.log(x);
  x++;
} while (x < 3);
```

### Map 和 Set

#### Map

键值对集合，键可以是任意类型。

```javascript
let m = new Map();
m.set('name', '张三');
m.set(10, '数字');
console.log(m.get('name'));   // '张三'
console.log(m.has(10));       // true
m.delete(10);
```

#### Set

无重复元素的集合。

```javascript
let s = new Set([1,2,3,3]);   // {1,2,3}
s.add(4);
s.delete(2);
s.has(1);  // true
```

### 函数

#### 定义与调用

```javascript
// 函数声明
function add(x, y) {
  return x + y;
}

// 函数表达式（匿名函数）
let sub = function (a, b) {
  return a - b;
};

// 调用
add(1, 2);   // 3
sub(5, 3);   // 2
```

· 传入参数可多可少，多余的被忽略，少的为 undefined。


#### arguments 关键字

获取传入的所有参数（类似数组）。

```javascript
function foo() {
  for (let arg of arguments) {
    console.log(arg);
  }
}
foo(1, 'a', true);
```

### 作用域

· 用 let 声明的变量具有块级作用域（{}内有效）。
· 内部函数可以访问外部函数变量，反之不行。

```javascript
function test() {
  let x = 10;
  if (true) {
    let y = 20;   // 只在 if 块内有效
    console.log(x); // 10
  }
  console.log(y);   // 报错
}
```

#### 解构赋值

快速从数组或对象提取值。

```javascript
let [a, b, c] = [1, 2, 3];
let {name, age} = {name: '李四', age: 25};
console.log(name); // '李四'
```

### 方法

一个对象的属性如果是函数，就称为方法。

```javascript
let obj = {
  name: '狗蛋',
  birth: 2000,
  getAge: function () {
    let now = new Date().getFullYear();
    return now - this.birth;
  }
};
obj.getAge();
```

· this 指向调用方法的对象，直接调用函数时 this 指向 window（非严格模式）。

#### 高阶函数（简单了解）

函数可以接收另一个函数作为参数。

```javascript
function add(x, y, fn) {
  return fn(x) + fn(y);
}
let result = add(-1, 5, Math.abs); // 6
```

常用数组高阶函数：

· map：对每个元素执行函数，返回新数组。
· filter：过滤元素。
· reduce：累积计算。

```javascript
let arr = [1,2,3];
let doubled = arr.map(x => x * 2);   // [2,4,6]
let evens = arr.filter(x => x % 2 === 0); // [2]
let sum = arr.reduce((acc, x) => acc + x, 0); // 6
```

#### 闭包

一个函数返回另一个函数，内部函数可以引用外部函数的变量。

```javascript
function count() {
  let num = 0;
  return function () {
    num++;
    return num;
  };
}
let c = count();
console.log(c()); // 1
console.log(c()); // 2
```

### 箭头函数

简化匿名函数的写法，且它内部的 this 指向外层作用域。

```javascript
let double = x => x * 2;
let sum = (a, b) => a + b;
let hello = () => console.log('hi');
```

### 标准对象

· 获取类型：typeof 123 → 'number'，typeof null → 'object'。
· 使用包装对象不推荐（new Number(123)）。
· 常用方法：
  · parseInt('123')、parseFloat('12.3')。
  · 日期：let now = new Date();
  · 正则：let re = /^\\d+$/;

### 面向对象编程

JavaScript 没有 class 关键字（ES6 前），通过原型实现继承。

```javascript
// 构造函数
function Student(name) {
  this.name = name;
}
Student.prototype.hello = function () {
  console.log(`Hello, ${this.name}`);
};

let xm = new Student('小明');
xm.hello();

// ES6 class 语法糖
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes noise.`);
  }
}
```

### 浏览器对象（BOM）

在浏览器中，JavaScript 的顶层对象是 window。

属性/方法 说明
window.innerWidth 浏览器窗口的内部宽度
window.innerHeight 内部高度
navigator 浏览器信息（不建议用于检测浏览器）
screen 屏幕信息
location 当前 URL 信息
document 当前页面 DOM 树（核心）
history 浏览历史（可控制前进后退）

```javascript
// 获取当前 URL
console.log(location.href);
// 跳转
location.assign('https://www.baidu.com');
// 刷新
location.reload();
```

### 操作 DOM

DOM（Document Object Model）将 HTML 文档表示为一棵树。JavaScript 可以增删改查节点。

#### 获取 DOM 节点

```javascript
// 按 ID
let title = document.getElementById('title');

// 按 class 名
let items = document.getElementsByClassName('item');

// 按标签名
let ps = document.getElementsByTagName('p');

// 使用 CSS 选择器（推荐）
let div = document.querySelector('#main');
let all = document.querySelectorAll('.item');
```

#### 更新 DOM

· 修改 innerHTML（可解析 HTML 标签）
  ```javascript
  let p = document.getElementById('p1');
  p.innerHTML = '新内容 <strong>加粗</strong>';
  ```
· 修改 innerText 或 textContent（纯文本）
  ```javascript
  p.innerText = '纯文本内容';
  ```
· 修改 CSS 样式
  ```javascript
  p.style.color = 'red';
  p.style.fontSize = '20px';   // 注意驼峰命名
  ```

#### 插入 DOM

· appendChild：在父节点最后添加一个子节点
  ```javascript
  let parent = document.getElementById('list');
  let newLi = document.createElement('li');
  newLi.innerText = '新项目';
  parent.appendChild(newLi);
  ```
· insertBefore：在参考节点前插入
  ```javascript
  let ref = document.getElementById('refLi');
  parent.insertBefore(newLi, ref);
  ```
· insertAdjacentHTML 也可以使用。

#### 删除 DOM

先获取父节点，再调用 removeChild。

```javascript
let self = document.getElementById('toRemove');
self.parentNode.removeChild(self);
```

⚠️ 遍历删除时注意子节点列表会动态变化。