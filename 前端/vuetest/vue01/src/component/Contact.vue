<template>
  <div class="contact-page">
    <div class="contact">
      <h1>Contact Us</h1>
      <p>拉普拉斯科算中心始终欢迎各位研究员与合作伙伴的沟通与反馈。</p>
      <ul>
        <li>总部地址：拉普拉斯科算中心总部（隶属于圣帕夫洛夫基金会）</li>
        <li>联络部门：拉普拉斯科算中心联络处</li>
        <li>官方网站：<a href="https://www.bilibili.com/video/BV1GJ411x7h7/?share_source=copy_web">拉普拉斯科算中心官网</a>（请以实际域名为准）</li>
        <li>技术支持：展示中心系统相关问题，请联系信息技术支持团队</li>
      </ul>

      <p>如有关于网站功能、成果展示或账号权限的任何疑问，欢迎通过科算中心内部通讯系统与我们取得联系。我们将在收到消息后尽快回复。</p>

      <button @click="turnPhone">电话</button>
      <button @click="copyEmail">邮箱</button>
    </div>
  </div>
</template>

<script setup name="Contact">
const email = 'jiubugaosuni@lpl.com'
const phone = '13800138000'
const copyEmail = () => 
  navigator.clipboard.writeText(email).then(() => 
    alert('邮箱已复制！很不高兴认识你！( ᓀ◞ᓂ..)')
  )
const turnPhone = () => {
  window.location.href = `tel:${phone}`
}
</script>

<style scoped>
.contact-page {
  color: #333;
  font-family: "Poppins", sans-serif;
}
.contact {
  color: #333;
  font-family: "Poppins", sans-serif;
}
button {
  margin: 10px;
  padding: 10px 20px;
  background: #969ea5;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>