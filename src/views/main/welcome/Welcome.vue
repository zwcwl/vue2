<template>
	<div id="hello-view">
		<div class="title" @click="test">
			欢迎来到我的王国
		</div>
	</div>
</template>

<script>
export default {
	name: "HelloView",
	methods: {
		test () {
			this.$api.test({})
				.then(val => {
					console.log("🚀 ~ file: HelloView.vue ~ line 16 ~ test ~ val", val)
				})
		}
	}
}
</script>

<style lang="scss">
#hello-view {
	position: relative;
	height: 100%;
	background-image: url("../../../assets/images/yuner.webp");
	background-position: center 0;
	background-size: cover;
	background-repeat: no-repeat;

	.title {
		position: absolute;
		top: 100px;
		left: 100px;
		background-color: #fff;
		padding: 60px;
		border-radius: 10px;
		box-shadow: 3px 5px 12px 0 rgb(184, 183, 183);
	}
}
</style>