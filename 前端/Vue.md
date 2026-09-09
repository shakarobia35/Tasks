# Vue

## Vue 的基本认识

### 总述

- Vue 的**单文件组件**会将一个组件的逻辑 (JavaScript)，模板 (HTML) 和样式 (CSS) 封装在同一个文件里。

- 使用**选项式 API**可用包含多个选项的对象来描述组件的逻辑，例如 `data`、`methods`(<span style="color:silver">*用于更改状态/触发更新，作事件处理器绑定*</span>) 和 `mounted`(<span style="color:silver">*生命周期钩子函数。在组件生命周期各不同阶段被调用*</span>)。选项所定义的属性都会暴露在函数内部的 `this` 上，它会指向当前的组件实例。
- 通过**组合式 API**，可使用导入的 API 函数来描述组件逻辑，通常会与`<script setup>`搭配使用。setup告诉 Vue 需要在编译时进行一些处理,以便使用组合式API。
- 选项式API是在组合式API基础上实现的。选项式偏向于面向对象，组合式形式更自由，集合多函数进行处理。

### 声明式渲染

可根据JS状态描述HTML，当状态改变，HTML自动更新。触发更新的状态——响应式。用`reactive()`声明响应式状态。

> `reactive()`适用于对象（包括数组和内置类型，如map/set）
>
> `ref()`可接受任何值类型。它会返回一个包裹对象，并在`.value`属性下暴露内部值。

vue追踪的是**数据的变化**，它通过代理这个对象的`.value`属性实现响应式追踪。reaction()作用于对象，故无需写`.value`.

```vue
<script setup>
import { ref } from 'vue'
const message = ref('hello world!')
console.log(message.value)
setTimeout(()=>{message.value='changed'},3000)//3秒后自动变化
</script>

<template>
<div>{{message}}</div>//无需写.value,vue自动解包
</template>
```

#### · attribute绑定——文本变化

vue中，{{}}只能用于文本插值。为给attribute绑定动态值需使用`v-bind`指令。

```vue
<script setup>
import { ref } from 'vue'

const titleClass = ref('title')
</script>

<template>
  <h1 v-bind:class="titleClass">Make me red</h1>
//或 <h1 :class=...
</template>

<style>
.title {
  color: red;
}
</style>
```

#### · 事件监听——更新状态

使用`v-on`监听DOM事件。简写：@

eg:`<button v-on:click="increment">{{ count }}</button>`

`<button @click="increment">{{ count }}</button>`

<span style="color:silver">* *此处increment是引用的一个在`<script setup>`中声明的函数*</span>

#### · 表单绑定——前两者结合

简化双向绑定，使用`v-model`,不需要像`v-on`一样额外定义函数。

#### · 条件渲染——选择变化

`v-if`,它只会在等号后的对象的值为真时渲染，若为假，则从DOM中移除。

也可使用 `v-else` 和 `v-else-if` 来表示其他的条件分支。

```vue
<script setup>
import { ref } from 'vue'

const awesome = ref(true)

function toggle() {
  awesome.value = !awesome.value
}//使用toggle方法可使用按钮在两条语句中来回切换。
</script>

<template>
  <button @click="toggle">Toggle</button>
  <h1 v-if="awesome">Vue is awesome!</h1>
  <h1 v-else>Oh no 😢</h1>
</template>
```

#### · 列表渲染——数组变换

用 `v-for` 指令可渲染一个基于源数组的列表。

`v-for` 指令的值需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据的数组， `item` 是迭代项的**别名**。通过这个语法，可以实现对数组的遍历。

