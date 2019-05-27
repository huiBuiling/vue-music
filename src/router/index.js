import Vue from 'vue'
import Router from 'vue-router'
import { Icon, Button, Toast } from 'vant'
Vue.use(Router)
Vue.use(Icon).use(Button).use(Toast)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: () => import('components/recommend/recommend')
    },
    {
      path: '/singer',
      name: 'singer',
      props: true,
      component: () => import('components/singer/singer'),
      children: [
        {
          path: ':id',
          name: 'singerDetail',
          component: () => import('components/singer/singerDetail')
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: () => import('components/rank/rank')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('components/search/search')
    }
  ]
})
