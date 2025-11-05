<template>
	<div class="main-containers">
		<div class="body-containers">
			<div class="top-container">
				<!-- info -->
				<div class="top_title">
					<span @click="goMenu('/index/home')">基于python的音乐界面设计与实现</span>
				</div>
			

				<img class="top_avatar1" v-if="headportrait&&Token" :src="headportrait?baseUrl + headportrait:require('@/assets/avator.png')">
				<div class="top_nickname1" v-if="Token">{{username}}</div>
				<el-button v-if="Token && notAdmin" class="btn-user" @click="goMenu('/index/center')">
					<span class="icon iconfont icon-geren16"></span>
					个人中心
				</el-button>
				<el-button v-if="!Token" class="btn-login" @click="toLogin">
					<span class="icon iconfont icon-geren16"></span>
					登录
				</el-button>
				<el-button v-if="Token" class="btn-register" @click="logout">
					<span class="icon iconfont icon-guanbi19"></span>
					退出
				</el-button>
			</div>

			<div class="menu-preview">
				<el-scrollbar wrap-class="scrollbar-wrapper">
					<div class="userinfo">
						<el-image v-if="headportrait&&Token" :src="headportrait?baseUrl + headportrait:require('@/assets/avator.png')" fit="cover"></el-image>
						<div class="nickname">{{username}}</div>
					</div>
					<el-menu class="el-menu-vertical-demo" :default-active="activeMenu" :unique-opened="true" mode="vertical" :router="true" @select="handleSelect">
						<el-menu-item class="home" index="/index/home" @click.native="goMenu('/index/home')">
							<span class="icon iconfont icon-shouye-zhihui"></span>
							<span>系统首页</span>
						</el-menu-item>
						<el-menu-item class="item" v-for="(menu, index) in menuList" :index="menu.url" :key="index" @click.native="goMenu(menu.url)">
							<i :class="iconArr[index]"></i>
							<span>{{menu.name}}</span>
						</el-menu-item>
						<el-menu-item class="user" index="/index/center" v-if="Token && notAdmin" @click.native="goMenu('/index/center')">
							<span class="icon iconfont icon-shouye-zhihui"></span>
							<span>个人中心</span>
						</el-menu-item>
					</el-menu>
				</el-scrollbar>
			</div>


			<div class="banner-preview" v-if="carouselChange()">
				<el-carousel trigger="click" indicator-position="inside" arrow="always" type="default" direction="horizontal" height="450px" :autoplay="true" :interval="3000" :loop="true">
					<el-carousel-item v-for="item in carouselList" :key="item.id">
						<el-image v-if="preHttp(item.value)" @click="carouselClick(item.url)" :src="item.value" fit="cover"></el-image>
						<el-image v-else @click="carouselClick(item.url)" :src="baseUrl + item.value" fit="cover"></el-image>
						<div class="banner-hidden">
						</div>
					</el-carousel-item>
				</el-carousel>
			</div>
			<router-view id="scrollView"></router-view>
			
			<div class="bottom-preview">
				<div class="footer"><div v-html="bottomContent"></div></div>
			</div>
		</div>
		
		<div class="audioAnimation-box" :class="showType?'audioAnimation-box1':''" v-if="audio.length"
			:style="{'transform':audio[audioIndex].lrc&&audio[audioIndex].lrc!=''?'rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 98px, 0px)':'rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 68px, 0px)'}"
			style="width: 100%;position: fixed;bottom: 0;left: 0;z-index: 99999;" @mouseover="showmouseover">
			<div @click="suoClick"
				style="position: absolute;top: -20px;right: 40%;background: #fff;border-radius: 50% 50% 0 0;font-size: 0;width: 30px;height: 30px;display: flex;justify-content: center;align-items: center;cursor: pointer;">
				<img v-if="suoType" style="width: 20px;height: 20px;" src="../assets/suo.png">
				<img v-else style="width: 20px;height: 20px;" src="../assets/jiesuo.png">
			</div>
			<aplayer :float="true" :volume="1" repeat="repeat-all" ref="aplayer" id="aplayer" :music="audio[audioIndex]"
				:list="audio" :showlrc="audio[audioIndex].lrc&&audio[audioIndex].lrc!=''?true:false" :listFolded="true" :autoplay="true" listMaxHeight="180px" :lrcType="1"></aplayer>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Swiper from "swiper";
	import axios from 'axios'
