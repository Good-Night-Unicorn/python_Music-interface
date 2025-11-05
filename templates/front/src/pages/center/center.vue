<template>
	<div class="center-preview">
		<div class="center-title">{{ title }}</div>
		<div class="center-info">
			<div class="center-info-title">个人信息</div>
			<div class="img-box" v-if="userTableName=='yonghu'">
				<img :src="sessionForm.touxiang?baseUrl + sessionForm.touxiang:require('@/assets/avator.png')">
			</div>
			<div class="info-item1" v-if="userTableName=='yonghu'">
				<span class="icon iconfont icon-shouye-zhihui"></span>
				<div class="label">昵称：</div>
				<div class="text">{{sessionForm.nicheng}}</div>
			</div>
			<div class="info-item2" v-if="userTableName=='yonghu'">
				<span class="icon iconfont icon-shouye-zhihui"></span>
				<div class="label">姓名：</div>
				<div class="text">{{sessionForm.xingming}}</div>
			</div>
			<div class="info-item3" v-if="userTableName=='yonghu'">
				<span class="icon iconfont icon-shouye-zhihui"></span>
				<div class="label">性别：</div>
				<div class="text">{{sessionForm.xingbie}}</div>
			</div>
			<div class="info-item4" v-if="userTableName=='yonghu'">
				<span class="icon iconfont icon-shouye-zhihui"></span>
				<div class="label">手机：</div>
				<div class="text">{{sessionForm.shouji}}</div>
			</div>
			<div class="info-item5" v-if="userTableName=='yonghu'">
				<span class="icon iconfont icon-shouye-zhihui"></span>
				<div class="label">是否审核：</div>
				<div class="text">{{sessionForm.sfsh}}</div>
			</div>
			<div class="info-item6" v-if="userTableName=='yonghu'">
				<span class="icon iconfont icon-shouye-zhihui"></span>
				<div class="label">邮箱：</div>
				<div class="text">{{sessionForm.email}}</div>
			</div>
		
		</div>
	
		<el-tabs class="center-tabs" tab-position="left" @tab-click="handleClick">
			<el-tab-pane label="个人中心">
				<el-form class="center-preview-pv" ref="sessionForm" :model="sessionForm" :rules="rules" label-width="180px">
					<el-form-item class="center-item" v-if="userTableName=='yonghu'" label="昵称" prop="nicheng">
						<el-input v-model="sessionForm.nicheng" placeholder="昵称" readonly></el-input>
					</el-form-item>
					<el-form-item class="center-item" v-if="userTableName=='yonghu'" label="姓名" prop="xingming">
						<el-input v-model="sessionForm.xingming" placeholder="姓名" ></el-input>
					</el-form-item>
					<el-form-item class="center-item" v-if="userTableName=='yonghu'" label="性别" prop="xingbie">
						<el-select v-model="sessionForm.xingbie" placeholder="请选择性别" >
							<el-option v-for="(item, index) in dynamicProp.xingbie" :key="index" :label="item" :value="item"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item class="center-item" v-if="userTableName=='yonghu'" label="手机" prop="shouji">
						<el-input v-model="sessionForm.shouji" placeholder="手机" ></el-input>
					</el-form-item>
					<el-form-item class="center-item" v-if="userTableName=='yonghu'" label="头像" prop="touxiang">
						<file-upload
							tip="点击上传头像"
							action="file/upload"
							:limit="1"
							:multiple="true"
							:fileUrls="sessionForm.touxiang?sessionForm.touxiang:''"
							@change="yonghutouxiangHandleAvatarSuccess"
							></file-upload>
					</el-form-item>
					<el-form-item class="center-item" v-if="userTableName=='yonghu'" label="个人简介" prop="gerenjianjie">
						<el-input v-model="sessionForm.gerenjianjie" placeholder="个人简介" ></el-input>
					</el-form-item>
					<el-form-item class="center-item" v-if="userTableName=='yonghu'" label="邮箱" prop="email">
						<el-input v-model="sessionForm.email" placeholder="邮箱" ></el-input>
					</el-form-item>
					<el-form-item class="center-item" v-if="userTableName=='yonghu'" label="会员">
						<div class="balance-item">
							<el-input v-model="sessionForm.vip" placeholder="会员" readonly></el-input>
							<div class="balanceBtn" @click="dialogFormVisibleVip = true">
								<span class="icon iconfont icon-tijiaoyanzi"></span>
								<span class="text">会员购买</span>
							</div>
						</div>
					</el-form-item>
					<el-form-item class="center-btn-item">
						<div class="updateBtn" type="primary" @click="onSubmit('sessionForm')">
							<span class="icon iconfont icon-kaitongfuwu"></span>
							<span class="text">更新信息</span>
						</div>
						<div class="closeBtn" type="danger" @click="logout">
							<span class="icon iconfont icon-shanchu1"></span>
							<span class="text">退出登录</span>
						</div>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="修改密码">
				<el-form class="center-preview-pv" ref="passwordForm" :model="passwordForm" :rules="passwordRules" label-width="180px">
					<el-form-item class="center-item" label="原密码" prop="password">
						<el-input type="password" v-model="passwordForm.password" placeholder="原密码"></el-input>
					</el-form-item>
					<el-form-item class="center-item" label="新密码" prop="newpassword">
						<el-input type="password" v-model="passwordForm.newpassword" placeholder="新密码"></el-input>
					</el-form-item>
					<el-form-item class="center-item" label="确认密码" prop="repassword">
						<el-input type="password" v-model="passwordForm.repassword" placeholder="确认密码"></el-input>
					</el-form-item>
					<el-form-item class="center-btn-item">
						<div class="updateBtn" type="primary" @click="updatePassword">
							<span class="icon iconfont icon-kaitongfuwu"></span>
							<span class="text">修改密码</span>
						</div>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane v-for="(item,index) in menuList" :key="index" v-if="hasBack(item.menu)" :label="item.child[0].menu" :name="item.child[0].tableName"></el-tab-pane>
			<el-tab-pane label="我的收藏"></el-tab-pane>
		</el-tabs>

		<el-dialog title="会员购买" :visible.sync="dialogFormVisibleVip" width="726px" center>
			<el-form :model="chongzhiForm">
				<el-form-item label="会员卡" label-width="120px">
					<el-input readonly autocomplete="off" value="￥199/年"></el-input>
				</el-form-item>
				<el-form-item label-width="120px">
					<el-radio-group v-model="chongzhiForm.radio">
						<el-radio style="margin-bottom: 30px" label="微信支付">
							<el-image
								style="width: 60px; height: 60px;vertical-align: middle;"
								:src="require('@/assets/weixin.png')"
								fit="fill"></el-image>
							<span style="display: inline-block;margin-left: 10px">微信支付</span>
						</el-radio>
						<el-radio label="支付宝支付">
							<el-image
								style="width: 60px; height: 60px;vertical-align: middle;"
								:src="require('@/assets/zhifubao.png')"
								fit="fill"></el-image>
							<span style="display: inline-block;margin-left: 10px">支付宝支付</span>
						</el-radio>
						<el-radio label="中国建设银行支付">
							<el-image
								style="width: 120px; height: 60px;vertical-align: middle;"
								:src="require('@/assets/jianshe.png')"
								fit="fill"></el-image>
						</el-radio>
						<el-radio label="中国农业银行支付">
							<el-image
								style="width: 126px; height: 60px;vertical-align: middle;"
								:src="require('@/assets/nongye.png')"
								fit="fill"></el-image>
						</el-radio>
						<el-radio label="中国银行支付">
							<el-image
								style="width: 140px; height: 60px;vertical-align: middle;"
								:src="require('@/assets/zhongguo.png')"
								fit="fill"></el-image>
						</el-radio>
						<el-radio label="交通银行支付">
							<el-image
								style="width: 120px; height: 60px;vertical-align: middle;"
								:src="require('@/assets/jiaotong.png')"
								fit="fill"></el-image>
						</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisibleVip = false">取 消</el-button>
				<el-button type="primary" @click="chongzhivip">确认支付</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import config from '@/config/config';
	import menu from '@/config/menu';
	import Vue from 'vue';
	export default {
		//数据集合
		data() {
			return {
				title: '个人中心',
				baseUrl: config.baseUrl,
				sessionForm: {},
				passwordForm: {},
				passwordRules: {
					password: [
						{
							required: true,
							message: "密码不能为空",
							trigger: "blur"
						}
					],
					newpassword: [
						{
							required: true,
							message: "新密码不能为空",
							trigger: "blur"
						}
					],
					repassword: [
						{
							required: true,
							message: "确认密码不能为空",
							trigger: "blur"
						}
					]
				},
				rules: {},
				chongzhiForm: {
					money: '',
					radio: ''
				},
				menuList: [],
				disabled: false,
				dialogFormVisibleVip: false,
				uploadUrl: config.baseUrl + 'file/upload',
				imageUrl: '',
				headers: {Token: localStorage.getItem('frontToken')},
				userTableName: localStorage.getItem('UserTableName'),
				dynamicProp: {},
			}
		},
		created() {
			let menus = menu.list()
			for(let x in menus){
				if(menus[x].tableName == this.userTableName){
					for(let i in menus[x].backMenu){
						if(menus[x].backMenu[i].menu=='考试管理'){
							menus[x].backMenu.splice(i,1)
						}
					}
					this.menuList = menus[x].backMenu
				}
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.sessionForm, 'nicheng', null);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.sessionForm, 'mima', null);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.sessionForm, 'xingming', null);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.sessionForm, 'xingbie', null);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.sessionForm, 'shouji', null);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.sessionForm, 'touxiang', null);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.sessionForm, 'gerenjianjie', null);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.sessionForm, 'sfsh', null);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.sessionForm, 'shhf', null);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.sessionForm, 'email', null);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.sessionForm, 'vip', null);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.sessionForm, 'status', null);
			}

			if ('yonghu' == this.userTableName&&this.rules['nicheng']){
				this.rules['nicheng'].push({ required: true, message: '请输入昵称', trigger: 'blur' })
			}else if('yonghu' == this.userTableName&&!this.rules['nicheng']) {
				this.$set(this.rules, 'nicheng', [{ required: true, message: '请输入昵称', trigger: 'blur' }]);
			}
			if ('yonghu' == this.userTableName&&this.rules['mima']){
				this.rules['mima'].push({ required: true, message: '请输入密码', trigger: 'blur' })
			}else if('yonghu' == this.userTableName&&!this.rules['mima']) {
				this.$set(this.rules, 'mima', [{ required: true, message: '请输入密码', trigger: 'blur' }]);
			}
			if ('yonghu' == this.userTableName&&this.rules['xingming']){
				this.rules['xingming'].push({ required: true, message: '请输入姓名', trigger: 'blur' })
			}else if('yonghu' == this.userTableName&&!this.rules['xingming']) {
				this.$set(this.rules, 'xingming', [{ required: true, message: '请输入姓名', trigger: 'blur' }]);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.rules, 'shouji', [{ required: false, validator: this.$validate.isMobile, trigger: 'blur' }]);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.rules, 'email', [{ required: false, validator: this.$validate.isEmail, trigger: 'blur' }]);
			}
			if ('yonghu' == this.userTableName) {
				this.$set(this.rules, 'status', [{ required: false, validator: this.$validate.isIntNumer, trigger: 'blur' }]);
			}

			this.init();
			this.sessionForm = JSON.parse(localStorage.getItem('sessionForm'))
		},
		//方法集合
		methods: {
			init() {
				if ('yonghu' == this.userTableName) {
					this.dynamicProp.xingbie = '男,女'.split(',');
				}
				if ('yonghu' == this.userTableName) {
					this.dynamicProp.vip = '是,否'.split(',');
				}
			},
			setSession(){
				localStorage.setItem('sessionForm',JSON.stringify(this.sessionForm))
			},
			onSubmit(formName) {
				if(`yonghu` == this.userTableName && this.sessionForm.touxiang!=null){
					this.sessionForm.touxiang = this.sessionForm.touxiang.replace(new RegExp(this.$config.baseUrl,"g"),"");
				}
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http.post(this.userTableName + '/update', this.sessionForm).then(res => {
							if (res.data.code == 0) {
								this.setSession()
								this.$message({
									message: '更新成功',
									type: 'success',
									duration: 1500
								});
							}
						});
					} else {
						return false;
					}
				});
			},
			yonghutouxiangHandleAvatarSuccess(fileUrls) {
				this.sessionForm.touxiang = fileUrls;
			},
			chongzhivip() {
				this.chongzhiForm.money == 199;
				if (this.chongzhiForm.radio == '') {
					this.$message({
						message: '请选择支付方式',
						type: 'error',
						duration: 1500
					});
					return;
				}
				if(this.sessionForm.vip == '是') {
					this.$message({
						message: '您已是我们的尊贵会员。',
						type: 'success',
						duration: 1500
					});
					return;
				}
			
				this.sessionForm.vip = "是"
				this.$http.post(this.userTableName + '/update', this.sessionForm).then(res => {
					if (res.data.code == 0) {
						this.setSession()
						this.$message({
							message: '会员购买成功',
							type: 'success',
							duration: 1500,
							onClose: () => {
								localStorage.setItem('vip', this.sessionForm.vip);
								this.dialogFormVisibleVip = false;
							}
						});
					}
				});
			},
			handleClick(tab, event) {
				switch(event.target.outerText) {
					case '个人中心':
						tab.$router.push('/index/center');
						break;
					case '修改密码':
						this.passwordForm = {
							password: '',
							newpassword: '',
							repassword: '',
						}
						this.$forceUpdate()
						break;
					case '我的收藏':
						localStorage.setItem('storeupType', 1);
						tab.$router.push('/index/storeup');
						break;
					default:
						tab.$router.push(`/index/${tab.name}?centerType=1`);
				}

				this.title = event.target.outerText;
			},
			async updatePassword(){
				this.$refs["passwordForm"].validate(async valid => {
					if (valid) {
						var password = "";
						if (this.sessionForm.mima) {
							password = this.sessionForm.mima;
						} else if (this.sessionForm.password) {
							password = this.sessionForm.password;
						}
						if (this.userTableName == 'yonghu') {
						}
						if (this.passwordForm.password != password) {
							this.$message.error("原密码错误");
							return;
						}
						if (this.passwordForm.newpassword != this.passwordForm.repassword) {
							this.$message.error("两次密码输入不一致");
							return;
						}
						if (this.passwordForm.newpassword == this.passwordForm.password) {
							this.$message.error("新密码与原密码相同！");
							return;
						}
						this.sessionForm.password = this.passwordForm.newpassword;
						this.sessionForm.mima = this.passwordForm.newpassword;
						this.$http.post(`${this.userTableName}/update`,this.sessionForm).then(({data})=>{
							if (data && data.code === 0) {
								this.$message({
									message: "修改密码成功,下次登录系统生效",
									type: "success",
									duration: 1500,
									onClose: () => {
									}
								});
								this.setSession()
							} else {
								this.$message.error(data.msg);
							}
						});
					}
				})
			},
			logout() {
				localStorage.clear();
				Vue.http.headers.common['Token'] = "";
				this.$router.push('/index/home');
				this.activeIndex = '0'
				localStorage.setItem('keyPath', this.activeIndex)
				this.$forceUpdate()
				this.$message({
					message: '登出成功',
					type: 'success',
					duration: 1500,
				});
			},
			hasBack(name){
				switch(name){
					case '我的收藏管理':
						return false
						break;
					default:
						return true
				}
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.center-preview {
		padding: 0 16%;
		margin: 10px auto;
		background: none;
		width: 100%;
		position: relative;
		.center-title {
			padding: 0 0 0 30px;
			margin: 0px auto;
			color: #18725d;
			background: url(http://codegen.caihongy.cn/20241215/590d47f055174a759991ca870bfe4faa.png) no-repeat left center / auto 100%,url(http://codegen.caihongy.cn/20241215/1df934632aa544dfb676ec70931c1e37.png) no-repeat right center / auto 100%,url(http://codegen.caihongy.cn/20241215/62b7972a6b1f4d96b0decbe7088740eb.png) repeat-x left bottom / auto 100%;
			font-weight: 600;
			width: 100%;
			font-size: 26px;
			line-height: 60px;
			text-align: left;
		}
		.center-info {
			padding: 20px 20px 20px 150px;
			margin: 20px auto 0;
			display: flex;
			border-color: #fff;
			min-height: 180px;
			flex-wrap: wrap;
			border-radius: 10px;
			box-shadow: 0 0px 0px rgba(0, 0, 0, 0.3);
			align-content: center;
			background: #fff;
			width: 100%;
			border-width: 0;
			align-items: center;
			position: relative;
			border-style: solid;
			height: auto;
			.center-info-title {
				color: #333;
				display: none;
				width: 100%;
				font-size: 15px;
				border-color: #efefef;
				border-width: 0 0 1px 0;
				line-height: 44px;
				border-style: solid;
				height: 44px;
			}
			.img-box {
				top: 20px;
				left: 20px;
				width: auto;
				font-size: 0;
				position: absolute;
				height: auto;
				img {
					border-radius: 100%;
					margin: 10px auto;
					object-fit: cover;
					display: block;
					width: 100px;
					border-color: #efefef;
					border-width: 0 0 1px 0;
					border-style: solid;
					height: 100px;
				}
			}
			.info-item1 {
				padding: 0 20px;
				margin: 0 20px 30px 0;
				background: #D0F0E9;
				display: flex;
				width: calc(33% - 20px);
				line-height: 40px;
				height: auto;
				.icon {
					display: none;
				}
				.label {
					padding: 0 10px 0 0;
					color: #18725d;
					font-size: 15px;
				}
				.text {
					color: #18725d;
					font-size: 15px;
				}
			}
			.info-item2 {
				padding: 0 20px;
				margin: 0 20px 30px 0;
				background: #D0F0E9;
				display: flex;
				width: calc(33% - 20px);
				line-height: 40px;
				height: auto;
				.icon {
					display: none;
				}
				.label {
					padding: 0 10px 0 0;
					color: #18725d;
					font-size: 15px;
				}
				.text {
					color: #18725d;
					font-size: 15px;
				}
			}
			.info-item3 {
				padding: 0 20px;
				margin: 0 20px 30px 0;
				background: #D0F0E9;
				display: flex;
				width: calc(33% - 20px);
				line-height: 40px;
				height: auto;
				.icon {
					display: none;
				}
				.label {
					padding: 0 10px 0 0;
					color: #18725d;
					font-size: 15px;
				}
				.text {
					color: #18725d;
					font-size: 15px;
				}
			}
			.info-item4 {
				padding: 0 20px;
				margin: 0 20px 30px 0;
				background: #D0F0E9;
				display: flex;
				width: calc(33% - 20px);
				line-height: 40px;
				height: auto;
				.icon {
					display: none;
				}
				.label {
					padding: 0 10px 0 0;
					color: #18725d;
					font-size: 15px;
				}
				.text {
					color: #18725d;
					font-size: 15px;
				}
			}
			.info-item5 {
				padding: 0 20px;
				margin: 0 20px 30px 0;
				background: #D0F0E9;
				display: flex;
				width: calc(33% - 20px);
				line-height: 40px;
				height: auto;
				.icon {
					display: none;
				}
				.label {
					padding: 0 10px 0 0;
					color: #18725d;
					font-size: 15px;
				}
				.text {
					color: #18725d;
					font-size: 15px;
				}
			}
			.info-item6 {
				padding: 0 20px;
				margin: 0 20px 30px 0;
				background: #D0F0E9;
				display: flex;
				width: calc(33% - 20px);
				line-height: 40px;
				height: auto;
				.icon {
					display: none;
				}
				.label {
					padding: 0 10px 0 0;
					color: #18725d;
					font-size: 15px;
				}
				.text {
					color: #18725d;
					font-size: 15px;
				}
			}
		}
		.center-tabs.el-tabs {
			border-radius: 10px;
			box-shadow: inset 0px 4px 10px 0px rgba(0,0,0,0.3);
			background: #fff;
			width: 100%;
			/deep/ .el-tabs__header {
				border: none;
				padding: 10px;
				margin: 0;
				display: block;
				border-color: #E4E7ED;
				border-radius: 10px;
				box-shadow: inset 0px 2px 5px 0px #082E25;
				flex-direction: row;
				background: #EBFFF9;
				width: 100%;
				border-width: 0;
				border-style: solid;
				height: auto;
			}
			/deep/ .el-tabs__header .el-tabs__item {
				cursor: pointer;
				padding: 10px 24px;
				margin: 0 10px 0 0;
				color: #666;
				display: inline-flex;
				font-size: 15px;
				float: left;
				border-radius: 10px;
				background: url(http://codegen.caihongy.cn/20241215/bf1ea49667a94b548a76c23d2c4d574d.png) no-repeat center top / 100% 100%;
				justify-content: center;
				align-items: center;
				min-width: 120px;
				height: 80px;
			}
			/deep/ .el-tabs__header .el-tabs__item:hover {
				color: #333;
				background: url(http://codegen.caihongy.cn/20241215/9371cf592ec04bfca08b02ed479510cf.png) no-repeat center top / 100% 100%;
			}
			/deep/ .el-tabs__header .el-tabs__item.is-active {
				padding: 10px 24px;
				margin: 0 10px 0 0;
				color: #333;
				background: url(http://codegen.caihongy.cn/20241215/9371cf592ec04bfca08b02ed479510cf.png) no-repeat center top / 100% 100%;
				display: inline-flex;
				font-size: 15px;
				align-items: center;
				float: left;
				min-width: 120px;
				height: 80px;
			}
			/deep/ .el-tabs__content {
				padding: 30px 10px 10px;
				box-shadow: none;
				background: none;
				width: 100%;
			}
			/deep/ .el-tabs__content .el-tab-pane {
				display: flex;
				width: 100%;
				align-items: flex-start;
			}
			& /deep/ .el-tabs__header {
				.el-tabs__nav{
					overflow: auto;
				}
				::-webkit-scrollbar {
					-webkit-appearance: none;
					width: 6px;
					height: 6px;
				}
				::-webkit-scrollbar-track {
					background: rgba(0, 0, 0, 0.1);
					border-radius: 0;
				}
				::-webkit-scrollbar-thumb {
					cursor: pointer;
					border-radius: 5px;
					background: rgba(0, 0, 0, 0.15);
					transition: color 0.2s ease;
				}
				::-webkit-scrollbar-thumb:hover {
					background: rgba(0, 0, 0, 0.3);
				}
				.el-tabs__nav-wrap {
					margin: 0;
					&::after {
						content: none;
					}
				}
				.el-tabs__active-bar {
					display: none !important;
				}
			}
			.center-preview-pv {
				.center-item.el-form-item {
					padding: 10px;
					margin: 0 0 10px;
					background: none;
					display: inline-block;
					width: 48%;
					/deep/ .el-form-item__label {
						padding: 0 5px 0 0;
						color: #666;
						font-weight: 500;
						width: 180px;
						font-size: 15px;
						line-height: 40px;
						text-align: right;
					}
					.el-form-item__content {
						margin-left: 180px;
					}
					.el-input {
						width: 100%;
					}
					.el-input /deep/ .el-input__inner {
						border: 1px solid #E2E3E5;
						border-radius: 10px;
						padding: 0 12px;
						box-shadow: 0 0 0px rgba(64, 158, 255, .5);
						outline: none;
						color: #000;
						width: 100%;
						font-size: 14px;
						height: 40px;
					}
					.el-input /deep/ .el-input__inner[readonly="readonly"] {
						border: 1px solid #E2E3E5;
						cursor: not-allowed;
						border-radius: 10px;
						padding: 0 12px;
						box-shadow: 0 0 0px rgba(85, 85, 127, 0.5);
						outline: none;
						color: #000;
						background: #eee;
						width: 100%;
						font-size: 14px;
						height: 40px;
					}
					.el-select {
						width: 100%;
					}
					.el-select /deep/ .el-input__inner {
						border: 1px solid #E2E3E5;
						border-radius: 10px;
						padding: 0 10px;
						box-shadow: 0 0 0px rgba(64, 158, 255, .5);
						outline: none;
						color: #000;
						width: 100%;
						font-size: 14px;
						height: 40px;
					}
					.el-select /deep/ .is-disabled .el-input__inner {
						border: 1px solid #E2E3E5;
						cursor: not-allowed;
						border-radius: 10px;
						padding: 0 10px;
						box-shadow: 0 0 0px rgba(85, 85, 127, 0.5);
						outline: none;
						color: #000;
						background: #eee;
						width: 100%;
						font-size: 14px;
						height: 40px;
					}
					.el-date-editor {
						width: 100%;
					}
					.el-date-editor /deep/ .el-input__inner {
						border: 1px solid #E2E3E5;
						border-radius: 10px;
						padding: 0 10px 0 30px;
						box-shadow: 0 0 0px rgba(64, 158, 255, .5);
						outline: none;
						color: #000;
						width: 100%;
						font-size: 14px;
						height: 40px;
					}
					.el-date-editor /deep/ .el-input__inner[readonly="readonly"] {
						border: 1px solid #E2E3E5;
						cursor: not-allowed;
						border-radius: 10px;
						padding: 0 10px 0 30px;
						box-shadow: 0 0 0px rgba(85, 85, 127, 0.5);
						outline: none;
						color: #000;
						background: #eee;
						width: 100%;
						font-size: 14px;
						height: 40px;
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
						border: 1px dashed #aaa;
						cursor: pointer;
						border-radius: 10px;
						color: #aaa;
						object-fit: cover;
						width: 100px;
						font-size: 32px;
						line-height: 100px;
						text-align: center;
						height: 100px;
					}
					/deep/ .el-upload-list .el-upload-list__item {
						border: 1px dashed #aaa;
						cursor: pointer;
						border-radius: 10px;
						color: #aaa;
						object-fit: cover;
						width: 100px;
						font-size: 32px;
						line-height: 100px;
						text-align: center;
						height: 100px;
						font-size: 14px;
						line-height: 1.8;
					}
					/deep/ .el-upload .el-icon-plus {
						border: 1px dashed #aaa;
						cursor: pointer;
						border-radius: 10px;
						color: #aaa;
						object-fit: cover;
						width: 100px;
						font-size: 32px;
						line-height: 100px;
						text-align: center;
						height: 100px;
					}
					/deep/ .el-upload__tip {
						color: #838fa1;
						display: none;
					}
					/deep/ .el-input__inner::placeholder {
						color: #999;
						font-size: 14px;
					}
					.balance-item {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						.el-input {
							width: calc(100% - 115px);
						}
						.el-input /deep/ .el-input__inner {
							border: 1px solid #E2E3E5;
							border-radius: 10px;
							padding: 0 12px;
							box-shadow: 0 0 0px rgba(64, 158, 255, .5);
							outline: none;
							color: #000;
							display: inline-block;
							width: 100%;
							font-size: 14px;
							height: 40px;
						}
						.balanceBtn {
							border: 0;
							cursor: pointer;
							padding: 0 0;
							margin: 0 0 0 5px;
							display: inline-block;
							font-size: 14px;
							line-height: 40px;
							border-radius: 4px;
							outline: none;
							background: #18725D;
							width: 110px;
							text-align: center;
							height: 40px;
							.icon {
								color: rgba(255, 255, 255, 1);
							}
							.text {
								color: rgba(255, 255, 255, 1);
							}
						}
						.balanceBtn:hover {
							opacity: 0.7;
							.icon {
								color: #fff;
							}
							.text {
								color: #fff;
							}
						}
					}
				}
				.center-btn-item {
					padding: 0;
					margin: 0;
					.updateBtn {
						border: 0;
						cursor: pointer;
						border-radius: 0px;
						padding: 0 30px;
						margin: 0 20px 0 0;
						outline: none;
						background: #18725D;
						display: inline-block;
						width: auto;
						font-size: 14px;
						line-height: 34px;
						height: 34px;
						.icon {
							color: rgba(255, 255, 255, 1);
							display: none;
						}
						.text {
							color: rgba(255, 255, 255, 1);
						}
					}
					.updateBtn:hover {
						background: rgba(64, 158, 255, .5);
						.icon {
							color: #fff;
						}
						.text {
							color: #fff;
						}
					}
					.closeBtn {
						border: 0px solid rgba(64, 158, 255, 1);
						cursor: pointer;
						border-radius: 0px;
						padding: 0 30px;
						margin: 0 20px 0 0;
						outline: none;
						background: #9CD6C9;
						display: inline-block;
						width: auto;
						font-size: 14px;
						line-height: 34px;
						height: 34px;
						.icon {
							color: #fff;
							display: none;
						}
						.text {
							color: #18725D;
						}
					}
					.closeBtn:hover {
						opacity: 0.7;
						.icon {
							color: #fff;
						}
						.text {
							color: #fff;
						}
					}
				}
				.el-date-editor.el-input {
					width: auto;
				}
			}
		}
	}
</style>
