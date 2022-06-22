<template>
	<div id="card-form">
		<div class="add-form"></div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
	#card-form{
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		background-color: rgba(0, 0, 0, .3);
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		.add-form{
			width: 260px;
			height: 360px;
			background-color: #fff;
		}
	}
</style>