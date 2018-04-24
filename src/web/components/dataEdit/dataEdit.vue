<template>
    <div>
        <div class="edit">
            <div v-for="(val,key) in $store.state.dataedit.dataset[0]" class="info" v-if="$store.state.dataedit.cols.indexOf(key)<0">
                <label>{{$store.state.dataedit.dictionary['cn'][key] || key}}:</label> 
                <input type="text" v-model="txt[key]"  v-if="$store.state.dataedit.editmode == 'add'"/>
                <input type="text" v-else v-model="$store.state.dataedit.dataset[0][key
                ]"/>
            </div>
            <input type="button" value="save" @click="save" class="btn btn-info btn-sm btn_save" />
        </div>
        <spinner v-show="this.$store.state.dataedit.show"></spinner>
    </div>
</template>

<script>
    import http from '../../utils/httpclient.js'
    import '../../libs/bootstrap.css'
    import './dataEdit.css'
    import spinner from '../spinner/spinner.vue'
  

    export default{
        data:function(){
            return  {
                txt:{},
                dataset:[]
            }        
        },
        components:{
            spinner,
         
        },
        methods:{
            save(){
                if(this.$store.state.dataedit.editmode == 'add'){
                    this.$store.state.dataedit.params = this.txt;
                    this.$store.dispatch('add');              
                }else if(this.$store.state.dataedit.editmode == 'update'){
                    this.$store.dispatch('updateproducts');
                }
            }
        },
        mounted(){  
            this.$store.dispatch('refresh');    
        }
    }
</script>