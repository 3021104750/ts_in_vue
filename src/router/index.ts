import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

// 防止第二次点击的是当前同一个路由时导致报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: string) {
  return (routerPush.call(this, location) as any).catch((err: Record<string, unknown>) => err);
};

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/categoryAll'
  },

  // 所有分类
  {
    path: '/categoryAll',
    name: 'CategoryAll',
    component: () => import('@/views/CategoryAll.vue')
  },

  // life 分类
  {
    path: '/life',
    name: 'Life',
    component: () => import('@/views/Life.vue')
  },

  // work 分类
  {
    path: '/work',
    name: 'Work',
    component: () => import('@/views/Work.vue')
  }

];

const router = new VueRouter({
  mode: 'hash',
  base: 'toDoList',
  routes
});

export default router;
