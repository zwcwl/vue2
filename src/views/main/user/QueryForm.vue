<template>
	<div id="query-form">
		<el-form :inline="true" :model="queryForm" class="demo-form-inline" ref="queryForm">
			<el-form-item label="用户名" prop="userName">
				<el-input v-model="queryForm.userName" placeholder="请输入用户名"></el-input>
			</el-form-item>
			<el-form-item label="用户ID" prop="userId">
				<el-input v-model="queryForm.userId" placeholder="请输入ID名"></el-input>
			</el-form-item>
			<el-form-item label="用户状态">
				<el-select v-model="queryForm.userState" placeholder="用户状态">
					<el-option label="所有" :value="0"></el-option>
					<el-option label="在职" :value="1"></el-option>
					<el-option label="离职" :value="2"></el-option>
					<el-option label="试用期" :value="3"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="querySubmit">查询</el-button>
				<el-button type="primary" @click="queryReset('queryForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	name: "QueryForm",
	data () {
		return {
			queryForm: {
				userName: "",
				userId: "",
				userState: 1
			},
		}
	},
	methods: {
		//点击搜索用户
		querySubmit () {
			this.$bus.$emit("getUser", this.queryForm)
		},

		//点击重置表单
		queryReset (formName) {
			this.$refs[formName].resetFields();
		},
	},
	mounted () {
		this.$bus.$emit("getUser", this.queryForm)
		this.$bus.$on("querySubmit", this.querySubmit)
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