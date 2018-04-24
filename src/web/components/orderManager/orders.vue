<template>
    <datagrid :config="config"></datagrid>
</template>

<script>
    import datagrid from '../datagrid/datagrid.vue'

    export default{
        data(){
            return{
                config:{
                    api:'searchorder',
                    add_api:'',
                    update_api:'searchorder',
                    name:'orders',
                    cols:['_id','products']}
            }
        },
        components:{
            datagrid
        },

    }
</script>