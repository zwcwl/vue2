<template>
	<div id="dialog-form">
		<el-dialog :title="dialogType == 'update' ? '更新菜单' : '新增菜单'" :visible="dialogVisible" @close="closeDialog"
			:close-on-click-modal="false">
			<el-form ref="menuDialogForm" :model="menuDialogForm" status-icon :rules="rules" label-width="100px">

				<el-form-item label="父级菜单" prop="parentId">
					<el-cascader v-model="menuDialogForm.parentId" :options="menuList" placeholder="请选择父级菜单"
						:props="{ checkStrictly: true, label: 'menuName', value: '_id' }" clearable style="width: 280px"
						:disabled="dialogType == 'update'">
					</el-cascader>
					<span style="margin-left:26px">当未选择时，将直接创建一级菜单</span>
				</el-form-item>

				<el-form-item label="菜单类型" prop="menuType">
					<el-radio-group v-model="menuDialogForm.menuType">
						<el-radio :label="1">目录</el-radio>
						<el-radio :label="2">菜单</el-radio>
						<el-radio :label="3">按钮</el-radio>
					</el-radio-group>
				</el-form-item>

				<el-form-item label="菜单名称" prop="menuName">
					<el-input v-model="menuDialogForm.menuName" placeholder="请输入菜单名称"></el-input>
				</el-form-item>

				<el-form-item label="菜单图标" prop="icon" v-show="menuDialogForm.menuType !== 3">
					<el-input v-model="menuDialogForm.icon" placeholder="请输入菜单图标"></el-input>
				</el-form-item>

				<el-form-item label="路由地址" prop="path" v-show="menuDialogForm.menuType !== 3">
					<el-input v-model="menuDialogForm.path" placeholder="请输入路由地址"></el-input>
				</el-form-item>

				<el-form-item label="权限标识" prop="menuCode">
					<el-input v-model="menuDialogForm.menuCode" placeholder="请输入权限标识"></el-input>
				</el-form-item>

				<el-form-item label="组件路径" prop="component" v-show="menuDialogForm.menuType !== 3">
					<el-input v-model="menuDialogForm.component" placeholder="请输入组件路径"></el-input>
				</el-form-item>

				<el-form-item label="菜单状态" prop="menuState">
					<el-radio-group v-model="menuDialogForm.menuState">
						<el-radio :label="1">正常</el-radio>
						<el-radio :label="2">失效</el-radio>
					</el-radio-group>
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
	data() {
		return {
			dialogVisible: false,
			dialogType: "",
			menuDialogForm: {
				parentId: [null],
				menuState: 1,
				menuType: 1,
				menuName: "",
				path: "",
				component: "",
				icon: ""
			},
			rules: {
				menuName: {
					required: true, message: '请输入菜单名称', trigger: 'blur'
				}
			},
			menuList: []
		}
	},
	methods: {
		//判断对话框的类型：编辑、局部新增、全局新增
		menuOpenDialog(dialogType, row) {
			this.dialogVisible = true
			this.dialogType = dialogType
			if (dialogType == "create") {
				this.menuDialogForm.parentId = [...row.parentId, row._id].filter((item) => item)
			} else if (dialogType == "update") {
				this.$nextTick(() => {
					delete row.children
					Object.assign(this.menuDialogForm, row)
				})
			}
		},

		//dialog弹窗关闭触发的事件函数
		closeDialog() {
			this.dialogVisible = false
			this.$refs.menuDialogForm.resetFields();
		},

		//提交对话框
		submitDialog() {
			let { dialogType, menuDialogForm } = this
			this.$refs.menuDialogForm.validate(async (valid) => {
				if (!valid) return
				if (dialogType == "create") {
					await this.$api.postMenu(menuDialogForm)
					this.$message.success("菜单新增成功")
				} else {
					await this.$api.putMenu(menuDialogForm)
					this.$message.success("菜单更新成功")
				}
				this.closeDialog()
				this.$bus.$emit("querySubmit")
			})
		}
	},
	created() {
		this.$bus.$on("menuOpenDialog", this.menuOpenDialog)
		setTimeout(()=>{
			this.menuList = this.$store.state.menu.menuList
		},1000)
	}
}
</script>

<style lang="scss">
</style>