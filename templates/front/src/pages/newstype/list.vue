<template>
	<div>
		<div class="breadcrumb-preview">
			<el-breadcrumb :separator="''">
				<el-breadcrumb-item class="item1" to="/"><a>首页</a></el-breadcrumb-item>
				<el-breadcrumb-item class="item2" v-for="(item, index) in breadcrumbItem" :key="index"><a>{{item.name}}</a></el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div v-if="centerType" class="back_box">
			<el-button class="backBtn" size="mini" @click="backClick">
				<span class="icon iconfont icon-jiantou33"></span>
				<span class="text">返回</span>
			</el-button>
		</div>
		<div class="list-preview">
			<el-form :inline="true" :model="formSearch" class="list-form-pv">
				<el-form-item class="list-item">
					<div class="lable">分类名称：</div>
					<el-input v-model="formSearch.typename" placeholder="分类名称" @keydown.enter.native="getList(1, curFenlei)" clearable></el-input>
				</el-form-item>
				<el-button class="list-search-btn" v-if=" true " type="primary" @click="getList(1, curFenlei)">
					查询
				</el-button>
				<el-button class="list-add-btn" v-if="btnAuth('newstype','新增')" type="primary" @click="add('/index/newstypeAdd')">
					添加
				</el-button>
			</el-form>
			<div class="select2">
				<div class="select2-list" v-for="(item,index) in selectOptionsList" :key="item">
					<div class="label">{{item.name}}：</div>
					<div class="item-body">
						<div class="item" @click="selectClick2(item,-1)" :class="item.check ==-1 ? 'active' : ''">全部</div>
						<div class="item" @click="selectClick2(item,index1)" :class="item.check == index1 ? 'active' : ''" v-for="item1,index1 in item.list" :key="item1">{{item1}}</div>
					</div>
				</div>
			</div>
			<div class="list">
				<div class="list6">
					<div v-for="(item,index) in dataList" :key="index" :class="'list-item' + ((index%2) + 1)" @click.stop="toDetail(item)">
						<div class="imgbox">
						</div>
						<div class="infoBox">
							<div class="centerInfo">
							</div>
							<div class="bottomInfo">
								<div class="time_item">
									<span class="icon iconfont" :class="index%2==0?'icon-shijian21':'icon-shijian21'"></span>
									<span class="label">{{index%2==0?'发布时间：':'发布时间：'}}</span>
									<span class="text">{{index%2==0? item.addtime.split(' ')[0]: item.addtime.split(' ')[0]}}</span>
								</div>
								<div class="more_btn" @click.stop="toDetail(item)">
									<span class="text">{{index%2==0?'查看详情':'查看更多'}}</span>
									<span class="icon iconfont" :class="index%2==0?'icon-jiantou25':'icon-jiantou25'"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

	
			<el-pagination
				background
				id="pagination"
				class="pagination"
				:pager-count="7"
				:page-size="pageSize"
				prev-text="上一页"
				next-text="下一页"
				:hide-on-single-page="false"
				:layout='["total","prev","pager","next"].join()'
				:total="total"
				:page-sizes="pageSizes"
				@current-change="curChange"
				@size-change="sizeChange"
				@prev-click="prevClick"
				@next-click="nextClick"
				></el-pagination>
		</div>
		<el-dialog title="预览图" :visible.sync="previewVisible" width="50%">
			<img :src="previewImg" alt="" style="width: 100%;">
		</el-dialog>
	</div>
