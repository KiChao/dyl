<template>
	<view>
		<search-bar></search-bar>
		<swiper style="height: 56vw;" autoplay>
			<swiper-item @tap="linkJump(item.jump_url)" v-for="(item,index) in carouselList" :key="index">
				<image :src="item.img_url" class="image" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="modal-window">
			<view @tap="linkJump(item.jump_url)" v-for="(item,index) in modalList" :key="index" :style="{width: `${item.width}%`}">
				<u-image :fade="false" :src="item.img_url" width="100%" mode="widthFix"></u-image>
			</view>
		</view>
		<product-list :productList="productList"></product-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carouselList: [],
				modalList: [],
				productList: [],
				page: 0,
				
			}
		},
		onLoad(data) {
			if (data.scene) {
				let query = this.$getRequestParameters(decodeURIComponent(data.scene))
				let sn = query.sn;
				console.log(sn)
				if (sn) {
					this.$store.commit('setSn', {
						ref_sn: sn
					})
				} else {
					console.log('无sn')
				}
			
			}
		},
		onReady() {
			this.loadIndex();
			this.loadProduct();
		},
		onReachBottom() {
			this.loadProduct();
		},
		methods: {
			
			linkJump(url) {
				uni.navigateTo({
					url: url
				})
			},

			//加载商品列表
			loadIndex() {
				this.$api('Index/index').then(data => {
					if (data.status == 1) {
						this.carouselList = data.data.carousel;
						this.modalList = data.data.module;
					} else {
						this.$showToast(data.msg);
					}
				})
			},
			loadProduct() {
				this.page = this.page + 1;
				let params = {
					page: this.page,
					limit: 10
				};
				this.$api('Product/lists', params).then(data => {
					if (data.status == 1) {

						// this.productList = data.data.product;
						let list = data.data.product;
						for (let m in list) {
							this.productList.push(list[m]);

						}


					} else {
						this.$showToast(data.msg);
					}
				})
			}
		}
	}
</script>

<style>
	.modal-window {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	}
</style>
