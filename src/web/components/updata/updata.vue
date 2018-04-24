<template>
    <!-- <input  name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/> -->
    <form action="http://localhost:8080/upload" method="POST" enctype="multipart/form-data" id="upfrom" @change="getFile($event)" >
        <div class="chepic" >
            <h4>选择图片</h4>
            <input type="file" name="head" class="pic">
            <img src="" alt="" />
        </div>
        <div class="chepic">
            <h4>选择图片</h4>
            <input type="file" name="head" class="pic">
            <img src="" alt="" />
        </div>
        <div class="chepic">
            <h4>选择图片</h4>
            <input type="file" name="head" class="pic">
            <img src="" alt="" />
        </div>
        <div class="chepic">
            <h4>选择图片</h4>
            <input type="file" name="head" class="pic">
            <img src="" alt="" />
        </div>
        <input type="submit" value="Upload" @click="sub" id="btnup">
        <input type="reset" style="display:none;" /> 
    </form>
</template>
<script type="text/javascript">
    import axios from 'axios'
    import $ from 'jquery'
    import './updata.scss'
    export default{
        data(){
            return{
                file:'',
                api:this.$store.state.common.baseurl
            }
        },
        methods:{
            getFile(event) {
                var el=event.target
                this.file = el.files[0];
                var filePath = $(el).val(),         //获取到input的value，里面是文件的路径  
                fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase(),  
                src = window.URL.createObjectURL(el.files[0]); //转成可以在本地预览的格式  
                // 检查是否是图片  
                if( !fileFormat.match(/.png|.jpg|.jpeg/) ) {  
                    error_prompt_alert('上传错误,文件格式必须为：png/jpg/jpeg');  
                    return;    
                }  
            
                $(el).next('img').attr('src',src);  
              },
            sub(e){
                event.preventDefault();
                let formData = new FormData(); 
                var ad=[];
                $('.pic').each((idx,item) => {
                    // console.log(item.files);
                    if(item.files.length==0){
                    }else{
                        formData.append(item.name,item.files[0],item.files[0].name);
                        ad.push(item.files[0]);
                    }
                    
                })
                let config = {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }
                axios.post('http://localhost:8080/upload',formData,config).then((res) => {
                    console.log(ad)
                    this.$emit('picData',ad);
                     // $('input[type=reset]').trigger('click');
                })
            }

        }
    }
</script>