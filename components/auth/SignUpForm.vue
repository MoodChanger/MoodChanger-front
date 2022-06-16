<template>
	<ValidationObserver>
		<v-form ref="form" v-model="valid" @submit.prevent="save">
			<InputId
				v-model="form.email"
				label="이메일 주소"
				:counter="30"
				prepend-icon="mdi-account"
				rules="required|email"
			/>

			<InputPassword
				v-model="form.password1"
				label="비밀번호"
				counter="30"
				name="비밀번호"
				prepend-icon="mdi-lock"
				:rules="{
					required: true,
					min: 8,
					regex: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
				}"
			/>
			<InputPassword
				v-model="form.password2"
				label="비밀번호"
				counter="30"
				name="비밀번호 확인"
				prepend-icon="mdi-lock"
				rules="required|password:@비밀번호"
			/>
			<ValidationProvider v-slot="{ errors }" rules="required" name="이름">
				<v-text-field
					v-model="form.user_name"
					label="이름"
					counter="10"
					:maxlength="10"
					prepend-icon="mdi-card-account-details-outline"
					:error-messages="errors"
				/>
			</ValidationProvider>

			<InputDate
				v-model="form.user_birth"
				label="생년월일"
				counter="10"
				prepend-icon="mdi-calendar"
				:rules="{ required: true, regex: /^\d{4}-\d{2}-\d{2}$/ }"
			/>

			<InputRadio
				v-model="form.user_gender"
				:items="genderItems"
				row
				prepend-icon="mid-gender-male-female"
			/>
			<div class="text-center mt-3">
				<v-btn
					color="secondary"
					style="width: 100px"
					type="submit"
					:loading="isLoading"
					>회원가입</v-btn
				>
			</div>
		</v-form>
	</ValidationObserver>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import InputId from '@/components/auth/InputId';
import InputPassword from '@/components/auth/InputPassword';
import InputDate from '@/components/auth/InputDate';
import InputRadio from '@/components/auth/InputRadio';

export default {
	name: 'SignUpForm',
	components: {
		InputId,
		InputPassword,
		InputDate,
		InputRadio,
		ValidationProvider,
		ValidationObserver,
	},
	props: {
		isLoading: Boolean,
		rules: {
			type: [Object, String],
			default: '',
		},
	},
	data() {
		return {
			valid: true,
			form: {
				email: '',
				password1: '',
				password2: '',
				user_name: '',
				user_birth: '',
				user_gender: '',
			},
			genderItems: [
				{ label: '남자', value: 'M' },
				{ label: '여자', value: 'F' },
			],
		};
	},
	methods: {
		save() {
			this.$emit('onSave', this.form);
		},
	},
};
</script>

<style></style>
