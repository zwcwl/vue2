<template>
	<div id="dialog-form">
		<el-dialog :title="dialogType == 'update' ? '更新菜单' : '新增菜单'" :visible="dialogVisible" @close="closeDialog"
			:close-on-click-modal="false">
			<el-form ref="roleDialogForm" :model="roleDialogForm" status-icon :rules="rules" label-width="100px">
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="roleDialogForm.roleName" placeholder="请输入角色名称"></el-input>
				</el-form-item>

				<el-form-item label="备注" prop="remark">
					<el-input type="textarea" v-model="roleDialogForm.remark" placeholder="请输入备注"></el-input>
				</el-form-item>
			</el-form>

			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button dialogType="primary" @click="submitDialog">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	name: "DialogForm",
	props: ["roleList", "updateRole"],
	data () {
		return {
			dialogVisible: false,
			dialogType: "",
			roleDialogForm: {
				roleName:"",
				remark:""
			},
			rules: {
				roleName: {
					required: true, message: '请输入角色名称', trigger: 'blur'
				}
			}
		}
	},
	methods: {
		//判断对话框的类型：编辑、新增
		roleDialogShow (dialogType,row) {
			this.dialogVisible = true
			this.dialogType = dialogType
			if (dialogType == "update") {
				this.editRoleDialog(row)
			}
		},

		//编辑对话框
		editRoleDialog (row) {
			this.$nextTick(() => {
				Object.assign(this.roleDialogForm,row)
			})
		},

		//dialog弹窗关闭触发的事件函数
		closeDialog () {
			this.dialogVisible = false
			this.$refs.roleDialogForm.resetFields();
		},

		//提交对话框
		submitDialog () {
			let { dialogType, roleDialogForm } = this
			this.$refs.roleDialogForm.validate(async (valid) => {
				if (!valid) return
				try {
					if (dialogType == "create") {
						await this.$api.postRole(roleDialogForm)
						this.$message.success("菜单新增成功")
					} else {
						await this.$api.putRole(roleDialogForm)
						this.$message.success("菜单更新成功")
					}
					this.closeDialog()
					// this.$bus.$emit("onSubmit")
				} catch (error) {
					this.$message.success("操作失败");
				}
			})
		}
	},
	created () {
		this.$bus.$on("roleDialogShow", this.roleDialogShow)
	}
}
</script>

<style lang="scss">
</style>