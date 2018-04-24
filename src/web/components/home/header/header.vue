<template>
    <div>
        <h3>超市后台管理系统</h3>
        <span class="font-italic">欢迎</span>
        <span v-text="username">admin</span>

        <span class="logout" @click="logout">
            <router-link to="/login" >退出登录</router-link>
        </span>

        <div class="lan_select">
            <label id="lan">语言：</label>
            <select id="lan" v-model="$store.state.common.lanType">
                <option value="en">en</option>
                <option value="cn">cn</option>
            </select>
        </div>
    </div>
</template>
<script>
    import './header.css'
    export default{
        data(){
            return {
                username:window.sessionStorage.getItem('seusername')
            }
        },
        methods:{
            logout(){

                window.sessionStorage.removeItem('token');
            }
        }
    }
</script>

