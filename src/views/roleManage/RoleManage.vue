<template>
	<div id="role-manage">
		<div class="manage-container">
			<query-form></query-form>

			<table-content :roleList="roleList" :updateRole="updateRole" :page="page"></table-content>

			<dialog-form :roleList="roleList" :updateRole="updateRole"></dialog-form>
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
			roleList: [],
			page:{
				pageNum:1,
				pageSize:10,
				total:1
			}
		}
	},
	methods:{
		updateRole(res){
			this.roleList=res.list
			this.page=res.page
		}
	}
}
</script>

<style lang="scss">
#role-manage {
	padding: 20px;
	height: 100%;
	box-sizing: border-box;

	.manage-container {
		height: 100%;
		box-sizing: border-box;
	}
}
</style>