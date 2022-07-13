<template>
	<div class="tree-menu">
		<template v-for="item in menu">
			<el-submenu :key="item._id" v-if="item.children && item.children.length > 0 && item.children[0].menuType == 1" :index="item.path">
				<template slot="title">
					<i :class="item.icon"></i>
					<span slot="title">{{item.menuName}}</span>
				</template>
				<tree-menu :menu="item.children"></tree-menu>
			</el-submenu>
			<el-menu-item v-else-if="item.menuType == 1" :index="item.path" v-bind:key="item.menuCode">
				<i :class="item.icon"></i>
				<span slot="title">{{item.menuName}}</span>
			</el-menu-item>
		</template>
	</div>
</template>

<script>
export default {
	name: "TreeMenu",
	props: {
		menu: {
			type: Array,
			default () {
				return []
			}
		}
	}
}
</script>

<style lang="scss">
</style>