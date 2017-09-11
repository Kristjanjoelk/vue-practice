<template>
  <div>
    <div class='input-container'>
  <label for="playerLoc.x">player loc x</label>
  <input id='prizeLoc.x' v-model='playerLoc.x' v-on:change='draw' type="number">
  <label for="playerLoc.y">player loc y</label>
  <input id='playerLoc.y' v-model='playerLoc.y' v-on:change='draw' type="number">
  </div>
  <div class='input-container'>
  <label for="prizeLoc.x">prize loc x</label>
  <input id='prizeLoc.x' v-model='prizeLoc.x' v-on:change='draw' type="number">
  <label for="prizeLoc.y">prize loc y</label>
  <input id='prizeLoc.y' v-model='prizeLoc.y' v-on:change='draw' type="number">
  </div>
  <div>
  <button v-on:click="findPath">findPath</button>
  </div>
    <canvas id='my-canvas'></canvas>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>