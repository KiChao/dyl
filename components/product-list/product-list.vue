<template>
	<view>
		<view style="padding: 10rpx;">
			<u-waterfall ref="uWaterfall" v-model="itemList">
				<template v-slot:left="{leftList}">
					<navigator hover-class="none" :url="`/pages/product/detail?loadId=${item.product_id}`" class="waterfall" v-for="(item, index) in leftList"
					 :key="index">
						<image class="waterfall-image" :src="item.image" mode="widthFix"></image>
						<view class="u-padding-10 u-font-sm bold">
							{{item.name}}
						</view>
						<view class="font-red u-padding-10">
							￥{{item.discount_price}}
						</view>
					</navigator>
				</template>
				<template v-slot:right="{rightList}">
					<navigator hover-class="none" :url="`/pages/product/detail?loadId=${item.product_id}`" class="waterfall" v-for="(item, index) in rightList"
					 :key="index">
						<image class="waterfall-image" :src="item.image" mode="widthFix"></image>
						<view class="u-padding-10 u-font-sm bold">
							{{item.name}}
						</view>
						<view class="font-red u-padding-10">
							￥{{item.discount_price}}
						</view>
					</navigator>
				</template>
			</u-waterfall>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList: []
			};
		},
		props: {
			productList: {
				type: Array
			}
		},
		watch: {
			productList() {
				this.itemList = this.productList;
			}
		},
		methods: {
			clearAll() {
				this.$refs.uWaterfall.clear();
			}
		}

	}
</script>

<style lang="scss">
	.waterfall {
		border-radius: 16rpx;
		margin: 20rpx 10rpx;
		background-color: #FFFFFF;
		position: relative;
		// box-shadow: 4rpx 4rpx 16rpx #bbb;

		.tip {
			position: absolute;
			right: -10rpx;
			top: 10rpx;
			z-index: 100;
		}


		.waterfall-image {
			border-top-left-radius: 16rpx;
			border-top-right-radius: 16rpx;
			width: 100%;
			display: block;
		}

		.head {
			border-radius: 50%;
			width: 50rpx;
			height: 50rpx;
			display: block;
		}
	}
</style>
