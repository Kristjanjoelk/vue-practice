import testOne from '@/components/testOne/index.vue'
import testTwo from '@/components/testTwo/index.vue'
import testThree from '@/components/testThree/index.vue'
import explore from '@/components/explore/index.vue'

export const pages = [
  {
    name: 'explore',
    path: '/explore',
    component: explore
  },
  {
    name: 'testOne',
    path: '/testOne',
    component: testOne
  },
  {
    name: 'testTwo',
    path: '/testTwo',
    component: testTwo
  },
  {
    name: 'testThree',
    path: '/testThree',
    component: testThree
  }
]

