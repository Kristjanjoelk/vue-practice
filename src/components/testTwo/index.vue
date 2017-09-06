<template>
  <div class='two-container'>
    <svg id="test-two-container" width='800' height='800'>
    </svg>
    <br />
    <br />
    <br />
    <input
      type="range"
      v-model="startingPoint"
      value='0'
      min="0"
      max="100"
      step="1"
    >
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>