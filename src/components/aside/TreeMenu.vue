<template>
	<div class="tree-menu">
		<template v-for="item in menuList">
			<el-submenu :key="item._id" v-if="item.menuType == 1" :index="item.path">
				<template slot="title">
					<i :class="item.icon"></i>
					<span slot="title">{{item.menuName}}</span>
				</template>
				<tree-menu :menuList="item.children"></tree-menu>
			</el-submenu>
			<el-menu-item v-else-if="item.menuType == 2" :index="item.path" :key="item.path">
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
		menuList: {
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