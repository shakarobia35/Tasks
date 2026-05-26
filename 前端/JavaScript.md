# JavaScript

## 目录

[ES6](#ES6)

  [变量](#变量)

- [声明变量](#声明变量)
- [变量提升](#变量提升)
- [var,let,const](#var,let,const)
- [对象冻结](#对象冻结)
- [传值传址](#传值传址)

[❓Promise & async / await 异步编程](#❓Promise & async / await 异步编程)

- [Promise对象](#Promise对象)

[严格模式](#严格模式)

[函数](#函数)

  [基础](#基础)

- [概述](#概述)
- [解构赋值](#解构赋值)
- [length属性](#length属性)
- [作用域](#作用域)
- [rest参数](#rest参数)

  [函数调用方式](#函数调用方式)

- [全局调用](#全局调用)
- [构造函数调用](#构造函数调用)
- [函数方法调用](#函数方法调用)
- [call](#call)
- [apply](#apply)
- [bind](#bind)

[闭包](#闭包)

[深挖JS更多语法](#深挖JS更多语法)

- [正则表达式](#正则表达式)
- [错误处理](#错误处理)
- [事件](#事件)

[JSON](#JSON)

[DOM API](#DOM API)

[性能优化](#性能优化)

- [防抖](#防抖)
- [节流](#节流)

[Ajax](#Ajax)

[使用 JavaScript 实现 Web 端调试](#使用 JavaScript 实现 Web 端调试)

[暂且搁置](#暂且搁置)



## ES6

### 变量

#### 1. 声明变量

- var 变量名=‘内容，字符串’。可一次性声明多个变量，也可给多个变量赋同一个值。

- console.log(**type of** 变量名)可显示变量类型。

- 属于弱类型，变量类型随值而改变。
- 推荐使用let,const声明变量。它们具有暂时性死区TDZ（所声明的变量绑定该区域，形成封闭作用域，不再受外部的影响），不会发生变量提升。在使用时无需将声明和赋值分离。

#### 2. 变量提升

即声明提升。在执行脚本前系统先对脚本内容进行检查（预编译），此时即使var（声明+赋值）在console.log前面也不会报错。

- 使用let、const声明不会出现变量提升。必须先声明再赋值。

#### 3.var,let,const

```javascript
var/let/const web='hello'
function run(){
console.log(web);//调用run函数之后输出。函数可访问外部全局变量。
}
run();
console.log(web);//全局输出
```

- 若在函数（私有空间）内声明变量`var web='你好'`，私有空间是独立于外部的，故输出时在函数体内输出的是`你好`，在外部输出的是`hello`。输出由内到外，由上到下。

  > 若在函数体内不声明，直接输入`web='你好'`,此时改变的web是对***全局***而言的

- const,let具有<u>**块作用域**</u>而var没有。

  > 当一个函数内出现两个代码块且都声明了变量`n`，此时外层代码块不受内层代码块的影响，输出的是外层定义的变量n。只有两次都用var定义变量n时才会输出最后一次修改的变量值。

- const常量声明之后不可改变所赋的值的内容（前提：在同一个作用域。也就是说，在不同作用域，比如在函数体内，是可以重新声明、修改内容的。）因为这样相当于将常量对应到新的地址。

  > `const WEB={}`属于引用类型，此时常量和引用地址同属一个，不会报错;若将WEB指向另一个对象{}就会报错。
  >
  > 为WEB添加属性（比如，‘.prop‘）可以成功。

-  let 用于声明可变的变量，块级作用域，无变量提升。
   const 用于声明常量，必须初始化，且基本类型值不可变，引用类型不可重新赋值但可修改属性。

#### 4. 对象冻结

使用`object.freeze(变量名)`可免使变量的值发生改变。

#### 5. 传值传址

传值：

```javascript
let a=1;
let b=a; 
//b把a的地址复制一份，再指向这个复制出来的地址（本质上两者使用的是两块不同的内存空间）。此时若改变b的值，a的值不会发生变化。
```

传址：

```javascript
let e={}
let f=e; //e,f共用同一块地址。适用于存储空间较大的情况。
```

null(有值)，undefined(无值)

### ❓Promise & async / await 异步编程

#### Promise对象

是存放某个未来才会结束的事件。

**对象的状态不受外界影响（<u>除了pending,fulfilled,rejected三种状态，其他手法无法改变promise</u>），且一旦状态改变(p→f;p→r)，就不会再变，任何时候都可以得到这个结果**。

`Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

```javascript
const promise = new Promise(function(resolve, reject) {
/*
resolve:将Promise对象的状态从“未完成”变为“成功”（pending→resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
reject：将`Promise`对象的状态从“未完成”变为“失败”（pending→rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
*/
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
/*
then可接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。这两个函数都是可选的，不一定要提供。它们都接受Promise对象传出的值作为参数。
*/
```



#### async / await

async / await 是 Promise 的语法糖，让异步代码写起来像同步代码。

· async 函数返回一个 Promise。
· await 只能在 async 函数内部使用，会暂停函数执行，等待 Promise resolve，然后返回结果；如果 Promise reject，则抛出异常（可用 try...catch 捕获）。

```javascript
async function fetchUser() {
  try {
    const response = await fetch('https://api.example.com/user/1');
    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.error('请求失败', error);
  }
}
fetchUser();

// 并发请求可用 Promise.all
async function fetchMultiple() {
  const [user, posts] = await Promise.all([
    fetch('/user').then(res => res.json()),
    fetch('/posts').then(res => res.json())
  ]);
  console.log(user, posts);
}
```

❗await 会阻塞其后的代码（但不会阻塞外部，因为 async 函数本身返回 Promise，外部会继续执行）。错误处理建议用 try...catch 或在调用处用 .catch()。



## 严格模式

从 ES5 开始，函数内部可以设定为严格模式。

但是，只要函数参数使用了**默认值、解构赋值、或者扩展运算符**，那么函数内部就不能显式设定为严格模式，否则会报错。

其原因是，'use strict'适用函数体和函数参数，但**在执行函数时先执行参数再执行函数体**。此时只有在函数体中才能知道参数是否应该以严格模式执行，但据规则参数先于函数体被执行，故会发生冲突。

解决方法是：要么在全局设定严格模式，要么把函数包在一个无参的立刻执行函数中。

```javascript
const doSomething = (function () {
  'use strict';
  return function(value = 42) {
    return value;
  };
}());
```





## 函数

### 1. 基础

#### · 概述

***函数内部可以直接读取全局变量，但是在函数外部无法读取函数内部的局部变量。***

ES6 允许为函数的参数设置默认值，可直接写在参数定义的后面。参数变量是默认声明的，故不能在函数体内用`let`或`const`再次声明。

> 如赋默认值x,y="world",是赋的y值（默认赋值给尾参数）。若给非尾部的参数设置默认值，从左到右赋值，不能空缺。 如果传入`undefined`，将触发该参数等于默认值，`null`则没有这个效果。
>
> ```javascript
> function foo(x = 5, y = 6) {
>   console.log(x, y);
> }
> 
> foo(undefined, null)
> // 5 null
> ```

***参数默认值不传值，而是每次都重新计算默认值表达式的值。***

❗在函数内部声明变量的时候，一定要使用 var 命令。如果不用的话，实际上声明的是一个全局变量。

#### ❓ 解构赋值

#### · length属性

指定默认值后，返回没有指定默认值的**参数个数**。原因是length取的是预期传入的参数个数，若设定了默认值则不符合函数要求，后续不计入参数个数。

eg:

```javascript
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```

**❗若设置了默认值的参数不是尾参数，`length`属性也不会再计入后面的参数。**

#### · 作用域

设置参数默认值（形成前提），函数进行声明初始化时，参数会形成一个单独的作用域。待初始化结束，该作用域消失。

作用域只关注当前函数的参数名，以及函数外部的变量。

***例1***

```javascript
var x = 1;//x为全局变量
//此处函数有两个参数x,y，y的默认值是参数x的值
function f(x, y = x) {
  console.log(y);
}

f(2) // 调用第一个参数x，并把2赋给参数x.参数x把它的值赋给参数y，此时y=2.最后console.log(y)打印出y→输出2
```

***例2***

```javascript
let x = 1;
//f(y=x)内， y是参数，x是变量名（只用来计算y的默认值）y=x只是说，y的默认值是变量x的值。
function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 调用函数，此时没有给y传值，要先计算x的值。在参数作用域内没有参数x，于是在函数体外找到全局变量x。故输出为1.
❗默认值的计算发生在函数体作用域外。
```

> 若此处将let改为var，依旧输出1。
>
> 因为变量提升只在函数体作用域内有效，而默认值的计算发生在函数体作用域外。

#### · rest参数

用于获取函数的多余参数。rest 参数搭配的变量是一个**数组**，该变量将多余的参数放入数组中。

形式为`...变量名`。

**利用 rest 参数，可以向该函数传入任意数目的参数**.

```javascript
function showRest(first, ...rest){
    console.log(first);//1
    console.log(rest);//[2,3,4,5,6,7]
}
showRest(1,2,3,4,5,6,7);
```

##### ❗注意事项：

- rest参数只能作为最后一个参数，否则会报错。
- 每个函数只能有一个rest参数。
- 箭头函数无自己的arguments对象。若要收集不定数量的参数，必须使用rest参数。
- length属性不包含rest参数（<span style="color:red">就是说，计数时把它看作设定了默认值的参数</span>）

它和扩展运算符都使用了...，但是变化方向相反（rest:多个值→一个数组；扩展运算符：一个数组/对象→多个值）。

#### · 箭头函数

```javascript
var f = v => v;
//等同于
var f = function(v){return v;}
------------------------------------------------------
var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用`return`语句返回。

由于**大括号会被解释为代码块**，所以如果箭头函数直接返回一个对象，**必须在对象外面加上括号**，否则会报错。

❗注意事项：

- 箭头函数没有自己的`this`对象。因为箭头函数内部的`this`指向是固定的（继承自外部作用域）。
- 不可以对箭头函数使用`new`命令。
- 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数。（❓）

### 2. 函数调用

#### 全局调用

直接以 函数名() 的形式调用。

#### 构造函数调用

使用new关键字调用函数，这个函数就叫构造函数。它用于创建新对象。调用时约定首字母大写。

步骤：

- 创建一个空对象并绑定到this；

- 执行构造函数代码，为this添加属性；

- 自动返回this

  ```javascript
  function Person(name){
      this.name = name;
      this.sayHi = function(){
          console.log('Hi,'+this.name);
      };
  }
  // 创建新对象p
  const p = new Person('shakarobia35');
  p.sayHi();//Hi,shakarobia
  ```

  在函数前加上new关键字时，系统自动创建新的空对象（p）、创建让这个对象能访问到函数里的方法（让this直接等于p）、把函数里的this指向新对象、最后把新对象返回（新对象赋值给p)。
  
  ❗在函数外部不可写`console.log('Hi,'+this.name);`因为此时this不再指向那个新对象，而是指向全局对象（此为非严格模式。严格模式为undefined）。
  
  #### this
  
  函数里的 this 由调用方式决定：
  
  · obj.method() → this 指向 obj
  · 普通函数 → this 指向全局（严格模式下 undefined）
  · new Func() → this 指向新实例
  
  若想强行规定 this 是谁，比如把一个函数“借”给另一个对象使用。这时候 就需要使用call、apply、bind 。
  
  <span style="color:red">❗箭头函数不能被call/apply/bind改变this</span>
  
  #### · call——立即调用函数并将内部第一个参数指定为this
  
    语法：`func.call(thisArg,arg1,arg2...)`
  
  ```javascript
  function greet(greeting, punctuation) {
      console.log(greeting + ', ' + this.name + punctuation);
  }
  
  const person = { name: 'Alice' };
  const another = { name: 'Bob' };
  //第一个代替this，后续按普通参数依次赋值给greet函数里的参数
  greet.call(person, 'Hello', '!');   // Hello, Alice!
  greet.call(another, 'Hi', '...');   // Hi, Bob...
  ```
  
  #### · apply——立刻调用，参数以数组形式传递
  
  语法：`func.apply(thisArg,[arg1,arg2...])`
  
  调用函数时，会把第二个参数（数组）展开成一个个参数传进去.
  
  ```javascript
  Math.max.apply(null, [3, 5, 1, 9])
  用此方法可得到数组内最大值。
  第一个参数是null是因为 Math.max 内部根本不需要 this，它只是一个普通函数。传 null 或 undefined 都可以，非严格模式下会被替换成全局对象，但反正函数不用 this，所以没影响。
  ```
  
  更方便的方法是用**扩展运算符**把数组转变成多个值。
  
  ❗注意事项：
  
  - 若扩展运算扩展符后面是一个空数组，则不产生任何效果。eg:`[...[], 1]`
  - 只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。`(...[1, 2])`或`console.log((...[1, 2]))`报错。
  - 运算符与正常的函数参数可以结合使用。扩展运算符后面还可以放置表达式。
  
  #### · bind——不立刻调用，返回新函数
  
  返回一个新函数，这个新函数“记住”了原函数、绑定的 this 和预设参数。
  
  返回的函数不立即调用，等待将来某个时刻被调用。
  
  调用时,新函数内部通过 apply（或 call）执行原函数，强制指定 this 为保存的值，并合并参数
  
  ```javascript
  function greet(greeting, punctuation) {
      console.log(greeting + ', ' + this.name + punctuation);
  }
  
  const person = { name: 'Alice' };
  
  const boundGreet = greet.bind(person, 'Hello');
  // 此时 boundGreet 是返回的新函数，内部存储了原函数 greet、thisArg=person、fixedArgs=['Hello']
  // greet 没有被调用
  
  boundGreet('!');  // 调用新函数
  // 新函数内部执行：
  // greet.apply(person, ['Hello', '!']);
  // 输出：Hello, Alice!
  ```
  
  boundGreet 在被调用之前，它只是一个“等待执行的计划”。一旦调用，它就用 apply 执行原函数，并把固化的 person 作为 this。

#### 函数方法调用

当一个函数被作为对象的属性调用时（对象.方法名()），就称为方法调用。此时 this 指向调用该方法的对象。

```javascript
const calculator = {
  value: 0,
  add(n) {
    this.value += n;
    return this; // 支持链式调用
  }
};
calculator.add(5).add(3);
console.log(calculator.value); // 8
```

### 3.闭包

闭包是指一个函数能够“记住”并访问它的词法作用域（定义时的作用域），即使这个函数在它自己的作用域之外执行。

也就是“函数 + 能访问外部函数变量的能力 = 闭包”。

常见的创建方式是在一个函数内部定义另一个函数并返回。

```javascript
function outer() {
  let secret = '我是内部变量';
  function inner() {
    console.log(secret); // inner 记住了 outer 中的 secret
  }
  return inner;
}

const closureFunc = outer();
closureFunc(); // 输出：我是内部变量
```

**用途**

· 封装私有变量：外部无法直接访问函数内部的变量，只能通过闭包提供的接口操作。

```javascript
function createCounter() {
  let count = 0;
  return {
    increment() { count++; },
    get() { return count; }
  };
}
const counter = createCounter();
counter.increment();
console.log(counter.get()); // 1
// 无法直接访问 count
```

· 保持状态：事件回调、定时器、异步操作中保留当前状态。

❗注意事项

· 闭包会使外部函数的变量一直驻留在内存中，不会被垃圾回收。过度使用可能导致内存泄漏。
· 闭包中的变量是引用传递，注意循环中常见的问题（例如用var定义循环变量时，闭包拿到的是最终值）。解决方法：用let或立即执行函数（IIFE）。

### 4.正则表达式

用于匹配、检索、替换字符串中的模式。

> · 字面量：/pattern/flags
> · 构造函数：new RegExp('pattern', 'flags')

```javascript
const re1 = /ab+c/i;
const re2 = new RegExp('ab+c', 'i');
```

常用方法：

· test(str)：返回布尔值，是否匹配。
· exec(str)：返回匹配结果数组或null。
· str.match(regex)、str.replace(regex, replacer)、str.split(regex)。

```javascript
const str = 'Hello 123 world';
const digitRegex = /\d+/;
console.log(digitRegex.test(str)); // true
console.log(str.match(/\d+/));     // ['123']
console.log(str.replace(/\d+/, '456')); // Hello 456 world
```

常用标志：g(全局匹配)、i(忽略大小写)、m(多行匹配)、u(Unicode)、y(粘性匹配)。

**错误处理**

使用try...catch...finally捕获异常。也可以手动抛出错误throw new Error('自定义错误')。

```javascript
try {
  // 可能出错的代码
  let result = riskyOperation();
  console.log(result);
} catch (error) {
  // 出错时执行
  console.error('捕获到错误：', error.message);
} finally {
  // 无论是否出错都会执行（例如释放资源）
  console.log('清理工作');
}

function riskyOperation() {
  throw new Error('出错了');
}
```

内置错误类型：Error、SyntaxError、ReferenceError、TypeError、RangeError等。

### 5.事件

JavaScript 通过事件模型实现与用户的交互。常见事件：click、load、keydown、mouseover。

#### 绑定：

· HTML属性：`<button onclick="fn()">`
· DOM属性：`element.onclick = fn`
· addEventListener（推荐）：可绑定多个，支持事件捕获/冒泡。

```javascript
const btn = document.querySelector('#myBtn');
btn.addEventListener('click', (event) => {
  console.log('按钮被点击', event.target);
});
```

#### 事件流：

捕获阶段（从window到目标）→ 目标阶段 → 冒泡阶段（从目标回window）。默认在冒泡阶段触发。可通过addEventListener的第三个参数控制是否在捕获阶段触发。

#### 阻止默认行为和冒泡：

· event.preventDefault()：阻止默认行为（如链接跳转）。
· event.stopPropagation()：停止冒泡或捕获。

#### 事件委托：

利用冒泡，将事件监听器绑定到父元素，通过event.target判断实际触发元素，提高性能。

```javascript
document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('列表项被点击', e.target.textContent);
  }
});
```

## JSON

一种轻量级数据交换格式。

· JSON.stringify(obj)：将JavaScript对象/数组转换为JSON字符串。
· JSON.parse(jsonStr)：将JSON字符串解析为JavaScript对象/数组。

```javascript
const person = { name: 'Alice', age: 25, hobbies: ['reading', 'swimming'] };
const jsonStr = JSON.stringify(person);
console.log(jsonStr); // '{"name":"Alice","age":25,"hobbies":["reading","swimming"]}'

const newObj = JSON.parse(jsonStr);
console.log(newObj.name); // Alice
```

❗注意：JSON.stringify会忽略函数、undefined、Symbol；循环引用的对象会抛出错误。可传入第二个参数（替换器）或第三个参数（缩进空格数）。

## DOM API

DOM（Document Object Model）将HTML/XML文档表示为树形结构，JavaScript可以动态访问和修改页面内容、结构、样式。

#### 常用节点类型：Document、Element、Text、Attribute、Comment。

获取元素：

> · document.getElementById('id') → 单个元素
> · document.getElementsByClassName('class') → HTMLCollection（动态）
> · document.getElementsByTagName('div') → HTMLCollection
> · document.querySelector('.class') → 第一个匹配的元素
> · document.querySelectorAll('.class') → NodeList（静态）

操作内容：

> · element.textContent：纯文本内容
> · element.innerHTML：HTML内容（⚠️注意XSS风险）
> · element.setAttribute(name, value) / getAttribute(name)
> · element.classList.add('class')、remove()、toggle()

创建和添加元素：

```javascript
const newDiv = document.createElement('div');
newDiv.textContent = '我是新来的';
document.body.appendChild(newDiv);
```

删除元素：parent.removeChild(child) 或 element.remove()（现代方法）。

修改样式：

> · element.style.property = 'value'（驼峰命名，如backgroundColor）
> · 操作类：element.className 或 classList

事件监听已在“事件”部分说明。

遍历DOM树：

> · 父节点：parentNode、parentElement
> · 子节点：childNodes（含文本节点）、children（仅元素）
> · 兄弟：nextSibling、previousSibling、nextElementSibling、previousElementSibling

## 性能优化

#### 防抖(debounce)

当事件频繁触发时，只在最后一次触发后等待一段空闲时间才执行回调。适用于输入框搜索、窗口resize等。

```javascript
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 使用
const input = document.querySelector('input');
input.addEventListener('input', debounce(function(e) {
  console.log('搜索：', e.target.value);
}, 300));
```

#### 节流 (Throttle)

节流：规定时间内只执行一次回调，不管事件触发了多少次。适用于滚动加载、鼠标移动、高频点击等。

```javascript
function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

// 使用
window.addEventListener('scroll', throttle(() => {
  console.log('滚动位置', window.scrollY);
}, 200));
```

#### ❗区别总结：

> · 防抖：连续触发只执行最后一次（如搜索框输入停止后才请求）。
> · 节流：固定频率执行（如滚动时每隔一段时间检查一次）。

## Ajax

允许在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页。

#### ·原生方式：XMLHttpRequest

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.example.com/data', true); // true表示异步
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(JSON.parse(xhr.responseText));
  }
};
xhr.send();
```

#### ·现代方式：Fetch API（返回Promise，更简洁）

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) throw new Error('网络错误');
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

#### ·发送POST请求：

```javascript
fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' })
})
.then(res => res.json())
.then(console.log);
```

#### ·处理跨域：后端设置CORS头，或使用JSONP（仅GET）、代理服务器等。



## 使用 JavaScript 实现 Web 端调试

### console 对象方法

> · console.log()：输出普通信息
> · console.error()：输出错误样式
> · console.warn()：输出警告
> · console.table()：以表格形式显示数组/对象
> · console.time() / console.timeEnd()：测量代码执行时间
> · console.group() / console.groupEnd()：分组输出
> · console.trace()：打印调用栈

### 断点调试

在浏览器开发者工具（F12）的 Sources 面板中：

· 点击行号添加断点，代码执行到该行会暂停。
· 可以查看作用域中的变量、调用栈。
· 使用 debugger; 语句在代码中主动触发断点。

```javascript
function calculate(a, b) {
  debugger; // 执行到这里会自动暂停
  return a + b;
}
```

### 其他调试技巧

> · 监视表达式：在调试器中添加表达式，实时观察值的变化。
> · 条件断点：右键断点，设置条件（例如 count === 5）。
> · 网络面板：查看 Ajax 请求、响应时间、状态码。
> · Performance 面板：分析性能瓶颈、重绘回流等。
> · 检查 DOM 元素：在 Elements 面板修改样式/属性，立即生效。

### 生产环境调试

> · 使用 window.onerror 捕获全局未处理的错误并上报。
> · 使用 try...catch 结合第三方日志服务（如 Sentry）收集前端错误。
> · 通过 localStorage 或 sessionStorage 记录用户操作序列，便于复现问题。

```javascript
window.onerror = function(message, source, lineno, colno, error) {
  console.error('全局错误:', message, source, lineno, colno, error);
  // 上报到服务器
  return true; // 阻止默认浏览器错误处理
};
```

## 暂且搁置

name属性

