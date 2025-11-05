<template>
	<div class="addEdit-block">
		<el-form
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="120px"
		>
			<template >
				<el-form-item class="input" v-if="type!='info'"  label="歌名" prop="songname" >
					<el-input v-model="ruleForm.songname" placeholder="歌名" clearable  :readonly="ro.songname"></el-input>
				</el-form-item>
				<el-form-item v-else class="input" label="歌名" prop="songname" >
					<el-input v-model="ruleForm.songname" placeholder="歌名" readonly></el-input>
				</el-form-item>
				<el-form-item class="upload" v-if="type!='info' && !ro.fengmian" label="封面" prop="fengmian" >
					<file-upload
						tip="点击上传封面"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.fengmian?ruleForm.fengmian:''"
						@change="fengmianUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item class="upload" v-else-if="ruleForm.fengmian" label="封面" prop="fengmian" >
					<img v-if="ruleForm.fengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.fengmian.split(',')[0]" width="100" height="100">
					<img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.fengmian.split(',')" :src="$base.url+item" width="100" height="100">
				</el-form-item>
				<el-form-item class="input" v-if="type!='info'"  label="专辑" prop="zhuanji" >
					<el-input v-model="ruleForm.zhuanji" placeholder="专辑" clearable  :readonly="ro.zhuanji"></el-input>
				</el-form-item>
				<el-form-item v-else class="input" label="专辑" prop="zhuanji" >
					<el-input v-model="ruleForm.zhuanji" placeholder="专辑" readonly></el-input>
				</el-form-item>
				<el-form-item class="input" v-if="type!='info'"  label="歌手" prop="singer" >
					<el-input v-model="ruleForm.singer" placeholder="歌手" clearable  :readonly="ro.singer"></el-input>
				</el-form-item>
				<el-form-item v-else class="input" label="歌手" prop="singer" >
					<el-input v-model="ruleForm.singer" placeholder="歌手" readonly></el-input>
				</el-form-item>
				<el-form-item class="select" v-if="type!='info'"  label="音乐类型" prop="yinleleixing" >
					<el-select :disabled="ro.yinleleixing" v-model="ruleForm.yinleleixing" placeholder="请选择音乐类型" >
						<el-option
							v-for="(item,index) in yinleleixingOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item v-else class="input" label="音乐类型" prop="yinleleixing" >
					<el-input v-model="ruleForm.yinleleixing"
						placeholder="音乐类型" readonly></el-input>
				</el-form-item>
				<el-form-item class="upload" v-if="type!='info'&& !ro.songfile" label="音乐文件" prop="songfile" >
					<file-upload
						tip="点击上传音乐文件"
						action="file/upload"
						:limit="1"
						:type="3"
						:multiple="true"
						:fileUrls="ruleForm.songfile?ruleForm.songfile:''"
						@change="songfileUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item v-else-if="ruleForm.songfile" label="音乐文件" prop="songfile" >
					<el-button class="viewBtn" type="text" size="small" @click="download($base.url+ruleForm.songfile)">
						<span class="icon iconfont icon-chakan14"></span>
						预览
					</el-button>
				</el-form-item>
				<el-form-item v-else-if="!ruleForm.songfile" label="音乐文件" prop="songfile" >
					<el-button class="unBtn" type="text" size="small">
						<span class="icon iconfont icon-xihuan"></span>
						暂无
					</el-button>
				</el-form-item>
				<el-form-item class="date" v-if="type!='info'" label="发行时间" prop="faxingshijian" >
					<el-date-picker
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
						v-model="ruleForm.faxingshijian" 
						type="date"
						:readonly="ro.faxingshijian"
						placeholder="发行时间"
					></el-date-picker> 
				</el-form-item>
				<el-form-item class="input" v-else-if="ruleForm.faxingshijian" label="发行时间" prop="faxingshijian" >
					<el-input v-model="ruleForm.faxingshijian" placeholder="发行时间" readonly></el-input>
				</el-form-item>
				<el-form-item class="input" v-if="type!='info'"  label="语言" prop="yuyan" >
					<el-input v-model="ruleForm.yuyan" placeholder="语言" clearable  :readonly="ro.yuyan"></el-input>
				</el-form-item>
				<el-form-item v-else class="input" label="语言" prop="yuyan" >
					<el-input v-model="ruleForm.yuyan" placeholder="语言" readonly></el-input>
				</el-form-item>
				<el-form-item class="input" v-if="type!='info'"  label="时长" prop="shizhang" >
					<el-input v-model="ruleForm.shizhang" placeholder="时长" clearable  :readonly="ro.shizhang"></el-input>
				</el-form-item>
				<el-form-item v-else class="input" label="时长" prop="shizhang" >
					<el-input v-model="ruleForm.shizhang" placeholder="时长" readonly></el-input>
				</el-form-item>
			</template>
			<el-form-item v-if="type!='info'"  label="歌词" prop="lyric" >
				<editor 
					style="min-width: 200px; max-width: 600px;"
					v-model="ruleForm.lyric" 
					class="editor" 
					action="file/upload">
				</editor>
			</el-form-item>
			<el-form-item v-else-if="ruleForm.lyric" label="歌词" prop="lyric" >
				<span class="text ql-snow ql-editor" v-html="ruleForm.lyric"></span>
			</el-form-item>
			<el-form-item class="btn">
				<el-button class="btn3"  v-if="type!='info'" type="success" @click="onSubmit">
					<span class="icon iconfont icon-xihuan"></span>
					提交
				</el-button>
				<el-button class="btn4" v-if="type!='info'" type="success" @click="back()">
					<span class="icon iconfont icon-xihuan"></span>
					取消
				</el-button>
				<el-button class="btn5" v-if="type=='info'" type="success" @click="back()">
					<span class="icon iconfont icon-xihuan"></span>
					返回
				</el-button>
			</el-form-item>
		</el-form>
    

	</div>
