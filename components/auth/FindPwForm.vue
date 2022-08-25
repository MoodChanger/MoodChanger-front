<template>
	<v-form @submit.prevent="resetPw">
		<v-text-field
			v-model="email"
			label="이메일"
			prepend-icon="mdi-email"
			type="text"
		/>
		<div class="text-center mt-3">
			<v-btn class="secondary" style="width: 200px" type="submit"
				>비밀번호 찾기</v-btn
			>
		</div>
	</v-form>
</template>

<script>
export default {
	name: 'FindPwForm',
	data() {
		return {
			email: '',
		};
	},
	methods: {
		resetPw() {
			this.$emit('resetPw', this.email);
		},
	},
};
</script>

<style></style>
