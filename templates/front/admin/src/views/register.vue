<template>
	<div>
		<div class="register-container">
			<el-form v-if="pageFlag=='register'" ref="ruleForm" class="rgs-form animate__animated animate__backInDown" :model="ruleForm" :rules="rules">
				<div class="rgs-form2">
					<div class="title">基于python的音乐界面设计与实现</div>
					<el-form-item class="list-item" v-if="tableName=='yonghu'">
						<el-input  v-model="ruleForm.nicheng"  autocomplete="off" placeholder="昵称"  type="text"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='yonghu'">
						<el-input  v-model="ruleForm.mima"  autocomplete="off" placeholder="密码"  type="password"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='yonghu'">
						<el-input  v-model="ruleForm.mima2" autocomplete="off" placeholder="确认密码" type="password" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='yonghu'">
						<el-input  v-model="ruleForm.xingming"  autocomplete="off" placeholder="姓名"  type="text"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='yonghu'">
						<el-select v-model="ruleForm.xingbie" placeholder="请选择性别" >
							<el-option
								v-for="(item,index) in yonghuxingbieOptions"
								v-bind:key="index"
								:label="item"
								:value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='yonghu'">
						<el-input  v-model="ruleForm.shouji"  autocomplete="off" placeholder="手机"  type="text"  />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='yonghu'">
						<file-upload
							tip="点击上传头像"
							action="file/upload"
							:limit="3"
							:multiple="true"
							:fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
							@change="yonghutouxiangUploadChange"
						></file-upload>
					</el-form-item>
					<el-form-item class="list-item email" v-if="tableName=='yonghu'">
						<div style="display: flex;flex: 1;">
							<input v-model="ruleForm.email" autocomplete="off" placeholder="邮箱"/>
							<button v-if="isEndFlag" type="success" class="register-code" @click="sendemailcode()">发送验证码</button>
							<button v-if="!isEndFlag" type="success" class="register-code" disabled="disabled">{{SecondToDate}}</button>
						</div>
					</el-form-item>
					<el-form-item class="list-item email-code" v-if="tableName=='yonghu'">
						<el-input  v-model="emailcode" autocomplete="off" placeholder="验证码" />
					</el-form-item>
					<div class="register-btn">
						<div class="register-btn1">
							<button type="button" class="r-btn" @click="login()">注册</button>
						</div>
						<div class="register-btn2">
							<div class="r-login" @click="close()">已有账号，直接登录</div>
						</div>
					</div>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
	import 'animate.css'
