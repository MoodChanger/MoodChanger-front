<template>
	<v-radio-group :value="value" v-bind="$attrs" @change="onChange">
		<v-radio v-for="(item, i) in items" :key="i" v-bind="item"></v-radio>
	</v-radio-group>
</template>

<script>
export default {
	name: 'InputRadio',
	model: {
		prop: 'value',
		event: 'change',
	},
	props: {
		value: [String, Number, Object],
		items: {
			type: Array,
		},
	},
	methods: {
		onChange(val) {
			this.$emit('change', val);
		},
	},
};
</script>

<style></style>
