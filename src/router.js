import Vue from 'vue'
import Router from 'vue-router'
import About from './views/About.vue'
import FirstRoute from './views/FirstRoute'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'About',
      component: About
    },
    {
      path: '/docs',
      name: 'Docs',

      component: () => import('./views/Docs.vue')
    },
    {
      path: '/howto',
      name: 'HowTo',
      component: () => import('./views/HowTo.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/explore',
      name: 'Explore',
      component: () => import('./views/Explore.vue')
    },
    {
      path: '/FirstRoute/:name',
      name: 'FirstRoute',
      component: FirstRoute
    },
    {
      path: '/location/:location_id',
      name: 'Location',
      component: () => import('./views/Location.vue')
    },
    {
      path: '/orient',
      name: 'Orientation',
      component: () => import('./views/Orientation.vue')
    },
  ]
})
