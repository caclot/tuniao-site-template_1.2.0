<template>
	<view class="container">
		
		<tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left-arrow'></text>
			</view>
			<view class="tn-flex tn-flex-col-center tn-flex-row-center">
				<text class="tn-text-bold tn-text-xl tn-color-black">包裹转运</text>
			</view>
		</tn-nav-bar>
		
		
		<view class="sections">
			<uni-collapse accordion v-model="accordionVal" @change="change">
				
				<uni-collapse-item title="创建转运批次">
					<view class="content">
						<view class="uni-form-item uni-column">
							<view class="title">出发地转运中心编号：</view>
							<input class="uni-input" v-model="origin" placeholder="请输入出发地转运中心编号" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">目的地转运中心编号：</view>
							<input class="uni-input" v-model="destination" placeholder="请输入目的地转运中心编号" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">负责人ID：</view>
							<input class="uni-input" v-model="responsible" placeholder="请输入负责人ID" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">载具ID：</view>
							<input class="uni-input" v-model="vehicleId" placeholder="请输入载具ID" />
						</view>
						<view class="uni-form-item uni-column">
							<button @click="createBatch" class="uni-button">确定</button>
						</view>
					</view>
				</uni-collapse-item>

				<uni-collapse-item title="添加包裹到批次">
					<view class="content">
						<view class="uni-form-item uni-column">
							<view class="title">包裹ID：</view>
							<input class="uni-input" v-model="packageIds" placeholder="请输入包裹ID" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">批次ID：</view>
							<input class="uni-input" v-model="batchId" placeholder="请输入批次ID" />
						</view>
						<view class="uni-form-item uni-column">
							<button @click="addPackagesToBatch" class="uni-button">确定</button>
						</view>
					</view>
				</uni-collapse-item>

				<uni-collapse-item title="更新批次状态">
					<view class="content">
						<!-- 这里放更新批次状态的表单 -->
						<view class="uni-form-item uni-column">
							<view class="title">批次ID：</view>
							<input class="uni-input" v-model="batchId" placeholder="请输入批次ID" />
						</view>
						<view class="uni-form-item uni-column">
							<view class="title">状态：</view>
							<input class="uni-input" v-model="status" placeholder="请输入状态" />
						</view>
						<view class="uni-form-item uni-column">
							<button @click="updateBatchStatus" class="uni-button">确定</button>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>

	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	import '@/store/updateLocation.js';
	export default {
		name: 'TemplateHistory',
		mixins: [template_page_mixin],
		
		data() {
			return {
				// 第一个下拉框的数据
				accordionVal1: '0',
				origin: '',
				destination: '',
				responsible: '',
				vehicleId: '',

				// 第二个下拉框的数据
				accordionVal2: '0',
				packageIds: '',
				batchId2: '',

				// 第三个下拉框的数据
				accordionVal3: '0',
				batchId: '',
				status: ''
			};
		},
		methods: {
			change(e) {
				console.log(e);
			},

			createBatch() {
				// 构造提交的数据
				const postData = {
					origin: parseInt(this.origin),
					destination: parseInt(this.destination),
					responsible: parseInt(this.responsible),
					vehicleId: parseInt(this.vehicleId)
				};

				// 调用后端接口提交数据
				uni.request({
					url: 'http://139.196.211.123:8081/batch/createBatch',
					method: 'POST',
					data: postData,
					success: (res) => {
						// 提交成功，显示成功提示
						uni.showToast({
							title: '提交成功',
							icon: 'success'
						});
					},
					fail: (err) => {
						// 提交失败，显示失败提示
						uni.showToast({
							title: '提交失败，请重试',
							icon: 'none'
						});
					}
				});
			},
			addPackagesToBatch() {
				// 构造提交的数据
				const postData = {
					PackageIds: this.packageIds.split(',').map(id => parseInt(id.trim())), // 将输入的包裹ID字符串转为数组
					BatchId: parseInt(this.batchId) // 将输入的批次ID转为整数
				};

				// 调用后端接口提交数据
				uni.request({
					url: 'http://139.196.211.123:8081/package/addPackageToBatch',
					method: 'POST',
					data: postData,
					success: (res) => {
						// 提交成功，显示成功提示
						uni.showToast({
							title: '包裹添加成功',
							icon: 'success'
						});
					},
					fail: (err) => {
						// 提交失败，显示失败提示
						uni.showToast({
							title: '包裹添加失败，请重试',
							icon: 'none'
						});
					}
				});
			},
			updateBatchStatus() {
				const postData = {
					batchId: parseInt(this.batchId),
					status: this.status
				};

				// 调用后端接口更新批次状态
				uni.request({
					url: 'http://139.196.211.123:8081/batch/updateBatchStatus',
					method: 'POST',
					data: postData,
					success: (res) => {
						uni.showToast({
							title: '批次状态更新成功',
							icon: 'success'
						});
					},
					fail: (err) => {
						uni.showToast({
							title: '批次状态更新失败，请重试',
							icon: 'none'
						});
					}
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.example-body {
		flex-direction: column;
		flex: 1;
	}

	.content {
		padding: 15px;
	}

	.text {
		font-size: 14px;
		color: #666;
		line-height: 20px;
	}

	.button {
		// margin-top: 10px;
		margin: 10px;
		margin-bottom: 0;
	}

	.uni-form-item {
		margin-bottom: 15px;
	}

	.title {
		font-weight: bold;
		margin-bottom: 5px;
	}
	.sections {
		margin-top: 20%;
	}
	
	.uni-input {
		border: 1px solid #ccc;
		padding: 5px;
	}
	
	.uni-button {
		background-color: #007aff;
		color: #fff;
		padding: 10px 20px;
		border-radius: 5px;
		font-size: 16px;
	}
	
	.tn-custom-nav-bar__back {
		width: 60%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.15);
		border-radius: 1000rpx;
		border: 1rpx solid rgba(255, 255, 255, 0.5);
		color: #FFFFFF;
		font-size: 18px;
	
		.icon {
			display: block;
			flex: 1;
			margin: auto;
			text-align: center;
		}
	
	}
	
</style>