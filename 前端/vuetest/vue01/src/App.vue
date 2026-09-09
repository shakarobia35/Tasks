<template>
  <div class="app" :class="{ 'logged-in': isLoggedIn }">
    <!-- 登录前背景视频 -->
    <video
      v-if="!isLoggedIn"
      ref="bgVideo"
      autoplay
      muted
      playsinline
      @ended="onVideoEnded"
      class="bg-video"
    >
      <source src="@/assets/img/video.mp4" type="video/mp4" />
      您的浏览器不支持视频播放。
    </video>

    <!-- 登录前提示/登录层 -->
    <div
      v-if="!isLoggedIn && showPrompt"
      class="prompt-overlay"
      @click="handleOverlayClick"
    >
      <div v-if="!showLogin" class="prompt-box">
        <p class="prompt-text">Click anywhere to log in / register</p>
      </div>
      <!-- 使用 Element Plus 表单 -->
      <div v-else class="login-box" @click.stop>
        <h2>Sign up/Log in</h2>
        <el-form @submit.prevent="handleLogin">
          <el-form-item>
            <el-input v-model="username" placeholder="用户名" required />
          </el-form-item>
          <el-form-item>
            <el-input type="password" v-model="password" placeholder="密码" required show-password />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" style="width:100%;">Start your journey!</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 登录后 -->
    <template v-if="isLoggedIn">
      <!-- 标题 -->
      <nav class="title">💾⌈Welcome to Laplace Exhibition Center!⌋</nav>

      <!-- 导航栏 -->
      <nav class="sidenav">
        <router-link to="/home" class="nav-item"><span>首页</span></router-link>
        <router-link to="/center" class="nav-item"><span>中心</span></router-link>
        <router-link to="/user" class="nav-item"><span>用户</span></router-link>
      </nav>

      <!-- 背景（登录后） -->
      <img src="@/assets/img/bg2.jpg" alt="Background" class="bg2" />

      <!-- 内容区 -->
      <main class="content">
        <div class="card">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
          <footer>
            <p>&copy; 2026 拉普拉斯科算中心。保留所有权利。</p>
            <p>太好了，我们的保密工作做得像在楼下公开演讲一样安全。</p>
          </footer>
        </div>
      </main>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { ElMessage } from 'element-plus'

const store = useStore()

const isLoggedIn = computed(() => store.getters.isLoggedIn)
const showPrompt = ref(false)
const showLogin = ref(false)
const username = ref('')
const password = ref('')
const bgVideo = ref(null)

const onVideoEnded = () => {
  showPrompt.value = true
}

const handleOverlayClick = () => {
  showLogin.value = true
}

const handleLogin = () => {
  if (username.value.trim() && password.value.trim()) {
    store.dispatch('login', { name: username.value })
    ElMessage.success('登录成功')
    showPrompt.value = false
    showLogin.value = false
  } else {
    ElMessage.warning('请输入用户名和密码')
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap');
@import url('https://m.googlefonts.cn/css2?family=UnifrakturMaguntia&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Petit+Formal+Script&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: transparent;
  position: relative;
}

/* ----- 登录前背景视频 ----- */
.bg-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

/* ----- 登录前覆盖层 ----- */
.prompt-overlay {
  font-family: 'Pinyon Script', cursive;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.3);
  animation: fadeIn 1s ease;
}
.prompt-text {
  font-size: 28px;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 20px rgba(0,0,0,0.8);
  letter-spacing: 4px;
}
.login-box {
  padding: 40px 50px;
  background: rgba(0, 0, 0, 0.25);
  min-width: 320px;
  max-width: 90%;
  text-align: center;
  cursor: default;
}
.login-box h2 {
  color: white;
  font-size: 28px;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.login-box input {
  width: 100%;
  padding: 14px 18px;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(2px);
  color: white;
  outline: none;
  transition: border 0.3s, background 0.3s;
}
.login-box input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.login-box input:focus {
  border-color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.25);
}
.login-box button {
  width: 100%;
  padding: 14px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 30px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Pinyon Script',cursive;
  cursor: pointer;
  transition: background 0.3s;
}
.login-box button:hover {
  background: rgba(255, 255, 255, 0.35);
}
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ===== 登录后 ===== */

/*---------- 背景 -----------*/
.bg2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
}

