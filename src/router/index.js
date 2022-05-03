import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginAndRegist',
    component: () => import(/* webpackChunkName: "about" */ '../views/pc/LoginAndRegist.vue')
  },
  {
    path: '/regist',
    name: 'LoginAndRegist',
    component: () => import(/* webpackChunkName: "about" */ '../views/pc/LoginAndRegist.vue')
  },
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "about" */ '../views/pc/Index.vue')
  },
  {
    path: '/stock',
    name: 'Stock',
    component: () => import(/* webpackChunkName: "about" */ '../views/pc/Stock.vue')
  },
  {
    path: '/stockWord',
    name: 'StockWord',
    component: () => import(/* webpackChunkName: "about" */ '../views/pc/StockWord.vue')
  },
  {
    path: '/Catagory',
    name: 'Catagory',
    component: () => import(/* webpackChunkName: "about" */ '../views/pc/Catagory.vue')
  },
  {
    path: '/course',
    name: 'Course',
    component: () => import(/* webpackChunkName: "about" */ '../views/pc/Course.vue')
  },
  {
    path: '/courseList',
    name: 'CourseList',
    component: () => import(/* webpackChunkName: "about" */ '../views/pc/CourseList.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "about" */ '../views/pc/Mine.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import(/* webpackChunkName: "about" */ '../views/pc/News.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/adminIndex',
    name: 'AdminIndex',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/pc/admin/AdminIndex.vue'),
    children: [
      {
        path: '/userList',
        name: 'UserList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/pc/admin/UserList.vue')
      },
      {
        path: '/userRole',
        name: 'UserRole',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/pc/admin/UserRole.vue')
      },
      {
        path: '/roleList',
        name: 'RoleList',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/pc/admin/RoleList.vue')
      }
    ]
  }
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // }
]

const router = new VueRouter({
  routes
})

export default router
