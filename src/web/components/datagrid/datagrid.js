import http from '../../utils/httpclient.js'

var state = {
    dataset:[],            //datagrid显示数据集合
    show:false,            //加载遮罩是否显示
    dictionary:{},         //字典翻译
    api:'',                //页面数据来源接口
    search_api:'vaguesearch',
    params:'',             //搜索参数
    page:1,                //默认页码
    limit:5,               //默认一页显示几条数据
    pageCount:0,           //总共有多少页码
    authorition:true,
}

var mutations = {
    //获取数据刷新
    refreshgrid(){

        state.show = true;
        http.get("http://10.3.136.170:8080/src/web/dictionary/common.txt").then((res)=>{
            state.dictionary = res.data;
        })
        if(state.api != ''){
            http.get(state.api,{page:state.page,limit:state.limit}).then((res)=>{
            console.log(res)
            if(res.data.status){
                state.dataset = res.data.data;
                state.show = false;
                state.pageCount = res.data.pageqty
                // state.pageCount = state.pageCount || 0;
            }else if(!res.data.status && res.data.error == "unauthorized"){
                state.show = false;
                state.authorition = false;
            }
            })
        }else{
            state.show = false;
        }
    },
    //搜索操作
    search(){
        state.show = true;
        console.log(state.params)
        http.get(state.search_api,{field:state.params}).then((res)=>{
            if(res.data.status){
                console.log(res)
                state.dataset = res.data.data;
                state.pageCount = Math.ceil((res.data.data).length/state.limit);
                state.show = false;
            }else{ 
                state.show = false;
            }
        })
    }
}

var actions = {
    refreshgrid(context){
        context.commit('refreshgrid');
    },
    search(context){
        context.commit('search')
    }
}


export default{
    state,
    mutations,
    actions
}