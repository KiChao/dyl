<template>
	<view>
		<view class="u-padding-40 u-content-color u-font-12">
			您好，我们致力于为您提供优质的服务，如需帮助，请留言，我们将尽快联系并解决您的问题。
		</view>
		<view class="card">
			<view class="default-window">选择问题类别</view>
			<view class="flex around default-window">
				<u-tag @click="chooseItem=0;chooseText='投诉'" text="投诉" :type="chooseItem==0?'success':'info'" mode="dark" shape="circle"></u-tag>
				<u-tag @click="chooseItem=1;chooseText='建议'" text="建议" :type="chooseItem==1?'success':'info'" mode="dark" shape="circle"></u-tag>
				<u-tag @click="chooseItem=2;chooseText='故障'" text="故障" :type="chooseItem==2?'success':'info'" mode="dark" shape="circle"></u-tag>
				<u-tag @click="chooseItem=3;chooseText='其他'" text="其他" :type="chooseItem==3?'success':'info'" mode="dark" shape="circle"></u-tag>
			</view>
		</view>
		<view class="card">
			<view class="default-window">请描述问题</view>
			<view class="default-window">
				<u-input v-model="content" type="textarea" />
			</view>
		</view>
		<view class="default-window">
			<u-button @click="goSubmit" type="success">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				chooseItem: 0,
				chooseText: '投诉'
			};
		},
		methods: {
			//提交投诉
			goSubmit() {
				if (this.content == '') {
					this.$showToast('请填写内容');
					return;
				}
				this.$showModal('是否提交？', () => {
					let params = {
						content: `${this.chooseText}:${this.content}`
					}
					this.$api('Feedback/create', params).then(data => {
						if (data.status == 1) {
							this.$showToast(data.msg);
							this.content = '';
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
	.grid-text {
		font-size: 24rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>
