<template>
	<view>
		<view v-for="(item,index) in log" :key="index" class="card default-window flex place">
			<view>
				<view class="bold">{{item.remark}}</view>
				<view class="u-font-sm u-tips-color">{{item.time}}</view>
			</view>
			<view class="bold u-font-32" :class="{'add-style':item.symbol=='+' , 'reduce-style':item.symbol=='-'}">
				{{item.symbol}}{{item.num}}
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				log: [],
				type: 0,
				page: 0
			};
		},
		onReady() {
			this.loadLog();
		},
		onLoad(data) {
			this.type = data.type;
		},
		onReachBottom() {
			this.loadLog();
		},
		methods: {

			loadLog() {
				this.page = this.page + 1;
				let params = {
					page: this.page,
					limit: 10
				}
				this.$api('WalletLog/lists', params).then(data => {
					if (data.status == 1) {
						// this.log = data.data.wallet_log;
						let list = data.data.wallet_log;
						for (let m in list) {
							this.log.push(list[m]);
						}

					} else {
						this.$showToast(data.msg);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.add-style {
		color: #4CD964;
	}

	.reduce-style {
		color: #fa436a;
	}
</style>
