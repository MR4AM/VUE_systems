<template>
	<div class="login">
	    <div class="box png">
			<div class="logo png"></div>
			<div class="input">
				<div class="log">
					<div class="name">
						<label>用户名</label><input type="text" class="text" id="value_1" placeholder="用户名" name="value_1" tabindex="1" v-model="username">
					</div>
					<div class="pwd">
						<label>密　码</label><input type="password" class="text" id="value_2" placeholder="密码" name="value_2" tabindex="2" v-model="password">
						<input type="button" class="submit" tabindex="3" value="登录" @click="login">
					</div>
				</div>
			</div>
		</div>
	</div> 
</template>

<script>
	import './login.css'
	import http from '../../utils/httpclient.js'

	export default{		
		data:function(){
			return {
				username:'',
				password:''
			}
		},
		methods:{
			login:function(){
				http.post('adminlogin',{username:this.username,password:this.password}).then(res => {
					console.log(res);
					if(!res.data.status){
						alert('账号或密码不正确！');
						return false;
					}

					window.sessionStorage.setItem('seusername',this.username);
					window.sessionStorage.setItem('token',res.data.data);
					this.$router.push({name:'index'})
				})
			}
		}
	}
</script>