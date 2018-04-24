<template>
    <div>
        <div v-if="$store.state.datagrid.authorition">
        <div class="head">
            <button class="btn btn-info btn-sm btn_add" @click="add" v-if="config.api !='searchorder' && config.api !='getusers'">添加</button>
            <div class="search">
                <input type="text" placeholder="输入搜索内容" v-model="$store.state.datagrid.params"/>
                <button class="btn btn-info btn-sm" @click="search($store.state.datagrid.params)">搜索</button>
            </div>
        </div>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th v-for="(obj,key) in $store.state.datagrid.dataset[0]" v-if="config.cols.indexOf(key)<0">
                        {{$store.state.datagrid.dictionary[$store.state.common.lanType][key] || key}}
                    </th>
                    <th v-if="$store.state.datagrid.dataset[0].products">{{$store.state.datagrid.dictionary[$store.state.common.lanType].products}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,index) in $store.state.datagrid.dataset" >
                    <td>{{index+1}}</td>
                    <td v-for="(val,key) in obj" v-if="config.cols.indexOf(key)<0">{{val}}</td>
                    <td v-if="obj.products" class="productInfo">
                        <span v-for="info in obj.products">
                            {{info.name+'*'+info.qty}},
                        </span>
                    </td>
                    <td>
                        <input type="button" @click="edit(obj._id)" value="编辑" class="btn btn-info btn-sm" v-if="config.api !='searchorder' && config.api !='getusers'"/>
                        <input type="button" @click="deleteTr(obj._id)" value="删除" class="btn btn-danger btn-sm btn_del" v-if="config.api !='searchorder' && config.api !='getusers'"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="page">
            <input type="button" value="上一页" class="pre" @click="changepage($store.state.datagrid.page)"/>
            <input type="button" v-for="index in $store.state.datagrid.pageCount" :value="index" :ref="index" @click="changepage(index)" v-show="index<6"/>
            <input type=""button disabled  value="..." v-if="$store.state.datagrid.pageCount - $store.state.datagrid.page > 1 && $store.state.datagrid.pageCount>5"/>
            <input type="button" value="下一页" class="next" @click="changepage($store.state.datagrid.page)"/>
            
            <span>总共：{{$store.state.datagrid.pageCount}} 页</span>
        </div>
        </div>
        <spinner v-if="$store.state.datagrid.show"></spinner>
        <div v-if="!$store.state.datagrid.authorition" class="loginTip">
            <span>请先</span>
            <router-link to="/login">登录</router-link>
        </div>
        
    </div>

</template>

<script>
    import $ from 'jquery'
    import './datagrid.css'
    import http from '../../utils/httpclient.js'
    import spinner from '../spinner/spinner.vue'


    export default{
        components:{spinner},
        props:['config'],
        methods:{
            //添加数据
            add(){
                this.$store.state.dataedit.api = this.config.api;       //传数据来源接口
                this.$store.state.dataedit.add_api = this.config.add_api;//数据添加接口
                //判断是dataedit更新还是添加
                this.$store.state.dataedit.editmode = 'add';    
                //name：数据添加成功跳转回原先模块的路由         
                this.$store.state.dataedit.name = this.config.name;
                this.$router.push({name:'edit'});
            },
            //删除数据
            deleteTr(id){
                $(event.target).closest('tr').remove();
                http.post('delproducts',{_id:id}).then((res)=>{
                    console.log(res)
                })
            },
            //更新数据
            edit(id){
                this.$store.state.dataedit.api = this.config.api;
                this.$store.state.dataedit.update_api = this.config.update_api;
                this.$store.state.dataedit.editmode = 'update';
                console.log(id);
                this.$store.state.dataedit.params = {_id:id};
                this.$store.state.dataedit.name = this.config.name;
                this.$router.push({name:'edit'});
            },
            //搜索数据
            search(condition){
                this.$store.dispatch('search')
            },
            //分页加载
            changepage(index){
               //上一页下一页按钮判断
                if(event.target.className == 'next'){
                    index ++;
                    if(index > this.$store.state.datagrid.pageCount){
                        return false;
                    }
                    if(index >= 5){
                        $(this.$refs[index]).show();
                        $(this.$refs[index+1]).show();
                        $(this.$refs[index-5]).hide();
                        if(index != this.$store.state.datagrid.pageCount){
                           $(this.$refs[index-4]).hide(); 
                        }
                    }
                }else if(event.target.className == 'pre'){
                    index--;
                    if(index > 3){
                        $(this.$refs[index]).show();
                        for(var i = 0;i<(this.$store.state.datagrid.pageCount-this.$store.state.datagrid.page);i++){
                            $(this.$refs[index+i+2]).hide();
                        }
                        $(this.$refs[index-5]).hide();
                        for(var j=0;j<3;j++){
                           $(this.$refs[index-j-1]).show(); 
                        }
                    }
                }
               
                if( index < 1 || index == this.$store.state.datagrid.page){
                    return false;
                } 
                
                //按钮样式添加删除
                $(this.$refs[index]).addClass('active').siblings('input').removeClass('active');

                this.$store.state.datagrid.page = index;

                this.$store.dispatch('refreshgrid');
            }
        },
        mounted(){   
            this.$store.state.datagrid.page = 1;
            $(this.$refs[this.$store.state.datagrid.page]).addClass('active');
            this.$store.state.datagrid.api = this.config.api;
            this.$store.dispatch('refreshgrid');
        }
    }
</script>