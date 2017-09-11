/* eslint-disable */
import computer from '../testThree/computer'

export default {
  name: 'pathFinding',
  data: function () {
    var width = 5
    var playerLoc = {
      x: 0,
      y: 0
    } 
    var prizeLoc = {
      x: 2,
      y: 4
    }
    let arr = []
    for(let i = 0; i < width; i++) {
      let temp = []
      for(let j = 0; j < width; j++) {
        temp.push('1')
      }
      arr.push(temp)
    }
    arr[prizeLoc.y][prizeLoc.x] = 'x'
    arr[playerLoc.y][playerLoc.x] = '3'
    // arr[width - 2][width - 2] = '2'
    return {
      board: arr,
      comp: new computer({width: width}),
      maxWidth: width,
      prizeLoc: prizeLoc,
      playerLoc: playerLoc
    }
  },
  methods: {
    initBoard: function() {
      let arr = []
      for(let i = 0; i < this.maxWidth; i++) {
        let temp = []
        for(let j = 0; j < this.maxWidth; j++) {
          temp.push('1')
        }
        arr.push(temp)
      }
      arr[this.prizeLoc.y][this.prizeLoc.x] = 'x'
      arr[this.playerLoc.y][this.playerLoc.x] = '3'
      this.board = arr
    },
    drawSolution: function(sol) {
      console.log('drawing this solution:', sol)
      var c = document.getElementById('my-canvas')
      let start = {
        x: 300,
        y: 200
      }
      var ctx = c.getContext('2d')
      ctx.clearRect(0, 0, 1000, 1000)
      this.draw()
      let playerPos = {
        x: this.playerLoc.x > 0 ? start.x + this.playerLoc.x * 150 : start.x + 50,
        y: this.playerLoc.y > 0 ? start.y + this.playerLoc.y * 150 : start.y + 50
      }
      ctx.strokeStyle = 'green'
      ctx.beginPath()
      ctx.moveTo(playerPos.x, playerPos.y)
      for(let i = 1; i < sol.length; i++) {
        // console.log('drawing:', sol[i])
        if(sol[i]) {
          if(sol[i].found) {
            let linePos = {
              width: sol[i].loc.x > 0 ? sol[i].loc.x * 125 : 50,
              height: sol[i].loc.y > 0 ? sol[i].loc.y * 125 : 50
            }
            ctx.lineTo(start.x + linePos.width, start.y + linePos.height)
          } else {
            let linePos = {
              width: sol[i].x > 0 ? sol[i].x * 125 : 50,
              height: sol[i].y > 0 ? sol[i].y * 125 : 50
            }
            ctx.lineTo(start.x + linePos.width, start.y + linePos.height)
          }
        }
      }
      ctx.stroke()
    },
    draw: function(sol) {
      console.log('from this.draw', this.prizeLoc)
      this.initBoard()
      var c = document.getElementById('my-canvas')
      c.width = 1000
      c.height = 1000
      let start = {
        x: 300,
        y: 200
      }
      var ctx = c.getContext('2d')
      for(let i = 0; i < this.maxWidth; i++) {
        ctx.strokeStyle = 'black'
        for(let j = 0; j < this.maxWidth; j++) {
          ctx.rect(start.x + j * 100, start.y + i * 100, 100, 100)
          ctx.stroke()
          if(this.board[i][j] === 'x') {
            ctx.rect(start.x + j * 112, start.y + i * 112, 50, 50)
            ctx.stroke()
          } 
          if(this.board[i][j] === '2') {
            ctx.fillStyle = 'green'
            ctx.fillRect(start.x + j * 100, start.y + i * 100, 100, 100)
            ctx.stroke()
          }
          if(this.board[i][j] === '3') {
            console.log('found circle')
            let playerPos = {
              x: this.playerLoc.x > 0 ? start.x + this.playerLoc.x * 150 : start.x + 50,
              y: this.playerLoc.y > 0 ? start.y + this.playerLoc.y * 150 : start.y + 50
            }
            ctx.beginPath();
            ctx.arc(playerPos.x, playerPos.y, 15, 0, 2*Math.PI);
            ctx.stroke();
          }
        }
      }
      if(sol) {
        ctx.strokeStyle = 'green'
        ctx.beginPath()
        ctx.moveTo(start.x + 50, start.y + 50)
        for(let i = 1; i < sol.length; i++) {
          // console.log('drawing:', sol[i])
          if(sol[i]) {
            if(sol[i].found) {
              let linePos = {
                width: sol[i].loc.x > 0 ? sol[i].loc.x * 125 : 50,
                height: sol[i].loc.y > 0 ? sol[i].loc.y * 125 : 50
              }
              ctx.lineTo(start.x + linePos.width, start.y + linePos.height)
            } else {
              let linePos = {
                width: sol[i].x > 0 ? sol[i].x * 125 : 50,
                height: sol[i].y > 0 ? sol[i].y * 125 : 50
              }
              ctx.lineTo(start.x + linePos.width, start.y + linePos.height)
            }
          }
        }
        ctx.stroke()
      }
    },
    findPath: function() {
      console.log('finding', this.playerLoc, this.prizeLoc)
      var sol =  this.comp.initFindPlayer(this.playerLoc, this.board, this.prizeLoc, this.drawSolution)

    }
  },
  mounted: function() {
    this.draw()
  },
  watch: {
    prizeLocX(newValue){
      this.prizeLoc.x = parseInt(newValue)
      console.log('prizeLoc after change', this.prizeLoc)
    },
    prizeLocY(newValue) {
      this.prizeLoc.y = parseInt(newValue)
      console.log('prizeLoc after change', this.prizeLoc)
    },
    playerLocX(newValue){
      this.playerLoc.x = parseInt(newValue)
      console.log('playerLoc after change', this.playerLoc)
    },
    playerLocY(newValue) {
      this.playerLoc.y = parseInt(newValue)
      console.log('playerLoc after change', this.playerLoc)
    }
  },
  computed: {
    prizeLocX() {
      return this.prizeLoc.x
    },
    prizeLocY() {
      return this.prizeLoc.y
    },
    playerLocX() {
      return this.playerLoc.x
    },
    playerLocY() {
      return this.playerLoc.y
    }
  }
}
