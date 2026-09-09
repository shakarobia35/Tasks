<template>
  <div class="person">
    <h2>Person Component</h2>
    <p>This is a person component.</p>
    <h2>姓名：{{ name }}</h2>
    <h2>年龄：{{ age }}</h2>
    <button @click="changeName">修改姓名</button>
    <button @click="changeAge">修改年龄</button>
  </div>
</template>

<script setup>
  import {ref} from 'vue'
  const originName = ref('张三')
  const originAge = ref(18)
  
  let name = ref(originName.value)
  let age = ref(originAge.value)
  function changeName() {name.value = (name.value === originName.value) ? '李四' : originName.value}
  function changeAge() {age.value = (age.value === originAge.value) ? 20 : originAge.value}
</script>


<style>
  .person {
    background-color: aquamarine;
    border: 1px solid skyblue;
    padding: 20px;
    margin: 20px;
  }
  button {
    padding: 5px 10px;
    background-color: skyblue;
    border: none;
    color:black;
    cursor: pointer;
    gap: 10px;
    margin-right: 20px;
  }
</style>

