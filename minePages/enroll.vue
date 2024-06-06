<template>


	<view class="container">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left-arrow'></text>
			</view>
			<view class="tn-flex tn-flex-col-center tn-flex-row-center">
				<text class="tn-text-bold tn-text-xl tn-color-black">登录登录</text>
			</view>
		</tn-nav-bar>
		<view class="register-container">
			<view class="register-form">
				<view class="logo">注册</view>
				<input v-model="name" type="text" placeholder="请输入姓名" class="input" />
				<input v-model="phone" type="text" placeholder="请输入手机号" class="input" />
				<input v-model="email" type="text" placeholder="请输入邮箱" class="input" />
				<input v-model="password" type="password" placeholder="请输入密码" class="input" />
				<van-field readonly v-model="selectedArea" label="网点" is-link placeholder="请选择网点" @click="showAreaPicker = true"/>
				        <van-popup v-model="showAreaPicker" round position="bottom">
				          <van-area :columns="areaList" @confirm="onAreaConfirm" @cancel="showAreaPicker = false" />
				        </van-popup>
				<view class="button" @tap="register">注册</view>
				<view class="login-link" @tap="goToLogin">已有账号？登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateHistory',
		mixins: [template_page_mixin],
		data() {
			return {
				name: '',
				email: '',
				phone: '',
				password: '',
				serveat: '',
			};
		},
		methods: {
			register() {
				// 检查输入是否为空
				if (!this.name.trim() || !this.phone.trim() || !this.email.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
					uni.showToast({
						title: '请输入完整信息',
						icon: 'none',
					});
					return;
				}
				// 检查密码和确认密码是否一致
				if (this.password !== this.confirmPassword) {
					uni.showToast({
						title: '两次输入的密码不一致',
						icon: 'none',
					});
					return;
				}
				// 发送注册请求
				uni.request({
					url: 'http://139.196.211.123:8081/employee/enroll',
					method: 'POST',
					data: {
						name: this.name,
						phone: this.phone,
						email: this.email,
						passwordHash: this.password,
					},
					success: (res) => {
						if (res.data.code === 200) {
							uni.showToast({
								title: '注册成功',
								icon: 'success',
								duration: 2000,
								success: () => {
									uni.navigateTo({
										url: 'login',
									});
								},
							});
						} else {
							uni.showToast({
								title: res.data.message || '注册失败，请重试',
								icon: 'none',
							});
						}
					},
					fail: (error) => {
						uni.showToast({
							title: '注册失败，请检查网络连接',
							icon: 'none',
						});
						console.error('Registration error:', error);
					},
				});
			},
			goToLogin() {
				uni.redirectTo({
				  url: 'login',
				});

			},
		},
	};
</script>

<style scoped>
	.register-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f5f5f5;
	}

	.register-form {
		width: 80%;
		max-width: 400px;
		padding: 20px;
		border-radius: 10px;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.logo {
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin-bottom: 20px;
	}

	.input {
		width: 90%;
		padding: 10px;
		margin-bottom: 15px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 16px;
	}

	.button {
		width: 100%;
		padding: 10px;
		background-color: #409eff;
		color: #fff;
		text-align: center;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
	}

	.button:hover {
		background-color: #66b1ff;
	}

	.login-link {
		text-align: center;
		font-size: 14px;
		color: #007bff;
		margin-top: 10px;
		cursor: pointer;
	}

	.login-link:hover {
		text-decoration: underline;
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


	.register-link:hover {
		text-decoration: underline;
	}
</style>