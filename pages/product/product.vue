<template>
	<view>
		<product-list :productList="productList"></product-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadId: 0,
				productList: [],
			};
		},
		onLoad(data) {
			this.loadId = data.loadId;
			uni.setNavigationBarTitle({
				title:data.title
			})
		},
		onReady() {
			this.loadProduct();
		},
		methods: {
			loadProduct() {
				let params = {
					cate_id: this.loadId,
				};
				this.$api('Product/lists', params).then(data => {
					if (data.status == 1) {

						this.productList = data.data.product;
						

					} else {
						this.$showToast(data.msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
