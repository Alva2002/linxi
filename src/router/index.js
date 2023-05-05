import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    //配置路由
    routes: [{
        path: '/home',
        component: () =>
            import ('@/view/Home.vue'),
    }, {
        path: '/articledetail',
        component: () =>
            import ('@/view/ArticleDetail.vue')
    }, {
        path: '/',
        redirect: '/home'
    }]
})