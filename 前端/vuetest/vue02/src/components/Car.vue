<template>
  <div class="car">
    <h2>Car Component</h2>
    <p>一辆{{car.model }}型号的{{car.brand }}车价值{{ car.price }}万</p>
    <button @click="changePrice">修改价格</button>
    <br>
    <h3>汽车列表</h3>
    <ul>
      <li v-for="car in cars" :key="car.id">{{ car.brand }} {{ car.model }}: {{ car.price }}万</li>
    </ul>
    <form @submit.prevent="changeBrand">
      <label>
        修改第一个汽车的牌子:
        <input v-model="newCarsBrand">
      </label>
      <button>保存</button>
    </form>
  </div>
</template>

<script setup>
  import {reactive, ref} from 'vue'   
  const car = reactive({
    brand: 'Toyota',
    model: 'Corolla',
    price: '100'
  })
  const newCarsBrand = ref('');
  let id = 1;
  let cars = reactive([
    { id: id++, brand: 'Toyota', model: 'Corolla', price: '100' },
    { id: id++, brand: 'Honda', model: 'Civic', price: '120' },
    { id: id++, brand: 'Ford', model: 'Focus', price: '90' }
  ])
  
  const changePrice = () => {
    car.price = (parseFloat(car.price) + 10).toString();
  }

  function changeBrand() {
    cars[0].brand = newCarsBrand.value;
    newCarsBrand.value = '';
  }
</script>

<style>
  .car {
    background-color: aquamarine;
    border: 1px solid skyblue;
    padding: 20px;
    margin: 20px;
  }
</style>