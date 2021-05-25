<template>
	<view>
		<image src="/static/usercenter/rechange-bg.jpg" class="image" mode="widthFix"></image>
		<view class="Lwindow">
			<view @click="choose(item.recharge_tpl_id)" v-for="(item,index) in tpl" :key="index" class="item">
				<view class="items" :class="{active:rechangeId==item.recharge_tpl_id}">
					<view class="price">￥{{item.price}}</view>
					<view class="u-font-13">赠送￥{{item.give}}</view>
				</view>
			</view>
		</view>
		<view class="default-window">
			<u-button @click="create" type="success" shape="circle">充值</u-button>
		</view>

		<u-popup v-model="showArea" mode="bottom">
			<view class="default-window u-text-center bold">城市选择</view>
			<view class="u-border-bottom flex u-text-center bold font-green">
				<view class="default-window" style="flex: 1;">{{formData.province}}</view>
				<view class="default-window" style="flex: 1;">{{formData.city}}</view>
				<view class="default-window" style="flex: 1;">{{formData.county}}</view>
			</view>
			<view class="flex u-text-center">
				<view style="flex: 1;">
					<scroll-view :scroll-y="true" style="height: 800rpx;">
						<view @click="chooseProvince(province.city_id,province.name)" class="default-window"
							v-for="(province,tip) in provinceArray" :key="tip">
							{{province.name}}
						</view>
					</scroll-view>

				</view>
				<view style="flex: 1;">
					<scroll-view :scroll-y="true" style="height: 800rpx;">
						<view @click="chooseCity(city.city_id,city.name)" class="default-window"
							v-for="(city,tip) in cityArray" :key="tip">
							{{city.name}}
						</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tpl: [],
				rechangeId: '',

				//省份选择面板
				province: '省',
				city: '市',
				county: '县',
				provinceArray: [],
				cityArray: [],
				countyArray: [],
				showArea: false,
			}
		},
		onReady() {
			this.rechangeTpl();
			this.loadCity(0, 0);
		},
		methods: {
			// 充值列表
			rechangeTpl() {
				this.$api('Recharge/tpl').then(data => {
					if (data.status == 1) {
						this.tpl = data.data.tpl;
					} else {
						this.$showToast(data.msg);
					}
				})
			},
			//选择充值项目
			choose(id) {
				this.rechangeId = id;
			},
			//创建充值
			create() {
				this.$showModal('是否进行充值？', () => {
					if (this.rechangeId == '') {
						this.$showToast('请选择充值类目');
						return;
					}
					this.showArea = true;

				})
			},
			//加载省市县
			loadCity(parent, level) {
				let params = {
					parent_id: parent
				};
				this.$api('City/lists', params).then(data => {
					let list = data.data.city;
					switch (level) {
						case 0:
							this.provinceArray = list;
							break;
						case 1:
							this.cityArray = list;
							break;
						case 2:
							this.countyArray = list;
							break;
					}
				});
			},
			//选择省份
			chooseProvince(provinceId, provinceName) {
				this.loadCity(provinceId, 1);
				this.countyArray = [];
			},
			//选择城市
			chooseCity(cityId, cityName) {

				this.showArea = false;
				let params = {
					recharge_tpl_id: this.rechangeId,
					city_id: cityId
				}
				this.$api('Recharge/create', params).then(data => {
					if (data.status == 1) {
						let no = data.data.no;
						this.$api('Pay/recharge', {
							no: no
						}).then(data => {
							if (data.status == 1) {
								this.$pay(data.data.response).then(data => {
									this.$getD(() => {
										uni.reLaunch({
											url: '/pages/public/success'
										})
									})
									
								}).catch(res => {
									uni.switchTab({
										url: '/pages/usercenter/usercenter'
									})
									// this.$showToast(res.errMsg)
								})
							} else {
								this.$api(data.msg);
							}
						})
					} else {
						this.$showToast(data.msg);
					}
				})
			},

		}
	}
</script>

<style lang="scss">
	.Lwindow {
		padding: 10rpx;
		display: flex;
		flex-wrap: wrap;
		width: 100%;

		.item {
			width: 50%;
			padding: 10rpx;

			.items {
				background-color: #FFFFFF;
				padding: 30rpx 40rpx;
				border-radius: 16rpx;

				.price {
					font-size: 50rpx;
					color: #FA3534;
				}
			}

			.active {
				background-color: #19be6b;
				color: #FFFFFF;
			}
		}
	}
</style>
