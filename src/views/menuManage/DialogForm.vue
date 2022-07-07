<template>
	<div id="dialog-form">
		<el-dialog title="新增菜单" :visible="dialogVisible">

		</el-dialog>
	</div>
</template>

<script>
export default {
	name:"DialogForm",
	data(){
		return {
			dialogVisible :false,
			action:""
		}
	}
}
</script>

<style lang="scss">

</style>