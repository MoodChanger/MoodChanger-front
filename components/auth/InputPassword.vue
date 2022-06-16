<template>
	<ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
		<v-text-field
			:value="value"
			v-bind="$attrs"
			:maxlength="$attrs.counter"
			:error-messages="errors"
			:type="type ? 'password' : 'text'"
			@input="onInput"
		>
			<template #append>
				<v-btn icon small tabindex="-1" @click="type = !type">
					<v-icon>{{ type ? 'mdi-eye' : 'mdi-eye-off' }}</v-icon>
				</v-btn>
			</template>
		</v-text-field>
	</ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';

export default {
	name: 'InputPassword',
	components: {
		ValidationProvider,
	},
	model: {
		prop: 'value',
		event: 'input',
	},
	props: {
		value: String,
		rules: {
			type: [Object, String],
			default: '',
		},
	},
	data() {
		return {
			type: true,
		};
	},
	methods: {
		onInput(val) {
			this.$emit('input', val);
		},
	},
};
</script>

<style></style>
