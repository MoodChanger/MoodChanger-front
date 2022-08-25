import {
	VALIDATE_FALSE,
	VALIDATE_TRUE,
	SET_USER,
	SET_TOKEN,
	LOGIN_FAILURE,
	LOGOUT,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
	FETCH_USER,
	REFRESH_TOKEN,
	UPDATE_USER,
} from '@/store/modules/mutation-types';
import {
	CREATE_USER,
	DUPLICATE_CHECK,
	LOGIN_USER,
	LOGOUT_USER,
	UPDATE_USER_PASSWORD,
	UPDATE_USER_NAME,
	CHECK_TOKEN,
	REMOVE_USER,
	SEND_EMAIL_RESET_PASSWORD,
	RESET_PASSWORD,
	CAT_INFINITY,
	DOG_INFINITY,
	ADD_LIKE_IMAGES,
	REMOVE_LIKE_IMAGES,
	FETCH_LIKE_IMAGES,
	CREATE_DIARY,
	FETCH_DIARY,
	GET_MY_DIARY,
	UPDATE_DIARY,
	REMOVE_DIARY,
} from '@/store/modules/actions-types';
import {
	registerUser,
	duplicateCheck,
	loginUser,
	updateUserPW,
	updateUserName,
	checkAccessToken,
	refreshTokenWithoutAccessToken,
	deleteUser,
	sendEmailForResetPassword,
	resetPasswordFromEmail,
	cat,
	dog,
	addLikeImage,
	deleteLikeImage,
	getLikeImage,
	addDiary,
	getDiary,
	getSpecificDiary,
	updateDiary,
	deleteDiary,
} from '@/api/index';

export const state = () => ({
	title: 'MoodChanger',
	footer: 'S.K all right reserved.',
	currentUser: {},
	validateEmail: false,
	token: {
		accessToken: '',
		refreshToken: '',
	},
});

export const getters = {
	getLoggedIn(state) {
		return !!state.currentUser;
	},
	getUserName(state) {
		return state.currentUser;
	},
	getUserAccessToken(state) {
		return state.token.accessToken;
	},
	getDiaryLists(state) {
		return state.diaryLists;
	},
};

export const mutations = {
	[VALIDATE_TRUE](state) {
		state.validateEmail = true;
	},
	[VALIDATE_FALSE](state) {
		state.validateEmail = false;
	},
	[SET_USER](state, date) {
		// state.loggedIn = true;
		state.currentUser = date.user;
	},
	[SET_TOKEN](state, data) {
		state.token.accessToken = data.access_token;
		state.token.refreshToken = data.refresh_token;
	},
	[LOGIN_FAILURE](state) {
		// state.loggedIn = false;
		state.currentUser = null;
	},
	[LOGOUT](state) {
		// state.loggedIn = false;
		state.currentUser = null;
	},
	[REGISTER_SUCCESS](state) {
		// state.loggedIn = false;
	},
	[REGISTER_FAILURE](state) {
		// state.loggedIn = false;
	},
	[FETCH_USER](state, payload) {
		state.currentUser = payload.user;
		// state.loggedIn = payload.loggedInState;
	},
	[REFRESH_TOKEN](state, user) {
		state.currentUser = user;
		// state.loggedIn = true;
	},
	[UPDATE_USER](state, user) {
		state.currentUser = user;
	},
};

