import axios from 'axios'


var baseUrl = 'http://10.3.136.68:8083/'

function getUrl(url){
    if(url.startsWith('http')){
        return url;
    }else{
        return baseUrl + url
    }
}

export default{
    get(_url,_params){
        return new Promise((resolve,reject)=>{
            axios({
                url:getUrl(_url),
                params:_params,
                headers:{Authorization:window.sessionStorage.getItem('token')},
            }).then(res=>{
                if(!res.data.status && res.data.error == 'authorized'){
                    router.push('login');
                    return false;
                }
                resolve(res);
            }).catch(error=>{
                reject(error);
            })
        })
    },
    post(_url,_params){
        return new Promise((resolve,reject)=>{
            axios({
                url:getUrl(_url),
                data:_params || {},
                method:'post',  
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: window.sessionStorage.getItem('token')
                },
                transformRequest:[function (data) {
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret;
                }],
            }).then(res=>{
                resolve(res);
            }).catch(error=>{
                reject(error)
            })
        })
    }
}