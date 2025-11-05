<template>
	<div class="home-preview">




		<!-- 新闻资讯 -->
		<div id="animate_newsnews" class="news animate__animated">
			<div class="news_title_box">
				<span class="news_title">音乐资讯</span>
				<span class="news_subhead">{{'news'.toUpperCase()}}</span>
			</div>
			<!-- 样式六 -->
			<div v-if="newsList.length" class="list list6 index-pv1">
				<div id="new-list-6news" class="swiper-container swiper-new-list-6">
					<div class="swiper-wrapper">
						<div class="swiper-slide animation-box" v-for="(item,index) in newsList" v-if="index<5" :key="index" @click="toDetail('newsDetail', item)">
							<img :src="baseUrl + item.picture">
							<div class="name">{{ item.title }}</div>
							<div class="time_item">
								<span class="icon iconfont icon-shijian21"></span>
								<span class="label">发布时间：</span>
								<span class="text">{{item.addtime.split(' ')[0]}}</span>
							</div>
							<div class="publisher_item">
								<span class="icon iconfont icon-geren16"></span>
								<span class="label">发布人：</span>
								<span class="text">{{item.name}}</span>
							</div>
							<div class="like_item">
								<span class="icon iconfont icon-zan10"></span>
								<span class="label">点赞数：</span>
								<span class="text">{{item.thumbsupnum}}</span>
							</div>
							<div class="collect_item">
								<span class="icon iconfont icon-shoucang10"></span>
								<span class="label">收藏量：</span>
								<span class="text">{{item.storeupnum}}</span>
							</div>
							<div class="view_item">
								<span class="icon iconfont icon-chakan9"></span>
								<span class="label">点击量：</span>
								<span class="text">{{item.clicknum}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="new6-list">
					<div class="news6-title">最新动态</div>
					<div v-for="(item,index) in newsList" v-if="index<5" :key="index" @click="toDetail('newsDetail', item)" class="list-item">
						<div class="name line1">{{ item.title }}</div>
						<div class="time_item">
							<span class="icon iconfont icon-shijian21"></span>
							<span class="label">发布时间：</span>
							<span class="text">{{item.addtime.split(' ')[0]}}</span>
						</div>
						<div class="publisher_item">
							<span class="icon iconfont icon-geren16"></span>
							<span class="label">发布人：</span>
							<span class="text">{{item.name}}</span>
						</div>
						<div class="like_item">
							<span class="icon iconfont icon-zan10"></span>
							<span class="label">点赞数：</span>
							<span class="text">{{item.thumbsupnum}}</span>
						</div>
						<div class="collect_item">
							<span class="icon iconfont icon-shoucang10"></span>
							<span class="label">收藏量：</span>
							<span class="text">{{item.storeupnum}}</span>
						</div>
						<div class="view_item">
							<span class="icon iconfont icon-chakan9"></span>
							<span class="label">点击量：</span>
							<span class="text">{{item.clicknum}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="moreBtn" @click="moreBtn('news')">
				<span class="text">查看更多</span>
				<i class="icon iconfont icon-gengduo1"></i>
			</div>
		</div>
		<!-- 新闻资讯 -->
		<!-- 商品推荐 -->
		<div id="animate_recommendyinlexinxi" class="recommend animate__animated">
			<div class="recommend_title_box">
				<span class="recommend_title">音乐信息推荐</span>
				<span class="recommend_subhead">{{'yinlexinxi'.toUpperCase()}} RECOMMEND</span>
			</div>
			<div v-if="yinlexinxiRecommend.length" class="list list14 index-pv1">
				<div class="list-body-left">
					<img class="left-img" src="http://codegen.caihongy.cn/20230814/797fe92c8ce14417a09161c42381f9b3.jpg">
					<template v-for="item,index in yinlexinxiRecommend">
						<template v-if="recommendIndex14yinlexinxi == index">
							<img class="left-img2" @click="toDetail('yinlexinxiDetail', item)" :name="item.id" v-if="preHttp(item.fengmian)" :src="item.fengmian.split(',')[0]" alt="" />
							<img class="left-img2" @click="toDetail('yinlexinxiDetail', item)" :name="item.id" v-else :src="baseUrl + (item.fengmian?item.fengmian.split(',')[0]:'')" alt="" />
						</template>
					</template>
				</div>
				<div class="list-body">
					<div v-for="(item,index) in yinlexinxiRecommend" :key="index" class="list-item" @click="recommendClick14(index, 'yinlexinxi')" :name="item.id">
						<img v-if="preHttp(item.fengmian)" :src="item.fengmian.split(',')[0]" alt="" />
						<img v-else :src="baseUrl + (item.fengmian?item.fengmian.split(',')[0]:'')" alt="" />
						<div class="infoBox">
							<div class="name">{{item.songname}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="moreBtn" @click="moreBtn('yinlexinxi')">
				<span class="text">查看更多</span>
				<i class="icon iconfont icon-gengduo1"></i>
			</div>
		</div>
		<!-- 商品推荐 -->
		<!-- 商品推荐 -->
		<div id="animate_recommendgedanxinxi" class="recommend animate__animated">
			<div class="recommend_title_box">
				<span class="recommend_title">歌单信息推荐</span>
				<span class="recommend_subhead">{{'gedanxinxi'.toUpperCase()}} RECOMMEND</span>
			</div>
			<div v-if="gedanxinxiRecommend.length" class="list list14 index-pv1">
				<div class="list-body-left">
					<img class="left-img" src="http://codegen.caihongy.cn/20230814/797fe92c8ce14417a09161c42381f9b3.jpg">
					<template v-for="item,index in gedanxinxiRecommend">
						<template v-if="recommendIndex14gedanxinxi == index">
							<img class="left-img2" @click="toDetail('gedanxinxiDetail', item)" :name="item.id" v-if="preHttp(item.fengmian)" :src="item.fengmian.split(',')[0]" alt="" />
							<img class="left-img2" @click="toDetail('gedanxinxiDetail', item)" :name="item.id" v-else :src="baseUrl + (item.fengmian?item.fengmian.split(',')[0]:'')" alt="" />
						</template>
					</template>
				</div>
				<div class="list-body">
					<div v-for="(item,index) in gedanxinxiRecommend" :key="index" class="list-item" @click="recommendClick14(index, 'gedanxinxi')" :name="item.id">
						<img v-if="preHttp(item.fengmian)" :src="item.fengmian.split(',')[0]" alt="" />
						<img v-else :src="baseUrl + (item.fengmian?item.fengmian.split(',')[0]:'')" alt="" />
						<div class="infoBox">
							<div class="name">{{item.songname}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="moreBtn" @click="moreBtn('gedanxinxi')">
				<span class="text">查看更多</span>
				<i class="icon iconfont icon-gengduo1"></i>
			</div>
		</div>
		<!-- 商品推荐 -->
		<div id="home_idea1" class="idea1 animate__animated"></div>
	</div>
</template>

<script>
import 'animate.css'
import Swiper from "swiper";

	export default {
		//数据集合
		data() {
			return {
				baseUrl: '',
				newsList: [],
				yinlexinxiRecommend: [],
				gedanxinxiRecommend: [],



				recommendIndex14yinlexinxi: 0,
				recommendIndex14gedanxinxi: 0,


			}
		},
		created() {
			this.baseUrl = this.$config.baseUrl;
			this.getNewsList();
			this.getList();
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll)
			setTimeout(()=>{
				this.handleScroll()
			},100)
			
			this.swiperChanges()
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.handleScroll)
		},
		//方法集合
		methods: {
			swiperChanges() {
				setTimeout(()=>{
				},750)
			},
			recommendClick14(index, name) {
				this['recommendIndex14' + name] = index
			},

			listIndexClick12(index, name) {
				this['listIndex12' + name] = index
				this.getList()
				
				document.querySelectorAll('.lists .list12' + name + ' .list .item').forEach(el => {
				  el.classList.remove("active")
				})
				setTimeout(() => {
				  document.querySelectorAll('.lists .list12' + name + ' .list .item').forEach(el => {
					el.classList.add("active")
				  })
				}, 1);
			},

			handleScroll() {
				let arr = [
					{id:'about',css:'animate__slideInLeft'},
					{id:'system',css:'animate__slideInRight'},
					{id:'animate_recommendyinlexinxi',css:'animate__slideInUp'},
					{id:'animate_recommendgedanxinxi',css:'animate__slideInUp'},
					{id:'animate_newsnews',css:'animate__slideInUp'},
					{id:'home_idea1',css:'animate__'},
				]
			
				for (let i in arr) {
					let doc = document.getElementById(arr[i].id)
					if (doc) {
						let top = doc.offsetTop
						let win_top = window.innerHeight + window.pageYOffset
						// console.log(top,win_top)
						if (win_top > top && doc.classList.value.indexOf(arr[i].css) < 0) {
							// console.log(doc)
							doc.classList.add(arr[i].css)
						}
					}
				}
			},
			preHttp(str) {
				return str && str.substr(0,4)=='http';
			},
			getNewsList() {
				let data = {
					page: 1,
					limit: 6,
					sort: 'addtime',
					order: 'desc'
				}
				this.$http.get('news/list', {params: data}).then(res => {
					if (res.data.code == 0) {
						this.newsList = res.data.data.list;
					
						let options = {"observer":true,"navigation":{"nextEl":".swiper-button-next","prevEl":".swiper-button-prev"},"observeParents":true,"loop":false,"slidesPerView":"3","speed":500,"spaceBetween":10,"autoplay":{"delay":3000,"disableOnInteraction":false}}
						options.pagination = {el:'null'}
						if(options.slidesPerView) {
							options.slidesPerView = Number(options.slidesPerView);
						}
						if(options.spaceBetween) {
							options.spaceBetween = Number(options.spaceBetween);
						}
						this.$nextTick(() => {
							new Swiper('#new-list-6news', options)
						})
					}
				});
			},
			getList() {
				let autoSortUrl = "";
				let data = {}
				autoSortUrl = "yinlexinxi/autoSort";
				if(localStorage.getItem('frontToken')) {
					autoSortUrl = "yinlexinxi/autoSort2";
				}
				data = {
					page: 1,
					limit: 6,
				}
				this.$http.get(autoSortUrl, {params: data}).then(res => {
					if (res.data.code == 0) {
						this.yinlexinxiRecommend = res.data.data.list;
					}
				});
				autoSortUrl = "gedanxinxi/autoSort";
				if(localStorage.getItem('frontToken')) {
					autoSortUrl = "gedanxinxi/autoSort2";
				}
				data = {
					page: 1,
					limit: 6,
				}
				data['sfsh'] = '是'
				this.$http.get(autoSortUrl, {params: data}).then(res => {
					if (res.data.code == 0) {
						this.gedanxinxiRecommend = res.data.data.list;
					}
				});
			
			},
			toDetail(path, item) {
				this.$router.push({path: '/index/' + path, query: {id: item.id}});
			},
			moreBtn(path) {
				this.$router.push({path: '/index/' + path});
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.home-preview {
		padding: 0 16%;
		margin: 20px auto;
		align-content: flex-start;
		background: #f7ffff;
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: flex-start;
		flex-wrap: wrap;
		.news {
			border-radius: 10px;
			padding: 0;
			margin: 0 0 20px;
			background: none;
			width: 100%;
			position: relative;
			order: 8;
			.news_title_box {
				padding: 0 0 0 30px;
				margin: 0px auto;
				background: url(http://codegen.caihongy.cn/20241210/a60662462cdc499c9bc6a267466f2517.png) no-repeat left bottom / 100% auto;
				width: 100%;
				line-height: 60px;
				text-align: left;
				.news_title {
					color: #18725d;
					font-weight: bold;
					font-size: 26px;
				}
				.news_subhead {
					margin: 0 0 10px;
					color: #999;
					display: none;
					width: 100%;
					font-size: 20px;
					line-height: 1.5;
					text-align: center;
				}
			}
			.index-pv1 .animation-box:hover {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
			}
			.index-pv1 .animation-box img:hover {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
			.list6 {
				padding: 0px;
				margin: 30px 0 0;
				background: none;
				display: flex;
				width: 100%;
				height: auto;
				.swiper-container {
					padding: 0;
					margin: 0;
					background: none;
					flex: 1;
					width: 60%;
					height: auto;
					.swiper-slide {
						border: 0;
						cursor: pointer;
						border-radius: 4px;
						padding: 10px;
						box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.3);
						background: #fff;
						width: 100%;
						position: relative;
						img {
							border: 0;
							object-fit: cover;
							width: 100%;
							height: 180px;
						}
						.name {
							padding: 0 0px;
							color: #333;
							background: #fff;
							font-size: 14px;
							line-height: 32px;
						}
						.time_item {
							padding: 0 0px;
							.icon {
								margin: 0 2px 0 0;
								color: #888;
								font-size: 14px;
								line-height: 1.5;
							}
							.label {
								color: #888;
								font-size: 14px;
								line-height: 1.5;
							}
							.text {
								color: #888;
								font-size: 14px;
								line-height: 1.5;
							}
						}
						.publisher_item {
							padding: 0 10px;
							display: none;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
						.like_item {
							padding: 0 10px;
							display: none;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
						.collect_item {
							padding: 0 10px;
							display: none;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
						.view_item {
							padding: 0 10px;
							display: none;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
					}
				}
				.new6-list {
					padding: 10px;
					box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.1);
					margin: 0 0 0 20px;
					background: #fff;
					width: 40%;
					height: auto;
					.news6-title {
						padding: 0 8px;
						color: #fff;
						background: #ccc;
						display: none;
						font-size: 14px;
						line-height: 40px;
					}
					.list-item {
						cursor: pointer;
						padding: 5px 10px;
						background: #fff;
						display: flex;
						width: 100%;
						border-color: #ebebeb;
						border-width: 0 0 2px;
						align-items: center;
						border-style: solid;
						height: auto;
						.name {
							overflow: hidden;
							color: #333;
							white-space: nowrap;
							flex: 1;
							font-size: 14px;
							line-height: 38px;
							text-overflow: ellipsis;
						}
						.time_item {
							padding: 0 10px;
							.icon {
								margin: 0 2px 0 0;
								color: #888;
								font-size: 14px;
								line-height: 1.5;
							}
							.label {
								color: #888;
								font-size: 14px;
								line-height: 1.5;
							}
							.text {
								color: #888;
								font-size: 14px;
								line-height: 1.5;
							}
						}
						.publisher_item {
							padding: 0 10px;
							display: none;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
						.like_item {
							padding: 0 10px;
							display: none;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
						.collect_item {
							padding: 0 10px;
							display: none;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
						.view_item {
							padding: 0 10px;
							display: none;
							.icon {
								margin: 0 2px 0 0;
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.label {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
							.text {
								color: #666;
								font-size: 12px;
								line-height: 1.5;
							}
						}
					}
				}
				
				.swiper-button-prev {
					left: 10px;
					right: auto;
				}
				
				.swiper-button-prev::after {
					color: #18725d;
				}
				
				.swiper-button-next {
					left: auto;
					right: 10px;
				}
				
				.swiper-button-next::after {
					color: #18725d;
				}
			}
			.moreBtn {
				border: 1px solid #18725d;
				cursor: pointer;
				padding: 5px 20px;
				margin: 0px auto;
				display: block;
				line-height: auto;
				right: 140px;
				border-radius: 20px;
				top: 16px;
				background: none;
				width: auto;
				position: absolute;
				text-align: center;
				.text {
					color: #18725d;
					font-size: 14px;
				}
				.icon {
					color: #9E9E9E;
					display: none;
					font-size: 14px;
				}
			}
		}
		.recommend {
			border-radius: 10px;
			padding: 0 0px;
			margin: 0 0 20px;
			background: none;
			width: 100%;
			position: relative;
			order: 1;
			.recommend_title_box {
				padding: 0 0 0 30px;
				margin: 0px auto;
				background: url(http://codegen.caihongy.cn/20241210/a60662462cdc499c9bc6a267466f2517.png) no-repeat left bottom / 100% auto;
				width: 100%;
				line-height: 60px;
				text-align: left;
				.recommend_title {
					color: #18725d;
					font-weight: bold;
					font-size: 26px;
				}
				.recommend_subhead {
					margin: 0 0 10px;
					color: #999;
					display: none;
					width: 100%;
					font-size: 20px;
					line-height: 1.5;
					text-align: center;
				}
			}
			.index-pv1 .animation-box {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				z-index: initial;
			}
			
			.index-pv1 .animation-box:hover {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
				z-index: 1;
			}
			
			.index-pv1 .animation-box img {
				transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
			}
			
			.index-pv1 .animation-box img:hover {
				transform: rotate(0deg) scale(1.1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
				-webkit-perspective: 1000px;
				perspective: 1000px;
				transition: 0.3s;
			}
			.list14 {
				padding: 30px 0px 0px 0px;
				background: none;
				display: flex;
				width: 100%;
				justify-content: space-between;
				height: auto;
				.list-body-left {
					margin: 0 0 60px;
					width: 480px;
					position: relative;
					height: auto;
					.left-img {
						object-fit: cover;
						display: block;
						width: 100% ;
						height: 480px;
					}
					.left-img2 {
						cursor: pointer;
						top: 40px;
						left: 96px;
						object-fit: cover;
						display: block;
						width: 88% ;
						position: absolute;
						height: 480px;
					}
				}
				.list-body {
					padding: 0px 0px 0 80px;
					margin: 40px 0 0;
					display: flex;
					width: calc(100% - 480px);
					justify-content: space-between;
					flex-wrap: wrap;
					height: auto;
					.list-item {
						border: 0px solid #ddd;
						overflow: hidden;
						width: 31% ;
						position: relative;
						transition: all .3s;
						height: 230px;
						img {
							object-fit: cover;
							display: block;
							width: 100%;
							transition: all .3s;
							height: 100%;
						}
						.infoBox {
							flex-direction: column;
							top: 0;
							left: 0;
							background: rgba(24,114,93,.5);
							display: flex;
							width: 100%;
							justify-content: center;
							align-items: center;
							position: absolute;
							transition: all .3s;
							height: 100%;
							.name {
								padding: 0 10px;
								overflow: hidden;
								color: #fff;
								white-space: nowrap;
								width: 100%;
								font-size: 15px;
								line-height: 24px;
								text-overflow: ellipsis;
								text-align: center;
							}
							.price {
								padding: 10px;
								color: #f00;
								font-size: 16px;
								line-height: 1.5;
							}
						}
					}
					.list-item:hover {
						img {
							transform: scale(1.2);
						}
						.infoBox {
							cursor: pointer;
							opacity: 0;
						}
					}
				}
			}
			.moreBtn {
				border: 1px solid #18725d;
				cursor: pointer;
				padding: 5px 20px;
				margin: 0px auto;
				display: block;
				line-height: auto;
				right: 140px;
				border-radius: 20px;
				top: 15px;
				background: none;
				width: auto;
				position: absolute;
				text-align: center;
				.text {
					color: #18725d;
					font-size: 14px;
				}
				.icon {
					color: #9E9E9E;
					display: none;
					font-size: 14px;
				}
			}
		}
		#home_idea1 {
		}
	}
</style>
