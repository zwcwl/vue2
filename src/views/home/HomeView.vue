<template>
	<div id="home-view">
		<el-container>
			<el-aside width="auto">
				<aside-page></aside-page>
			</el-aside>
			<el-container>
				<el-header>
					<header-page></header-page>
				</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import AsidePage from "@/components/aside/AsidePage.vue"
import HeaderPage from "@/components/header/HeaderPage.vue"
export default {
	name: "HomeView",
	components: {
		AsidePage,
		HeaderPage
	}
}
</script>

<style lang="scss">
#home-view {
	height: 100%;

	.el-container {
		height: 100%;

		.el-header {
			background-color: #B3C0D1;
			color: #333;
		}

		.el-aside {
			background-color: #D3DCE6;
			color: #333;
			overflow: visible;
		}

		.el-main {
			background-color: #E9EEF3;
			color: #333;
			padding: 0;
		}
	}
}
</style>