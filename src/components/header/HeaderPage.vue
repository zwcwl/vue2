<template>
	<div id="header-page">
		<div class="lf-container">
			<div class="spread-shrink" @click="cutSpread">
				<el-button type="primary" :icon="isSpread ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></el-button>
			</div>
		</div>
		<div class="rt-container">
			<div class="user-utils">
				<el-dropdown trigger="click" style="display:block;">
					<div class="el-dropdown-link user-img">
						<img src="@/assets/images/logo.png" alt="">
					</div>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>黄金糕</el-dropdown-item>
						<el-dropdown-item>狮子头</el-dropdown-item>
						<el-dropdown-item>螺蛳粉</el-dropdown-item>
						<el-dropdown-item disabled>双皮奶</el-dropdown-item>
						<el-dropdown-item divided>蚵仔煎</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
	name: "HeaderPage",
	methods: {
		...mapMutations(["cutSpread"])
	},
	computed: {
		...mapState(["isSpread"])
	}
}
</script>

<style lang="scss">
#header-page {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100%;

	.lf-container {
		display: flex;
		align-items: center;

		.spread-shrink {
			.el-button {
				font-size: 26px;
				padding: 4px 10px;
			}
		}
	}

	.rt-container{
		display: flex;
		align-items: center;
		.user-utils{
			.user-img{
				width: 42px;
				height: 42px;
				border-radius: 50%;
				overflow: hidden;
				background-color: #fff;
				img{
					width: 100%;
				}
			}
		}
	}
}
</style>