</template>
<script>
	import { 
		isIntNumer,
	} from "@/utils/validate";
	export default {
		data() {
			var validateIntNumber = (rule, value, callback) => {
				if(!value){
					callback();
				} else if (!isIntNumer(value)) {
					callback(new Error("请输入整数"));
				} else {
					callback();
				}
			};
			return {
				id: '',
				type: '',
			
			
				ro:{
					songname : false,
					fengmian : false,
					zhuanji : false,
					singer : false,
					yinleleixing : false,
					songfile : false,
					faxingshijian : false,
					yuyan : false,
					shizhang : false,
					lyric : false,
					thumbsupnum : false,
					crazilynum : false,
					clicktime : false,
					clicknum : false,
					discussnum : false,
					storeupnum : false,
				},
			
				ruleForm: {
					songname: '',
					fengmian: '',
					zhuanji: '',
					singer: '',
					yinleleixing: '',
					songfile: '',
					faxingshijian: '',
					yuyan: '',
					shizhang: '',
					lyric: '',
					clicktime: '',
				},
		
				yinleleixingOptions: [],

				rules: {
					songname: [
						{ required: true, message: '歌名不能为空', trigger: 'blur' },
					],
					fengmian: [
					],
					zhuanji: [
					],
					singer: [
						{ required: true, message: '歌手不能为空', trigger: 'blur' },
					],
					yinleleixing: [
					],
					songfile: [
						{ required: true, message: '音乐文件不能为空', trigger: 'blur' },
					],
					faxingshijian: [
					],
					yuyan: [
					],
					shizhang: [
					],
					lyric: [
					],
					thumbsupnum: [
						{ validator: validateIntNumber, trigger: 'blur' },
					],
					crazilynum: [
						{ validator: validateIntNumber, trigger: 'blur' },
					],
					clicktime: [
					],
					clicknum: [
						{ validator: validateIntNumber, trigger: 'blur' },
					],
					discussnum: [
						{ validator: validateIntNumber, trigger: 'blur' },
					],
					storeupnum: [
						{ validator: validateIntNumber, trigger: 'blur' },
					],
				},
			};
		},
		props: ["parent"],
		computed: {



		},
		components: {
		},
		created() {
		},
		methods: {
			// 下载
			download(file){
				window.open(`${file}`)
			},
			// 初始化
			init(id,type) {
				if (id) {
					this.id = id;
					this.type = type;
				}
				if(this.type=='info'||this.type=='else'){
					this.info(id);
				}else if(this.type=='logistics'){
					this.logistics=false;
					this.info(id);
				}else if(this.type=='cross'){
					var obj = this.$storage.getObj('crossObj');
					for (var o in obj){
						if(o=='songname'){
							this.ruleForm.songname = obj[o];
							this.ro.songname = true;
							continue;
						}
						if(o=='fengmian'){
							this.ruleForm.fengmian = obj[o];
							this.ro.fengmian = true;
							continue;
						}
						if(o=='zhuanji'){
							this.ruleForm.zhuanji = obj[o];
							this.ro.zhuanji = true;
							continue;
						}
						if(o=='singer'){
							this.ruleForm.singer = obj[o];
							this.ro.singer = true;
							continue;
						}
						if(o=='yinleleixing'){
							this.ruleForm.yinleleixing = obj[o];
							this.ro.yinleleixing = true;
							continue;
						}
						if(o=='songfile'){
							this.ruleForm.songfile = obj[o];
							this.ro.songfile = true;
							continue;
						}
						if(o=='faxingshijian'){
							this.ruleForm.faxingshijian = obj[o];
							this.ro.faxingshijian = true;
							continue;
						}
						if(o=='yuyan'){
							this.ruleForm.yuyan = obj[o];
							this.ro.yuyan = true;
							continue;
						}
						if(o=='shizhang'){
							this.ruleForm.shizhang = obj[o];
							this.ro.shizhang = true;
							continue;
						}
						if(o=='lyric'){
							this.ruleForm.lyric = obj[o];
							this.ro.lyric = true;
							continue;
						}
						if(o=='thumbsupnum'){
							this.ruleForm.thumbsupnum = obj[o];
							this.ro.thumbsupnum = true;
							continue;
						}
						if(o=='crazilynum'){
							this.ruleForm.crazilynum = obj[o];
							this.ro.crazilynum = true;
							continue;
						}
						if(o=='clicktime'){
							this.ruleForm.clicktime = obj[o];
							this.ro.clicktime = true;
							continue;
						}
						if(o=='clicknum'){
							this.ruleForm.clicknum = obj[o];
							this.ro.clicknum = true;
							continue;
						}
						if(o=='discussnum'){
							this.ruleForm.discussnum = obj[o];
							this.ro.discussnum = true;
							continue;
						}
						if(o=='storeupnum'){
							this.ruleForm.storeupnum = obj[o];
							this.ro.storeupnum = true;
							continue;
						}
					}
				}
				// 获取用户信息
				this.$http({
					url: `${this.$storage.get('sessionTable')}/session`,
					method: "get"
				}).then(({ data }) => {
					if (data && data.code === 0) {
						var json = data.data;
					} else {
						this.$message.error(data.msg);
					}
				});
				this.$http({
					url: `option/yinleleixing/yinleleixing`,
					method: "get"
				}).then(({ data }) => {
					if (data && data.code === 0) {
						this.yinleleixingOptions = data.data;
					} else {
						this.$message.error(data.msg);
					}
				});
			
			},
			// 多级联动参数

			info(id) {
				this.$http({
					url: `yinlexinxi/info/${id}`,
					method: "get"
				}).then(({ data }) => {
					if (data && data.code === 0) {
						this.ruleForm = data.data;
						//解决前台上传图片后台不显示的问题
						let reg=new RegExp('../../../upload','g')//g代表全部
						this.ruleForm.lyric = this.ruleForm.lyric.replace(reg,'../../../djangomtj199wx/upload');
					} else {
						this.$message.error(data.msg);
					}
				});
			},

			// 提交
			async onSubmit() {
					if(this.ruleForm.fengmian!=null) {
						this.ruleForm.fengmian = this.ruleForm.fengmian.replace(new RegExp(this.$base.url,"g"),"");
					}
					if(this.ruleForm.songfile!=null) {
						this.ruleForm.songfile = this.ruleForm.songfile.replace(new RegExp(this.$base.url,"g"),"");
					}
					var objcross = this.$storage.getObj('crossObj');
					await this.$refs["ruleForm"].validate(async valid => {
						if (valid) {
							if(this.type=='cross'){
								var statusColumnName = this.$storage.get('statusColumnName');
								var statusColumnValue = this.$storage.get('statusColumnValue');
								if(statusColumnName!='') {
									var obj = this.$storage.getObj('crossObj');
									if(statusColumnName && !statusColumnName.startsWith("[")) {
										for (var o in obj){
											if(o==statusColumnName){
												obj[o] = statusColumnValue;
											}
										}
										var table = this.$storage.get('crossTable');
										await this.$http({
											url: `${table}/update`,
											method: "post",
											data: obj
										}).then(({ data }) => {});
									}
								}
							}
							
							await this.$http({
								url: `yinlexinxi/${!this.ruleForm.id ? "save" : "update"}`,
								method: "post",
								data: this.ruleForm
							}).then(async ({ data }) => {
								if (data && data.code === 0) {
									this.$message({
										message: "操作成功",
										type: "success",
										duration: 1500,
										onClose: () => {
											this.parent.showFlag = true;
											this.parent.addOrUpdateFlag = false;
											this.parent.yinlexinxiCrossAddOrUpdateFlag = false;
											this.parent.search();
											this.parent.contentStyleChange();
										}
									});
								} else {
									this.$message.error(data.msg);
								}
							});
						}
					});
			},
			// 获取uuid
			getUUID () {
				return new Date().getTime();
			},
			// 返回
			back() {
				this.parent.showFlag = true;
				this.parent.addOrUpdateFlag = false;
				this.parent.yinlexinxiCrossAddOrUpdateFlag = false;
				this.parent.contentStyleChange();
			},
			fengmianUploadChange(fileUrls) {
				this.ruleForm.fengmian = fileUrls;
			},
			songfileUploadChange(fileUrls) {
				this.ruleForm.songfile = fileUrls;
			},
		}
	};
