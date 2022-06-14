<template>
	<div id="aside-page">
		<div class="title">
			<h2>hello</h2>
		</div>
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isSpread">
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span slot="title">导航一</span>
				</template>
				<el-menu-item-group>
					<span slot="title">分组一</span>
					<el-menu-item index="1-1">选项1</el-menu-item>
					<el-menu-item index="1-2">选项2</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="分组2">
					<el-menu-item index="1-3">选项3</el-menu-item>
				</el-menu-item-group>
				<el-submenu index="1-4">
					<span slot="title">选项4</span>
					<el-menu-item index="1-4-1">选项1</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-menu-item index="2">
				<i class="el-icon-menu"></i>
				<span slot="title">导航二</span>
			</el-menu-item>
			<el-menu-item index="3" disabled>
				<i class="el-icon-document"></i>
				<span slot="title">导航三</span>
			</el-menu-item>
			<el-menu-item index="4">
				<i class="el-icon-setting"></i>
				<span slot="title">导航四</span>
			</el-menu-item>
		</el-menu>
		<div class="spread-shrink" @click="cutSpread">
			<el-button type="primary" :icon="isSpread ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></el-button>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
	name: "AsidePage",
	computed: {
		...mapState(["isSpread"])
	},
	methods: {
		...mapMutations(["cutSpread"])
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

	.title{
		height: 60px;

		h2{
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