import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
// 引入路由
Vue.config.productionTip = false
import router from '@/router';
import store from '@/store';
new Vue({
    render: h => h(App),
    // 注册路由
    router,
    store
}).$mount('#app')