import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
//当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
//redirect: 'noRedirect'
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/industryPolicy',
    component: Layout,
    children: [
      {
        path: '/industryPolicy',
        name: 'IndustryPolicy',
        component: () => import('@/views/IndustryPolicy/index'),
        meta: { title: '行业政策', icon: 'el-icon-edit-outline' }
      }
    ]
  }, 
   {
    path: '/regulations',
    component: Layout,
    children: [
      {
        path: '/regulations',
        name: 'regulations',
        component: () => import('@/views/regulations/index'),
        meta: { title: '规章制度', icon: 'el-icon-edit-outline' }
      }
    ]
  },
  {
    path: '/engineerings',
    component: Layout,
    children: [
      {
        path: '/engineerings',
        name: 'Engineering',
        component: () => import('@/views/Engineering/index'),
        meta: { title: '工程合约', icon: 'el-icon-edit-outline' }
      }
    ]
  },
  
  {
    path: '/security',
    component: Layout,
    children: [
      {
        path: '/security',
        name: 'security',
        component: () => import('@/views/security/index'),
        meta: { title: '安全环保', icon: 'el-icon-s-promotion' }
      }
    ]
  },
  {
    path: '/technology',
    component: Layout,
    children: [
      {
        path: '/technology',
        name: 'Technology',
        component: () => import('@/views/Technology/index'),
        meta: { title: '技术创新', icon: 'el-icon-brush' }
      }
    ]
  },
  {
    path: '/theparty',
    component: Layout,
    children: [
      {
        path: '/theparty',
        name: 'Theparty',
        component: () => import('@/views/Theparty/index'),
        meta: { title: '党建廉政', icon: 'el-icon-s-custom' }
      }
    ]
  },
  {
    path: '/administrative',
    component: Layout,
    children: [
      {
        path: '/administrative',
        name: 'administrative',
        component: () => import('@/views/administrative/index'),
        meta: { title: '综合行政', icon: 'form' }
      }
    ]
  },
  {
    path: '/workerBBS',
    component: Layout,
    children: [
      {
        path: '/workerBBS',
        name: 'workerBBS',
        component: () => import('@/views/workerBBS/index'),
        meta: { title: '职工论坛', icon: 'form' }
      }
    ]
  },


  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