/* ---------- 标题 ---------- */
.title {
  position: fixed;
  display:flex;
  justify-content: center;
  z-index: 1000;
  font-family: 'Petit Formal Script', cursive;
  font-size: 30px;
  color: rgb(43, 57, 74);
  text-shadow: 0 2px 10px rgba(30, 30, 30, 0.5); 
  background: linear-gradient(135deg, #d1d5d8 0%, #f5f7f9 25%, #e2e6ea 50%, #b8bcc0 75%, #d1d5d8 100%);
  box-shadow: inset 0 1px 3px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.2);

  border-bottom-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 10px 20px;
  width: 98%;
  margin: 0 auto;
  margin-bottom: 20px;
  box-sizing: border-box;
}


/* ---------- 导航栏 ---------- */
.sidenav {
  position: fixed;
  left: 25px;
  top: 100px;
  height: 50vh;
  width: 100px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  z-index: 10;
}

.nav-item {
  margin: 28px 0;
  text-decoration: none;
  transition: all 0.3s ease;
}
.nav-item span {
  font-size: 15px;
  font-family: 'Pinyon Script', cursive;
  font-weight: 500;
  color: white;
  letter-spacing: 2px;
  transition: all 0.3s ease;
  display: inline-block;
}
.nav-item:hover span {
  color: rgb(22, 35, 34);
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.15), 0 0 40px rgba(200, 175, 50, 0.2);
  transform: scale(1.03);
}

/* ---------- 内容区 ---------- */
.content {
  position: relative;    
  margin-left: 100px;     
  padding-top: 100px;      
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center; 
  z-index: 5;
}

/* ---------- 白色卡片 ---------- */
.card {
  width: 100%;
  max-width: 950px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(4px);
  border-radius: 24px;
  padding: 30px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  height: 600px;
  overflow-y: auto;
  transition: all 0.3s ease;
  margin-bottom: 40px; 
}
footer {
  margin-top: auto;
  text-align: center;
  font-size:10px;
  line-height: 0.8;
  color: #666;
}
/*---------- 添加过渡动画 ----------*/
.login-box .el-input__wrapper {
  background: rgba(255, 255, 255, 0.15) !important;
  backdrop-filter: blur(2px) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  border-radius: 25px !important;
  box-shadow: none !important;
  transition: border 0.3s, background 0.3s;
  padding: 0 18px;
}
.login-box .el-input__inner {
  color: white !important;
  font-size: 16px;
  height: 48px;
}
.login-box .el-input__inner::placeholder {
  color: rgba(255, 255, 255, 0.6) !important;
}
.login-box .el-input__wrapper:focus-within {
  border-color: rgba(255, 255, 255, 0.8) !important;
  background: rgba(255, 255, 255, 0.25) !important;
}
.login-box .el-button {
  background: rgba(255, 255, 255, 0.2) !important;
  backdrop-filter: blur(4px) !important;
  border: 1px solid rgba(255, 255, 255, 0.4) !important;
  border-radius: 30px !important;
  color: white !important;
  font-size: 18px !important;
  font-weight: bold !important;
  font-family: 'Pinyon Script', cursive !important;
  padding: 14px 0 !important;
  height: auto !important;
  transition: background 0.3s;
  letter-spacing: 1px;
}
.login-box .el-button:hover {
  background: rgba(255, 255, 255, 0.35) !important;
}
.login-box .el-form-item {
  margin-bottom: 16px !important;
}
.login-box .el-input {
  --el-input-border-color: transparent;
  --el-input-hover-border-color: transparent;
  --el-input-focus-border-color: transparent;
}
</style>