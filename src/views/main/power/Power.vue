<template>
	<div id="power">
		<div class="container">
			<query-form></query-form>

			<base-table></base-table>

			<dialog-form></dialog-form>
		</div>
	</div>
</template>

<script>
import QueryForm from './QueryForm.vue'
import BaseTable from './BaseTable.vue'
import DialogForm from './DialogForm.vue'
export default {
	name: "Power",
	components: {
		QueryForm,
		BaseTable,
		DialogForm
	}
}
</script>

<style lang="scss">
#power {
	padding: 20px;
	height: 100%;
	box-sizing: border-box;

	.container {
		height: 100%;
		box-sizing: border-box;
	}
}
</style>