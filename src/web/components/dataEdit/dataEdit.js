import http from '../../utils/httpclient.js'
import router from '../../router/router.js'

var state = {
    editmode:'',                //判断当前页面是用于添加数据还是修改数据
    api:'searchproducts',          //获取数据接口
    add_api:'addproducts',         //添加数据接口
    update_api:'updateproducts',   //更新数据接口 
    dataset:[],                    //数据集合
    cols:['_id'],                  //过滤属性
    params:{},                     //请求参数
    name:'',                       //路由跳转
    show:false,                  //加载遮罩是否显示
    dictionary:{}

}
var mutations = {
    refresh(){
        state.dataset = [];
        state.show = true;
        console.log(state.update_api)
        http.get("http://10.3.136.170:8080/src/web/dictionary/common.txt").then((res)=>{
            state.dictionary = res.data;
        })
        if(!state.params._id){console.log(666)
            state.editmode == 'add';
        }
        http.get(state.api,state.params).then((res)=>{
            if(res.data.status){
                state.dataset = res.data.data; 
                state.show = false;
            }
        })
    },
    add(){
        http.post(state.add_api,state.params).then((res)=>{
            if(res.status){
                console.log('add success');
                router.push({name:state.name}); 
                state.dataset = [];
            }
        })          
    },
    updateproducts(){
        console.log('update',state.dataset[0])
        http.post(state.update_api,state.dataset[0]).then((res)=>{
            if(res.status){
                console.log('success')
                router.push({name:state.name});
            }
        }) 
    }
}
var actions = {
    refresh(context){
        context.commit('refresh');
    },
    add(context){
        context.commit('add');
    },
    updateproducts(context){
        context.commit('updateproducts');
    }
}

export default{
    state,
    mutations,
    actions
}