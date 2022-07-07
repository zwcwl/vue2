<template>
	<div id="dialog-form">
		<el-dialog title="添加用户" :visible="dialogVisible" @close="dialogClose">
			<el-form :model="dialogFrom" :rules="rules" status-icon ref="dialogFrom">
				<el-form-item label="用户名" label-width="100px" prop="userName">
					<el-input v-model="dialogFrom.userName" autocomplete="off" placeholder="请输入用户名" prefix-icon="el-icon-user">
					</el-input>
				</el-form-item>
				<el-form-item label="邮箱" label-width="100px" prop="userEmail">
					<el-input v-model="dialogFrom.userEmail" autocomplete="off" placeholder="请输入用户邮箱" prefix-icon="">
						<template #append>@163.com</template>
					</el-input>
				</el-form-item>
				<el-form-item label="手机号" label-width="100px" prop="mobile">
					<el-input v-model="dialogFrom.mobile" autocomplete="off" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="岗位" label-width="100px" prop="job">
					<el-input v-model="dialogFrom.job" autocomplete="off" placeholder="请选择岗位"></el-input>
				</el-form-item>
				<el-form-item label="用户状态" label-width="100px" prop="userState">
					<el-select v-model="dialogFrom.userState" placeholder="请选择用户状态" style="width: 100%">
						<el-option :value="1" label="在职"></el-option>
						<el-option :value="2" label="离职"></el-option>
						<el-option :value="3" label="试用期"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="系统角色" label-width="100px" prop="systemRole">
					<el-select v-model="dialogFrom.systemRole" placeholder="请选择系统角色" multiple style="width: 100%">
						<el-option v-for="role in roleList" :key="role._id" :label="role.roleName" :value="role._id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门" label-width="100px" prop="deptList">
					<el-cascader v-model="dialogFrom.deptList" :options="deptList" placeholder="请选择所属部门"
						:props="{ multiple: true, checkStrictly: true, value: '_id', label: 'deptName' }" clearable
						style="width: 100%">
					</el-cascader>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogSubmit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data () {
		return {
			roleList: [],
			deptList: [],
			dialogVisible : false,
			action: "",
			dialogFrom: {
				userName: "",
				userEmail: "",
				mobile: "",
				job: "",
				userState: 1,
				systemRole: [],
				deptList: []
			},
			rules: {
				userName: [
					{
						required: true,
						message: "请输入用户名",
						trigger: "blur"
					}
				],
				userEmail: [
					{
						required: true,
						message: "请输入邮箱",
						trigger: "blur"
					}
				],
				deptList: [
					{
						required: true,
						message: "请填写所属部门",
						trigger: "blur"
					}
				]
			}
		}
	},
	methods: {
		//获取部门列表
		async getDept () {
			try {
				let list = await this.$api.getDept()
				this.deptList = list
			} catch (error) {
				console.log(error)
			}
		},

		//获取角色列表
		async getRole () {
			try {
				let list = await this.$api.getRole()
				this.roleList = list
			} catch (error) {
				console.log(error)
			}
		},

		//打开dialog弹窗表单
		dialogShow (row) {
			this.action = row.action
			if (row.action === "update") {
				this.handleEdit(row)
				return
			}
			this.dialogVisible = true
		},

		//dialog弹窗关闭触发的事件函数
		dialogClose () {
			this.dialogVisible = false
			this.$refs.dialogFrom.resetFields();
		},

		//dialog弹窗提交时触发的事件函数
		async dialogSubmit () {
			try {
				await this.$refs.dialogFrom.validate
				let data = JSON.parse(JSON.stringify(this.dialogFrom))
				data.userEmail += "@163.com"
				if (this.action === "update") {
					await this.$api.putUser(data)
					this.$message.success("用户更新成功")
				} else {
					await this.$api.postUser(data)
					this.$message.success("用户添加成功")
				}
				this.dialogClose()
				this.$bus.$emit("onSubmit")
			} catch (error) {
				console.log(error);
			}
		},
		//点击编辑按钮打开dialogFrom
		handleEdit (old) {
			this.dialogVisible = true
			this.$nextTick(() => {
				Object.assign(this.dialogFrom, old)
				this.dialogFrom.userEmail = this.dialogFrom.userEmail.split("@")[0]
			})
		},
	},
	created () {
		this.$bus.$on("dialogShow", this.dialogShow)
		this.getRole()
		this.getDept()
	},
}
</script>

<style lang="scss">
</style>