import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(ElementUI);

// axios.defaults.baseURL="/api"
// http response 响应拦截器
axios.interceptors.response.use(response => {
    console.log(response)
    return response;
}, error => {
    if (error.response) {
        // 返回接口返回的错误信息
        return Promise.reject(error.response.data);
    }
});

router.beforeEach((to, from, next) => {

    //获取用户登录成功后储存的登录标志
    let getFlag = localStorage.getItem("Flag");

    //如果登录标志存在且为isLogin，即用户已登录
    if(getFlag === "isLogin"){

        next()
        //如果已登录，还想想进入登录注册界面，则定向回首页
        if (!to.meta.isLogin) {
            //iViewUi友好提示
            ElementUI.Message.error('请先退出登录')
            next({
                path: '/home'
            })
        }

        //如果登录标志不存在，即未登录
    }else{

        //用户想进入需要登录的页面，则定向回登录界面
        if(to.meta.isLogin){
            next({
                path: '/login',
            })
            //iViewUi友好提示
            ElementUI.Message.info('请先登录')
            //用户进入无需登录的界面，则跳转继续
        }else{
            next()
        }

    }

});

router.afterEach(() => {
    window.scroll(0, 0);
});

new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})

