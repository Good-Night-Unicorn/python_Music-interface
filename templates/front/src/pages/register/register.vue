<template>
	<div>

		<div class="container">
			<el-form class='rgs-form animate__animated animate__slideInLeft' v-if="pageFlag=='register'" ref="registerForm" :model="registerForm" :rules="rules">
				<div class="rgs-form2">
					<div class="title">基于python的音乐界面设计与实现</p></div>
					<el-form-item class="list-item" v-if="tableName=='yonghu'" prop="nicheng">
						<div class="label" :class="changeRules('nicheng')?'required':''">昵称：</div>
						<el-input v-model="registerForm.nicheng"  placeholder="请输入昵称" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='yonghu'" prop="mima">
						<div class="label" :class="changeRules('mima')?'required':''">密码：</div>
						<el-input v-model="registerForm.mima" type="password" placeholder="请输入密码" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='yonghu'" prop="mima2">
						<div class="label" :class="changeRules('mima')?'required':''">确认密码：</div>
						<el-input v-model="registerForm.mima2" type="password" placeholder="请再次输入密码" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='yonghu'" prop="xingming">
						<div class="label" :class="changeRules('xingming')?'required':''">姓名：</div>
						<el-input v-model="registerForm.xingming"  placeholder="请输入姓名" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='yonghu'" prop="xingbie">
						<div class="label" :class="changeRules('xingbie')?'required':''">性别：</div>
						<el-select v-model="registerForm.xingbie" placeholder="请选择性别" >
							<el-option
								v-for="(item,index) in yonghuxingbieOptions"
								:key="index"
								:label="item"
								:value="item">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='yonghu'" prop="shouji">
						<div class="label" :class="changeRules('shouji')?'required':''">手机：</div>
						<el-input v-model="registerForm.shouji"  placeholder="请输入手机" />
					</el-form-item>
					<el-form-item class="list-item" v-if="tableName=='yonghu'" prop="touxiang">
						<div class="label" :class="changeRules('touxiang')?'required':''">头像：</div>
						<file-upload
							tip="点击上传头像"
							action="file/upload"
							:limit="1"
							:multiple="true"
							:fileUrls="registerForm.touxiang?registerForm.touxiang:''"
							@change="yonghutouxiangUploadChange"
						></file-upload>
					</el-form-item>
					<el-form-item v-if="tableName=='yonghu'" class="el-email list-item">
						<div class="label" class="required">邮箱：</div>
						<div style="display: flex;flex: 1;">
							<input v-model="registerForm.email" type="text" id="email" name="email" placeholder="请输入邮箱" autocomplete="off" class="emailInput">
							<button v-if="isEndFlag" @click="sendemailcode" id="sendemailcode" type="button" class="el-btn">发送验证码</button>
							<button v-if="!isEndFlag" disabled="disabled" type="button" class="el-btn">{{count}}秒后重发</button>
						</div>
					</el-form-item>
					<el-form-item v-if="tableName=='yonghu'" class="el-email list-item">
						<div class="label" class="required">验证码：</div>
						<el-input v-model="emailcode" type="text" id="emailcode" name="emailcode" placeholder="请输入验证码" autocomplete="off" class="el-input" />
					</el-form-item>
					<div class="register-btn">
						<div class="register-btn1">
							<el-button class="register_btn" type="primary" @click="submitForm('registerForm')">注册</el-button>
						</div>
						<div class="register-btn2">
							<router-link class="has_btn" to="/login">已有账号，直接登录</router-link>
						</div>
					</div>
				</div>
				<div class="idea1"></div>
				<div class="idea2"></div>
			</el-form>
		</div>
	</div>
</div>
</template>

<script>
	import 'animate.css';

