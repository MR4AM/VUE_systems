import Vuex from 'vuex'
import Vue from 'vue'
import dataedit from '../components/dataEdit/dataEdit.js'
import common from '../common/common.js'
import datagrid from '../components/datagrid/datagrid.js'
Vue.use(Vuex)

var store = new Vuex.Store({
    modules:{
        dataedit,
        common,
        datagrid
    }   
})

export default store;