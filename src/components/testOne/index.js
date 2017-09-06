import * as d3 from 'd3'

export default {
  name: 'testOne',
  mounted: function() {
    var test = d3.select('#test-one-container')
    var array = []
    let startX = 25
    let startY = 600
    let width = 25
    function fiboRec(x) {
      if(x <= 1) {
        return [1]
      }
      if(x < 3) {
        return [1, 1]
      }
      let n = fiboRec(x - 1)
      n.push(n[x - 2] + n[x - 3])
      return n
    }
    array = fiboRec(15)
    function fibo () {
      for(let i = 0; i < 15; i++) {
        test
          .append('text')
          .attr('x', startX)
          .attr('y', startY)
          .attr('fill', 'red')
          .text(array[i])
        test
          .append('rect')
          .attr('x', startX)
          .attr('y', startY - array[i] - 25)
          .attr('width', width)
          .attr('height', array[i])
          .attr('fill', 'blue')
        startX += 50
      }
    }
    fibo()
  }
}
