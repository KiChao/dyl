<template>
	<view>
		<view class="default-window flex card">
			<view>
				<image :src="userInfo.headimgurl"
					style="width: 120rpx;height: 120rpx;display: block;border-radius: 50%;"></image>
			</view>
			<view style="padding: 0 30rpx;flex: 1;">{{userInfo.nickname}}</view>
			<view class="u-text-right" style="width: 200rpx;">
				<view>团队成员总数</view>
				<view class="font-green u-font-16">{{spread_num}}人</view>
			</view>
		</view>
		<view class="card">
			<view class="default-window">
				团队成员
			</view>
			<view v-if="team.length==0" class="default-window">
				<u-empty text="暂无团队"></u-empty>
			</view>
			<view v-for="(item,index) in team" :key="index" class="default-window flex">
				<view>
					<image :src="item.headimgurl" style="width: 80rpx;height: 80rpx;display: block;border-radius: 50%;">
					</image>
				</view>
				<view style="padding: 0 30rpx;flex: 1;">{{item.nickname}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				team: [],
				spread_num: 0,
			};
		},
		onReady() {
			this.getTeam();
			this.loadUserDetail();
		},
		methods: {
			//加载粉丝列表
			getTeam() {
				this.$api('UserCenter/my_team').then(data => {
					if (data.status == 1) {
						this.team = data.data.user;
					} else {
						this.$showToast(data.msg);
					}
				})
			},
			//加载个人资料
			loadUserDetail() {
				this.$api2('UserCenter/index').then(data => {
					if (data.status == 1) {
						this.userInfo = data.data.user;
						this.spread_num = data.data.spread_num;
					} else {
						this.$showToast(data.msg);
					}
				});
			},
		}
	}
</script>

<style lang="scss">

</style>
