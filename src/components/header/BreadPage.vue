<template>
	<div id="bread-page">
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: item.path }" v-for="(item) in breadList" :key="item.name">
				{{ item.meta.name }}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	name: "BreadPage",
	data() {
		return {
			breadList: []
		}
	},
	created() {
		this.getBreadcrumb();
	},
	watch: {
		$route() {
			this.getBreadcrumb()
		}
	},
	methods: {
		isHome(route) { //拿到首页
			return route.meta.name === "首页";
		},
		getBreadcrumb() {
			let matched = this.$route.matched; //拿到显示的路由路径
			console.log('matched', matched)
			if (this.isHome(matched[0])) {//当前路由等于首页
				matched[0].path = "/"
				this.breadList = matched;
			}
			this.breadList = matched;
		}
	}
}
</script>

<style lang="scss">
#bread-page {
	.el-breadcrumb {
		font-size: 18px;

		.el-breadcrumb__item{
			i{
				color: black;
			}
		}
	}
}
</style>