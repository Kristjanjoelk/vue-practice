/* eslint-disable */
//import computer from './computer'

export default {
  name: 'testThree',
  data: function () {
    let arr = []
    for (let i = 0; i < 24; i++) {
      let temp = [];
      for (let j = 0; j < 24; j++) {
        if(i === 0 || j === 0 || j === 23) {
          temp.push('0')
        } else if(i > 3 && j > 3 && (i < 20 && j < 20)) {
          if(i >= 11 && i < 13 && j >= 11 && j < 13) {
            temp.push('1')
          } else {
            temp.push('2')
          }
        } else {
          temp.push('1')
        }
      }
      arr.push(temp)
    }
    return {
      mouse: {
        current: {
          x: 0,
          y: 0
        },
        previous: {
          x: 0,
          y: 0
        },
        down: false
      },
      char: {
        current: {
          x: 12,
          y: 12
        }
      },
      board: arr,
      // comp: new computer('testParameter')
    }
  },
  computed: {
    currentMouse: function () {
      console.log('computed')
      var c = document.getElementById('my-canvas')
      var rect = c.getBoundingClientRect()
      return {
        x: this.mouse.current.x - rect.left,
        y: this.mouse.current.y - rect.top
      }
    }
  },
  methods: {
    draw: function () {
      var c = document.getElementById('my-canvas')
      c.width = 1000
      c.height = 1000
      var ctx = c.getContext('2d')
      ctx.clearRect(0, 0, c.width, c.height);
      let coords = {
        a: 0,
        b: 0,
        c: 5,
        d: 5
      }
      this.drawWalls(ctx)

      for(let i = 0; i < 24; i++) {
        ctx.moveTo(coords.a, 0)
        ctx.lineTo(coords.a, 1000)
        ctx.stroke()
        ctx.moveTo(0, coords.b)
        ctx.lineTo(1000, coords.b)
        ctx.stroke()
        coords.a += 41.5
        coords.b += 41.5
      }
      
      this.drawBoard(ctx)
      this.drawChar(ctx)
    },
    drawBoard: function(ctx) {
      let counter = 0
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 24; j++) {
          if(this.board[j][i] === '2') {
            ctx.fillStyle = 'green'
            ctx.fillRect(i * 41.5, j * 41.5, 41.5, 41.5)
            ctx.stroke()
          }
          // if(j > 0) {
          //   ctx.font = "25px Arial"
          //   ctx.fillStyle = 'black'
          //   ctx.fillText(j, j * 41.5, i * 41.5)
          // } else {
          //   ctx.font = "25px Arial"
          //   ctx.fillStyle = 'black'
          //   ctx.fillText(counter - 1, j * 41.5, i * 41.5)
          // }
        }
        counter++
      }
    },
    drawChar: function(ctx) {
      ctx.fillStyle = 'blue'
      ctx.fillRect(this.char.current.x * 41.5, this.char.current.y * 41.5, 41.5, 41.5)
      ctx.stroke()
    },
    drawWalls: function(ctx) {
      // left side
      ctx.fillStyle = 'grey'
      ctx.fillRect(0, 41.5, 41.5, 1000)

      // right side
      ctx.fillRect(953, 0, 49.5, 1000)

      // top
      ctx.fillRect(0, 0, 1000, 41.5)

      // bottom
      ctx.fillRect(0, 953, 1000, 49.5)
    },
    'down': function () {
      if(!this.checkCollision(0)) {
        return
      }
      this.char.current.y = this.char.current.y + 1 < 23 ? this.char.current.y + 1 : this.char.current.y
      this.draw()
    },
    'up': function () {
      console.log(this.comp)
      this.comp.sayHelloWorld()
      if(!this.checkCollision(1)) {
        return
      }
      this.char.current.y = this.char.current.y - 1 >= 1 ? this.char.current.y - 1 : this.char.current.y
      this.draw()
    },
    'left': function () {
      if(!this.checkCollision(2)) {
        return
      }
      this.char.current.x = this.char.current.x - 1 >= 1 ? this.char.current.x - 1 : this.char.current.x
      this.draw()
    },
    'right': function () {
      if(!this.checkCollision(3)) {
        return
      }
      this.char.current.x = this.char.current.x + 1 < 23 ? this.char.current.x + 1 : this.char.current.x
      this.draw()
      
    },
    checkCollision: function(dir) {
      // 0 = down   2 = left
      // 1 = up     3 = right

      let upDown = 0
      let leftRight = 0
      if(dir > 1) {
        leftRight = dir === 2 ? -1 : 1
      } else {
        upDown = dir === 0 ? 1 : -1
      }
      let x = this.char.current.x + leftRight
      let y = this.char.current.y + upDown
      let tempX = x
      let tempY = y
      if(this.board[y][x] === '2') {
        let i = 0;
        while(true) {
          // console.log(dir, x, y, upDown, leftRight)
          if(!this.board[y][x]) {
            break;
          }
          if(this.board[y][x] === '1') {
            this.board[y][x] = '2'
            // console.log("changed: ", x, y)
            // console.log(this.board)
            i++;
            break;
          } else if(this.board[y][x] === '0') {
            break;
          }

          if(dir > 1) {
            leftRight = dir === 2 ? leftRight - 1 : leftRight + 1
          } else {
            upDown = dir === 0 ? upDown + 1 : upDown - 1
          }

          x = this.char.current.x + leftRight
          y = this.char.current.y + upDown
          if(x === 0 || x > 22 || y === 0 || y > 22) {
            break;
          }
        }
        if(i) {
          this.board[tempY][tempX] = '1'
          console.log("is now cleared: ", tempX, tempY)
        }
        return i;
      }
      return true;
    }
  },
  mounted: function () {
    const keyboard = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
      32: 'space',
      83: 's',
      82: 'r',
      80: 'p'
    }
    let keydownActive
    const boardKeys = Object.keys(keyboard).map(e => parseInt(e, 10))
    const keyDown = e => {
      if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
        return
      }
      const type = keyboard[e.keyCode]
      if (type === keydownActive) {
        return
      }
      this[type]()
      keydownActive = type
    }
    const keyUp = e => {
      if (e.metaKey === true || boardKeys.indexOf(e.keyCode) === -1) {
        return
      }
      const type = keyboard[e.keyCode]
      if (type === keydownActive) {
        keydownActive = ''
      }
    }
    document.addEventListener('keydown', keyDown, true)
    document.addEventListener('keyup', keyUp, true)
    this.draw()
  }
}
