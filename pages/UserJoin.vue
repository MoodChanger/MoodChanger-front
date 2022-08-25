<template>
	<v-content style="height: 90%">
		<v-container class="fill-height" fluid>
			<v-row align="center" justify="center">
				<v-col cols="12" sm="8" md="8">
					<v-card class="elevation-12">
						<v-row>
							<v-col cols="12" md="4" class="secondary">
								<v-card-text class="white--text">
									너무 애쓰지 않았으면 해. 이미 일어나 버린 일들과 일어나지 않은
									것들에 대한 걱정과 어쩔 수 없었던 선택과 그로 인한 결과들에
									생각만으로 해결되지 않는 고민들과 답이 되어 돌아오지 않는
									질문들과 이해할 수 없는 모든 문제들에 대해
								</v-card-text>
								<div class="text-center">
									<v-btn outlined style="width: 100px" to="/UserLogin"
										>로그인</v-btn
									>
								</div>
							</v-col>
							<v-col cols="12" md="8">
								<v-card-text class="mt-5">
									<h1
										class="text-center display-2 black--text text--accent-3 mb-7"
									>
										MoodChanger
									</h1>
									<SignUpForm :is-loading="isLoading" @onSave="save" />
								</v-card-text>
							</v-col>
						</v-row>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-content>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import SignUpForm from '@/components/auth/SignUpForm';
export default {
	name: 'UserJoin',
	components: { SignUpForm },
	data() {
		return {
			isLoading: false,
		};
	},
	computed: {
		...mapState(['validateEmail']),
	},
	methods: {
		...mapActions(['CREATE_USER']),
		async save(form) {
			try {
				if (this.validateEmail) {
					this.isLoading = true;
					await this.CREATE_USER(form);
					this.isLoading = false;
					console.log('form', form);
					this.$router.push('/');
				} else {
					this.$toast.show('중복검사 하세요');
				}
			} catch (error) {
				console.log('axios error', error.response);
			}
		},
	},
};
</script>

<style></style>
