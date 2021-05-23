<template>
	<view>
		<view class="user-window white flex place">
			<view class="flex">
				<view class="head-window">
					<image :src="userInfo.headimgurl||'/static/logo.png'" class="head" mode="aspectFill"></image>
				</view>
				<view v-if="loginStatus" class="nickname-window">
					<text>{{userInfo.nickname||'暂未填写昵称'}}</text>
					<!-- <navigator url="/pages/usercenter/integralRecord/integralRecord" hover-class="none">
						<u-tag :text="`钱包：${walletInfo.num_1}`" mode="dark"  shape="circle" type="success"></u-tag>
					</navigator> -->
					<navigator url="/pages/usercenter/team/team" class="u-font-14">推广人数：{{userInfo.spread_num}}</navigator>
				</view>
				<navigator v-else url="/pages/public/login" hover-class="none" class="nickname-window">
					请登录
				</navigator>
			</view>

			<view v-if="loginStatus" style="width: 20%;">
				<navigator hover-class="none" url="/pages/usercenter/customer/customer" class="btn-item">
					<view class="sign-btn u-text-center">
						联系客服
					</view>
				</navigator>
			</view>
		</view>
		<view v-if="loginStatus" class="card flex default-window wallet-window">
			<navigator hover-class="none" url="/pages/usercenter/integralRecord/integralRecord?type=1" class="wallet-item">
				<u-tag :text="`奖金余额：${walletInfo.num_1}`" mode="dark" shape="circle" type="success"></u-tag>
			</navigator>
			<navigator hover-class="none" url="/pages/usercenter/integralRecord/integralRecord?type=2" class="wallet-item">
				<u-tag :text="`充值余额：${wallet_4}`" mode="dark" shape="circle" type="success"></u-tag>
			</navigator>
		</view>
		<view v-if="loginStatus" class="card">
			<view class="default-window bold">
				订单记录
			</view>
			<view class="flex around order-window">
				<navigator hover-class="none" url="/pages/order/order?type=0" class="item">
					<view style="position: relative;">
						<image src="/static/usercenter/daifukuan.png" class="img" mode="aspectFill"></image>
						<u-badge :count="orderCount[0]" :offset="[-10, -10]"></u-badge>
					</view>
					<view class="title">待支付</view>
				</navigator>
				<navigator hover-class="none" url="/pages/order/order?type=1" class="item">
					<view style="position: relative;">
						<image src="/static/usercenter/daifahuo.png" class="img" mode="aspectFill"></image>
						<u-badge :count="orderCount[1]" :offset="[-10, -10]"></u-badge>
					</view>
					<view class="title">待发货</view>
				</navigator>
				<navigator hover-class="none" url="/pages/order/order?type=2" class="item">
					<view style="position: relative;">
						<image src="/static/usercenter/daishouhuo.png" class="img" mode="aspectFill"></image>
						<u-badge :count="orderCount[2]" :offset="[-10, -10]"></u-badge>
					</view>
					<view class="title">已发货</view>
				</navigator>
				<navigator hover-class="none" url="/pages/order/order?type=3" class="item">
					<image src="/static/usercenter/yiwancheng.png" class="img" mode="aspectFill"></image>
					<view class="title">已完成</view>
				</navigator>
				<navigator hover-class="none" url="/pages/order/order?type=4" class="item">
					<view style="position: relative;">
						<image src="/static/usercenter/daishouhuo.png" class="img" mode="aspectFill"></image>
						<u-badge :count="orderCount[8]" :offset="[-10, -10]"></u-badge>
					</view>
					<view class="title">其他</view>
				</navigator>

			</view>
		</view>
		<view v-if="loginStatus" class="card">
			<navigator hover-class="none" url="/pages/usercenter/userData/userData" class="default-window u-border-bottom flex place">
				<view class="flex">
					<u-icon name="zhifubao"></u-icon>
					<view style="padding: 0 30rpx;">用户信息</view>
				</view>
				<view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</navigator>
			<navigator hover-class="none" url="/pages/usercenter/withdrawal/withdrawal" class="default-window u-border-bottom flex place">
				<view class="flex">
					<u-icon name="red-packet"></u-icon>
					<view style="padding: 0 30rpx;">提现管理</view>
				</view>
				<view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</navigator>
			<navigator hover-class="none" url="/pages/address/address"
				class="default-window u-border-bottom flex place">
				<view class="flex">
					<u-icon name="map"></u-icon>
					<view style="padding: 0 30rpx;">地址管理</view>
				</view>
				<view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</navigator>
			<navigator hover-class="none" url="/pages/usercenter/poster/poster" class="default-window u-border-bottom flex place">
				<view class="flex">
					<u-icon name="photo"></u-icon>
					<view style="padding: 0 30rpx;">推广海报</view>
				</view>
				<view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</navigator>
			<navigator hover-class="none" url="/pages/usercenter/feedback/feedback"
				class="default-window u-border-bottom flex place">
				<view class="flex">
					<u-icon name="warning"></u-icon>
					<view style="padding: 0 30rpx;">意见反馈</view>
				</view>
				<view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</navigator>
			<navigator v-if="userInfo.celebrity_lv==0" url="/pages/public/bind1" hover-class="none"
				class="default-window u-border-bottom flex place">
				<view class="flex">
					<u-icon name="lock"></u-icon>
					<view style="padding: 0 30rpx;">绑定手机号码</view>
				</view>
				<view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</navigator>
			<navigator hover-class="none" url="/pages/usercenter/aboutUs/aboutUs"
				class="default-window u-border-bottom flex place">
				<view class="flex">
					<u-icon name="error-circle"></u-icon>
					<view style="padding: 0 30rpx;">关于我们</view>
				</view>
				<view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				waitRead: 0,
				loginStatus: false,
				orderCount: [],
				walletInfo: {}
			};
		},
		computed:{
			wallet_4(){
				return (parseFloat(this.walletInfo.num_2)+parseFloat(this.walletInfo.num_3)).toFixed(2);
			}
		},
		onShow() {
			this.loadUserDetail();
		},
		methods: {
			//加载个人资料
			loadUserDetail() {
				this.$api2('UserCenter/index').then(data => {
					if (data.status == 1) {
						this.userInfo = data.data.user;
						this.userInfo.spread_num = data.data.spread_num;
						this.loginStatus = true;
						this.orderCount = data.data.order_count;
						this.walletInfo = data.data.wallet;
					

					} else {
						this.$showToast(data.msg);
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.wallet-window {
		.wallet-item {
			flex: 1;
			text-align: center;
		}
	}

	.order-window {
		text-align: center;

		.item {
			padding: 20rpx 10rpx;
		}

		.img {
			width: 80rpx;
			height: 80rpx;
			display: block;
		}

		.title {
			font-size: 24rpx;
			line-height: 1.5;
		}
	}

	.integral-item {
		width: 75%;

		.value {
			// font-weight: bold;
			font-size: 36rpx;
			line-height: 1.5;
		}

		.title {
			font-size: 24rpx;

		}
	}

	.btn-item {
		.sign-btn {
			width: 100%;
			padding: 16rpx 0;
			background: linear-gradient(to left, #19be6b, #71d5a1);
			border-radius: 60rpx;
			color: #FFFFFF;
			font-size: 24rpx;
		}
	}


	.user-window {
		padding: 50rpx 40rpx;

		.head-window {
			width: 120rpx;
			height: 120rpx;
			box-shadow: 0rpx 0rpx 6rpx #808080;
			border-radius: 50%;
			box-sizing: border-box;

			.head {
				height: 120rpx;
				width: 120rpx;
				border-radius: 50%;
				display: block;
			}
		}

		.nickname-window {
			padding: 0 40rpx;
			font-weight: bold;
			font-size: 34rpx;
		}
	}
</style>
