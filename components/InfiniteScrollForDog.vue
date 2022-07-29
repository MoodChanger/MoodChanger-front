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
							@mouseenter="showOverlayForDog(item.id)"
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
							v-for="item in items2"
							:key="item.id"
							:src="item.url"
							:lazy-src="item.url"
							alt="No image"
							aspect-ratio="1"
							class="mb-5"
							@mouseenter="showOverlayForDog(item.id)"
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
							@mouseenter="showOverlayForDog(item.id)"
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
			imgNumbser: 0,
			indexCol: [0, 1, 2],
		};
	},
	methods: {
		...mapActions(['DOG_INFINITY']),
		async intersected() {
			const response = await this.DOG_INFINITY(this.page);
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
		showOverlayForDog(id) {
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
