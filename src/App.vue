<template>
  <div class="app">
    <h4>Threejs 演示</h4>
    <ul class="menu">
      <li>
        <router-link to="/base">基础属性</router-link>
      </li>
      <li>
        <router-link to="/model">模块加载</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<style scoped>
  .menu > li{

      text-align: center;
      line-height: 40px;

  }
  .menu  {
    position: fixed;
    left: 20px;
    top: 80px;
  }
</style>