<template>
  <div class="home">
    <!-- 导航区 -->
    <ul class="nav">
      <li v-for="home in homeList" :key="home.id">
        <router-link :to="home.path">{{ home.title }}</router-link>
      </li>
    </ul>

    <!-- 内容区 -->
    <div class="content">
      <router-view></router-view>
    </div>
    
  </div>

</template>

<script setup name="Home"> 
    import { reactive } from 'vue'
    const homeList = reactive([
      { id: 1, title: '网站简介', path: '/home/detail1/intro' },
      { id: 2, title: '使用教程', path: '/home/detail1/course' },
      { id: 3, title: '联系我们', path: '/home/detail1/contact' }
    ])
/*  import { onMounted,onUnmounted } from 'vue';
    onMounted(()=>{
        console.log('home组件挂载了')
    })
    onUnmounted(()=>{
        console.log('home组件卸载了')
    })*/
</script>

<style scoped> 
.home{
    display: flex; 
    flex-direction: row;
    gap: 30px;
} 
.nav{
    text-decoration: none;
    list-style: none;
    font-family: 'Pinyon Script', cursive;
    font-size: 20px;
    padding: 5px;
    text-align: left;
    font-style: italic;
}
.content{
    flex: 1;
    padding: 20px;
}

</style>