```vue
<script setup>
import { ref } from 'vue'

// 给每个 todo 对象一个唯一的 id
let id = 0

const newTodo = ref('')
//源数据的数组
const todos = ref([
  { id: id++, text: 'Learn HTML' },
  { id: id++, text: 'Learn JavaScript' },
  { id: id++, text: 'Learn Vue' }
])

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value })
  newTodo.value = ''
}
//.push直接在尾部添加新数组，数组发生改变使得vue监测到变化并更新页面

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
}
//遍历数组，比对每个当前遍历项是否与点删除时传入的todo对象相符。
</script>

<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" required placeholder="new todo">
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
        //key是为每个li打上id标签
      {{ todo.text }}
      <button @click="removeTodo(todo)">X</button>
    </li>
  </ul>
</template>
```

**计算属性** 

API`computed()`能创建一个计算属性 ref，并据其他响应式数据源动态计算 `.value`

```vue
const filteredTodos = computed(() => {
  return hideCompleted.value
    ? todos.value.filter((t) => !t.done)
    : todos.value
})
```

#### 生命周期和模板引用

#### 组件

在script导入`import ChildComp from './ChildComp.vue'`即可在template使用组件`<ChildComp />`

**Props**

子组件可以通过 **props** 从父组件接受动态数据。

## Vue创建（基于vite）

### 文件认识

- main.ts

  ```ts
  import { createApp } from 'vue'
  //creatApp是在创建应用（创建一个种花的盆）
  import App from './App.vue'
  //App是组件（花的根）后续所有组件都要安装在app上
  createApp(App).mount('#app')
  //创建应用时把根组件App传进去（把花插在花盆里），然后把它挂载到id为#app的容器里（把花盆摆在哪个位置）
  //#app在index.html的<div id="app"></div>此处
  //html还要用<script type="module" src="/src/main.ts"></script>引入main.ts
  ```

​	❗src中必不可少的两个文件就是main.ts和App.vue

- 其他文件
  - component 放其他组件
  - assets 固有css和图片

### ref&reactive

宏观角度看:

> ref 用来定义:基本类型数据、对象类型数据;
>
>  reactive 用来定义:对象类型数据。

 区别: 

> 1. ref 创建的变量必须使用.value(可以使用 volar插件自动添加.value). 
>
> 2.  reagtive 重新分配一个新对象,会失去响应式(可以使用Object.assign 去整体替换)。
>
>    ```
>    function changeCar(){
>    	Object.assign(car,{brand:'ata',price:10})
>    	这会把后面的对象分配给第一个对象（car）
>    }
>          
>    ```

### 路由

一组key-value对应。多个路由需要路由器管理。

#### 格式

1.导航区、展示区
2.请来路由器 

3.制定路由的具体规则(什么路径,对应着什么组件)
4.形成 一个一个的【???.vue】 Class.vue Subject.vue

 使用原则: 

> 1.若需要一个基本类型的响应式数据,必须使用 ref.
>
> 2.若需要一个响应式对象,层级不深,ref、reactive 都可以。
>
> 3.若需要一个响应式对象,且层级较深,推荐使用 reactive.

#### 路由工作模式

##### 1.history模式 

- 优点: URL 更加美观,不带有#,更接近传统的网站 URL。

- 缺点:后期项目上线,需要服务端配合处理路径问题,否则刷新会有404错误 

  ```vue
  const router =createRouter({ 
  	history:createwebHistory(), //history模式
  	/****/
  })
  ```

##### 2.hash模式

- 优点:兼容性更好,因为不需要服务器端处理路径。 

- 缺点:URL带有#不太美观,且在 SE0 优化方面相对较差。

  ```vue
  const router = createRouter({
  	history:createWebHashHistory(), //hash模式
  ```

  

  



> 💭 额外思考内容（选做）
>你的⼩⽹站⾥，哪些部分适合拆成组件？拆分的依据是什么？
> Vue 的“响应式”在你的项⽬⾥体现在哪？它和你在原⽣ JS ⾥操作 DOM 的⽅式有什么不同？
> 如果不⽤ Vuex，你会如何在两个⻚⾯之间共享状态？有没有遇到“状态乱了”的情况？
> 你认为“框架”解决了你哪些痛点？有没有引⼊新的复杂度？