export default {
    //数据集合
    data() {
		return {
            pageFlag : '',
			tableName: '',
			registerForm: {},
			forgetForm: {},
			rules: {},
			requiredRules: {},
            yonghuxingbieOptions: [],
            emailcode:'',
			//倒计时60s
			count: 60,
			//倒计时定时器
			inter: null,
			//倒计结束标识
			isEndFlag: true,
		}
    },
	mounted() {
		if(this.$route.query.pageFlag=='register'){
			this.tableName = this.$route.query.role;
			if(this.tableName=='yonghu'){
				this.registerForm = {
					nicheng: '',
					mima: '',
					mima2: '',
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
				this.rules.nicheng = [{ required: true, message: '请输入昵称', trigger: 'blur' }];
				this.requiredRules.nicheng = [{ required: true, message: '请输入昵称', trigger: 'blur' }]
			}
			if ('yonghu' == this.tableName) {
				this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }];
				this.requiredRules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
			if ('yonghu' == this.tableName) {
				this.rules.xingming = [{ required: true, message: '请输入姓名', trigger: 'blur' }];
				this.requiredRules.xingming = [{ required: true, message: '请输入姓名', trigger: 'blur' }]
			}
			this.yonghuxingbieOptions = "男,女".split(',');
			if ('yonghu' == this.tableName) {
				this.rules.shouji = [{ required: true, validator: this.$validate.isMobile, trigger: 'blur' }];
			}
			if ('yonghu' == this.tableName) {
				this.rules.email = [{ required: true, validator: this.$validate.isEmail, trigger: 'blur' }];
			}
			if ('yonghu' == this.tableName) {
				this.rules.status = [{ required: true, validator: this.$validate.isIntNumer, trigger: 'blur' }];
			}
		}
	},
    created() {
		this.pageFlag = this.$route.query.pageFlag;
    },
    //方法集合
    methods: {
		changeRules(name){
			if(this.requiredRules[name]){
				return true
			}
			return false
		},
		// 获取uuid
		getUUID () {
			return new Date().getTime();
		},
        // 下二随
		yonghutouxiangUploadChange(fileUrls) {
			this.registerForm.touxiang = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
		},

		// 多级联动参数

		sendemailcode() {
			if(!this.registerForm.email){
				this.$message.error(`邮箱不能为空`);
				return
			}
			let emailF = this.$validate.isEmail2(this.registerForm.email);
			if(this.registerForm.email&&(!this.$validate.isEmail2(this.registerForm.email))){
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
				url: `${this.tableName}/sendemail?email=`+this.registerForm.email,
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

		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					var url=this.tableName+"/register";
					if(this.tableName=='yonghu'){
						this.registerForm.sfsh = '待审核'
					}
					if(`yonghu` == this.tableName ){
						url=this.tableName+"/register?emailcode="+this.emailcode;
						if(this.registerForm.email&&(!this.$validate.isEmail2(this.registerForm.email))){
							this.$message.error(`请输入正确的邮箱格式`);
							return
						}
					}
					if((!this.emailcode) && `yonghu` == this.tableName){
						this.$message.error(`验证码不能为空`);
						return
					}
					if(`yonghu` == this.tableName && this.registerForm.mima!=this.registerForm.mima2) {
						this.$message.error(`两次密码输入不一致`);
						return
					}
					this.$http.post(url, this.registerForm).then(res => {
						if (res.data.code === 0) {
							this.$message({
								message: '注册成功',
								type: 'success',
								duration: 1500,
								onClose: () => {
									this.$router.push('/login');
								}
							});
						} else {
							this.$message.error(res.data.msg);
						}
					});
				} else {
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.container {
		background: url(http://codegen.caihongy.cn/20241210/8b132b32c1614f979e4821b658461f89.jpg) center top / cover no-repeat;
		display: flex;
		width: 100%;
		min-height: 100vh;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		background: url(http://codegen.caihongy.cn/20241210/8b132b32c1614f979e4821b658461f89.jpg) center top / cover no-repeat;
		.rgs-form {
			border-radius: 0;
			padding: 40px 20px 20px;
			box-shadow: 0 0px 0px rgba(64, 158, 255, .8);
			margin: 0 0 0 8%;
			z-index: 1;
			background: #fff;
			width: 33%;
			position: relative;
			height: auto;
			.rgs-form2 {
				width: 100%;
				.title {
					margin: 0 0 10px 0;
					color: #0f2530;
					font-weight: bold;
					width: 100%;
					font-size: 22px;
					line-height: 50px;
					text-align: center;
				}
				.subtitle {
					margin: 0 0 10px 0;
					text-shadow: 4px 4px 2px rgba(64, 158, 255, .5);
					color: rgba(64, 158, 255, 1);
					width: 100%;
					font-size: 20px;
					line-height: 44px;
					text-align: center;
				}
				.list-item {
					border: 1px solid #111;
					border-radius: 4px;
					padding: 0;
					margin: 0 auto 15px;
					width: 90%;
					height: auto;
					/deep/.el-form-item__content {
						display: flex;
						align-items: flex-start;
						.label {
							border-radius: 4px;
							z-index: 111;
							color: #fff;
							background: #70b4a6;
							width: 90px;
							font-size: 14px;
							line-height: 50px;
							text-align: center;
						}
						
						.required {
							position: relative;
						}
						.required::after{
							color: #fff;
							top: 0;
							left: 5px;
							line-height: 55px;
							position: absolute;
							content: "*";
						}
						.el-input {
							width: calc(100% - 100px);
						}
						.el-input .el-input__inner {
							border: 0px solid #fff;
							border-radius: 0 10px 10px 0;
							padding: 0 10px;
							outline: none;
							color: #666;
							width: 100%;
							font-size: 15px;
							height: 50px;
						}
						.el-input .el-input__inner:focus {
							border: 0px solid #157ED2;
							border-radius: 0 10px 10px 0;
							padding: 0 10px;
							outline: none;
							color: #000;
							width: 100%;
							font-size: 15px;
							height: 50px;
						}
						.el-input-number {
							width: calc(100% - 100px);
						}
						.el-input-number /deep/ .el-input__inner {
							text-align: left;
							border: 0px solid #fff;
							border-radius: 0 10px 10px 0;
							padding: 0 10px;
							outline: none;
							color: #666;
							width: 100%;
							font-size: 15px;
							height: 50px;
						}
						.el-input-number /deep/ .el-input-number__decrease {
							display: none;
						}
						.el-input-number /deep/ .el-input-number__increase {
							display: none;
						}
						.el-select {
							width: calc(100% - 100px);
						}
						.el-select .el-input__inner {
							border: 0px solid #fff;
							border-radius: 0 10px 10px 0;
							padding: 0 10px;
							outline: none;
							color: #666;
							width: 100%;
							font-size: 15px;
							height: 50px;
						}
						.el-select .el-input__inner:focus {
							border: 0px solid #157ED2;
							border-radius: 0 10px 10px 0;
							padding: 0 10px;
							color: #000;
							width: 100%;
							font-size: 15px;
							height: 50px;
						}
						.el-date-editor {
							width: calc(100% - 100px);
						}
						.el-date-editor .el-input__inner {
							border: 0px solid #fff;
							border-radius: 0 10px 10px 0;
							padding: 0 10px 0 30px;
							outline: none;
							color: #666;
							width: 100%;
							font-size: 15px;
							height: 50px;
						}
						.el-date-editor .el-input__inner:focus {
							border: 0px solid #157ED2;
							border-radius: 0 10px 10px 0;
							padding: 0 10px 0 30px;
							color: #000;
							width: 100%;
							font-size: 15px;
							height: 50px;
						}
						.el-upload--picture-card {
							background: transparent;
							border: 0;
							border-radius: 0;
							width: auto;
							height: auto;
							line-height: initial;
							vertical-align: middle;
						}
						.upload .upload-img {
							border: 1px solid #999;
							cursor: pointer;
							border-radius: 8px;
							margin: 5px 0 0 10px;
							color: #999;
							background: #fff;
							width: 72px;
							font-size: 22px;
							line-height: 38px;
							text-align: center;
							height: 38px;
						}
						.el-upload-list .el-upload-list__item {
							border: 1px solid #999;
							cursor: pointer;
							border-radius: 8px;
							margin: 5px 0 0 10px;
							color: #999;
							background: #fff;
							width: 72px;
							font-size: 22px;
							line-height: 38px;
							text-align: center;
							height: 38px;
							font-size: 14px;
							line-height: 1.8;
						}
						.el-upload .el-icon-plus {
							border: 1px solid #999;
							cursor: pointer;
							border-radius: 8px;
							margin: 5px 0 0 10px;
							color: #999;
							background: #fff;
							width: 72px;
							font-size: 22px;
							line-height: 38px;
							text-align: center;
							height: 38px;
						}
						.el-upload__tip {
							color: #838fa1;
							display: none;
						}
						.emailInput {
							border: 0px solid #fff;
							border-radius: 0 10px 10px 0;
							padding: 0 12px;
							margin: 0;
							outline: none;
							color: #666;
							background: #fff;
							width: 100%;
							font-size: 15px;
							height: 50px;
						}
						.emailInput:focus {
							border: 0px solid #157ED2;
							border-radius: 0 10px 10px 0;
							padding: 0 12px;
							color: #000;
							width: 100%;
							font-size: 15px;
							height: 50px;
						}
						.el-btn {
							border: 0;
							cursor: pointer;
							border-radius: 4px;
							padding: 0;
							margin: 0 0 0 5px;
							outline: none;
							color: #fff;
							background: #18725d;
							width: 90px;
							font-size: 14px;
							line-height: 50px;
							height: 50px;
						}
						.el-btn:hover {
							opacity: 0.9;
						}
						
						.el-input__inner::placeholder {
							color: #999;
							font-size: 13px;
						}
						input::placeholder {
							color: #999;
							font-size: 13px;
						}
						.editor {
							border: none;
							background: #fff;
							width: calc(100% - 100px);
							height: auto;
						}
					}
				}
				.register-btn {
					margin: 0 auto;
					width: 90%;
				}
				.register-btn1 {
					width: 100%;
				}
				.register-btn2 {
					margin: 20px 0 0;
					width: 100%;
					text-align: right;
				}
				.register_btn {
					border: 0;
					cursor: pointer;
					padding: 0 10px;
					margin: 20px auto 5px;
					color: #fff;
					font-weight: bold;
					display: block;
					font-size: 22px;
					border-radius: 4px;
					outline: none;
					background: #18725d;
					width: 100%;
					height: 50px;
				}
				.register_btn:hover {
					opacity: 0.5;
				}
				.has_btn {
					cursor: pointer;
					padding: 0;
					color: #959595;
					display: inline-block;
					text-decoration: none;
					font-size: 15px;
					line-height: 1;
				}
				.has_btn:hover {
					opacity: 0.5;
				}
			}
			.idea1 {
				background: red;
				display: none;
				width: 100%;
				height: 40px;
			}
			.idea2 {
				background: blue;
				display: none;
				width: 100%;
				height: 40px;
			}
		}
	}
	
	::-webkit-scrollbar {
		display: none;
	}
</style>
