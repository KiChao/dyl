<template>
	<view>
		<image :src="articleDetail.image" class="image" mode="widthFix"></image>
		<view class="default-window white">
			<view class="bold">
				{{articleDetail.title||''}}
			</view>
			<view class="u-font-sm u-tips-color">
				{{articleDetail.subtitle||''}}
			</view>
			<view class="u-font-sm u-tips-color">
				{{articleDetail.time||''}}
			</view>
		</view>
		<view class="white default-window">
			<u-parse :html="articleDetail.content" :lazy-load="true" :show-with-animation="true" :selectable="true"></u-parse>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				loadId: null,
				articleDetail: {},
				fisherDetail: {},
			};
		},
		onShareAppMessage() {
			return {
				title: this.articleDetail.title,
				path: `/pages/article/detail?loadId=${this.articleDetail.article_id}&&sn=${uni.getStorageSync('sn')}`,
				imageUrl: this.articleDetail.image,
			}
		},
		onLoad(data) {
			this.loadId = data.loadId;
			this.$store.commit('setSn', {
				ref_sn: data.sn
			})
		},
		onReady() {
			this.loadArticle();
		},
		methods: {
			//加载资讯内容
			loadArticle() {
				let params = {
					article_id: this.loadId
				};
				this.$api('Article/detail', params).then(data => {
					
					if (data.status == 1) {
						this.articleDetail = data.data.article;
						uni.setNavigationBarTitle({
							title:this.articleDetail.title
						})
					} else {
						this.$showToast(data.msg);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.fisher-head {
		width: 100rpx;
		height: 100rpx;
		display: block;
		border-radius: 50%;
	}

	.name-window {
		padding-left: 30rpx;
	}
</style>
