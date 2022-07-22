<template>
	<div id="aside-page">
		<div class="title">
			<h2>hello</h2>
		</div>
		<el-menu :default-active="activeUrl" class="el-menu-vertical-demo" :collapse="isSpread" background-color="#545c64"
			text-color="#fff" router>
			<tree-menu :menuList="menuList"></tree-menu>
		</el-menu>
		<div class="spread-shrink" @click="cutSpread">
			<el-button type="primary" :icon="isSpread ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></el-button>
		</div>
	</div>
</template>

<script>
import TreeMenu from "./TreeMenu.vue"
export default {
	name: "AsidePage",
	data () {
		return {
			isSpread: false,
			menuList: [],
			activeUrl: ""
		}
	},
	methods: {
		cutSpread () {
			this.isSpread = !this.isSpread
			return this.isSpread
		},
		async getMenu () {
			let res = await this.$api.getMenu()
			this.menuList = res
		}
	},
	created () {
		this.$bus.$on("cutSpread", this.cutSpread)
		this.getMenu()
	},
	components: {
		TreeMenu
	},
	watch: {
		$route: {
			handler (val) {
				this.activeUrl = val.fullPath
			},
			immediate: true
		}
	}
}
</script>

<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}

#aside-page {
	height: 100%;
	position: relative;

	.title {
		height: 60px;
		color: #fff;
		background-color: #545c64;

		h2 {
			line-height: 60px;
		}
	}

	.el-menu {
		height: calc(100% - 60px);
		border: none;
	}

	.spread-shrink {
		position: absolute;
		bottom: 10px;
		right: -48px;
		z-index: 10;

		.el-button {
			padding: 4px 10px;
			font-size: 26px;
		}
	}
}
</style>