<template>
	<u-sticky>
		<view class="white default-window search-window flex">
			<view style="flex: 1;">
				<u-search :show-action="false" border-color="#19be6b" color="#333333" search-icon-color="#19be6b" bg-color="#FFFFFF"
				 placeholder="输入搜索内容" v-model="searchValue" @search="search"></u-search>
			</view>
			<navigator url="/pages/cart/cart" hover-class="" style="padding-left: 30rpx;position: relative;">
				<u-icon color="#19be6b" name="shopping-cart-fill" size="50"></u-icon>
				<u-badge type="error" :count="carNumber" size="mini" :offset="[-8,-14]"></u-badge>
			</navigator>
		</view>
	</u-sticky>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
			};
		},
		computed: {
			carNumber() {
				return this.$store.state.product.cartNum;
			}
		},
		onReady() {
			this.getCartNumber();
		},
		methods: {
			//点击搜索按钮
			search() {
				uni.navigateTo({
					url: '/pages/product/search?searchValue=' + this.searchValue
				})
			},
			//获取购物车数量
			getCartNumber() {
				this.$api('Cart/lists').then(data => {
					if (data.status == 1) {
						let cartNum = data.data.cart.length;
						this.$store.commit('changeCartNum', {
							cartNum: cartNum
						})
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
