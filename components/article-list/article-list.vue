<template>
	<view>
		<navigator v-for="(item,index) in articleList" :key="index" hover-class="none" :url="`/pages/article/detail?loadId=${item.article_id}`"
		 class="card">
			<image :src="item.image" mode="aspectFill" class="article-image"></image>
			<view class="default-window">
				<view class="bold">{{item.title}}</view>
				<view class="flex place u-tips-color u-font-sm">
					<view>
						{{item.time}}
					</view>
				</view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleList: []
			};
		},
		props: {
			loadlist: {
				type: Array,
			}
		},
		watch: {
			loadlist() {
				this.articleList = this.loadlist;
			}
		},
		mounted() {
			this.articleList = this.loadlist;
		}
	}
</script>

<style lang="scss">
	.article-image {
		width: 100%;
		height: 300rpx;
		display: block;
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
	}
</style>
