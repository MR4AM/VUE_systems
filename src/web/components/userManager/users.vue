<template>
    <datagrid :config="config"></datagrid>
</template>

<script>
    import datagrid from '../datagrid/datagrid.vue'
    export default{
        
        components:{
            datagrid
        },

        data(){
            return {
                config:{
                    api:'getusers',
                    add_api:'addusers',
                    update_api:'updateuser',
                    name:'user',
                    cols:['_id','products']
                }
            }
        }
    }
</script> 