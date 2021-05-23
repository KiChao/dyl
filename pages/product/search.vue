<template>
	<view>
		<u-sticky>
			<view class="white default-window search-window flex">
				<view style="flex: 1;">
					<u-search :show-action="false" border-color="#19be6b" color="#333333" search-icon-color="#19be6b" bg-color="#FFFFFF"
					 placeholder="输入搜索内容" v-model="searchValue" @search="search"></u-search>
				</view>
				<navigator url="/pages/cart/cart" hover-class="" style="padding-left: 30rpx;">
					<u-icon color="#19be6b" name="shopping-cart-fill" size="40"></u-icon>
				</navigator>
			</view>
		</u-sticky>
		<product-list ref="goodsList" :productList="productList"></product-list>
		<view v-if="productList.length==0" class="default-window">
			<u-empty text="搜索为空" mode="search"></u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList:[],
				searchValue:''
			}
		},
		onLoad(data) {
			this.searchValue = data.searchValue;
			if (this.searchValue) {
				this.search();
			}
		},
		methods: {
			search() {
				if (this.searchValue == '') {
					this.$showToast('请输入搜索内容')
				} else {
					this.$refs.goodsList.clearAll();
					let params = {
						name: this.searchValue
					}
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
	}
</script>

<style>

</style>