</script>
<style lang="scss" scoped>
	.addEdit-block {
		padding: 20px 30px;
	}
	.add-update-preview {
		border: 1px solid #BFBFBF;
		padding: 40px 20% 20px 15%;
		background: #fff;
	}
	.amap-wrapper {
		width: 100%;
		height: 500px;
	}
	
	.search-box {
		position: absolute;
	}
	
	.el-date-editor.el-input {
		width: auto;
	}
	.add-update-preview /deep/ .el-form-item {
		border: 0px solid #eee;
		padding: 0;
		margin: 0 0 20px 0;
		display: inline-block;
		width: 80%;
	}
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
		padding: 0 10px 0 0;
		color: #666;
		font-weight: 600;
		width: 120px;
		font-size: 16px;
		line-height: 40px;
		text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
		margin-left: 120px;
	}
	.add-update-preview .el-form-item span.text {
		border: 1px solid #ddd;
		border-radius: 0px;
		padding: 5px 10px;
		color: #000000;
		display: block;
		width: 100%;
		font-size: 16px;
		line-height: 24px;
		height: auto;
	}
	
	.add-update-preview .el-input {
		width: 100%;
	}
	.add-update-preview .el-input /deep/ .el-input__inner {
		border: 1px dashed #ababab;
		border-radius: 0px;
		padding: 0 12px;
		color: #000000;
		width: 100%;
		font-size: 16px;
		height: 34px;
	}
	.add-update-preview .el-input /deep/ .el-input__inner[readonly="readonly"] {
		border: 1px dashed #ababab;
		border-radius: 0px;
		padding: 0 12px;
		color: #000000;
		width: 100%;
		font-size: 16px;
		height: 34px;
	}
	.add-update-preview .el-input-number {
		text-align: left;
		width: 100%;
	}
	.add-update-preview .el-input-number /deep/ .el-input__inner {
		text-align: left;
		border: 1px dashed #ababab;
		border-radius: 0px;
		padding: 0 12px;
		color: #000000;
		width: 100%;
		font-size: 16px;
		height: 34px;
	}
	.add-update-preview .el-input-number /deep/ .is-disabled .el-input__inner {
		text-align: left;
		border: 1px dashed #ababab;
		border-radius: 0px;
		padding: 0 12px;
		color: #000000;
		width: 100%;
		font-size: 16px;
		height: 34px;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
		display: none;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__increase {
		display: none;
	}
	.add-update-preview .el-select {
		width: 100%;
	}
	.add-update-preview .el-select /deep/ .el-input__inner {
		border: 1px dashed #ababab;
		border-radius: 0px;
		padding: 0 12px;
		color: #000000;
		width: 100%;
		font-size: 16px;
		height: 34px;
	}
	.add-update-preview .el-select /deep/ .is-disabled .el-input__inner {
		border: 1px solid #E8E8E8;
		border-radius: 0px;
		padding: 0 12px;
		color: #000000;
		width: 100%;
		font-size: 16px;
		height: 34px;
	}
	.add-update-preview .el-date-editor {
		width: 100%;
	}
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
		border: 1px solid #E8E8E8;
		border-radius: 0px;
		padding: 0 30px;
		color: #000000;
		width: 100%;
		font-size: 16px;
		height: 34px;
	}
	.add-update-preview .el-date-editor /deep/ .el-input__inner[readonly="readonly"] {
		border: 1px solid #E8E8E8;
		border-radius: 0px;
		padding: 0 30px;
		color: #000000;
		width: 100%;
		font-size: 16px;
		height: 34px;
	}
	.add-update-preview .viewBtn {
		border: 0px solid #ccc;
		cursor: pointer;
		border-radius: 0px;
		padding: 0 15px;
		margin: 0 20px 0 0;
		color: #666;
		background: #fff;
		width: auto;
		font-size: 15px;
		line-height: 34px;
		height: 34px;
		.iconfont {
			margin: 0 2px;
			color: #666;
			font-size: 16px;
			height: 34px;
		}
	}
	.add-update-preview .viewBtn:hover {
		opacity: 0.8;
	}
	.add-update-preview .downBtn {
		border: 0px solid #ccc;
		cursor: pointer;
		border-radius: 0px;
		padding: 0 15px;
		margin: 0 20px 0 0;
		color: #666;
		background: #fff;
		width: auto;
		font-size: 15px;
		line-height: 34px;
		height: 34px;
		.iconfont {
			margin: 0 2px;
			color: #666;
			font-size: 16px;
			height: 34px;
		}
	}
	.add-update-preview .downBtn:hover {
		opacity: 0.8;
	}
	.add-update-preview .unBtn {
		border: 0;
		cursor: not-allowed;
		border-radius: 4px;
		padding: 0 0px;
		margin: 0 20px 0 0;
		outline: none;
		color: #999;
		background: none;
		width: auto;
		font-size: 16px;
		line-height: 40px;
		height: 40px;
		.iconfont {
			margin: 0 2px;
			color: #fff;
			display: none;
			font-size: 14px;
			height: 34px;
		}
	}
	.add-update-preview .unBtn:hover {
		opacity: 0.8;
	}
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
		border: 1px solid #ddd;
		cursor: pointer;
		border-radius: 0px;
		margin: 0 280px 0 0;
		color: #000000;
		background: #fff;
		width: 90px;
		font-size: 24px;
		line-height: 60px;
		text-align: center;
		height: 60px;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
		border: 1px solid #ddd;
		cursor: pointer;
		border-radius: 0px;
		margin: 0 280px 0 0;
		color: #000000;
		background: #fff;
		width: 90px;
		font-size: 24px;
		line-height: 60px;
		text-align: center;
		height: 60px;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
		border: 1px solid #ddd;
		cursor: pointer;
		border-radius: 0px;
		margin: 0 280px 0 0;
		color: #000000;
		background: #fff;
		width: 90px;
		font-size: 24px;
		line-height: 60px;
		text-align: center;
		height: 60px;
	}
	.add-update-preview /deep/ .el-upload__tip {
		color: #666;
		font-size: 15px;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
		border: 1px solid #E8E8E8;
		border-radius: 0px;
		padding: 0 25px;
		color: #000000;
		width: 360px;
		font-size: 16px;
		line-height: 34px;
		height: 34px;
	}
	.add-update-preview .el-textarea /deep/ .el-textarea__inner[readonly="readonly"] {
				border: 1px solid #E8E8E8;
				border-radius: 0px;
				padding: 0 25px;
				color: #000000;
				width: 360px;
				font-size: 16px;
				line-height: 34px;
				height: 34px;
			}
	.add-update-preview .el-form-item.btn {
		padding: 0;
		margin: 20px 0 0;
		.btn1 {
			border: 0px solid #ccc;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 10px;
			margin: 0 10px 0 0;
			color: #fff;
			background: #6DB344;
			width: auto;
			font-size: 16px;
			min-width: 110px;
			height: 40px;
			.iconfont {
				margin: 0 2px;
				color: #fff;
				display: none;
				font-size: 14px;
				height: 40px;
			}
		}
		.btn1:hover {
			opacity: 0.8;
		}
		.btn2 {
			border: 0px solid #ccc;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 10px;
			margin: 0 10px 0 0;
			color: #fff;
			background: #37A3D1;
			width: auto;
			font-size: 16px;
			min-width: 110px;
			height: 40px;
			.iconfont {
				margin: 0 2px;
				color: #fff;
				display: none;
				font-size: 14px;
				height: 34px;
			}
		}
		.btn2:hover {
			opacity: 0.8;
		}
		.btn3 {
			border: 0px solid #ccc;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 10px;
			margin: 0 10px 0 0;
			color: #fff;
			background: #F5C5A9;
			width: auto;
			font-size: 16px;
			min-width: 110px;
			height: 40px;
			.iconfont {
				margin: 0 2px;
				color: #fff;
				display: none;
				font-size: 14px;
				height: 40px;
			}
		}
		.btn3:hover {
			opacity: 0.8;
		}
		.btn4 {
			border: 0px solid #ccc;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 10px;
			margin: 0 10px 0 0;
			color: #fff;
			background: #ADADAC;
			width: auto;
			font-size: 16px;
			min-width: 110px;
			height: 40px;
			.iconfont {
				margin: 0 2px;
				color: #fff;
				display: none;
				font-size: 14px;
				height: 40px;
			}
		}
		.btn4:hover {
			opacity: 0.8;
		}
		.btn5 {
			border: 0px solid #ccc;
			cursor: pointer;
			border-radius: 4px;
			padding: 0 10px;
			margin: 0 10px 0 0;
			color: #fff;
			background: #FFBB33;
			width: auto;
			font-size: 16px;
			min-width: 110px;
			height: 40px;
			.iconfont {
				margin: 0 2px;
				color: #fff;
				display: none;
				font-size: 14px;
				height: 40px;
			}
		}
		.btn5:hover {
			opacity: 0.8;
		}
	}
</style>
