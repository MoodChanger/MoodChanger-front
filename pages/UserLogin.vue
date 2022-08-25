<template>
	<v-content style="height: 90%">
		<v-container class="fill-height" fluid>
			<v-row align="center" justify="center">
				<v-col cols="12" sm="8" md="8">
					<v-card class="elevation-12">
						<v-window v-model="step">
							<v-window-item :value="1">
								<v-row>
									<v-col cols="12" md="8">
										<v-card-text class="mt-5">
											<h1
												class="text-center display-2 black--text text--accent-3 mb-7"
											>
												MoodChanger
											</h1>
											<SignInForm
												@clickStep="step++"
												@loginHandler="LOGIN_USER($event)"
											/>
										</v-card-text>
									</v-col>
									<v-col cols="12" md="4" class="secondary">
										<v-card-text class="white--text mt-5 mb-5">
											급히 해결하려해도 명확해지지 않은 일이 있을 때는 느긋하게
											내버려두면 저절로 풀릴 수 있으니 쉬이 분노하지 말라
										</v-card-text>
										<div class="text-center">
											<v-btn
												class="mb-2"
												outlined
												style="width: 100px"
												to="/UserJoin"
												>회원가입</v-btn
											>
										</div>
									</v-col>
								</v-row>
							</v-window-item>

							<v-window-item :value="2">
								<v-row class="pb-3">
									<v-col cols="12" md="4" class="secondary">
										<v-card-text class="white--text mt-5 mb-5">
											우리는 스스로에게 부끄럽지 않은 삶을 살고 싶지만, 시대가
											나를 휘감고 내가 시대에 살고 있는 한 삶에서 비겁해질
											수밖에 없다. 생의 비겁함을 인정하고 화해하는 것이다
										</v-card-text>
										<div class="text-center">
											<v-btn outlined style="width: 100px" @click="step--"
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
											<FindPwForm @resetPw="sendEmaiForPassword($event)" />
										</v-card-text>
									</v-col>
								</v-row>
							</v-window-item>
						</v-window>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-content>
</template>

<script>
import { mapActions } from 'vuex';
import SignInForm from '@/components/auth/SignInForm';
import FindPwForm from '@/components/auth/FindPwForm';

export default {
	name: 'UserLogin',
	components: {
		SignInForm,
		FindPwForm,
	},
	data() {
		return {
			step: 1,
			items: ['로그인', '비밀번호 찾기'],
		};
	},
	methods: {
		...mapActions(['LOGIN_USER', 'SEND_EMAIL_RESET_PASSWORD']),
		async sendEmaiForPassword(email) {
			console.log(email, 'eamil');
			await this.SEND_EMAIL_RESET_PASSWORD(email);
		},
	},
};
</script>

<style></style>
