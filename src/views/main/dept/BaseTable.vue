<template>
	<div id="base-table">
		<el-card class="box-card" shadow="never">
			<div slot="header" class="clearfix">
				<el-button type="primary" @click="deptOpenDialog('create')">添加</el-button>
			</div>
			<div class="table">
				<el-table ref="multipleTable" :data="deptList" tooltip-effect="dark" row-key="_id"
					style="width: 100%" stripe border>
					<el-table-column v-for="item in columns" :key="item.prop" v-bind="item"
						:formatter="item.formatter" :width="item.width">
					</el-table-column>

					<el-table-column label="操作" width="143px">
						<template slot-scope="scope">
							<el-button size="mini" @click="deptOpenDialog('update', scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="handleDel(scope.row._id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>

				<el-pagination class="page" background layout="prev, pager, next" :total="page.total" @current-change="handleCurrentChange">
				</el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
export default {
	name: "tableContent",
	data(){
		return {
			deptList:[],
			columns:[
				{
					label:"部门名称",
					prop:"deptName",
					width:""
				},{
					label:"负责人",
					prop:"userName"
				},{
					label:"更新时间",
					prop:"updateTime"
				},{
					label:"创建时间",
					prop:"createTime"
				}
			],
			page:{
				pageName:1,
				pageSize:10,
				total:1
			}
		}
	},
	methods:{
		deptOpenDialog(dialogType,row){
			this.$bus.$emit("deptOpenDialog",dialogType,row)
		},

		async getDept(queryForm){
			let res= await this.$api.getDept(queryForm)
			this.deptList=res
		},
		
		handleCurrentChange(val){

		},
		
		async handleDel(id){
			await this.$api.delDept(id)
		},
	},
	created(){
		this.$bus.$on("getDept",this.getDept)
	}
}
</script>

<style lang="scss">
#base-table {
	margin-top: 20px;

	.page {
		margin-top: 20px;
		text-align: right;
	}
}
</style>