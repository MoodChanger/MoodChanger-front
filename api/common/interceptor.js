export function setInterceptors(axiosService) {
	// 요청 인터셉터 추가하기
	axiosService.interceptors.request.use(
		function (config) {
			// 요청이 전달되기 전에 작업 수행

			// vuex의 state.token도 추가해서 같이 체크하기 ||
			const user = JSON.parse(localStorage.getItem('user'));
			const accessToken = user.access_token;
			console.log(accessToken, '액세스 인터셉터');
			config.headers.Authorization = `Bearer ${accessToken}`;
			return config;
		},
		function (error) {
			// 요청 오류가 있는 작업 수행
			return Promise.reject(error);
		},
	);

	// 응답 인터셉터 추가하기
	axiosService.interceptors.response.use(
		function (response) {
			// 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
			// 응답 데이터가 있는 작업 수행
			return response;
		},
		function (error) {
			// 응답 오류가 있는 작업 수행
			// 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
			return Promise.reject(error);
		},
	);

	return axiosService;
}
