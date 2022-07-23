<template>
	<div id="query-form">
		<el-form :model="queryForm" :inline="true" ref="deptForm">
			<el-form-item label="部门名称" prop="deptName">
				<el-input v-model="queryForm.deptName" placeholder="请输入部门名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSubmit">查询</el-button>
				<el-button type="primary" @click="handleReset">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: 'QueryForm',
	data () {
		return {
			queryForm: {
				deptName: ""
			}
		}
	},
	methods: {
		handleSubmit(){
			this.$bus.$emit("getDept",this.queryForm)
		},
		handleReset(){
			this.$refs.deptForm.resetFields()
		}
	},
	mounted(){
		this.handleSubmit()
		this.$bus.$on("handleSubmit",this.handleSubmit)
	}
}
</script>

<style lang="scss">
#query-form {
	padding: 20px;
	background-color: #fff;

	.el-form-item {
		margin: 0 20px 0 0
	}
}
</style>