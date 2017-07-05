import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Auth from '@/components/Auth'
import User from '@/components/User'
import Post from '@/components/Post'
import PostEdit from '@/components/PostEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }, {
      path: '/user/:username',
      name: 'User',
      component: User
    }, {
      path: '/post/:username/:postid',
      name: 'Post',
      component: Post
    }, {
      path: '/post/:username/:postid/edit',
      name: 'PostEdit',
      component: PostEdit
    }
  ]
})
