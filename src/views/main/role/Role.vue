<template>
	<div id="role-manage">
		<div class="container">
			<query-form></query-form>

			<base-table></base-table>

			<edit-dialog></edit-dialog>

			<permission-dialog></permission-dialog>
		</div>
	</div>
</template>

<script>
import QueryForm from './QueryForm.vue'
import BaseTable from './BaseTable.vue'
import EditDialog from './EditDialog.vue'
import PermissionDialog from "./PermissionDialog.vue"
export default {
	name: "Role",
	components: {
		QueryForm,
		BaseTable,
		EditDialog,
		PermissionDialog
	}
}
</script>

<style lang="scss">
#role-manage {
	padding: 20px;
	height: 100%;
	box-sizing: border-box;

	.container {
		height: 100%;
		box-sizing: border-box;
	}
}
</style>