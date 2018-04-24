import './libs/bootstrap.css'
import Vue from 'vue'
import App from './APP.vue'
import router from './router/router.js'
import store from './vuex/store.js'

new Vue({
    el:'#app',
    router,
    store,
    render:h =>h(App)
})