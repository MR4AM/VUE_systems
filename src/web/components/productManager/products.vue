<template>
    <datagrid :config="config"></datagrid>
</template>

<script>
    import datagrid from '../datagrid/datagrid.vue'

    export default{
        data(){
            return{
                config:{
                    api:'searchproducts',
                    add_api:'addproducts',
                    update_api:'updateproducts',
                    name:'products',
                    cols:['_id','products']}
            }
        },
        components:{
            datagrid
        },

    }
</script>