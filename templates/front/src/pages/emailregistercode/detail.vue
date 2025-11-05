<template>
	<div>
	<!--  -->
		<div class="breadcrumb-preview">
			<el-breadcrumb :separator="''">
				<el-breadcrumb-item class="item1" to="/"><a>首页</a></el-breadcrumb-item>
				<el-breadcrumb-item class="item2" v-for="(item, index) in breadcrumbItem" :key="index" :to="'/index/emailregistercode?centerType=' + (centerType?'1':'0')"><a>{{item.name}}</a></el-breadcrumb-item>
				<el-breadcrumb-item class="item3"><a href="javascript:void(0);">详情</a></el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="back_box">
			<el-button class="backBtn" size="mini" @click="backClick">
				<span class="icon iconfont icon-jiantou33"></span>
				<span class="text">返回</span>
			</el-button>
		</div>
		<div class="detail-preview">
			<div class="attr">
				<div class="info">
					<div class="title-item">
						<div class="detail-title">
						</div>
					</div>
					<div class="item">
						<div class="lable">邮箱</div>
						<div class="text "  >{{detail.email}}</div>
					</div>
					<div class="item">
						<div class="lable">角色</div>
						<div class="text "  >{{detail.role}}</div>
					</div>
					<div class="item">
						<div class="lable">验证码</div>
						<div class="text "  >{{detail.code}}</div>
					</div>
					<div class="btn_box">
						<el-button class="editBtn" v-if="btnAuth('emailregistercode','修改')" @click="editClick">修改</el-button>
						<el-button class="delBtn" v-if="btnAuth('emailregistercode','删除')" @click="delClick">删除</el-button>
					</div>
				</div>
			</div>
		
			<div class="swiper3" v-if="detailBanner.length">
				<div class="big">
					<img id="big" :src="swiperBigUrl" class="image">
				</div>
				<div class="samll">
					<div class="swiper3-small-item" v-for="item in detailBanner" :key="item.id">
						<img v-if="item.substr(0,4)=='http'" :src="item" @click="swiperClick3(item)" class="image">
						<img v-else :src="baseUrl + item" @click="swiperClick3(baseUrl + item)" class="image">
					</div>
				</div>
			</div>


		

		
			<el-tabs class="detail-tabs" v-model="activeName" type="border-card">
			</el-tabs>

		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Swiper from "swiper";
	export default {
		//数据集合
		data() {
			return {
				tablename: 'emailregistercode',
				baseUrl: '',
				breadcrumbItem: [
					{
						name: '邮箱验证码'
					}
				],
				title: '',
				detailBanner: [],
				userid: localStorage.getItem('frontUserid'),
				id: 0,
				detail: {},
				activeName: 'first',
				total: 1,
				pageSize: 5,
				totalPage: 1,
				buynumber: 1,
				centerType: false,
				swiperBigUrl: null,
			}
		},
		created() {
			if(this.$route.query.centerType&&this.$route.query.centerType!=0) {
				this.centerType = true
			}
			
			this.init();
		},
		mounted() {
		},
		//方法集合
		methods: {
			swiperClick3(src) {
				this.swiperBigUrl = src
			},
			init() {
				this.id = this.$route.query.id
				this.baseUrl = this.$config.baseUrl;
				this.$http.get(this.tablename + '/detail/'  + this.id, {}).then(res => {
					if (res.data.code == 0) {
						this.detail = res.data.data;
						this.$forceUpdate();
						if(localStorage.getItem('frontToken')){
						}

					}
					if (this.detailBanner.length) {
						if (this.detailBanner[0].substr(0,4)=='http') {
							this.swiperBigUrl = this.detailBanner[0]
						} else {
							this.swiperBigUrl = this.baseUrl + this.detailBanner[0]
						}
					}
				});
			},
			curChange(page) {
				this.getDiscussList(page);
			},
			prevClick(page) {
				this.getDiscussList(page);
			},
			nextClick(page) {
				this.getDiscussList(page);
			},
			sizeChange(size){
				this.pageSize = size
				this.getDiscussList(1);
			},
			// 返回按钮
			backClick(){
				let params = {}
				if(this.centerType){
					params.centerType = 1
				}
				this.$router.push({path: '/index/emailregistercode', query: params});
			},
			// 下载
			download(file ){
				if(!file) {
					this.$message({
						type: 'error',
						message: '文件不存在',
						duration: 1500,
					});
					return;
				}
				let arr = file.replace(new RegExp('upload/', "g"), "")
				axios.get(this.baseUrl + '/file/download?fileName=' + arr, {
					headers: {
						token: localStorage.getItem("frontToken")
					},
					responseType: "blob"
				}).then(({
					data
				}) => {
					const binaryData = [];
					binaryData.push(data);
					const objectUrl = window.URL.createObjectURL(new Blob(binaryData, {
						type: 'application/pdf;chartset=UTF-8'
					}))
					const a = document.createElement('a')
					a.href = objectUrl
					a.download = arr
					// a.click()
					// 下面这个写法兼容火狐
					a.dispatchEvent(new MouseEvent('click', {
						bubbles: true,
						cancelable: true,
						view: window
					}))
					window.URL.revokeObjectURL(data)
				},err=>{
					axios.get((location.href.split(this.$config.name).length>1 ? location.href.split(this.$config.name)[0] :'') + this.$config.name + '/file/download?fileName=' + arr, {
						headers: {
							token: localStorage.getItem("frontToken")
						},
						responseType: "blob"
					}).then(({
						data
					}) => {
						const binaryData = [];
						binaryData.push(data);
						const objectUrl = window.URL.createObjectURL(new Blob(binaryData, {
							type: 'application/pdf;chartset=UTF-8'
						}))
						const a = document.createElement('a')
						a.href = objectUrl
						a.download = arr
						// a.click()
						// 下面这个写法兼容火狐
						a.dispatchEvent(new MouseEvent('click', {
							bubbles: true,
							cancelable: true,
							view: window
						}))
						window.URL.revokeObjectURL(data)
					})
				})
			},


			// 权限判断
			btnAuth(tableName,key){
				if(this.centerType){
					return this.isBackAuth(tableName,key)
				}else{
					return this.isAuth(tableName,key)
				}
			},
			// 修改
			editClick(){
				this.$router.push(`/index/emailregistercodeAdd?type=edit&&id=${this.detail.id}`);
			},
			// 删除
			async delClick(){
				await this.$confirm('是否删除此邮箱验证码？') .then(_ => {
					this.$http.post('emailregistercode/delete', [this.detail.id]).then(async res => {
						if (res.data.code == 0) {
							this.$message({
								type: 'success',
								message: '删除成功!',
								duration: 1500,
								onClose: () => {
									history.back()
								}
							});
						}
					});
				}).catch(_ => {});
			},
		},
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.detail-preview {
		padding: 0 16%;
		margin: 0px auto;
		display: flex;
		width: 100%;
		position: relative;
		flex-wrap: wrap;
		.attr {
			padding: 0 10px;
			background: #ffffff;
			flex: 1;
			display: flex;
			width: 50%;
			position: relative;
			order: 2;
			.info {
				padding: 10px;
				margin: 0 0 0 10px;
				background: none;
				flex: 1;
				.title-item {
					padding: 10px;
					margin: 0 0 10px 0;
					background: none;
					display: flex;
					justify-content: space-between;
					align-items: center;
					.detail-title {
						color: #000;
						font-weight: bold;
						font-size: 22px;
					}
				}
				.item {
					padding: 8px 10px;
					margin: 0;
					background: none;
					display: flex;
					border-color: #157ED250;
					border-width: 0 0 0px;
					justify-content: spaceBetween;
					border-style: solid;
					.lable {
						padding: 0 10px 0 0;
						color: #9E9E9E;
						white-space: nowrap;
						font-weight: 500;
						width: auto;
						font-size: 15px;
						line-height: 24px;
						text-align: left;
					}
					.text {
						padding: 0 10px;
						color: #000;
						word-break: break-word;
						flex: 1;
						font-size: 15px;
						line-height: 24px;
						height: auto;
					}
					.price {
						color: #f00;
					}
					.bold {
						font-weight: bold;
					}
					.link {
						cursor: pointer;
						text-decoration: underline;
					}
				}
				.btn_box {
					padding: 10px 0;
					display: flex;
					align-items: center;
					flex-wrap: wrap;
				}
				.editBtn {
					border: 0;
					cursor: pointer;
					border-radius: 4px;
					padding: 0 10px;
					margin: 0 5px 0 0;
					outline: none;
					color: #fff;
					background: #157ED2;
					width: auto;
					font-size: 14px;
					line-height: 30px;
					height: 30px;
				}
				.editBtn:hover {
					opacity: 0.8;
				}
				.delBtn {
					border: 0;
					cursor: pointer;
					border-radius: 4px;
					padding: 0 10px;
					margin: 0 5px 0 0;
					outline: none;
					color: #fff;
					background: #D90000;
					width: auto;
					font-size: 14px;
					line-height: 30px;
					height: 30px;
				}
				.delBtn:hover {
					opacity: 0.8;
				}
			}
		}
		.swiper3 {
			background: #ffffff;
			width: 50%;
			height: auto;
			order: 1;
			.big {
				margin: 0 0 20px;
				background: none;
				width: 100%;
				height: 500px;
				img {
					border-radius: 10px;
					box-shadow: 0 0px 0px rgba(0,0,0,.3);
					object-fit: cover;
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.samll {
				padding: 0 5px;
				background: none;
				display: flex;
				width: 100%;
				height: 100px;
				.swiper3-small-item {
					margin: 0 5px;
					flex: 1;
					height: 100%;
					img {
						border-radius: 10px;
						object-fit: cover;
						display: block;
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.detail-tabs {
			border: 0px solid #DCDFE6;
			border-radius: 10px;
			box-shadow: inset 0px 4px 10px 0px rgba(0,0,0,0.3);
			padding: 0 0 20px;
			margin: 20px auto ;
			background: #FFF;
			width: 100%;
			order: 20;
			& /deep/ .el-tabs__header .el-tabs__nav-wrap {
				margin-bottom: 0;
			}
			/deep/ .el-tabs__header {
				border: none;
				border-radius: 10px;
				padding: 10px;
				box-shadow: inset 0px 2px 5px 0px #082E25;
				margin: 0;
				background: #EBFFF9;
				display: block;
				width: 100%;
				border-color: #E4E7ED;
				border-width: 0;
				border-style: solid;
			}
			
			/deep/ .el-tabs__header .el-tabs__item {
				cursor: pointer;
				border: 0;
				padding: 0px 24px;
				margin: 0 10px 0 0;
				color: #666;
				display: inline-block;
				line-height: 60px;
				border-radius: 10px;
				box-shadow: none;
				background: url(http://codegen.caihongy.cn/20241215/bf1ea49667a94b548a76c23d2c4d574d.png) no-repeat center top / 100% 100%;
				text-align: center;
				min-width: 120px;
				height: 60px;
			}
			
			/deep/ .el-tabs__header .el-tabs__item:hover {
				color: #333;
				background: url(http://codegen.caihongy.cn/20241215/9371cf592ec04bfca08b02ed479510cf.png) no-repeat center top / 100% 100%;
			}
			
			/deep/ .el-tabs__header .el-tabs__item.is-active {
				border: 0;
				padding: 0px 24px;
				box-shadow: none;
				margin: 0 10px 0 0;
				color: #333;
				background: url(http://codegen.caihongy.cn/20241215/9371cf592ec04bfca08b02ed479510cf.png) no-repeat center top / 100% 100%;
				display: inline-block;
				line-height: 60px;
				text-align: center;
				min-width: 120px;
				height: 60px;
			}
			
			/deep/ .el-tabs__content {
				padding: 15px;
				background: none;
				width: calc(100% - 0px);
				height: 100%;
			}
		}
	}
</style>
