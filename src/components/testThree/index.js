/* eslint-disable */
export default {
  name: 'testThree',
  data: function () {
    let arr = []
    for (let i = 0; i < 20; i++) {
      let temp = [];
      for (let j = 0; j < 20; j++) {
        if(i === 0 || j === 0 || j === 19) {
          temp.push('0')
        } else if(i > 3 && j > 3 && (i < 16 && j < 16)) {
          if(i >= 9 && i < 11 && j >= 9 && j < 11) {
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
          x: 10,
          y: 10
        },
        previous: {
          x: 10,
          y: 10
        }
      },
      board: arr
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

      for(let i = 0; i < 25; i++) {
        ctx.moveTo(coords.a, 0)
        ctx.lineTo(coords.a, 1000)
        ctx.stroke()
        ctx.moveTo(0, coords.b)
        ctx.lineTo(1000, coords.b)
        ctx.stroke()
        coords.a += 50
        coords.b += 50
      }
      
      this.drawBoard(ctx)
      this.drawChar(ctx)
    },
    drawBoard: function(ctx) {
      let counter = 0
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          if(this.board[j][i] === '2') {
            ctx.fillStyle = 'green'
            ctx.fillRect(i * 50, j * 50, 50, 50)
            ctx.stroke()
          }
          if(j > 0) {
            ctx.font = "25px Arial"
            ctx.fillStyle = 'black'
            ctx.fillText(j, j * 50, i * 50)
          } else {
            ctx.font = "25px Arial"
            ctx.fillStyle = 'black'
            ctx.fillText(counter - 1, j * 50, i * 50)
          }
        }
        counter++
      }
    },
    drawChar: function(ctx) {
      ctx.fillStyle = 'blue'
      ctx.fillRect(this.char.current.x * 50, this.char.current.y * 50, 50, 50)
      ctx.stroke()
    },
    drawWalls: function(ctx) {
      // left side
      ctx.fillStyle = 'grey'
      ctx.fillRect(0, 50, 50, 1000)

      // right side
      ctx.fillRect(950, 0, 50, 1000)

      // top
      ctx.fillRect(0, 0, 1000, 50)

      // bottom
      ctx.fillRect(0, 950, 1000, 50)
    },
    'down': function () {
      if(!this.checkCollision(0)) {
        return
      }
      this.char.current.y = this.char.current.y + 1 < 19 ? this.char.current.y + 1 : this.char.current.y
      this.draw()
    },
    'up': function () {
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
      this.char.current.x = this.char.current.x + 1 < 19 ? this.char.current.x + 1 : this.char.current.x
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
          console.log(dir, x, y, upDown, leftRight)
          if(!this.board[y][x]) {
            break;
          }
          if(this.board[y][x] === '1') {
            this.board[y][x] = '2'
            console.log("changed: ", x, y)
            console.log(this.board)
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
          if(x === 0 || x > 18 || y === 0 || y > 18) {
            break;
          }
          i++;
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
