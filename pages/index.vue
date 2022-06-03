<template>
  <v-container style="height: 100%" class="d-flex justify-center align-center">
    <v-row style="height: 60%">
      <v-col v-for="(card, index) in cards" :key="index" cols="12" sm="4">
        <!-- <v-hover v-slot="{ hover }"> -->
        <v-card
          max-width="300px"
          max-height="410px"
          height="100%"
          class="d-flex justify-center align-center flex-column"
        >
          <!-- <v-fade-transition>
              <v-overlay v-if="hover" absolute color="green" @click="movePage">
                <span style="width: 100% height: 100%">{{card.title}}</span>
              </v-overlay>
            </v-fade-transition> -->
          <v-img
            :src="card.imgSrc"
            max-width="240px"
            max-height="280px"
            width="100%"
            class="mt-3"
          >
          </v-img>
          <v-card-actions>
            <v-btn
              :to="{ path: card.path }"
              class="pa-10 pl-16 pr-16 mt-3 mb-3"
              >{{ card.title }}</v-btn
            >
          </v-card-actions>
        </v-card>
        <!-- </v-hover> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import animalImg from '@/assets/images/animal.jpg'
import dancelImg from '@/assets/images/dance.jpg'
import feelinglImg from '@/assets/images/feeling.jpg'

export default {
  name: 'IndexPage',
  data() {
    return {
      cards: [
        { title: 'Animal', path: '/useranimal', imgSrc: animalImg },
        { title: 'Feeling', path: '/userfeeling', imgSrc: feelinglImg },
        { title: 'Dance', path: '/userdance', imgSrc: dancelImg },
      ],
    }
  },
}
</script>
