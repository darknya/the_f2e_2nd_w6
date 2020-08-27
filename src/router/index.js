import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/room/:roomID',
    name: 'RoomPage',
    component: () => import('@/views/RoomPage.vue'),
  },
  {
    path: '/order',
    name: 'ChackOrder',
    component: () => import('@/views/chackOrder.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
