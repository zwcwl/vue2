<template>
	<div id="dialog-form">
		<el-dialog title="添加部门" :visible="dialogVisible" @close="closeDialog" :close-on-click-modal="false">
			<el-form :model="deptDialogform" :rules="rules" status-icon ref="userDialogform" label-width="100px">
				<el-form-item label="部门名称" prop="deptName">
					<el-input v-model="deptDialogform.deptName" autocomplete="off" placeholder="请输入部门名称">
					</el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="userEmail">
					<el-input v-model="userDialogform.userEmail" autocomplete="off" placeholder="请输入用户邮箱">
						<template #append>@163.com</template>
					</el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input v-model="userDialogform.mobile" autocomplete="off" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="岗位" prop="job">
					<el-input v-model="userDialogform.job" autocomplete="off" placeholder="请选择岗位"></el-input>
				</el-form-item>
				<el-form-item label="用户状态" prop="userState">
					<el-select v-model="userDialogform.userState" placeholder="请选择用户状态" style="width: 100%">
						<el-option :value="1" label="在职"></el-option>
						<el-option :value="2" label="离职"></el-option>
						<el-option :value="3" label="试用期"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="系统角色" prop="systemRole">
					<el-select v-model="userDialogform.systemRole" placeholder="请选择系统角色" multiple style="width: 100%">
						<el-option v-for="role in roleList" :key="role._id" :label="role.roleName" :value="role._id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="部门" prop="deptList">
					<el-cascader v-model="userDialogform.deptList" :options="deptList" placeholder="请选择所属部门"
						:props="{ multiple: true, checkStrictly: true, value: '_id', label: 'deptName' }" clearable
						style="width: 100%">
					</el-cascader>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitDialog">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "DialogForm",
	data () {
		return {
			dialogVisible: false,
			deptDialogform:{

			}
		}
	},
	methods:{
		closeDialog(){
			this.dialogVisible=false
		}
	}
}
</script>

<style lang="scss">
</style>