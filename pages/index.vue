<template>
	<v-main>
		<!-- <v-container
			grid-list-xs
			class="d-flex justify-space-around align-center set-background-image"
			style="height: 100%"
			fluid
		>
			<div v-for="(card, index) in cards" :key="index">
				<v-card
					max-width="300px"
					max-height="410px"
					height="100%"
					class="d-flex justify-center align-center flex-column"
				>
					<v-img
						:src="card.imgSrc"
						max-width="240px"
						max-height="280px"
						width="100%"
						class="mt-3"
					/>
					<v-card-actions>
						<NuxtLink :to="{ path: card.path }">
							<v-btn class="pa-10 pl-16 pr-16 mt-3 mb-3" color="primary">{{
								card.title
							}}</v-btn>
						</NuxtLink>
					</v-card-actions>
				</v-card>
			</div>
		</v-container> -->
	</v-main>
</template>

<script>
// import animalImg from '@/assets/images/animal.jpg';
// import feelinglImg from '@/assets/images/feeling.jpg';

export default {
	name: 'IndexPage',
	data() {
		return {
			// cards: [
			// 	{ title: 'Animal', path: '/useranimal', imgSrc: animalImg },
			// 	{ title: 'Feeling', path: '/userfeeling', imgSrc: feelinglImg },
			// ],
		};
	},
};
</script>

<style></style>
