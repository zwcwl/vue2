<template>
	<div id="login-view">
		<el-form :model="user" status-icon :rules="rules" ref="ruleForm">
			<el-form-item prop="username">
				<el-input type="text" v-model="user.username" placeholder="请输入账号" prefix-icon="el-icon-user"></el-input>
			</el-form-item>
			<el-form-item prop="userpwd">
				<el-input type="password" v-model="user.userpwd" placeholder="请输入密码" prefix-icon="el-icon-view"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data () {
		return {
			user: {
				username: "",
				userpwd: ""
			},
			rules: {
				username: [
					{ required: true, message: "请输入账号", trigger: "blur" }
				],
				userpwd: [
					{ required: true, message: "请输入账号", trigger: "blur" }
				]
			}
		}
	},
	methods: {
		async submitForm (formName) {
			try {
				await this.$refs[formName].validate()
				let result = await this.$api.usersLogin(this.user)
        this.$message.success("登入成功")
				if (result) {
					this.$store.commit("addUserInfo",result)
					this.$router.replace("/")
				}
			} catch (error) {
        this.$message.error("error")
			}
		},
		resetForm (formName) {
			this.$refs[formName].resetFields()
		}
	}
}
</script>

<style lang="scss">
#login-view {
	height: 100%;
	background-color: #ccc;
	display: flex;
	justify-content: center;
	align-items: center;

	.el-form {
		width: 260px;
		padding: 20px;
		background-color: #fff;
		border-radius: 6px;

		.el-form-item:last-child {
			margin-bottom: 0;
		}
	}
}
</style>