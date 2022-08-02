import axios from 'axios';
import { setInterceptors } from './common/interceptor';

const axiosUserService = axios.create({
	baseURL: process.env.API_URL,
});

// 회원가입 API
function registerUser(form) {
	return axiosUserService.post('signup/', form);
}
// 중복검사 API
function duplicateCheck(email) {
	return axiosUserService.post('signup/check', email);
}
// 로그인 API
function loginUser(user) {
	return axiosUserService.post('login/', user);
}
// refresh Token API
function refreshTokenWithoutAccessToken(refreshToken) {
	return axiosUserService.post('token/refresh/', {
		refresh: refreshToken,
	});
}
// Access Token 체크 API
function checkAccessToken(token) {
	const accessToken = token;
	console.log(accessToken, '액시오스 에이피아이 액세스토큰');
	return axiosUserService.post('token/verify/', {
		token: accessToken,
	});
}
// 비번 초기화 이메일 전송 API
function sendEmailForResetPassword(userEmail) {
	return axiosUserService.post('password/reset/', {
		email: userEmail,
	});
}
// 비번 계정 인증 API(이메일 받고 비밀번호 수정하기) -> 알 수 없는 에러발생(백엔드?)
function resetPasswordFromEmail(form) {
	return axiosUserService.post('password/reset/confirm/', form);
}
// 고양이 사진 API
function cat() {
	return axiosUserService.get('cat/');
}
// 강아지 사진 API
function dog() {
	return axiosUserService.get('dog/');
}

function createAxiosServiceWithAuth() {
	const axiosService = axios.create({
		baseURL: process.env.API_URL,
	});
	return setInterceptors(axiosService);
}

const axiosServiceWithAuth = createAxiosServiceWithAuth();

// 비밀번호 수정 API
function updateUserPW(form) {
	return axiosServiceWithAuth.post('password/change/', form);
}
// 닉네임 수정 API = 사용자 정보 변경 API
function updateUserName(form) {
	return axiosServiceWithAuth.put('user/edit', form);
}
// 회원 탈퇴 API
function deleteUser() {
	return axiosServiceWithAuth.delete('user/byebye');
}
// 좋아요 등록 API
function addLikeImage(form) {
	return axiosServiceWithAuth.post('likes/', form);
}
// 좋아요 취소 API
function deleteLikeImage(id) {
	return axiosServiceWithAuth.delete(`likes/${id}/cancel`);
}
// 좋아요 목록 API
function getLikeImage(form) {
	return axiosServiceWithAuth.get(`likes/${form}`);
}
export {
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
};

/*
interceptor 필요 x API
회원가입 API : signup/ : ok
이메일 중복 확인 API : signup/check/ : ok
로그인 API : login/ : ok
토큰 인증 API : token/verify/ : ok
토큰 refresh API : token/refresh/ : ok
로그아웃 API : logout/ : ok
비번 초기화 이메일 전송 API : password/reset/ : ok
비번 계정 인증 API : password/reset/confirm/ : ▲(가끔씩 에러 발생)


interceptor 필요 o API
비번 변경 API : password/change/ : ok
사용자 정보 변경 API : user/edit : ok
회원 탈퇴 API : user/byebye : ok
사용자 정보 확인 API : user/

-----아직 확인 안한 api-----
고양이 사진 가져오기 API : cat/ : ok
개 사진 가져오기 API : dog/ : ok
좋아요 등록 API : likes/ : ok
좋아요 목록 (pk: email) API : likes/<str:pk> : ok
좋아요 취소 : likes/<inst:pk>/cancel : no
*/
