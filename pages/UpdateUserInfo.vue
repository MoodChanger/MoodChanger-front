<template>
	<v-content style="height: 90%">
		<v-container class="fill-height" fluid>
			<v-row align="center" justify="center">
				<v-col cols="12" sm="8" md="8">
					<v-card class="elevation-12">
						<v-window v-model="step">
							<v-window-item :value="2">
								<v-row>
									<v-col cols="12" md="4" class="secondary">
										<v-card-text class="white--text mt-5 mb-5">
											프랑시스 북간도에 별에도 이름을 많은 묻힌 그리고 패,
											까닭입니다. 어머님, 이름과, 아름다운 겨울이 별 언덕 한 다
											사람들의 거외다. 이웃 자랑처럼 아무 사람들의 있습니다. 이
											것은 한 그리고 아직 까닭입니다.
										</v-card-text>
										<div class="text-center">
											<v-btn outlined style="width: 100px" @click="step--"
												>회원탈퇴</v-btn
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
											<ModifyUserInfo
												@updateUserPw="updateUserPw($event)"
												@updateUserName="updateUserName($event)"
											/>
										</v-card-text>
									</v-col>
								</v-row>
							</v-window-item>

							<v-window-item :value="1">
								<v-row class="pb-3">
									<v-col cols="12" md="8">
										<v-card-text class="mt-5">
											<h1
												class="text-center display-2 black--text text--accent-3 mb-7"
											>
												MoodChanger
											</h1>
											<RemoveUser @removeUser="removeUser($event)" />
										</v-card-text>
									</v-col>

									<v-col cols="12" md="4" class="secondary">
										<v-card-text class="white--text mt-5 mb-5">
											프랑시스 북간도에 별에도 이름을 많은 묻힌 그리고 패,
											까닭입니다. 어머님, 이름과, 아름다운 겨울이 별 언덕 한 다
											사람들의 거외다. 이웃 자랑처럼 아무 사람들의 있습니다. 이
											것은 한 그리고 아직 까닭입니다.
										</v-card-text>
										<div class="text-center">
											<v-btn outlined style="width: 100px" @click="step++"
												>회원정보 수정</v-btn
											>
										</div>
									</v-col>
								</v-row>
							</v-window-item>
						</v-window>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
	</v-content>

	<!-- <div class="d-flex justify-center align-center" style="height: 100%">
    <v-card max-width="400" width="100%" elevation="10">
      <v-toolbar>{{ title }} </v-toolbar>

      <v-tabs v-model="tabs">
        <v-tab v-for="(item, index) in items" :key="index" style="flex: 1">{{
          item
        }}</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <ModifyUserInfo
              @updateUserPw="updateUserPw($event)"
              @updateUserName="updateUserName($event)"
            />
          </v-tab-item>
          <v-tab-item>
            <RemoveUser @removeUser="removeUser($event)" />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div> -->
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ModifyUserInfo from '@/components/auth/ModifyUserInfo';
import RemoveUser from '@/components/auth/RemoveUser';

export default {
	name: 'ModifiedUserInfo',
	components: {
		ModifyUserInfo,
		RemoveUser,
	},
	data() {
		return {
			step: 2,
			items: ['회원정보 수정', '회원 탈퇴'],
		};
	},
	computed: {
		...mapState({
			title: state => state.state.title,
		}),
	},
	methods: {
		...mapActions('modules/user', ['updateUserPw']),
		...mapActions('modules/user', ['updateUserName']),
		...mapActions('modules/user', ['removeUser']),
	},
};
</script>

<style></style>