export default {
	data() {
		return {
			activeIndex: '0',
			baseUrl: '',
			carouselList: [],
			carouselForm: {
				inHome: true,
				inOther: true,
			},
			menuList: [],
			headportrait: localStorage.getItem('frontHeadportrait')?localStorage.getItem('frontHeadportrait'):'',
			Token: localStorage.getItem('frontToken'),
			username: localStorage.getItem('username'),
			notAdmin: localStorage.getItem('frontSessionTable')!='"users"',
			iconArr: [
				'el-icon-star-off',
				'el-icon-goods',
				'el-icon-warning',
				'el-icon-question',
				'el-icon-info',
				'el-icon-help',
				'el-icon-picture-outline-round',
				'el-icon-camera-solid',
				'el-icon-video-camera-solid',
				'el-icon-video-camera',
				'el-icon-bell',
				'el-icon-s-cooperation',
				'el-icon-s-order',
				'el-icon-s-platform',
				'el-icon-s-operation',
				'el-icon-s-promotion',
				'el-icon-s-release',
				'el-icon-s-ticket',
				'el-icon-s-management',
				'el-icon-s-open',
				'el-icon-s-shop',
				'el-icon-s-marketing',
				'el-icon-s-flag',
				'el-icon-s-comment',
				'el-icon-s-finance',
				'el-icon-s-claim',
				'el-icon-s-opportunity',
				'el-icon-s-data',
				'el-icon-s-check'
			],
			bottomContent: '',
			musicType: false,
			showTimer: null,
			showType: false,
			suoType:false,
			showType4: -1,
		}
	},
	async created() {
		this.baseUrl = this.$config.baseUrl;
		this.menuList = this.$config.indexNav;
		this.getCarousel();
		if(localStorage.getItem('frontToken') && localStorage.getItem('frontToken')!=null) {
			this.getSession()
		}
	},
	mounted() {
		this.activeIndex = localStorage.getItem('keyPath') || '0';
		this.musicType = localStorage.getItem('musicType') ? true : false;



	},
	computed: {
		activeMenu() {
			const route = this.$route
			const {
				meta,
				path
			} = route
			// if st path, the sidebar will highlight the path you sete
			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path
		},
		audioIndex: {
			get() {
				return this.$store.state.app.audioIndex
			},
			set(val) {
				return this.$store.state.app.audioIndex = val
			}
		},
		audio: {
			get() {
				return this.$store.state.app.audio
			},
			set(val) {
				return this.$store.state.app.audio = val
			}
		},
	},
	watch: {
		$route(newValue) {
			let that = this
			let url = window.location.href
			let arr = url.split('#')
			for (let x in this.menuList) {
				if (newValue.path == this.menuList[x].url) {
					this.activeIndex = x
				}
			}
			this.Token = localStorage.getItem('frontToken')
			if(arr[1]!='/index/home'){
				var element = document.getElementById('scrollView');
				var distance = element.offsetTop;
				window.scrollTo( 0, distance )
			}else{
				window.scrollTo( 0, 0 )
			}
		},
		headportrait(){
			this.$forceUpdate()
		},
		audio(newValue) {
			this.audioIndex = this.$store.state.app.audioIndex
		},
		audioIndex() {
			this.showmouseover()
			this.$nextTick(() => {
				this.$refs.aplayer.play()
			})
			this.$forceUpdate()
		},
	},
	methods: {
		preHttp(str) {
			return str && str.substr(0,4)=='http';
		},

		async getSession() {
			await this.$http.get(`${localStorage.getItem('UserTableName')}/session`, {emulateJSON: true}).then(async res => {
				if (res.data.code == 0) {
					localStorage.setItem('sessionForm',JSON.stringify(res.data.data))
					localStorage.setItem('frontUserid', res.data.data.id);
					if(res.data.data.vip) {
						localStorage.setItem('vip', res.data.data.vip);
					}
					if(res.data.data.touxiang) {
						this.headportrait = res.data.data.touxiang
						localStorage.setItem('frontHeadportrait', res.data.data.touxiang);
					} else if(res.data.data.headportrait) {
						this.headportrait = res.data.data.headportrait
						localStorage.setItem('frontHeadportrait', res.data.data.headportrait);
					}
				}
			});
		},
		handleSelect(keyPath) {
			if (keyPath) {
				localStorage.setItem('keyPath', keyPath)
			}
		},
		toLogin() {
		  this.$router.push('/login');
		},
		logout() {
			localStorage.clear();
			Vue.http.headers.common['Token'] = "";
			this.$router.push('/index/home');
			this.activeIndex = '0'
			localStorage.setItem('keyPath', this.activeIndex)
			this.Token = ''
			this.$forceUpdate()
			this.$message({
				message: '登出成功',
				type: 'success',
				duration: 1000,
			});
		},
		getCarousel() {
			this.$http.get('config/list', {params: { page: 1, limit: 3 }}).then(res => {
				if (res.data.code == 0) {
					this.carouselList = res.data.data.list;
				}
			});
		},
		// 轮播图跳转
		carouselClick(url) {
			if (url) {
				if (url.indexOf('https') != -1) {
					window.open(url)
				} else {
					this.$router.push(url)
				}
			}
		},
		carouselChange(){
			let url = window.location.href
			let arr = url.split('#')
			return (this.carouselForm.inHome&&arr[1]=='/index/home')||(this.carouselForm.inOther&&arr[1]!='/index/home')
		},
		goBackend() {
			localStorage.setItem('Token', localStorage.getItem('frontToken'));
			localStorage.setItem('role', localStorage.getItem('frontRole'));
			localStorage.setItem('sessionTable', localStorage.getItem('frontSessionTable'));
			localStorage.setItem('headportrait', localStorage.getItem('frontHeadportrait'));
			localStorage.setItem('userid', localStorage.getItem('frontUserid'));
			window.location.href = `${this.$config.baseUrl}admin/dist/index.html`
			
		},
		menuShowClick4(index){
			this.showType4 = index
		},
		goMenu(path) {
			this.$router.push(path);
		},
		suoClick(){
			this.suoType = !this.suoType
			if(this.suoType){
				clearTimeout(this.showTimer)
			}else{
				this.showmouseover()
			}
		},
		showmouseover() {
			if(this.suoType){
				return false
			}
			let that = this
			clearTimeout(this.showTimer)
			this.showType = true
			this.showTimer = setTimeout(() => {
				that.$refs.aplayer.showList = false;
				that.showType = false

			}, 6000)
		},
	}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.main-containers {
		.body-containers {
			padding: 0px 0 0;
			margin: 0 0 0 0;
			background: #f7ffff;
			display: block;
			min-height: 100vh;
			position: relative;
			.top-container {
				padding: 0 16%;
				z-index: 1002;
				display: flex;
				border-color: #9cd6c9;
				box-shadow: 0 0px 0px rgba(64, 158, 255, .3);
				top: 0;
				left: 0;
				background: #18725d;
				width: 100%;
				justify-content: flex-end;
				border-width: 0 0 120px;
				align-items: center;
				position: relative;
				border-style: solid;
				height: auto;
				.top_title {
					left: 16%;
					bottom: -120px;
					display: block;
					position: absolute;
					span {
						padding: 0;
						color: #18725d;
						font-weight: 500;
						font-size: 26px;
						line-height: 120px;
						float: left;
					}
				}
				.top_avatar1 {
					border-radius: 50%;
					margin: 0 12px;
					display: none;
					width: 40px;
					height: 40px;
				}
				.top_nickname1 {
					padding: 0 0px;
					margin: 0 20px 0 0;
					color: #fff;
					font-size: 14px;
					line-height: 40px;
					height: 40px;
					order: 3;
				}
				.btn-user {
					border: 0;
					padding: 0 0px;
					margin: 0 20px 0 0;
					color: #fff;
					background: none;
					width: auto;
					font-size: 14px;
					line-height: 40px;
					height: 40px;
					order: 4;
					.icon {
						color: inherit;
						display: none;
						font-size: 14px;
					}
				}
				.btn-user:hover {
					opacity: 0.5;
				}
				.btn-login {
					border: 0;
					padding: 0 15px;
					margin: 0 0px;
					color: #fff;
					background: none;
					bottom: -80px;
					width: auto;
					font-size: 16px;
					line-height: 44px;
					position: absolute;
					right: 16%;
					height: 44px;
					.icon {
						color: inherit;
						font-size: 16px;
					}
				}
				.btn-login:hover {
					opacity: 0.5;
				}
				.btn-register {
					border: 0;
					padding: 0 15px;
					margin: 0 0px;
					color: #fff;
					background: none;
					bottom: -80px;
					width: auto;
					font-size: 16px;
					line-height: 44px;
					position: absolute;
					right: 16%;
					height: 44px;
					.icon {
						color: inherit;
						font-size: 16px;
					}
				}
				.btn-register:hover {
					opacity: 0.5;
				}
			}
			.menu-preview {
				.el-scrollbar {
					height: 100%;
			  
					& /deep/ .scrollbar-wrapper-vertical {
						overflow-x: hidden;
					}
			  
					& /deep/ .scrollbar-wrapper-horizontal {
						overflow-y: hidden;
			  
						.el-scrollbar__view {
							white-space: nowrap;
						}
					}
				}
				// 菜单盒子
				border-radius: 10px;
				padding: 0;
				box-shadow: 0px 0 0px  rgba(64, 158, 255, .3);
				z-index: 1001;
				overflow: hidden;
				top: 180px;
				background: #fff;
				width: 200px;
				font-size: 0px;
				position: absolute;
				right: 16%;
				height: 450px;
				.userinfo {
					padding: 20px;
					display: none;
					width: 100%;
					height: auto;
					.el-image {
						border-radius: 20px;
						object-fit: cover;
						display: block;
						width: 100%;
						height: 130px;
					}
					.nickname {
						color: #fff;
						font-size: 24px;
						line-height: 1.5;
						text-align: center;
					}
				}
				.el-menu-vertical-demo {
					border: 0;
					padding: 0;
					margin: 0;
					background: #fff;
					position: relative;
					list-style: none;
					// 首页
					.el-menu-item.home {
						cursor: pointer;
						padding: 0 15px;
						color: #575B66;
						white-space: nowrap;
						display: flex;
						font-size: 14px;
						border-color: #D8D8D8;
						line-height: 56px;
						background: #fff;
						border-width: 0 0 1px;
						align-items: center;
						position: relative;
						border-style: solid;
						list-style: none;
						height: 56px;
						span:nth-child(1) {
							padding: 0 10px;
							margin: 0;
							color: inherit;
							width: 14px;
							font-size: 14px;
							line-height: 56px;
							height: 56px;
						}
						span:nth-child(2) {
							padding: 0 10px;
							color: inherit;
							font-size: 14px;
							line-height: 56px;
							height: 56px;
						}
					}
					.el-menu-item.home:hover {
						color: #9cd6c9;
						background: #18725d;
						border-color: #D8D8D8;
						border-width: 0 0 1px;
						border-style: solid;
					}
					.el-menu-item.home.is-active {
						color: #9cd6c9;
						background: #18725d;
						border-color: #D8D8D8;
						border-width: 0 0 1px;
						border-style: solid;
					}
					// 其他盒子
					.el-menu-item.item {
						cursor: pointer;
						padding: 0 15px;
						color: #575B66;
						white-space: nowrap;
						display: flex;
						font-size: 14px;
						border-color: #D8D8D8;
						line-height: 56px;
						background: #fff;
						border-width: 0 0 1px;
						align-items: center;
						position: relative;
						border-style: solid;
						list-style: none;
						height: 56px;
						span:nth-child(1) {
							padding: 0 10px;
							margin: 0;
							color: inherit;
							width: 14px;
							font-size: 14px;
							line-height: 56px;
							height: 56px;
						}
						span:nth-child(2) {
							padding: 0 10px;
							color: inherit;
							font-size: 14px;
							line-height: 56px;
							height: 56px;
						}
					}
					
					.el-menu-item.item:hover {
						color: #9cd6c9;
						background: #18725d;
						border-color: #D8D8D8;
						border-width: 0 0 1px;
						border-style: solid;
					}
					
					.el-menu-item.item.is-active {
						color: #9cd6c9;
						background: #18725d;
						border-color: #D8D8D8;
						border-width: 0 0 1px;
						border-style: solid;
					}
					// 个人中心
					.el-menu-item.user {
						cursor: pointer;
						padding: 0 20px;
						color: #333;
						white-space: nowrap;
						background: #fff;
						display: none;
						font-size: 14px;
						line-height: 56px;
						align-items: center;
						position: relative;
						list-style: none;
						height: 56px;
						span:nth-child(1) {
							padding: 0 10px;
							margin: 0;
							color: inherit;
							width: 14px;
							font-size: 14px;
							line-height: 56px;
							height: 56px;
						}
						span:nth-child(2) {
							padding: 0 10px;
							color: inherit;
							font-size: 14px;
							line-height: 56px;
							height: 56px;
						}
					}
					.el-menu-item.user:hover {
						color: #fff;
						background: blue;
					}
					.el-menu-item.user.is-active {
						color: #fff;
						background: yellow;
					}
				}
			}
			.banner-preview {
				padding: 0 16%;
				margin: 20px 0 0;
				width: 100%;
				height: auto;
				.el-carousel {
					margin: 0 auto 0 0;
					width: calc(100% - 210px);
					/deep/ .el-carousel__item {
						border-radius: 10px;
						width: 100%;
						height: 100%;
						@keyframes wave1 {from { left: -236px } to { left: -1233px }}
						@keyframes wave2 {from { left: 0 } to { left: -1009px }}
						.el-image {
							object-fit: cover;
							width: 100%;
							height: 100%;
						}
					}
					/deep/ .el-carousel__container .el-carousel__arrow--left {
						width: 36px;
						font-size: 12px;
						height: 36px;
					}
					/deep/ .el-carousel__container .el-carousel__arrow--left:hover {
						background: #18725d;
					}
					/deep/ .el-carousel__container .el-carousel__arrow--right {
						width: 36px;
						font-size: 12px;
						height: 36px;
					}
					/deep/ .el-carousel__container .el-carousel__arrow--right:hover {
						background: #18725d;
					}
					/deep/ .el-carousel__indicators {
						padding: 0;
						margin: 0 0 10px;
						z-index: 2;
						position: absolute;
						list-style: none;
						li {
							border-radius: 12px;
							padding: 0;
							margin: 0 4px;
							background: #fff;
							display: inline-block;
							width: 12px;
							opacity: 0.4;
							transition: 0.3s;
							height: 12px;
						}
						li:hover {
							border-radius: 12px;
							padding: 0;
							margin: 0 4px;
							background: #18725d;
							display: inline-block;
							width: 12px;
							opacity: 0.7;
							height: 12px;
						}
						li.is-active {
							border-radius: 12px;
							padding: 0;
							margin: 0 4px;
							background: #18725d;
							display: inline-block;
							width: 12px;
							opacity: 1;
							height: 12px;
						}
					}
					/deep/ .el-carousel__indicator button {
						width: 0;
						height: 0;
						display: none;
					}
				}
			}
			.bottom-preview {
				width: 100%;
				height: auto;
				.footer {
					padding: 20px 16%;
					overflow: hidden;
					color: #fff;
					background: #0b342a;
					width: 100%;
					height: auto;
				}
			}
		}
	}
	.audioAnimation-box {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 68px, 0px);
		-webkit-perspective: 1000px;
		perspective: 1000px;
		transition: 0.3s;
	}

	.audioAnimation-box1 {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0, 0px) !important;
	}
</style>
