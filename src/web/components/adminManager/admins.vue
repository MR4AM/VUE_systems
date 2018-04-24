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
                    api:'getadmin',
                    add_api:'addadmin',
                    update_api:'updateadmin',
                    name:'admin',
                    cols:['_id','products'],
                }
            }
        }
    }
</script>