export default {
	data() {
		return {
			ruleForm: {
			},
			forgetForm: {},
            pageFlag : '',
			tableName:"",
			rules: {},
            emailcode:'',
			// 倒计时时间
			count: 60,
			// 倒计时定时器
			inter: null,
			// 倒计时是否结束
			isEndFlag: true,
            yonghuxingbieOptions: [],
		};
	},
	computed: {
		SecondToDate: function() {
			var time = this.count;
			if (null != time && "" != time) {
				time = parseInt(time) + "秒后重发";
			}
			return time;
		}
	},
	mounted(){
		this.pageFlag = this.$route.query.pageFlag
		if(this.$route.query.pageFlag=='register'){
			
			let table = this.$storage.get("loginTable");
			this.tableName = table;
			if(this.tableName=='yonghu'){
				this.ruleForm = {
					nicheng: '',
					mima: '',
					xingming: '',
					xingbie: '',
					shouji: '',
					touxiang: '',
					gerenjianjie: '',
					sfsh: '',
					shhf: '',
					email: '',
					status: '',
				}
			}
			if ('yonghu' == this.tableName) {
				this.rules.nicheng = [{ required: true, message: '请输入昵称', trigger: 'blur' }]
			}
			if ('yonghu' == this.tableName) {
				this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
			if ('yonghu' == this.tableName) {
				this.rules.xingming = [{ required: true, message: '请输入姓名', trigger: 'blur' }]
			}
			this.yonghuxingbieOptions = "男,女".split(',')
		}
	},
	created() {
	},
	destroyed() {
		  	},
	methods: {
		changeRules(name){
			if(this.rules[name]){
				return true
			}
			return false
		},
		// 获取uuid
		getUUID () {
			return new Date().getTime();
		},
		close(){
			this.$router.push({ path: "/login" });
		},
        yonghutouxiangUploadChange(fileUrls) {
            this.ruleForm.touxiang = fileUrls;
        },

        // 多级联动参数

		sendemailcode() {
			if(!this.ruleForm.email){
				this.$message.error(`邮箱不能为空`);
				return
			}
			if(this.ruleForm.email&&(!this.$validate.isEmail(this.ruleForm.email))){
				this.$message.error(`请输入正确的邮箱格式`);
				return
			}
			this.isEndFlag = false;
			var _this = this;
			this.inter = window.setInterval(function() {
				_this.count = _this.count - 1;
				if (_this.count <= 0) {
					window.clearInterval(_this.inter);
					_this.isEndFlag = true;
					_this.count=60;
				}
			}, 1000);
			this.$http({
				url: `${this.tableName}/sendemail?email=`+this.ruleForm.email,
				method: "get",
				params: {}
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.$message.success(`发送成功`);
				} else {
					this.$message.error(`服务器异常，请稍后重试`)
				}
			});
		},

		// 注册
		login() {
			var url=this.tableName+"/register";
			  if(this.tableName=='yonghu'){
				  this.ruleForm.sfsh = '待审核'
			  }
			if((!this.ruleForm.nicheng) && `yonghu` == this.tableName){
				this.$message.error(`昵称不能为空`);
				return
			}
			if((!this.ruleForm.mima) && `yonghu` == this.tableName){
				this.$message.error(`密码不能为空`);
				return
			}
			if((this.ruleForm.mima!=this.ruleForm.mima2) && `yonghu` == this.tableName){
				this.$message.error(`两次密码输入不一致`);
				return
			}
			if((!this.ruleForm.xingming) && `yonghu` == this.tableName){
				this.$message.error(`姓名不能为空`);
				return
			}
			if(`yonghu` == this.tableName && this.ruleForm.shouji &&(!this.$validate.isMobile(this.ruleForm.shouji))){
				this.$message.error(`手机应输入手机格式`);
				return
			}
            if(this.ruleForm.touxiang!=null) {
                this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
            }
			if(`yonghu` == this.tableName && this.ruleForm.email &&(!this.$validate.isEmail(this.ruleForm.email))){
				this.$message.error(`邮箱应输入邮件格式`);
				return
			}
			if(`yonghu` == this.tableName ){
				url=this.tableName+"/register?emailcode="+this.emailcode;
				if(this.ruleForm.email&&(!this.$validate.isEmail(this.ruleForm.email))){
					this.$message.error(`请输入正确的邮箱格式`);
					return
				}
			}
			if((!this.emailcode) && `yonghu` == this.tableName){
				this.$message.error(`验证码不能为空`);
				return
			}
			this.$http({
				url: url,
				method: "post",
				data:this.ruleForm
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.$message({
						message: "注册成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.$router.replace({ path: "/login" });
						}
					});
				} else {
					this.$message.error(data.msg);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.register-container {
	position: relative;
	background: url(http://codegen.caihongy.cn/20240910/60e1105deb3a4170b52246ca74ed3400.gif) no-repeat  center top / 100% 100%;
	background: url(http://codegen.caihongy.cn/20240910/60e1105deb3a4170b52246ca74ed3400.gif) no-repeat  center top / 100% 100%;
	display: flex;
	width: 100%;
	min-height: 100vh;
	justify-content: center;
	align-items: center;
	.rgs-form {
		.rgs-form2 {
		width: 100%;
		}
		padding: 110px 80px 40px 80px;
		margin: 177px auto;
		z-index: 1000;
		display: flex;
		min-height: 700px;
		flex-wrap: wrap;
		border-radius: 30px;
		box-shadow: 0px 4px 60px 0px #BFD1D1;
		flex-direction: column;
		background: #fff;
		width: 689px;
		align-items: flex-start;
		position: relative;
		height: auto;
		.title {
			padding: 0 40px;
			margin: 0 0 20px 0;
			color: #6CB342;
			top: 30px;
			left: 0;
			background: none;
			font-weight: 500;
			width: 100%;
			font-size: 28px;
			line-height: 40px;
			position: absolute;
			text-align: center;
		}
		.list-item {
			padding: 0;
			margin: 10px 0;
			width: 500px;
			position: relative;
			height: 60px;
			/deep/ .el-form-item__content {
			}
			.el-input {
				width: 100%;
			}
			.el-input /deep/ .el-input__inner {
				border: 1px solid #efeff7;
				border-radius: 30px;
				padding: 0 30px;
				box-shadow: 0px 4px 10px 0px rgba(191,209,209,0.3);
				color: #666;
				flex: 1;
				font-size: 16px;
				height: 60px;
			}
			.el-input /deep/ .el-input__inner:focus {
				border: 1px solid #efeff7;
				border-radius: 30px;
				padding: 0 30px;
				box-shadow: 0px 4px 10px 0px rgba(191,209,209,0.3);
				color: #666;
				flex: 1;
				width: 100%;
				font-size: 16px;
				height: 60px;
			}
			.el-input-number {
				width: 100%;
			}
			.el-input-number /deep/ .el-input__inner {
				text-align: center;
				border: 1px solid #efeff7;
				border-radius: 30px;
				padding: 0 30px;
				box-shadow: 0px 4px 10px 0px rgba(191,209,209,0.3);
				color: #666;
				flex: 1;
				font-size: 16px;
				height: 60px;
			}
			.el-input-number /deep/ .el-input__inner:focus {
				border: 1px solid #efeff7;
				border-radius: 30px;
				padding: 0 30px;
				box-shadow: 0px 4px 10px 0px rgba(191,209,209,0.3);
				color: #666;
				flex: 1;
				width: 100%;
				font-size: 16px;
				height: 60px;
			}
			.el-input-number /deep/ .el-input-number__decrease {
				display: none;
			}
			.el-input-number /deep/ .el-input-number__increase {
				display: none;
			}
			.el-select {
				width: 100%;
			}
			.el-select /deep/ .el-input__inner {
				border: 1px solid #efeff7;
				border-radius: 30px;
				padding: 0 30px;
				box-shadow: 0px 4px 10px 0px rgba(191,209,209,0.3);
				color: #666;
				flex: 1;
				width: 100%;
				font-size: 16px;
				height: 60px;
			}
			.el-select /deep/ .el-input__inner:focus {
				border: 1px solid #efeff7;
				border-radius: 30px;
				padding: 0 30px;
				box-shadow: 0px 4px 10px 0px rgba(191,209,209,0.3);
				color: #666;
				flex: 1;
				width: 100%;
				font-size: 16px;
				height: 60px;
			}
			.el-date-editor {
				width: 100%;
			}
			.el-date-editor /deep/ .el-input__inner {
				border: 1px solid #efeff7;
				border-radius: 30px;
				padding: 0 30px;
				box-shadow: 0px 4px 10px 0px rgba(191,209,209,0.3);
				color: #666;
				flex: 1;
				width: 100%;
				font-size: 16px;
				height: 60px;
			}
			.el-date-editor /deep/ .el-input__inner:focus {
				border: 1px solid #efeff7;
				border-radius: 30px;
				padding: 0 30px;
				box-shadow: 0px 4px 10px 0px rgba(191,209,209,0.3);
				color: #666;
				flex: 1;
				width: 100%;
				font-size: 16px;
				height: 60px;
			}
			.el-date-editor.el-input {
				width: 100%;
			}
			/deep/ .el-upload--picture-card {
				background: transparent;
				border: 0;
				border-radius: 0;
				width: auto;
				height: auto;
				line-height: initial;
				vertical-align: middle;
			}
			/deep/ .upload .upload-img {
				border: 1px solid #efeff7;
				cursor: pointer;
				border-radius: 0px;
				color: #999;
				width: 90px;
				font-size: 24px;
				line-height: 60px;
				text-align: center;
				height: 60px;
			}
			/deep/ .el-upload-list .el-upload-list__item {
				border: 1px solid #efeff7;
				cursor: pointer;
				border-radius: 0px;
				color: #999;
				width: 90px;
				font-size: 24px;
				line-height: 60px;
				text-align: center;
				height: 60px;
			}
			/deep/ .el-upload .el-icon-plus {
				border: 1px solid #efeff7;
				cursor: pointer;
				border-radius: 0px;
				color: #999;
				width: 90px;
				font-size: 24px;
				line-height: 60px;
				text-align: center;
				height: 60px;
			}
			/deep/ .el-upload__tip {
				margin: 0 0 20px 0;
				color: #666;
				display: none;
				font-size: 15px;
			}
			/deep/ .el-input__inner::placeholder {
				color: #999;
				font-size: 16px;
			}
			.required {
				position: relative;
			}
			.required::after{
				color: red;
				left: 0;
				position: inherit;
				content: "*";
				order: -1;
			}
			.editor {
				border-radius: 30px;
				box-shadow: 0px 4px 10px 0px rgba(191,209,209,0.3);
				background: #fff;
				width: 100%;
				height: auto;
			}
			.editor>.avatar-uploader {
				line-height: 0;
				height: 0;
			}
		}
		.list-item.email {
			input {
				border: 1px solid #efeff7;
				border-radius: 30px;
				padding: 0 30px;
				box-shadow: 0px 4px 10px 0px rgba(191,209,209,0.3);
				color: #666;
				flex: 1;
				width: 100%;
				font-size: 16px;
				height: 60px;
			}
			input:focus {
				padding: 0;
				margin: 0 0 10px;
				display: flex;
				width: calc(100% - 0px);
				align-items: center;
				position: relative;
				flex-wrap: wrap;
			}
			input::placeholder {
				color: #999;
				font-size: 16px;
			}
			button {
				cursor: pointer;
				border-radius: 5px;
				background: #0d6efd20;
				display: flex;
				width: 100px;
				border-color: rgba(0, 0, 0, 1);
				border-width: 0px 0px 0px 0;
				justify-content: center;
				align-items: center;
				border-style: solid;
				height: 60px;
			}
			button:hover {
				opacity: 0.8;
			}
		}
		.register-btn {
			width: 100%;
		}
		.register-btn1 {
			width: 100%;
		}
		.register-btn2 {
			width: 100%;
		}
		.r-btn {
			border: 0px solid rgba(0, 0, 0, 1);
			cursor: pointer;
			border-radius: 4px;
			padding: 0 10px;
			margin: 10px 0;
			color: #fff;
			background: #6DB344;
			display: block;
			width: 500px;
			font-size: 16px;
			height: 44px;
		}
		.r-btn:hover {
			border: 0px solid rgba(0, 0, 0, 1);
			opacity: 0.8;
		}
		.r-login {
			cursor: pointer;
			padding: 0;
			color: #666;
			display: inline-block;
			text-decoration: underline;
			width: 100%;
			font-size: 15px;
			line-height: 40px;
			text-align: right;
		}
		.r-login:hover {
			opacity: 1;
		}
	}
}
	
	::-webkit-scrollbar {
	  display: none;
	}
</style>