export const actions = {
	fetchUser(context) {
		const userData = JSON.parse(localStorage.getItem('user'));
		if (userData) {
			context.commit(FETCH_USER, { user: userData.user, loggedInState: true });
		} else {
			context.commit(FETCH_USER, { user: null, loggedInState: false });
		}
	},
	// 회원가입
	async [CREATE_USER](context, form) {
		try {
			const response = await registerUser(form);
			context.commit(REGISTER_SUCCESS);
			const loginData = { email: form.email, password: form.password1 };
			await context.dispatch('loginUser', loginData);
			this.$toast.success('회원가입 성공');
			return response;
		} catch (error) {
			console.log(error.response);
			context.commit(REGISTER_FAILURE);
		}
	},
	// ID 중복검사
	async [DUPLICATE_CHECK](context, email) {
		try {
			// 이메일 empty로 날라오는거 못잡음
			const response = await duplicateCheck(email);
			return response.data; // false : 중복 O, true : 중복 X
		} catch (error) {
			console.log(error.response);
		}
	},
	// 로그인
	async [LOGIN_USER](context, user) {
		try {
			const response = await loginUser(user);
			if (response) {
				this.$toast.success('로그인 성공');
				localStorage.setItem('user', JSON.stringify(response.data));
				context.commit(SET_USER, response.data);
				context.commit(SET_TOKEN, response.data);
				this.$router.push('/');
			}
		} catch (error) {
			console.log('error ', error.response);
			this.$toast.error('ID나 PW를 다시 확인하세요');
			context.commit(LOGIN_FAILURE);
			this.$router.push('/userlogin');
		}
	},
	// 로그아웃
	[LOGOUT_USER](context) {
		localStorage.removeItem('user');
		context.commit(LOGOUT);
		this.$toast.show('즐거운 하루 보내세요');
		this.$router.push('/');
	},
	// 비밀번호 수정
	async [UPDATE_USER_PASSWORD](context, form) {
		try {
			await updateUserPW(form);
			context.commit(UPDATE_USER);
			this.$toast.success('비밀번호를 수정했습니다.');
			this.$router.push('/');
		} catch (error) {
			this.$toast.error('비밀번호 수정이 실패했습니다');
			console.log(error.response);
		}
	},
	// 닉네임 수정
	async [UPDATE_USER_NAME](context, form) {
		try {
			const response = await updateUserName(form);

			// 로컬스토리지 업데이트
			const userData = JSON.parse(localStorage.getItem('user'));
			userData.user.user_name = form.user_name;
			localStorage.setItem('user', JSON.stringify(userData));

			context.commit(UPDATE_USER, userData);
			// 서버에서 먼저 실행되니 response.user_name는 undefinde가 뜬다
			this.$toast.success(`${response.user_name}님 수정이 완료되었습니다.`);
			this.$router.push('/');
		} catch (error) {
			console.log('error', error.response);

			this.$toast.error('수정을 다시해주세요.');
			this.$router.push('/UpdateUserInfo');
		}
	},
	// 회원 탈퇴
	async [REMOVE_USER](context) {
		try {
			await deleteUser();
			context.commit(LOGOUT);
			this.$toast.show('회원 탈퇴가 완료되었습니다.');
			this.$router.push('/');
		} catch (error) {
			console.log('error', error);
			this.$toast.error('서버에 에러가 있습니다.');
		}
	},
	// 비밀번호 수정을 위한 이메일 보내기
	async [SEND_EMAIL_RESET_PASSWORD](context, userEmail) {
		try {
			await sendEmailForResetPassword(userEmail);
			this.$toast.show('이메일을 확인해주세요');
			this.$router.push('/');
		} catch (error) {
			console.log(error.response);
		}
	},
	// 비밀번호 수정 이메일 받고 비밀번호 수정
	async [RESET_PASSWORD](context, form) {
		try {
			const response = await resetPasswordFromEmail(form);
			console.log(response, 'RESET_PASSWORD');
			this.$toast.success('비밀번호가 수정되었습니다.');
			this.$router.push('/');
		} catch (error) {
			this.$toast.error('비밀번호 수정이 실패했습니다.');
			console.log(error.response);
		}
	},
	// access token, refresh token 체크
	async [CHECK_TOKEN](context) {
		if (process.browser) {
			const user = JSON.parse(localStorage.getItem('user')) || '';
			if (user) {
				try {
					await checkAccessToken(user.access_token);
				} catch (error) {
					if (error.response.status === 401) {
						// access token의 기간 만료로 refresh token api 실행
						try {
							const response = await refreshTokenWithoutAccessToken(
								user.refresh_token,
							);

							// At x, Rt o
							user.access_token = response.data.access;
							localStorage.setItem('user', JSON.stringify(user));
							context.commit(REFRESH_TOKEN, user);
						} catch (error) {
							// At x , Rt x
							context.commit(LOGOUT);
							localStorage.removeItem('user');
							// redirect해도 될듯
							this.$router.push('/');
						}
					}
				}
			} else {
				console.log('first');
				// redirect으로 main으로 보내기
			}

			// process.browser의 else
		} else {
			// redirect으로 main으로 보내기
		}
	},
	// 고양이 사진
	async [CAT_INFINITY](context, page) {
		const response = await cat();
		const items = [];
		for (let i = page; i < page + 9; i++) {
			const addOverlayData = {
				...response.data[i],
				overlay: false,
				like: false,
			};
			items.push(addOverlayData);
		}
		return items;
	},
	// 강아지 사진
	async [DOG_INFINITY](context, page) {
		const response = await dog();
		const items = [];
		for (let i = page; i < page + 9; i++) {
			const addOverlayData = {
				...response.data[i],
				overlay: false,
				like: false,
			};
			items.push(addOverlayData);
		}
		return items;
	},
	// 좋아요 누르기
	async [ADD_LIKE_IMAGES](context, form) {
		try {
			await addLikeImage(form);
			this.$toast.show('저장되었습니다.');
		} catch (error) {
			this.$toast.error('서버에 에러가 발생했습니다');
			console.log(error.response);
		}
	},
	// 좋아요 취소
	async [REMOVE_LIKE_IMAGES](context, id) {
		try {
			const response = await deleteLikeImage(id);
			console.log(response, ' here is delete like images');
			this.$toast.show('취소되었습니다.');
		} catch (error) {
			this.$toast.error('서버에 에러가 발생했습니다');
			console.log(error.response);
		}
	},
	// 좋아요 누른 사진 받아오기
	async [FETCH_LIKE_IMAGES](context, email) {
		try {
			const response = await getLikeImage(email);
			return response.data;
		} catch (error) {
			this.$toast.error('서버에 에러가 발생했습니다');
			console.log(error.response);
		}
	},
	// 일기장 등록
	async [CREATE_DIARY](context, form) {
		try {
			await addDiary(form);
			this.$toast.success('게시글 완성되었습니다');
			this.$router.push('/userfeeling');
		} catch (error) {
			this.$toast.error('서버에 에러가 발생했습니다');
			console.log(error.response);
		}
	},
	// 일기장 목록 받아오기
	async [FETCH_DIARY](context) {
		try {
			const response = await getDiary();
			return response;
		} catch (error) {
			this.$toast.error('서버에 에러가 발생했습니다');
			console.log(error.response);
		}
	},
	// 특정 일기장 받아오기
	async [GET_MY_DIARY](context, id) {
		try {
			const response = await getSpecificDiary(id);
			return response;
		} catch (error) {
			this.$toast.error('서버에 에러가 발생했습니다');
			console.log(error.response);
		}
	},
	// 특정 일기장 수정
	async [UPDATE_DIARY](context, form) {
		try {
			await updateDiary(form);
		} catch (error) {
			this.$toast.error('서버에 에러가 발생했습니다');
			console.log(error.response);
		}
	},
	// 특정 일기장 삭제
	async [REMOVE_DIARY](context, id) {
		try {
			await deleteDiary(id);
			alert('삭제하였습니다');
			this.$router.push('/userfeeling');
		} catch (error) {
			this.$toast.error('서버에 에러가 발생했습니다');
			console.log(error.response);
		}
	},
};
