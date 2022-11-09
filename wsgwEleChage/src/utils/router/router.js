import { createRouter, createWebHistory } from 'vue-router';

const routes = [{
    path: '/',
    redirect: '/index',
},{
    path: '/index',
    component: ()=> import('../../pages/index/index.vue')
},{
    path: '/eleList',
    component: ()=> import('../../packageDSEleCharge/pages/eleList/eleList.vue')
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;