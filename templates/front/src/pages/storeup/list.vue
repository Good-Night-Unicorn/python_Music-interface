<template>
	<div :style='{"width":"100%","padding":"20px 16%","margin":"10px auto","position":"relative","background":"none"}'>
		<div class="back_box">
			<el-button class="backBtn" size="mini" @click="backClick">
				<span class="icon iconfont icon-jiantou33"></span>
				<span class="text">返回</span>
			</el-button>
		</div>
		<div v-if="storeupType==1" class="section-title" :style='{"padding":"0 0 0 30px","margin":"0px auto","color":"#18725d","textAlign":"left","background":"url(http://codegen.caihongy.cn/20241215/590d47f055174a759991ca870bfe4faa.png) no-repeat left center / auto 100%,url(http://codegen.caihongy.cn/20241215/1df934632aa544dfb676ec70931c1e37.png) no-repeat right center / auto 100%,url(http://codegen.caihongy.cn/20241215/62b7972a6b1f4d96b0decbe7088740eb.png) repeat-x left bottom / auto 100%","width":"100%","lineHeight":"60px","fontSize":"26px","fontWeight":"600"}'>我的收藏</div>
		<el-form :inline="true" :model="formSearch" class="formSearch">
			<el-form-item>
				<el-input v-model="formSearch.name" placeholder="名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="getStoreupList(1)">查询</el-button>
			</el-form-item>
		</el-form>
		<div style="display: flex;flex-wrap: wrap">
			<div style="width: 23%;margin: 0 1% 20px" v-for="(item, index) in storeupList" :key="index" @click="toDetail(item)">
				<el-card :body-style="{ padding: '0px', cursor: 'pointer' }">
					<el-image v-if="item.picture && item.picture.substr(0,4)=='http'" :src="item.picture" fit="fill" class="image"></el-image>
					<el-image v-else-if="item.picture&& item.picture.substr(0,4)!='http'" :src="baseUrl + item.picture" fit="fill" class="image"></el-image>
					<div style="padding: 14px;">
						<span v-if="item.remark">{{item.name}}</span>
						<span v-if="!item.remark">{{item.name}}</span>
					</div>
				</el-card>
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
			:style='{"padding":"10px","boxShadow":"none","margin":"20px auto","whiteSpace":"nowrap","color":"#333","textAlign":"center","background":"none","width":"100%","fontSize":"inherit","fontWeight":"500","order":"51"}'
			@current-change="curChange"
			@prev-click="prevClick"
			@size-change="sizeChange"
			@next-click="nextClick"
			></el-pagination>
	
	</div>
</template>

<script>
	import config from '@/config/config'
	export default {
		data() {
			return {
				layouts: '',
				baseUrl: config.baseUrl,
				formSearch: {
					name: ''
				},
				storeupType: 1,
				storeupList: [],
				total: 1,
				pageSize: 8,
				pageSizes: [],
				totalPage: 1
			}
		},
		created() {
			this.storeupType = localStorage.getItem('storeupType');
			this.getStoreupList(1);
		},
		methods: {
			backClick() {
				this.$router.push('/index/center')
			},
			getStoreupList(page) {
				let params = {page, limit: this.pageSize, type: this.storeupType, userid: localStorage.getItem('frontUserid'),sort:"addtime",order:"desc"};
				let searchWhere = {
				};
				if (this.formSearch.name != '') searchWhere.name = '%' + this.formSearch.name + '%';
				this.$http.get('storeup/list', {params: Object.assign(params, searchWhere)}).then(res => {
					if (res.data.code == 0) {
						this.storeupList = res.data.data.list;
						this.total = res.data.data.total;
						this.pageSize = Number(res.data.data.pageSize);
						this.totalPage = res.data.data.totalPage;
						if(this.pageSizes.length==0){
							this.pageSizes = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*5];
						}
					}
				});
			},
			curChange(page) {
				this.getStoreupList(page);
			},
			prevClick(page) {
				this.getStoreupList(page);
			},
			sizeChange(size){
				this.pageSize = size
				this.getStoreupList(1);
			},
			nextClick(page) {
				this.getStoreupList(page);
			},
			toDetail(item) {
				this.$router.push({path: `/index/${item.tablename}Detail`, query: {id:item.refid}});
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.section {
		width: 900px;
		margin: 0 auto;
	}

	.formSearch {
		text-align: right;
	}
	.image {
		height: 233px;
		width: 100%;
		display: block;
	}
	
</style>
