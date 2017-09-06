<template>
  <div class="navigation-container">
      <div class="links">
        <router-link v-if="prev" :to="prev.path" tag="md-button" class="md-raised md-primary"> < {{ prev.name }} </router-link>
        <span></span>
        <router-link v-if="next" :to="next.path" tag="md-button" class="md-raised md-primary"> {{ next.name }} > </router-link>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>