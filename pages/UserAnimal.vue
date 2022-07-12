<template>
	<v-card>
		<v-tabs color="green darken-2" right>
			<v-tab>HOME</v-tab>
			<v-tab>DOG</v-tab>
			<v-tab>CAT</v-tab>
			<v-tab @click="checkLogin">SAVE</v-tab>

			<v-tab-item v-for="n in 4" :key="n">
				<v-container>
					<v-row>
						<v-col v-for="i in 6" :key="i" cols="12" md="4">
							<!-- <v-hover v-slot="{ hover }"> -->
							<v-img
								:src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
								:lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
								aspect-ratio="1"
							>
								<v-btn
									class="ml-2 mt-2"
									fab
									small
									color="white"
									@click="saveImg"
								>
									<!-- <v-icon v-if="heartColor"  color="red">mdi-heart</v-icon> -->
									<v-icon>mdi-heart-outline</v-icon>
								</v-btn>

								<!-- <v-fade-transition>
                    <v-overlay v-if="hover" absolute color="grey">
                      <v-btn @click="saveImg">SAVE</v-btn>
                    </v-overlay>
                  </v-fade-transition> -->
							</v-img>
							<!-- </v-hover> -->
						</v-col>
					</v-row>
				</v-container>
			</v-tab-item>
		</v-tabs>
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'UserAnimal',
	data() {
		return {
			heartColor: false,
		};
	},
	computed: {
		...mapGetters(['getLoggedIn']),
	},
	methods: {
		checkLogin() {
			// user.js에서 checkUser랑 비교하기
			if (!this.getLoggedIn) {
				alert('로그인 후 이용 가능합니다');
				this.$router.push('/userlogin');
			}
		},
		saveImg(event) {
			// if (!this.getLoggedIn) {
			//   alert('로그인 후 이용 가능합니다')
			// } else {
			// 이미지 id저장 후 SAVE 탭에서 보여주기
			// 회원 정보랑 같이 id저장
			// 하트 아이콘 빨간색으로 바꾸기
			// }
		},
	},
};
</script>

<style></style>
