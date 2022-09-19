# 🧘 MoodChanger

## 프로젝트 소개
- 스트레스 받았을 때 동물사진과 일기장으로 마음이 차분해지는 웹사이트입니다.

## 기술 스택
- Vue, Nuxt, Vuetify
- Django Rest Framework

## 기능 / 소개
- 웹사이트 자체 회원가입, 로그인 기능이 있습니다.
- 회원가입시 ID중복검사가 가능합니다.
- 비밀번호 수정과 닉네임 수정이 가능합니다.
- 이메일을 활용하여 비밀번호 찾기가 가능합니다.
- JWT의 Access token과 Refresh token을 활용하여 로그인을 유지합니다.
- Infinite Scroll을 활용하여 동물사진을 계속 볼 수 있습니다.
- 좋아하는 동물 사진을 좋아요를 눌러 따로 볼 수 있습니다.
- CRUD기능을 활용하여 일기장을 생성, 조회, 수정, 삭제가 가능합니다.

## 미리보기
### [회원가입/로그인]
- 사이트 자체 회원가입과 로그인이 가능합니다
- 로그인을 하면 JWT로 로그인을 인증하고 유지합니다.

![image](https://user-images.githubusercontent.com/47138043/187603132-7c47b0cb-0f01-4fe0-9842-cc25350ed408.png)

![image](https://user-images.githubusercontent.com/47138043/187603687-65f6f005-f6ff-441d-a3a5-4478e4d4f26d.png)


### [비밀번호 수정/닉네임 수정]
- 서버와 통신을 하여 비밀번호와 닉네임을 수정합니다.

![image](https://user-images.githubusercontent.com/47138043/187603936-c74fd3ec-1981-4282-8ca6-7ee34cf3b06c.png)


### [동물 사진]
- Infinite Scroll로 동물 사진을 계속 볼 수 있습니다.
- 좋아요 기능이 가능하여 좋아하는 사진을 따로 볼 수 있습니다.

![image](https://user-images.githubusercontent.com/47138043/187603809-cf638ed9-6b05-411f-8e2e-6e02ab608c45.png)

![image](https://user-images.githubusercontent.com/47138043/187603780-a8662376-d958-4194-a2f3-f6757cd6d159.png)


### [일기장]
- 일기장을 생성, 조회, 수정, 삭제 할 수 있습니다.

![image](https://user-images.githubusercontent.com/47138043/187603830-bb2749e1-a7e1-464d-8580-1d6e4a8a9f7f.png)

![image](https://user-images.githubusercontent.com/47138043/187603821-c2c20b56-5e15-4cf3-8d89-f63a249de812.png)


## 회고
### [어려웠던 부분]
로그인 유지, 인증 기능을 개발하는 도중 처음에는 localStorage에만 유저 정보를 설정해놓으면 되는 줄 알았습니다.
하지만 그것은 클라이언트 부분에서만 고려한 것이었고 서버 부분은 고려하지 않은 생각이었습니다.

그래서 서버와 클라이언트 모두 로그인 인증, 유지를 하려면 middleware와 axios interceptor을 활용해야 한다는 걸 알았고 개념들을 공부하고 구현하기까지 오래 걸렸습니다.

다음에는 개발이 필요한 개념들을 공부하는 것과 어떤 방법으로 개발할지도 꼼꼼히 공부해야겠습니다.
- 로그인 유지, 인증을 하는 코드
![image](https://user-images.githubusercontent.com/47138043/191000195-f0284f6f-d534-4283-bc3c-52dcefae8383.png)






