<template>
	<div class="observer" />
</template>

<script>
export default {
	name: 'ObserverInfinite',
	data() {
		return {
			observer: null,
		};
	},
	mounted() {
		const options = this.options || {};
		this.observer = new IntersectionObserver(([entry]) => {
			if (entry && entry.isIntersecting) {
				this.$emit('intersect');
			}
		}, options);
		this.observer.observe(this.$el);
	},
	destroyed() {
		this.observer.disconnect();
	},
};
</script>

<style></style>
