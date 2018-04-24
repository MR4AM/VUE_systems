<template>
    <div>
        <div class="header">
            <surperheader></surperheader>
        </div>
        <div class="body">
            <div class="nav">
                <surpernav></surpernav>
            </div>
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import './home.css'
    import surperheader from './header/header.vue'
    import surpernav from './nav/nav.vue'
    export default{
        components:{
            surperheader,
            surpernav
        }
    }
</script>