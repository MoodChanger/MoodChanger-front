<template>
	<div>
		<v-container fluid>
			<v-row>
				<v-hover v-slot="{ hover }">
					<v-col md="4">
						<v-img
							v-for="item in items1"
							:key="item.id"
							:src="item.url"
							:lazy-src="item.url"
							alt="No image"
							aspect-ratio="1"
							class="mb-5"
							@mouseenter="showOverlayForCat(item.id)"
						>
							<!-- 많은 사진들 중에 어떻게 해당 이미지만 hover되게 하지?
							- 모든 사진에 overlay: false를 추가한다
							- showOverlay로 해당 이미지의 id를 파라미터로 보낸다
							- showOverlay에서 파라미터로 해당 이미지 찾아 그 이미지 속성의 overlay: true로 바꾼다
							- v-overlay에서 overylay: true인 것만 오버레이 시킨다
							https://stackoverflow.com/questions/62360961/vue-overlay-for-specific-card
							 -->
							<v-fade-transition>
								<v-overlay
									v-if="hover"
									absolute
									color="#036358"
									:value="item.overlay"
								>
									<v-icon v-if="!item.like" @click="clickHeart(item)"
										>mdi-cards-heart-outline</v-icon
									>
									<v-icon v-else @click="deleteLikeImage">트루</v-icon>
									<!-- 
										클릭하면
										 로그인 o일 때 -> 빨간색 하트로 변경 
										 		빨간색 하트 한번 더 누르면 다시 빈 하트로 이동
										 로그인 x일 때 -> 로그인 해주세요 toast보내고 로그인 창으로 이동

									 -->
								</v-overlay>
							</v-fade-transition>
						</v-img>
					</v-col>
				</v-hover>

				<v-hover v-slot="{ hover }">
					<v-col md="4">
						<v-img
							v-for="item in items2"
							:key="item.id"
							:src="item.url"
							:lazy-src="item.url"
							alt="No image"
							aspect-ratio="1"
							class="mb-5"
							@mouseenter="showOverlayForCat(item.id)"
						>
							<v-fade-transition>
								<v-overlay
									v-if="hover"
									absolute
									color="#036358"
									:value="item.overlay"
								>
									<v-btn>See more info</v-btn>
								</v-overlay>
							</v-fade-transition>
						</v-img>
					</v-col>
				</v-hover>

				<v-hover v-slot="{ hover }">
					<v-col md="4">
						<v-img
							v-for="item in items3"
							:key="item.id"
							:src="item.url"
							:lazy-src="item.url"
							alt="No image"
							aspect-ratio="1"
							class="mb-5"
							@mouseenter="showOverlayForCat(item.id)"
						>
							<v-fade-transition>
								<v-overlay
									v-if="hover"
									absolute
									color="#036358"
									:value="item.overlay"
								>
									<v-btn>See more info</v-btn>
								</v-overlay>
							</v-fade-transition>
						</v-img>
					</v-col>
				</v-hover>
			</v-row>
		</v-container>
		<ObserverInfinite @intersect="intersected" />
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import ObserverInfinite from '@/components/ObserverInfinite';
export default {
	name: 'InfiniteScroll',
	components: {
		ObserverInfinite,
	},
	props: {
		index: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			page: 0,
			items1: [], // 사진 id 1,4,7 ~~
			items2: [], // 사진 id 2,5,8 ~~
			items3: [], // 사진 id 3,6,9 ~~
		};
	},
	methods: {
		...mapActions(['CAT_INFINITY']),
		async intersected() {
			const response = await this.CAT_INFINITY(this.page);
			this.page = this.page + 9;
			for (let i = 0; i < 9; i++) {
				if (i % 3 === 0) {
					this.items1.push(response[i]);
				} else if (i % 3 === 1) {
					this.items2.push(response[i]);
				} else if (i % 3 === 2) {
					this.items3.push(response[i]);
				}
			}
		},
		showOverlayForCat(id) {
			this.items1.forEach(element => {
				element.overlay = false;
				if (element.id === id) {
					element.overlay = true;
				}
			});
			this.items2.forEach(element => {
				element.overlay = false;
				if (element.id === id) {
					element.overlay = true;
				}
			});
			this.items3.forEach(element => {
				element.overlay = false;
				if (element.id === id) {
					element.overlay = true;
				}
			});
		},
		clickHeart(item) {},
		deleteLikeImage() {},
	},
};
</script>

<style></style>
