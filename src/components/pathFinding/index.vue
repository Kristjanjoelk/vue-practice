<template>
  <div>
  <input v-model='prizeLoc.x' v-on:change='draw'>
  <input v-model='prizeLoc.y' v-on:change='draw'>
  <button v-on:click="findPath">findPath</button>
    <canvas id='my-canvas'></canvas>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>