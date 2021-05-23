<template>
	<view>
		<view class="default-window">
			<view class="title">输入短信验证码</view>
			<view class="number"><text class="u-tips-color">验证码已发送至</text><text class="font-green">(+86) {{phone}}</text></view>
		</view>
		<view style="padding: 100rpx 0;">
			<u-message-input active-color="#19be6b" :focus="true" :maxlength="6" mode="bottomLine" @finish="bind"></u-message-input>
		</view>
		<view class="default-window">
			<u-button @getuserinfo="wxLogin" open-type="getUserInfo" type="success">绑定</u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				captcha: ''
			};
		},
		onLoad(data) {
			this.phone = data.phone;
		},
		computed: {
			ref_sn() {
				return this.$store.state.login.ref_sn
			}
		},
		methods: {
			bind(e) {
				this.captcha = e;
			},
			//微信登录
			wxLogin(e) {
				this.$showLoading()
				let that = this;
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						wx.getUserInfo({
							success(res) {
								let params = {
									nickname: res.userInfo.nickName,
									headimgurl: res.userInfo.avatarUrl,
									code: code,
									sn: that.ref_sn,
									rawData: res.rawData,
									iv: res.iv,
									encryptedData: res.encryptedData,
									captcha: that.captcha,
									phone: that.phone
								}
								that.$api('Login/bind', params).then(data => {
									if (data.status == 1) {
										uni.setStorageSync('token', data.data.token);
										uni.setStorageSync('sn', data.data.sn);
										uni.navigateBack({});
										that.$showHide();
									} else {
										that.$showToast(data.msg);
									}

								})
							},
							fail() {
								that.$showHide()
							}
						})
					},
					fail: function(res) {
						that.$showHide()
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFFFF;
	}

	.title {
		font-size: 60rpx;
		padding-bottom: 40rpx;
		padding-top: 100rpx;
	}

	.number {
		font-size: 28rpx;
	}
</style>
