<template>
	<view>
		<view class="card">
			<u-field v-model="name" label="姓名" placeholder="支付宝实名制姓名"></u-field>
			<u-field v-model="account" label="账户" placeholder="支付宝账户"></u-field>
		</view>
		<view class="default-window">
			<u-button @click="save" type="success" shape="circle">保存</u-button>
		</view>
		<view class="u-text-center u-font-12">请务必填写真实有效的支付宝信息</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				account: '',
			};
		},
		onReady() {
			this.load();
		},
		methods: {
			load() {
				this.$api('UserInfo/detail').then(data => {
					if (data.status == 1) {
						this.name = data.data.user_info.ali_real_name;
						this.account = data.data.user_info.ali_account;
					} else {
						this.$showToast(data.msg);
					}
				})
			},
			save() {
				if (!this.name || !this.account) {
					this.$showToast('请完整填写信息');
					return;
				}
				this.$showModal('是否保存?', () => {
					this.$api('UserInfo/edit', {
						ali_account: this.account,
						ali_real_name: this.name
					}).then(data => {
						if (data.status == 1) {
							this.$showToast(data.msg);
							uni.navigateBack();
						} else {
							this.$showToast(data.msg);
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
