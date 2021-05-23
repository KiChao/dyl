<template>
	<view>
		<image @click="check" class="image" mode="widthFix" :src="poster"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				poster: ''
			};
		},
		onReady() {
			this.getPoster();
		},
		methods: {
			getPoster() {
				uni.showLoading({
					title:'加载中'
				})
				let params = {
					type: 1
				}
				this.$api('UserCenter/mini_qrcode').then(data => {
					if (data.status == 1) {
						this.poster = data.data.qrcode;
					} else {
						this.$showToast(data.msg);
					}
					uni.hideLoading();
				});
			},
			check() {
				// 预览图片
				let that = this;
				uni.previewImage({
					urls: [that.poster],

				});
			}
		}
	}
</script>

<style lang="scss">

</style>
