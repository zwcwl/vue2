<template>
	<div id="menu-manage">
		<div class="manage-container">
			<query-form></query-form>

			<table-content :menuList="menuList" :updateMenu="updateMenu"></table-content>

			<dialog-form :menuList="menuList" :updateMenu="updateMenu"></dialog-form>
		</div>
	</div>
</template>

<script>
import QueryForm from './QueryForm.vue'
import TableContent from './TableContent.vue'
import DialogForm from './DialogForm.vue'
export default {
	name: "ManageView",
	components: {
		QueryForm,
		TableContent,
		DialogForm
	},
	data(){
		return {
			menuList: []
		}
	},
	methods:{
		updateMenu(res){
			this.menuList=res
		}
	}
}
</script>

<style lang="scss">
#menu-manage {
	padding: 20px;
	height: 100%;
	box-sizing: border-box;

	.manage-container {
		height: 100%;
		box-sizing: border-box;
	}
}
</style>