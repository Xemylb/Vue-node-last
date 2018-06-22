import Vue from 'vue'
import Router from 'vue-router'
import Postlist from '@/components/postlist'
import Post from '@/components/post'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Postlist
    },
      {
          path: '/post:id',
          name: 'Post',
          component: Post
      }
  ],
    mode: 'history'
})
