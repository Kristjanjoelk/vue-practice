import * as d3 from 'd3'

export default {
  name: 'testTwo',
  data: function () {
    return {
      startingPoint: { 
        'point': 0
      }
    }
  },
  mounted: function () {
    this.test = d3.select('#test-two-container')
    let startPoint = Object.assign({}, this.startingPoint)
    console.log('startingpoint!!:', startPoint)
    var array = []
    let lineData = []
    let startX = 300
    let startY = 400
    let fibNum = 50
    function fiboRec(x) {
      if (x <= 1) {
        return [1]
      }
      if (x < 3) {
        return [1, 1]
      }
      let n = fiboRec(x - 1)
      n.push(n[x - 2] + n[x - 3])
      return n
    }
    function even() {
      let temp = 1
      for (let i = 1; i < fibNum; i++) {
        temp += i
        array.push(temp)
      }
    }
    function assembleData() {
      for (let i = 0; i < fibNum - 1; i++) {
        if (startPoint.point === 0) { // up
          startY -= array[i]
        }
        if (startPoint.point === 1) { // left
          startX -= array[i]
        }
        if (startPoint.point === 2) { // down
          startY += array[i]
        }
        if (startPoint.point === 3) { // right
          startX += array[i]
          startPoint.point = -1
        }
        startPoint.point += 1
        lineData.push({
          'x': startX,
          'y': startY
        })
      }
    }
    even()
    assembleData()
    // array = fiboRec(fibNum)
    for (let i = 0; i < fibNum - 1; i++) {
      if (startPoint === 0) { // up
        startY -= array[i]
      }
      if (startPoint === 1) { // left
        startX -= array[i]
      }
      if (startPoint === 2) { // down
        startY += array[i]
      }
      if (startPoint === 3) { // right
        startX += array[i]
        startPoint = -1
      }
      startPoint += 1
      lineData.push({
        'x': startX,
        'y': startY
      })
    }
    this.lineFunction = d3.line()
      .x(function (d) {
        return d.x
      })
      .y(function (d) {
        // console.log('d: ', d)
        return d.y
      })
    this.thing = this.test.append('path').attr('d', this.lineFunction(lineData)).attr('stroke', 'black').attr('stroke-width', 2).attr('fill', 'none')
  },
  watch: {
    startingPoint: function (newValue) {
      // this.test.select('path').remove()
      let startPoint = parseInt(newValue)
      if(startPoint > 3) {
        startPoint = startPoint % 4
      }
      console.log('heheh', startPoint)
      var array = []
      let data = []
      let sX = 300
      let sY = 400
      let fibNum = 50
      function even() {
        let temp = 1
        for (let i = 1; i < fibNum; i++) {
          temp += i
          array.push(temp)
        }
      }
      function assembleDataTwo() {
        for (let i = 0; i < fibNum - 1; i++) {
          if (startPoint === 0) { // up
            sY -= array[i]
          }
          if (startPoint === 1) { // left
            sX -= array[i]
          }
          if (startPoint === 2) { // down
            sY += array[i]
          }
          if (startPoint === 3) { // right
            sX += array[i]
            startPoint = -1
          }
          startPoint += 1
          data.push({
            'x': sX,
            'y': sY
          })
        }
      }
      even()
      assembleDataTwo()
      this.func = d3.line()
        .x(function (d) {
          return d.x
        })
        .y(function (d) {
          return d.y
        })
      this.thing.attr('d', this.func(data))
    }
  }
}
