<template>
	<div>
		<div class="breadcrumb-preview">
			<el-breadcrumb :separator="''">
				<el-breadcrumb-item class="item1" to="/"><a>首页</a></el-breadcrumb-item>
				<el-breadcrumb-item class="item2" v-for="(item, index) in breadcrumbItem" :key="index"><a>{{item.name}}</a></el-breadcrumb-item>
			</el-breadcrumb>
		</div>
	
		<div class="news-preview-pv">
			<el-form :inline="true" :model="formSearch" class="list-form-pv">
				<el-form-item class="search-item">
					<el-input v-model="title" placeholder="标题"></el-input>
				</el-form-item>
				<el-button class="search-btn" type="primary" @click="getNewsList(1)">
					<span class="icon iconfont icon-chakan14"></span>
					搜索
				</el-button>
			</el-form>
			
			<!-- category -->
			<div class="category-list">
				<div class="item" @click="categoryClick(0)" :class="categoryIndex == 0 ? 'active' : ''">全部</div>
				<div v-for="(item,index) in categoryList" @click="categoryClick(index+1)" :key="index" class="item" :class="categoryIndex == index+1 ? 'active' : ''">{{item.typename}}</div>
			</div>
			<div v-if="newsList.length" class="list8 index-pv1">
				<div class="list-body-top">
					<div class="list-item1" @click="toNewsDetail(newsList[0])">
						<img :src="baseUrl + newsList[0].picture">
						<div class="infoBox">
							<div class="name">{{newsList[0].title}}</div>
							<div class="desc">{{newsList[0].introduction}}</div>
							<div class="time">{{newsList[0].addtime.split(' ')[0]}}</div>
						</div>
					</div>
					<div class="list-body-right" v-if="newsList.length > 1">
						<div class="list-item" v-for="item,index in newsList" v-if="index > 0 && index < 5" @click="toNewsDetail(item)">
							<div class="time_item">
								<div class="day">{{item.addtime.split(" ")[0].split("-")[2]}}</div>
								<div class="year">{{item.addtime.split(" ")[0].split("-")[0] + '-' + item.addtime.split(" ")[0].split("-")[1]}}</div>
							</div>
							<div class="infoBox">
								<div class="name">{{item.title}}</div>
								<div class="desc">{{item.introduction}}</div>
								<span class="icon iconfont icon-jiantou37"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="list-body" v-if="newsList.length > 4">
					<div class="list-item" v-for="item,index in newsList" v-if="index > 4" @click="toNewsDetail(item)">
						<div class="name">{{item.title}}</div>
						<div class="time">{{item.addtime.split(" ")[0]}}</div>
					</div>
				</div>
			</div>
		
			<el-pagination
				background
				id="pagination" class="pagination"
				:pager-count="7"
				:page-size="pageSize"
				:page-sizes="pageSizes"
				prev-text="上一页"
				next-text="下一页"
				:hide-on-single-page="false"
				:layout='["total","prev","pager","next"].join()'
				:total="total"
				@current-change="curChange"
				@prev-click="prevClick"
				@next-click="nextClick"
				></el-pagination>

			<!-- 热门信息 -->
			<div class="hot">
				<div class="hot-title">热门信息</div>
				<div class="hot-list">
					<div class="hot-item" v-for="item in hotList" :key="item.id" @click="toNewsDetail(item)">
						<img :src="baseUrl + item.picture" alt="">
						<div class="hot-name">{{ item.title }}</div>
						<div class="hot-time">{{item.addtime}}</div>
					</div>
				</div>
			</div>
			<!-- 最新动态 -->
			<div class="news">
				<div class="news-title">最新动态</div>
				<div class="news-list">
					<div class="news-item" v-for="item in recommendList" :key="item.id" @click="toNewsDetail(item)">
						<img :src="baseUrl + item.picture" alt="">
						<div class="news-name">{{ item.title }}</div>
						<div class="news-time">{{item.addtime}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		//数据集合
		data() {
			return {
				baseUrl: this.$config.baseUrl,
				breadcrumbItem: [
				  {
					name: '音乐资讯'
				  }
				],
				newsList: [],
				total: 1,
				pageSize: 10,
				pageSizes: [],
				totalPage: 1,
				layouts: '',
				title: '',
				categoryIndex: 0,
				categoryList: [],
				hotList: [],
				recommendList: [],
			}
		},
		created() {
			this.getCategoryList()
			this.getNewsList(1);
			this.getHotList()
			this.getRecommendList()
		},
		//方法集合
		methods: {
			getCategoryList(){
				this.$http.get('newstype/list', {}).then(res => {
					if (res.data.code == 0) {
						this.categoryList = res.data.data.list
					}
				});
			},
			categoryClick(index) {
				this.categoryIndex = index
				this.getNewsList()
			},
			getNewsList(page) {
				let params = {page, limit: this.pageSize,sort:'addtime',order:'desc'};
				let searchWhere = {};
				if(this.title != '') searchWhere.title = '%' + this.title + '%';
				if(this.categoryIndex!=0){
					searchWhere.typename = this.categoryList[this.categoryIndex - 1].typename
				}
				this.$http.get('news/list', {params: Object.assign(params, searchWhere)}).then(res => {
					if (res.data.code == 0) {
						this.newsList = res.data.data.list;
						this.total = res.data.data.total;
						this.pageSize = Number(res.data.data.pageSize);
						this.totalPage = res.data.data.totalPage;
						if(this.pageSizes.length==0){
							this.pageSizes = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*5];
						}
					}
				});
			},
			getHotList(){
				let params = {page:1, limit: 4,sort:'addtime',order:'desc'};
				this.$http.get('news/autoSort', {params: params}).then(res => {
					if (res.data.code == 0) {
						this.hotList = res.data.data.list;
					}
				});
			},
			getRecommendList(){
				let url = 'news/autoSort'
				if(localStorage.getItem('frontToken')){
					url = 'news/autoSort2'
				}
				let params = {page:1, limit: 4,sort:'addtime',order:'desc'};
				this.$http.get(url, {params: params}).then(res => {
					if (res.data.code == 0) {
						this.recommendList = res.data.data.list;
					}
				});
			},
			curChange(page) {
				this.getNewsList(page);
			},
			prevClick(page) {
				this.getNewsList(page);
			},
			nextClick(page) {
				this.getNewsList(page);
			},
			toNewsDetail(item) {
				this.$router.push({path: '/index/newsDetail', query: {id: item.id}});
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.news-preview-pv {
				padding: 0 16%;
				margin: 10px auto;
				background: none;
				width: 100%;
				position: relative;
				.list-form-pv {
						padding: 10px;
						background: none;
						display: flex;
						width: 100%;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;
						height: auto;
						.search-item {
								margin: 0 10px;
								.el-input {
										width: 100%;
									}
				.el-input /deep/ .el-input__inner {
										border: 1px solid #18725d;
										border-radius: 0px;
										padding: 0 10px;
										margin: 0;
										outline: none;
										color: #333;
										width: auto;
										font-size: 14px;
										line-height: 40px;
										min-width: 300px;
										height: 40px;
									}
			}
			.search-btn {
								cursor: pointer;
								border: 0;
								border-radius: 0px;
								padding: 0px 20px;
								margin: 0 10px 0 0;
								outline: none;
								color: #fff;
								background: #18725d;
								width: auto;
								font-size: 14px;
								line-height: 40px;
								height: 40px;
								.icon {
										margin: 0 10px 0 0;
										color: #fff;
										display: none;
										font-size: 14px;
									}
			}
		}
		.category-list {
						padding: 10px;
						margin: 20px 0 0;
						background: none;
						display: flex;
						width: 100%;
						justify-content: center;
						height: auto;
						.item {
								cursor: pointer;
								border-radius: 10px;
								padding: 10px 24px;
								margin: 0 10px 0 0;
								color: #666;
								background: url(http://codegen.caihongy.cn/20241215/bf1ea49667a94b548a76c23d2c4d574d.png) no-repeat center top / 100% 100%;
								display: flex;
								justify-content: center;
								align-items: center;
								min-width: 120px;
								height: 80px;
							}
			
			.item:hover {
								color: #333;
								background: url(http://codegen.caihongy.cn/20241215/9371cf592ec04bfca08b02ed479510cf.png) no-repeat center top / 100% 100%;
							}
			
			.item.active {
								padding: 10px 24px;
								color: #333;
								background: url(http://codegen.caihongy.cn/20241215/9371cf592ec04bfca08b02ed479510cf.png) no-repeat center top / 100% 100%;
								min-width: 120px;
								height: 80px;
							}
		}
		.list8 {
						padding: 0;
						margin: 20px 0 0;
						background: none;
						width: 100%;
						height: auto;
						.list-body-top {
								display: flex;
								width: 100%;
								height: auto;
								.list-item1 {
										cursor: pointer;
										width: 50%;
										position: relative;
										height: auto;
										img {
												object-fit: cover;
												display: block;
												width: 100%;
												height: 400px;
											}
					.infoBox {
												padding: 10px;
												z-index: 9;
												left: 0;
												bottom: 0;
												background: rgba(0,0,0,.3);
												width: 100%;
												position: absolute;
												.name {
														overflow: hidden;
														color: #fff;
														white-space: nowrap;
														width: 100%;
														font-size: 16px;
														line-height: 32px;
														text-overflow: ellipsis;
													}
						.desc {
														color: #fff;
														font-size: 14px;
														line-height: 1.5;
													}
						.time {
														margin: 5px 0 0;
														color: #fff;
														font-size: 15px;
														line-height: 1.5;
													}
					}
				}
				.list-body-right {
										padding: 0 0 0 20px;
										width: 50%;
										height: auto;
										.list-item {
												cursor: pointer;
												padding: 5px 0;
												display: flex;
												width: 100%;
												justify-content: center;
												align-items: center;
												height: 100px;
												.time_item {
														border: 1px solid #efefef;
														padding: 10px 0;
														margin: 0 20px 0 0;
														flex-direction: column;
														background: url(http://codegen.caihongy.cn/20241222/80e8c63437734a629b388c057d5f8397.png) no-repeat center top / 100% 100%;
														display: flex;
														width: 100px;
														justify-content: center;
														align-items: center;
														height: 100%;
														.day {
																color: #18725d;
																font-size: 20px;
																line-height: 1.5;
															}
							.year {
																color: #18725d;
																font-size: 14px;
																line-height: 1.5;
															}
						}
						.infoBox {
														flex: 1;
														height: 100%;
														.name {
																overflow: hidden;
																color: #333;
																white-space: nowrap;
																font-weight: 600;
																width: 100%;
																font-size: 16px;
																line-height: 30px;
																text-overflow: ellipsis;
															}
							.desc {
																overflow: hidden;
																color: #666;
																font-size: 14px;
																line-height: 24px;
																height: 48px;
															}
							.icon {
																color: #999;
																display: none;
																font-size: 14px;
																line-height: 20px;
																float: right;
															}
						}
					}
				}
			}
			.list-body {
								margin: 20px 0 0 0;
								width: 100%;
								height: auto;
								.list-item {
										cursor: pointer;
										padding: 0 10px;
										display: flex;
										width: 100%;
										border-color: #18725d50;
										border-width: 0 0 1px;
										justify-content: space-between;
										border-style: solid;
										.name {
												overflow: hidden;
												color: #333;
												white-space: nowrap;
												flex: 1;
												font-weight: 600;
												width: 100%;
												font-size: 16px;
												line-height: 30px;
												text-overflow: ellipsis;
											}
					.time {
												color: #999;
												font-size: 14px;
												line-height: 40px;
											}
				}
			}
		}
		.hot {
						box-shadow: 0 0px 0px rgba(0,0,0,.1);
						margin: 20px 0 10px;
						background: none;
						width: 100%;
						height: auto;
						order: 91;
						.hot-title {
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
			.hot-list {
								padding: 20px 0 5px 0;
								background: none;
								display: flex;
								width: 100%;
								justify-content: space-between;
								flex-wrap: wrap;
								height: auto;
								.hot-item {
										cursor: pointer;
										border-radius: 0px;
										padding: 10px;
										margin: 0 0 20px;
										background: linear-gradient( 360deg, #F1F3F2 0%, #D5F6EF 100%);
										width: 23%;
										border-color: #18725d;
										border-width: 0 0 2px;
										border-style: solid;
										height: auto;
										img {
												border-radius: 0px;
												object-fit: cover;
												display: block;
												width: 40%;
												float: left;
												height: 120px;
											}
					.hot-name {
												padding: 0px 10px 0;
												overflow: hidden;
												color: #18725d;
												white-space: nowrap;
												font-weight: 500;
												width: 60%;
												font-size: 16px;
												line-height: 24px;
												text-overflow: ellipsis;
												float: right;
											}
					.hot-time {
												padding: 0 5px;
												color: #999;
												width: 60%;
												font-size: 15px;
												line-height: 24px;
												float: right;
												text-align: right;
											}
				}
			}
		}
		.news {
						box-shadow: 0 0px 0px rgba(0,0,0,.1);
						margin: 0 0 20px;
						background: none;
						width: 100%;
						height: auto;
						order: 92;
						.news-title {
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
			.news-list {
								border-radius: 10px;
								padding: 0px;
								margin: 20px 0 0;
								background: none;
								display: flex;
								width: 100%;
								justify-content: space-between;
								flex-wrap: wrap;
								height: auto;
								.news-item {
										cursor: pointer;
										border-radius: 0px;
										padding: 10px;
										margin: 0 0 20px;
										background: linear-gradient( 360deg, #F1F3F2 0%, #D5F6EF 100%);
										width: 23%;
										border-color: #18725d;
										border-width: 0 0 2px;
										border-style: solid;
										height: auto;
										img {
												border-radius: 0px;
												object-fit: cover;
												display: block;
												width: 100%;
												height: 180px;
											}
					.news-name {
												padding: 0;
												overflow: hidden;
												color: #18725d;
												white-space: nowrap;
												width: 100%;
												font-size: 15px;
												line-height: 2;
												text-overflow: ellipsis;
											}
					.news-time {
												padding: 0;
												color: #999;
												font-size: 15px;
												line-height: 12px;
												text-align: right;
											}
				}
			}
		}
	}
	
	.index-pv1 .animation-box {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
		z-index: initial;
	}
	
	.index-pv1 .animation-box:hover {
				transform: rotate(0deg) scale(1.2) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
	}
	
	.index-pv1 .animation-box img {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
	}
	
	.index-pv1 .animation-box img:hover {
				transform: rotate(0deg) scale(0.8) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
</style>
