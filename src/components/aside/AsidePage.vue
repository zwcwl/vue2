<template>
	<div id="aside-page">
		<div class="title">
			<h2>hello</h2>
		</div>
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isSpread" background-color="#545c64" text-color="#fff">
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span slot="title">系统管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="1-1" @click="$router.replace('/manage')">用户管理</el-menu-item>
					<el-menu-item index="1-2">菜单管理</el-menu-item>
					<el-menu-item index="1-3">角色管理</el-menu-item>
					<el-menu-item index="1-3">部门管理</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span slot="title">审批管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="2-1">选项1</el-menu-item>
					<el-menu-item index="2-2">选项2</el-menu-item>
					<el-menu-item index="2-3">选项3</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
			<el-menu-item index="2">
				<i class="el-icon-menu"></i>
				<span slot="title">导航二</span>
			</el-menu-item>
		</el-menu>
		<div class="spread-shrink" @click="cutSpread">
			<el-button type="primary" :icon="isSpread ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: "AsidePage",
	data(){
		return {
			isSpread:false
		}
	},
	computed: {
	},
	methods: {
		cutSpread(){
			this.isSpread=!this.isSpread
			return this.isSpread
		}
	},
	created(){
		this.$bus.$on("cutSpread",this.cutSpread)
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
		color: #fff;
		background-color: #545c64;
		
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