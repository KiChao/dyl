<template>
	<view>
		<!-- <view class="card default-window">
			<u-subsection :list="list" :current="type" @change="sectionChange"></u-subsection>
		</view> -->
		<view class="card  window">
			<view class="tixian default-window" style="align-items: flex-start;">
				<view class="left">
					提现至
				</view>
				<view class="right">
					<view class="flex title" v-if="type==0">
						<u-icon name="zhifubao-circle-fill" color="#2979ff"></u-icon><text style="color: #2979ff;">支付宝 {{aliAccount}}</text>
						<navigator url="/pages/usercenter/userData/userData" hover-class="none"><text class="u-font-sm" style="margin-left: 10rpx;">修改</text></navigator>
					</view>
					<view style="font-size: 24rpx;" class="u-tips-color">{{type==0?'支付宝':'微信'}}账号必须实名认证并与当前提现人名称一致方可提现成功，如需要先清除绑定，然后再重新绑定</view>
				</view>
			</view>
			<view class="tixian default-window" style="align-items: center;">
				<view class="left">
					到账周期
				</view>
				<view class="right">
					<view class="title">T+1</view>
				</view>
			</view>

			<view @click="show=true" class="tixian default-window" style="align-items: center;">
				<view class="left">
					提现金额
				</view>
				<view class="right flex">
					<view style="font-size: 28rpx;">￥{{value||'请输入提现金额'}}</view>
				</view>
			</view>
			<view class="default-window u-tips-color u-text-center u-font-sm">当前余额{{wallet}}，<text @click="all" class="font-green">全部提现</text></view>
		</view>
		<view class="default-window">
			<u-button @click="create" type="success" shape="circle">提交申请</u-button>
		</view>
		<view class="record-window">
			<view v-for="(item,index) in log" :key="index" class="card default-window record-item flex place">
				<view>
					<view class="record-name"><text>{{item.remark||'备注内容为空'}}</text></view>
					<!-- <view class="u-font-13">{{item.account_info.ali_account}}</view> -->
					<view class="time"><text>{{item.time}}</text></view>
				</view>
				<view>
					<u-tag v-if="item.status==0" text="申请中" size="mini" mode="dark" shape="circle"></u-tag>
					<u-tag v-if="item.status==1" text="成功" type="success" size="mini" mode="dark" shape="circle"></u-tag>
					<u-tag v-if="item.status==2" text="已拒绝" type="error" size="mini" mode="dark" shape="circle"></u-tag>
				</view>
			</view>
		</view>
		<u-keyboard ref="uKeyboard" mode="number" @change="valChange" @backspace="backspace" v-model="show"></u-keyboard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				value: '',
				wallet: 0,
				log: [],
				aliAccount: '',
				aliRealName: '',
				list: [{
					name: '提现到支付宝'
				}],
				type: 0,

			};
		},
		onReady() {
			this.getWallet();
			this.getWithdrawalLog();

		},
		onShow() {
			this.getAli();
		},
		methods: {
			sectionChange(index) {
				if (index == 0) {
					this.type = index;
				}
			},
			//读取支付宝信息
			getAli() {
				this.$api('UserInfo/detail').then(data => {
					if (data.status == 1) {
						this.aliRealName = data.data.user_info.ali_real_name || '';
						this.aliAccount = data.data.user_info.ali_account || '';
						if (this.aliAccount == '') {
							this.$showModal('您当前未填写支付宝信息，前往填写', () => {
								uni.navigateTo({
									url: '/pages/usercenter/userData/userData'
								})
							})
						}

					} else {
						this.$showToast(data.msg);
					}
				})
			},
			//全部提现
			all() {
				this.value = this.wallet;
			},
			//提交提现申请
			create() {
				if (this.value == '') {
					this.$showToast('请填写提现金额');
					return;
				}
				this.$showModal('是否提交提现申请？', () => {
					let params = {
						type: this.type + 1,
						num: this.value
					}
					this.$api('Withdrawal/create', params).then(data => {
						if (data.status == 1) {
							this.value = '';
							this.$showToast(data.msg, 'success');
							this.getWallet();
							this.getWithdrawalLog();
						} else {
							this.$showToast(data.msg);
						}
					})
				})
			},
			//获取提现记录
			getWithdrawalLog() {
				let params = {
					type: 1
				}
				this.$api('Withdrawal/lists', params).then(data => {
					if (data.status == 1) {
						this.log = data.data.withdraw;
					} else {
						this.$showToast(data.msg);
					}
				})
			},
			//获取钱包余额
			getWallet() {
				this.$api('Wallet/detail').then(data => {
					if (data.status == 1) {
						this.wallet = data.data.wallet.num_1;
					} else {
						this.$showToast(data.msg);
					}
				})
			},
			// 按键被点击(点击退格键不会触发此事件)
			valChange(val) {
				// 将每次按键的值拼接到value变量中，注意+=写法
				this.value += val;
				console.log(this.value);
			},
			// 退格键被点击
			backspace() {
				// 删除value的最后一个字符
				if (this.value.length) this.value = this.value.substr(0, this.value.length - 1);
				console.log(this.value);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.record-window {
		.record-item {
			.record-name {
				font-weight: bold;
			}

			.time {
				font-size: 26rpx;
				color: #909399;
				margin-top: 10rpx;
			}

			.value {
				font-size: 50rpx;
			}

			.add {
				color: #19be6b;
			}

			.reduce {
				color: #fa3534;
			}
		}
	}

	.tixian {
		display: flex;

		padding-bottom: 20rpx;

		// justify-content: space-between;
		.left {
			font-weight: bold;
			width: 160rpx;
		}

		.right {
			flex: 1;

			.title {
				font-weight: bold;

			}
		}
	}
</style>
