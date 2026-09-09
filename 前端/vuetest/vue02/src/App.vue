<template>
   <div id="app">
      <h1>Vue 3对于响应式数据的一些实践</h1>
      <Person />
      <Car />
      <List />
   </div>
</template>

<script>
    import Person from './components/person.vue'
    import Car from './components/Car.vue'
    import List from './components/List.vue'
    export default {
        name: 'App',//组件名
        components: {
            Person,Car,List
        }
    }
</script>

<style>
    .app {
        text-align: center;
        background-color: #f5f5f5;
        border-radius: 10px;
        padding: 20px;
    }
</style>