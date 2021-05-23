<template>
	<view>
		<article-list :loadlist="articleList"></article-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleList: [],
				page: 0,
			}
		},
		onReady() {
			this.loadArticle();
		},
		onReachBottom() {
			this.loadArticle();
		},
		methods: {
			//加载渔夫号资讯
			loadArticle() {
				this.page = this.page + 1;
				let params = {
					page: this.page,
					limit:10
				};
				this.$api('Article/lists', params).then(data => {
					if (data.status == 1) {
						this.loadStatus = 'loading';
						let list = data.data.article;
						for (let m in list) {
							this.articleList.push(list[m]);
						}
					} else {
						this.$showToast(data.msg);
					}
				});
			}
		}
	}
</script>

<style>

</style>
