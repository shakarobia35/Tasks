<template>
  <div class="center">
    <!-- 导航区 -->
    <ul class="nav">
      <li v-for="center in centerList" :key="center.id">
        <router-link :to="center.path">{{ center.title }}</router-link>
      </li>
    </ul>
    <!-- 内容区 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup name="Center">
    import { reactive } from 'vue'
    const centerList = reactive([
      { id: 1, title: '上传成果', path: '/center/detail1/upload' },
      { id: 2, title: '归档管理', path: '/center/detail1/manage' },
      { id: 3, title: '草稿箱', path: '/center/detail1/draft' }
    ])
</script>

<style>
.center{
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