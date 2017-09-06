
export default {
  name: 'testThree',
  data: function () {
    console.log('data')
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
      }
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
      this.drawChar(ctx)
    },
    drawChar: function(ctx) {
      ctx.fillStyle = 'green'
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
      this.char.current.y = this.char.current.y + 1 < 19 ? this.char.current.y + 1 : this.char.current.y
    },
    'up': function () {
      this.char.current.y = this.char.current.y - 1 >= 1 ? this.char.current.y - 1 : this.char.current.y
    },
    'left': function () {
      this.char.current.x = this.char.current.x - 1 >= 1 ? this.char.current.x - 1 : this.char.current.x
    },
    'right': function () {
      this.char.current.x = this.char.current.x + 1 < 19 ? this.char.current.x + 1 : this.char.current.x
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
      this.draw()
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
