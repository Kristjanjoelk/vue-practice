/* eslint-disable */
import computer from './computer'

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
    arr[11][2] = 'x'
    return {
      playerLoc: {
        x: 12,
        y: 12
      },
      board: arr,
      hasMoved: true,
      enemyLoc: {
        x: 11,
        y: 2
      },
      time: null,
      timePassed: 0,
      comp: new computer({width: 23}),
      enemyCounter: 0,
      oldSolution: null
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
      this.actuallyDrawEnemy(ctx)
      this.drawCurrentSolution(ctx)
    },
    drawBoard: function(ctx) {
      console.log('current enemyLoc', this.enemyLoc.x, this.enemyLoc.y)
      let counter = 0
      for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 24; j++) {
          if(this.board[j][i] === '2') {
            ctx.fillStyle = 'green'
            ctx.fillRect(i * 41.5, j * 41.5, 41.5, 41.5)
            ctx.stroke()
          }
        }
        counter++
      }
    },
    drawChar: function(ctx) {
      ctx.fillStyle = 'blue'
      ctx.fillRect(this.playerLoc.x * 41.5, this.playerLoc.y * 41.5, 41.5, 41.5)
      ctx.stroke()
    },
    actuallyDrawEnemy: function(ctx) {
      ctx.fillStyle = 'black'
      ctx.fillRect(this.enemyLoc.x * 41.5, this.enemyLoc.y * 41.5, 41.5, 41.5)
      ctx.stroke()
    },
    drawCurrentSolution: function(ctx) {
      let sol = this.oldSolution
      if(!sol) {
        console.log('no solutions to draw')
        return
      }
      ctx.beginPath()
      ctx.moveTo(this.enemyLoc.x, this.enemyLoc.y)
      // console.log('drawing:', sol)
      for(let i = 0; i < sol.length; i++) {
        // console.log('drawing:', sol[i])
        if(sol[i]) {
          if(sol[i].found) {
            // console.log('sol.found', sol[i])
            let linePos = {
              width: sol[i].loc.x > 0 ? sol[i].loc.x * 41.5 + 20: 20,
              height: sol[i].loc.y > 0 ? sol[i].loc.y * 41.5 + 20: 20
            }
            ctx.lineTo(linePos.width, linePos.height)
          } else {
            let linePos = {
              width: sol[i].x > 0 ? sol[i].x * 41.5 + 20: 20,
              height: sol[i].y > 0 ? sol[i].y * 41.5 + 20: 20
            }
            ctx.lineTo(linePos.width, linePos.height)
          }
        }
      }
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
      this.playerLoc.y = this.playerLoc.y + 1 < 23 ? this.playerLoc.y + 1 : this.playerLoc.y
      this.hasMoved = true
      this.draw()
    },
    'up': function () {
      if(!this.checkCollision(1)) {
        return
      }
      this.playerLoc.y = this.playerLoc.y - 1 >= 1 ? this.playerLoc.y - 1 : this.playerLoc.y
      this.hasMoved = true
      this.draw()
    },
    'left': function () {
      if(!this.checkCollision(2)) {
        return
      }
      this.playerLoc.x = this.playerLoc.x - 1 >= 1 ? this.playerLoc.x - 1 : this.playerLoc.x
      this.hasMoved = true
      this.draw()
    },
    'right': function () {
      if(!this.checkCollision(3)) {
        return
      }
      this.playerLoc.x = this.playerLoc.x + 1 < 23 ? this.playerLoc.x + 1 : this.playerLoc.x
      this.hasMoved = true
      this.draw()
    },
    checkCollision: function(dir) {
      let upDown = 0
      let leftRight = 0
      if(dir > 1) {
        leftRight = dir === 2 ? -1 : 1
      } else {
        upDown = dir === 0 ? 1 : -1
      }
      let x = this.playerLoc.x + leftRight
      let y = this.playerLoc.y + upDown
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

          x = this.playerLoc.x + leftRight
          y = this.playerLoc.y + upDown
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
    },
    drawEnemy: function(sol) {
      this.oldSolution = sol
      // console.log('enemyLoc Before new', this.enemyLoc.x, this.enemyLoc.y)
      if(!sol) {
        // console.log('sol', sol)
        // console.log('something went wrong finding solution...')
      } else if(!sol.length) {
        this.enemyLoc = this.getPosition(sol, this.enemyLoc)
      } else {
        this.enemyLoc = this.getPosition(sol[this.enemyCounter], this.enemyLoc)
      }
      this.draw()
      // console.log('enemyLoc after new', this.enemyLoc.x, this.enemyLoc.y)
      // console.log('after drawEnemy')
    },
    moveEnemy: function() {
      if(this.hasMoved) {
        this.enemyCounter = 0
        this.hasMoved = false
        console.log('player has moved and initFindplayer')
        this.comp.initFindPlayer(this.playerLoc, this.board, this.enemyLoc, this.drawEnemy)
      } else {
        this.enemyCounter++
        this.drawEnemy(this.oldSolution)
      }
      return
    },
    animationFrame: function(timeStamp) {
      if (!this.time) this.time = timeStamp
      if (this.getSeconds(timeStamp)) {
        this.moveEnemy()
      }
      requestAnimationFrame(this.animationFrame.bind(this));
    },
    getSeconds: function(timeStamp) {
      var diff = timeStamp - this.time;
      this.time = timeStamp
      // Hundredths of a second are 100 ms
      this.timePassed += diff / 10;
      // Seconds are 100 hundredths of a second
      if (this.timePassed >= 100) {
        this.timePassed = 0
        return true
      }
      return false
    },
    getPosition: function(dir, loc) {
      let upDown = 0
      let leftRight = 0
      if(dir < 2) {
          upDown = dir === 0 ? upDown - 1 : upDown + 1
      } else if(dir < 4 && dir >= 2) {
          leftRight = dir === 2 ? leftRight - 1 : leftRight + 1
      } else if(dir < 6) {
          leftRight = 1
          upDown = dir === 5 ? upDown - 1 : upDown + 1
      } else if(dir >= 6) {
          leftRight = -1
          upDown = dir === 7 ? upDown - 1 : upDown + 1
      }
      return {
        x: loc.x + leftRight,
        y: loc.y + upDown
      }
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
    requestAnimationFrame(this.animationFrame.bind(this))
  }
}
