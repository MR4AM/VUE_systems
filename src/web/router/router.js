import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import HomeComponent from '../components/home/home.vue'
import LoginComponent from '../components/login/login.vue'
import productsComponent from '../components/productManager/products.vue'
import userComponent from '../components/userManager/users.vue'
import editComponent from '../components/dataEdit/dataEdit.vue'
import orderComponent from '../components/orderManager/orders.vue'
import adminComponent from '../components/adminManager/admins.vue'

const router =new VueRouter({
    routes:[
        {path:'/',redirect:'/login'},
        {path:'/index',name:'index',component:HomeComponent,children:[
            {path:'sms',name:'user',component:userComponent},
            {path:'edit',name:'edit',component:editComponent},
            {path:'products',name:'products',component:productsComponent},
            {path:'orders',name:'orders',component:orderComponent},
            {path:'admin',name:'admin',component:adminComponent}
        ]},
        {path:'/login',name:'login',component:LoginComponent}
    ]
})
export default router;