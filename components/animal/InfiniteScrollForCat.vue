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
							<v-fade-transition>
								<v-overlay
									v-if="hover"
									absolute
									color="#036358"
									:value="item.overlay"
								>
									<v-icon v-if="!item.like" @click="clickHeartForCat(item)"
										>mdi-cards-heart-outline</v-icon
									>
									<v-icon v-else @click="deleteLikeImageForCat(item)"
										>좋아요 취소</v-icon
									>
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
									<v-icon v-if="!item.like" @click="clickHeartForCat(item)"
										>mdi-cards-heart-outline</v-icon
									>
									<v-icon v-else @click="deleteLikeImageForCat(item)"
										>좋아요 취소</v-icon
									>
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
									<v-icon v-if="!item.like" @click="clickHeartForCat(item)"
										>mdi-cards-heart-outline</v-icon
									>
									<v-icon v-else @click="deleteLikeImageForCat(item)"
										>좋아요 취소</v-icon
									>
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
import { mapActions, mapGetters } from 'vuex';
import ObserverInfinite from '@/components/animal/ObserverInfinite';
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
	computed: {
		...mapGetters(['getLoggedIn']),
	},
	methods: {
		...mapActions(['CAT_INFINITY', 'ADD_LIKE_IMAGES', 'REMOVE_LIKE_IMAGES']),
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
		async clickHeartForCat(item) {
			if (!this.getLoggedIn) {
				alert('로그인 후 이용 가능합니다');
				this.$router.push('/userlogin');
			} else if (!item.like) {
				const data = JSON.parse(window.localStorage.getItem('user'));
				const form = {
					url: item.url,
					user_email: data.user.email,
				};
				await this.ADD_LIKE_IMAGES(form);
				item.like = true;
			}
		},
		async deleteLikeImageForCat(item) {
			try {
				await this.REMOVE_LIKE_IMAGES(item.id);
				item.like = false;
			} catch (error) {
				console.log(error.response);
			}
		},
	},
};
</script>

<style></style>
