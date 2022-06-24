<template>
	<div class="dialog-form">
		<el-dialog title="添加用户" :visible.sync="dialogFormVisible">
			<el-form :model="dialogFrom" :rules="rules" status-icon>
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
					<el-select v-model="dialogFrom.userState" placeholder="请选择用户状态">
						<el-option :value="1" label="在职"></el-option>
						<el-option :value="2" label="离职"></el-option>
						<el-option :value="3" label="试用期"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="系统角色" label-width="100px" prop="roleList">
					<el-select v-model="dialogFrom.roleList" placeholder="请选择系统角色">
						<el-option :value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门" label-width="100px" prop="deptId">
					<el-cascader v-model="dialogFrom.deptId" :options="dialogFrom.options" paceholder="请选择所属部门"
						:props="{ checkStrictly: true, value: '_id', label: 'deptName' }" clearable></el-cascader>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data(){
		return {
			roleList: [],
			DeptList: [],
			dialogFormVisible: true,
			dialogFrom: {
				userName: "",
				userEmail: "",
				mobile: "",
				job: "",
				userState: 3,
				roleList: "",
				options: [],
				deptId: []
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
				deptId: [
					{
						required: true,
						message: "请输入邮箱",
						trigger: "blur"
					}
				]
			},
		}
	},
	methods: {
		//获取部门列表
		async getDept () {
			let list = await this.$api.getDept()
			this.DeptList = list
		},

		//获取角色列表
		async getRole () {
			let list = await this.$api.getRole()
			this.roleList = list
		},
	},
	mounted () {
		this.getDept()
		this.getRole()
	},
}
</script>

<style>
</style>