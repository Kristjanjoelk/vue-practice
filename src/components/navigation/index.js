import { pages } from '../../router/pages'

export default {
  computed: {
    prev: function() {
      var index = this.findIndex()
      if(index === -1) {
        return undefined
      }
      return index > 0 ? pages[index - 1] : undefined
    },
    next: function() {
      var index = this.findIndex()
      if(index === -1) {
        return undefined
      }
      return index + 1 < pages.length ? pages[index + 1] : undefined
    },
    sourceHref: function() {
      var index = this.findIndex()
      if(index === -1) {
        return undefined
      }
      return pages[index].source
    }
  },
  methods: {
    findIndex: function() {
      var me = this.$route.name
      return pages.findIndex(r => r.name === me)
    }
  }
}
