<template>
	<v-form>
		<v-text-field
			v-model="form.email"
			label="아이디"
			prepend-icon="mdi-account"
			type="text"
		/>
		<InputPassword
			v-model="form.password"
			label="비밀번호"
			prepend-icon="mdi-lock"
		/>
		<div class="text-center mt-3">
			<v-btn style="width: 100px" class="mx-2 secondary" @click="loginUser"
				>로그인</v-btn
			>
			<v-btn style="width: 100px" class="mx-2 secondary" @click="plusStep"
				>비밀번호 찾기</v-btn
			>
		</div>
	</v-form>
</template>

<script>
import InputPassword from '@/components/auth/InputPassword';
export default {
	name: 'SignInForm',
	components: {
		InputPassword,
	},
	data() {
		return {
			form: {
				email: '',
				password: '',
			},
		};
	},
	methods: {
		loginUser() {
			this.$emit('loginHandler', this.form);
		},
		plusStep() {
			this.$emit('clickStep');
		},
	},
};
</script>

<style></style>
