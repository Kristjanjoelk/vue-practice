<template>
    <div class='main-container'>
        <div class='info-container'>
            <div>Enemy position</div>
            <div>x: {{enemyLoc.x}}</div>
            <div>y: {{enemyLoc.y}}</div>
            <div>current direction list</div>
            <div>{{oldSolution}}</div>
            <div class="grid">
                <div class="cell" v-bind:class="{ active: oldSolution === 7 }">7</div>
                <div class="cell" v-bind:class="{ active: oldSolution === 0 }">0</div>
                <div class="cell" v-bind:class="{ active: oldSolution === 5 }">5</div>
                <div class="cell" v-bind:class="{ active: oldSolution === 2 }">2</div>
                <div class="cell">x</div>
                <div class="cell" v-bind:class="{ active: oldSolution === 3 }">3</div>
                <div class="cell" v-bind:class="{ active: oldSolution === 6 }">6</div>
                <div class="cell" v-bind:class="{ active: oldSolution === 1 }">1</div>
                <div class="cell" v-bind:class="{ active: oldSolution === 4 }">4</div>
            </div>
        </div>
      <canvas id='my-canvas'>
          <p> Canvas element not supported!</p>
      </canvas>
      </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>