</template>
<script>
	export default {
		//数据集合
		data() {
			return {
				selectIndex2: 0,
				selectOptionsList: [],
				layouts: '',
				swiperIndex: -1,
				baseUrl: '',
				breadcrumbItem: [
					{
						name: '音乐资讯分类'
					}
				],
				formSearch: {
					typename: '',
				},
				fenlei: [],
				feileiColumn: '',
				dataList: [],
				total: 1,
				pageSize: 10,
				pageSizes: [],
				totalPage: 1,
				curFenlei: '全部',
				isPlain: false,
				indexQueryCondition: '',
				timeRange: [],
				centerType:false,
				previewImg: '',
				previewVisible: false,
				sortType: 'id',
				sortOrder: 'desc',
			}
		},
		async created() {
			if(this.$route.query.centerType&&this.$route.query.centerType!=0){
				this.centerType = true
			}
			this.baseUrl = this.$config.baseUrl;
			await this.getFenlei();
			this.getList(1, '全部');
		},
		watch:{
			$route(newValue){
				this.getList(1, newValue.query.homeFenlei);
			}
		},
		//方法集合
		methods: {
			selectClick2(row,index) {
				row.check = index
				if(index == -1){
					this.formSearch[row.tableName] = ''
				}else {
					this.formSearch[row.tableName] = row.list[index]
				}
				this.getList()
			},
			add(path) {
				let query = {}
				if(this.centerType){
					query.centerType = 1
				}
				this.$router.push({path: path,query:query});
			},
			async getFenlei() {
			},
			getList(page, fenlei, ref = '') {
				let params = {
					page,
					limit: this.pageSize,
				};
				let searchWhere = {};
				if (this.formSearch.typename != '') searchWhere.typename = '%' + this.formSearch.typename + '%';
				let user = JSON.parse(localStorage.getItem('sessionForm'))
				if (this.sortType) searchWhere.sort = this.sortType
				if (this.sortOrder) searchWhere.order = this.sortOrder
				this.$http.get(`newstype/${this.centerType?'page':'list'}`, {params: Object.assign(params, searchWhere)}).then(res => {
					if (res.data.code == 0) {
						this.dataList = res.data.data.list;
						this.total = Number(res.data.data.total);
						this.pageSize = Number(res.data.data.pageSize);
						this.totalPage = res.data.data.totalPage;
						if(this.pageSizes.length==0){
							this.pageSizes = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*5];
						}
					}
				});
			},
			sortClick(type){
				if(this.sortType==type){
					if(this.sortOrder == 'desc'){
						this.sortOrder = 'asc'
					}else{
						this.sortOrder = 'desc'
					}
				}else{
					this.sortType = type
					this.sortOrder = 'desc'
				}
				this.getList(1, '全部')
			},
			curChange(page) {
				this.getList(page);
			},
			prevClick(page) {
				this.getList(page);
			},
			sizeChange(size){
				this.pageSize = size
				this.getList(1);
			},
			nextClick(page) {
				this.getList(page);
			},
			imgPreView(url){
				this.previewImg = url
				this.previewVisible = true
			},
			toDetail(item) {
				let params = {
					id: item.id
				}
				if(this.centerType){
					params.centerType = 1
				}
				this.$router.push({path: '/index/newstypeDetail', query: params});
			},
			btnAuth(tableName,key){
				if(this.centerType){
					return this.isBackAuth(tableName,key)
				}else{
					return this.isAuth(tableName,key)
				}
			},
			backClick() {
				this.$router.push({path: '/index/center'});
			},
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.list-preview {
		padding: 0 16%;
		margin: 10px auto;
		background: none;
		display: flex;
		width: 100%;
		position: relative;
		flex-wrap: wrap;
		.list-form-pv {
			padding: 10px;
			background: none;
			display: flex;
			width: 100%;
			align-items: center;
			flex-wrap: wrap;
			height: auto;
			order: 1;
			.list-item {
				margin: 0 10px 10px 0;
				/deep/.el-form-item__content {
					display: flex;
				}
				.lable {
					padding: 0 5px 0 0;
					white-space: nowrap;
					display: inline-block;
					width: auto;
					font-size: 14px;
					line-height: 42px;
				}
				.el-input {
					width: 100%;
				}
				.datetimerange {
					border: 1px solid #eee;
					border-radius: 4px;
					padding: 3px 10px;
					outline: none;
					background: #fff;
					width: 100%;
					justify-content: center;
				}
				.el-input /deep/ .el-input__inner {
					border: 1px solid #eee;
					border-radius: 4px;
					padding: 0 10px;
					margin: 0;
					outline: none;
					color: #333;
					width: 100%;
					font-size: 14px;
					line-height: 42px;
					height: 42px;
				}
				.el-select {
					width: 100%;
				}
				.el-select /deep/ .el-input__inner {
				}
				.el-date-editor {
					width: 100%;
				}
				.el-date-editor /deep/ .el-input__inner {
					border: 1px solid #eee;
					border-radius: 4px;
					padding: 0 30px;
					margin: 0;
					outline: none;
					color: #333;
					width: 100%;
					font-size: 14px;
					line-height: 42px;
					height: 42px;
				}
			}
			.list-search-btn {
				cursor: pointer;
				border: 0;
				border-radius: 4px;
				padding: 0px 20px;
				margin: 0 10px 0 0;
				outline: none;
				color: #fff;
				background: #18725d;
				width: auto;
				font-size: 14px;
				line-height: 42px;
				height: 42px;
				i {
					margin: 0 10px 0 0;
					color: #fff;
					font-size: 14px;
				}
			}
			.list-add-btn {
				cursor: pointer;
				border: 0;
				border-radius: 4px;
				padding: 0px 20px;
				margin: 0 10px 0 0;
				outline: none;
				color: #fff;
				background: #435a54;
				width: auto;
				font-size: 14px;
				line-height: 42px;
				height: 42px;
				i {
					margin: 0 10px 0 0;
					color: #fff;
					font-size: 14px;
				}
			}
		}
		.select2 {
			border: 1px solid #eee;
			border-radius: 4px;
			padding:  10px 10px 0;
			background: #fff;
			width: 100%;
			height: auto;
			order: 2;
			.select2-list {
				padding: 0 0 10px 52px;
				margin: 0 0 10px;
				background: none;
				display: flex;
				width: 100%;
				border-color: #eee;
				border-width: 0 0 1px;
				align-items: center;
				position: relative;
				border-style: solid;
				flex-wrap: wrap;
				height: auto;
				.label {
					padding: 0 5px;
					color: #999;
					white-space: nowrap;
					display: inline-block;
					width: auto;
					font-size: 14px;
					line-height: 32px;
				}
				.item-body {
					display: inline-block;
					width: auto;
					flex-wrap: wrap;
					height: auto;
					.item {
						cursor: pointer;
						border-radius: 4px;
						padding: 0 15px;
						margin: 0 10px 0 0;
						color: #333;
						background: none;
						display: inline-block;
						font-size: 14px;
						line-height: 32px;
						float: left;
					}
					.item:hover {
						border-radius: 0 12px;
						padding: 0 15px;
						color: #fff;
						background: #18725d;
					}
					.item.active {
						border-radius: 0 12px;
						padding: 0 15px;
						margin: 0 10px 0 0;
						color: #fff;
						background: #18725d;
						display: inline-block;
						float: left;
					}
				}
			}
		}
		.sort_view {
			border-radius: 10px;
			padding: 10px 20px;
			box-shadow: inset 0px 2px 5px 0px #082E25;
			margin: 10px 0;
			color: #666;
			background: #EBFFF9;
			width: 100%;
			font-size: 14px;
			order: 3;
			.click-sort-btn {
				border: 0;
				border-radius: 8px;
				padding: 0 5px;
				margin: 0 10px 0 0;
				color: inherit;
				background: none;
				font-size: inherit;
				.icon {
					margin: 0 2px 0 0;
					line-height: 35px;
				}
				.text {
					line-height: 35px;
				}
			}
		}
		.list {
			border-radius: 10px;
			margin: 10px 0;
			background: #fff;
			width: 100%;
			order: 4;
			.index-pv1 .animation-box {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				z-index: initial;
			}
				
			.index-pv1 .animation-box:hover {
				transform: rotate(0) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
			}
				
			.index-pv1 .animation-box img {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			}
			
			.index-pv1 .animation-box img:hover {
				transform: rotate(0) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
			.list6 {
				border-radius: 10px;
				padding: 20px;
				box-shadow: inset 0px 4px 10px 0px rgba(0,0,0,0.3);
				margin: 0 auto;
				overflow: hidden;
				align-content: flex-start;
				display: flex;
				width: 100%;
				clear: both;
				justify-content: space-between;
				align-items: flex-start;
				flex-wrap: wrap;
				.list-item1 {
					border-radius: 10px;
					padding: 10px;
					margin: 0 0 20px;
					background: #f1f3f2;
					width: 49%;
					height: 320px;
					.imgbox {
						overflow: hidden;
						width: 50%;
						float: left;
						height: 100%;
						.image {
							border-radius: 10px;
							object-fit: cover;
							width: 100%;
							transition: all 0.6s;
							height: 100%;
						}
					}
					.infoBox {
						padding: 30px 20px 50px 20px;
						align-content: center;
						display: flex;
						width: 50%;
						align-items: center;
						position: relative;
						float: right;
						flex-wrap: wrap;
						height: 100%;
						.name {
							border: 0px solid #eee;
							padding: 0;
							color: #000;
							background: none;
							font-weight: normal;
							width: 100%;
							font-size: 16px;
							line-height: 24px;
						}
						.price {
							margin: 0;
							color: #f00;
							font-size: 16px;
							line-height: 1.8;
							.price_text {
								font-size: 22px;
							}
						}
						.centerInfo {
							padding: 0px 0;
							margin: 0px 0 0;
							color: #999;
							display: flex;
							width: 100%;
							font-size: 14px;
							flex-wrap: wrap;
							.publisher_item {
								padding: 0;
								margin: 0 10px 0 0;
								color: #086fd0;
								.icon {
									margin: 0 2px 0 0;
									line-height: 1.5;
								}
								.label {
									line-height: 1.5;
								}
								.text {
									line-height: 1.5;
								}
							}
							.like_item {
								padding: 0;
								margin: 0 10px 0 0;
								color: #31b4d7;
								.icon {
									margin: 0 2px 0 0;
									line-height: 1.5;
								}
								.label {
									line-height: 1.5;
								}
								.text {
									line-height: 1.5;
								}
							}
							.collect_item {
								padding: 0;
								margin: 0 10px 0 0;
								color: #38c1a2;
								.icon {
									margin: 0 2px 0 0;
									line-height: 1.5;
								}
								.label {
									line-height: 1.5;
								}
								.text {
									line-height: 1.5;
								}
							}
							.view_item {
								padding: 0;
								color: #18725d;
								.icon {
									margin: 0 2px 0 0;
									line-height: 1.5;
								}
								.label {
									line-height: 1.5;
								}
								.text {
									line-height: 1.5;
								}
							}
						}
						.bottomInfo {
							margin: 5px 0;
							color: #888;
							display: flex;
							font-size: 14px;
							justify-content: space-between;
							align-items: center;
							flex-wrap: wrap;
							.time_item {
								padding: 0;
								margin: 5px 0;
								color: #1b4955;
								.icon {
									margin: 0 2px 0 0;
									line-height: 1.5;
								}
								.label {
									line-height: 1.5;
								}
								.text {
									font-size: 14px;
									line-height: 1.5;
								}
							}
							.more_btn {
								border: 0px solid #eee;
								border-radius: 0px;
								padding: 10px;
								margin: 10px 0 0;
								color: #fff;
								background: #18725d;
								display: block;
								width: 150px;
								text-align: center;
								.text {
									color: inherit;
								}
								.icon {
									color: inherit;
									display: none;
								}
							}
						}
					}
				}
				.list-item1:hover {
					cursor: pointer;
					background: #ebfff9;
					.imgbox {
						.image {
							transform: scale(1.05);
						}
					}
					.infoBox {
						.name {
							border: 0;
							background: none;
						}
						.price {
							.price_text {
								font-size: 22px;
							}
						}
						.centerInfo {
							.publisher_item {
								.icon {
								}
								.label {
								}
								.text {
								}
							}
							.like_item {
								.icon {
								}
								.label {
								}
								.text {
								}
							}
							.collect_item {
								.icon {
								}
								.label {
								}
								.text {
								}
							}
							.view_item {
								.icon {
								}
								.label {
								}
								.text {
								}
							}
						}
						.bottomInfo {
							.time_item {
								.icon {
								}
								.label {
								}
								.text {
								}
							}
							.more_btn {
								background: #18725d;
								.text {
								}
								.icon {
								}
							}
						}
					}
				}
				.list-item2 {
					border-radius: 10px;
					padding: 10px;
					margin: 0 0 20px;
					background: #f1f3f2;
					width: 49%;
					height: 320px;
					.imgbox {
						overflow: hidden;
						width: 50%;
						float: left;
						height: 100%;
						.image {
							border-radius: 10px;
							object-fit: cover;
							width: 100%;
							transition: all 0.6s;
							height: 100%;
						}
					}
					.infoBox {
						padding: 30px 20px 50px 20px;
						width: 50%;
						position: relative;
						float: right;
						height: 100%;
						.name {
							border: 0px solid #eee;
							padding: 0;
							color: #000;
							background: none;
							font-weight: normal;
							width: 100%;
							font-size: 16px;
							line-height: 24px;
						}
						.price {
							margin: 0;
							color: #f00;
							font-size: 16px;
							line-height: 1.8;
							.price_text {
								font-size: 22px;
							}
						}
						.centerInfo {
							padding: 0px 0;
							margin: 0px 0 0;
							color: #999;
							display: flex;
							width: 100%;
							font-size: 14px;
							flex-wrap: wrap;
							.publisher_item {
								padding: 0;
								margin: 0 10px 0 0;
								color: #086fd0;
								.icon {
									margin: 0 2px 0 0;
									line-height: 1.5;
								}
								.label {
									line-height: 1.5;
								}
								.text {
									line-height: 1.5;
								}
							}
							.like_item {
								padding: 0;
								margin: 0 10px 0 0;
								color: #31b4d6;
								.icon {
									margin: 0 2px 0 0;
									line-height: 1.5;
								}
								.label {
									line-height: 1.5;
								}
								.text {
									line-height: 1.5;
								}
							}
							.collect_item {
								padding: 0;
								margin: 0 10px 0 0;
								color: #38c1a2;
								.icon {
									margin: 0 2px 0 0;
									line-height: 1.5;
								}
								.label {
									line-height: 1.5;
								}
								.text {
									line-height: 1.5;
								}
							}
							.view_item {
								padding: 0;
								margin: 0 10px 0 0;
								color: #18725d;
								.icon {
									margin: 0 2px 0 0;
									line-height: 1.5;
								}
								.label {
									line-height: 1.5;
								}
								.text {
									line-height: 1.5;
								}
							}
						}
						.bottomInfo {
							margin: 10px 0 0;
							display: flex;
							justify-content: space-between;
							align-items: center;
							flex-wrap: wrap;
							.time_item {
								padding: 0;
								.icon {
									margin: 0 2px 0 0;
									line-height: 1.5;
								}
								.label {
									line-height: 1.5;
								}
								.text {
									font-size: 14px;
									line-height: 1.5;
								}
							}
							.more_btn {
								border: 0px solid #eee;
								border-radius: 0px;
								padding: 10px;
								margin: 10px 0 0;
								color: #fff;
								background: #18725d;
								display: block;
								width: 150px;
								text-align: center;
								.text {
									color: inherit;
								}
								.icon {
									color: inherit;
									display: none;
								}
							}
						}
					}
				}
				.list-item2:hover {
					cursor: pointer;
					background: #ebfff9;
					.imgbox {
						.image {
							transform: scale(1.05);
						}
					}
					.infoBox {
						.name {
							border: 0;
							background: none;
						}
						.price {
							.price_text {
								font-size: 22px;
							}
						}
						.centerInfo {
							.publisher_item {
								.icon {
								}
								.label {
								}
								.text {
								}
							}
							.like_item {
								.icon {
								}
								.label {
								}
								.text {
								}
							}
							.collect_item {
								.icon {
								}
								.label {
								}
								.text {
								}
							}
							.view_item {
								.icon {
								}
								.label {
								}
								.text {
								}
							}
						}
						.bottomInfo {
							.time_item {
								.icon {
								}
								.label {
								}
								.text {
								}
							}
							.more_btn {
								background: #18725d;
								.text {
								}
								.icon {
								}
							}
						}
					}
				}
			}
		}
	}
</style>
