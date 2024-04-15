<template>
  <div class="home">
    <v-img cover id="main_image" :src="main_image" class="hidden-xs"></v-img>
    <v-text-field
      hide-details
      append-inner-icon="mdi-magnify"
      single-line
      class="pb-0"
    ></v-text-field>
    <v-container>
      <v-row no-gutters align="center" class="my-2 py-2">
        <v-col cols="12" md="6">
          <div>
            <h1>Discover and follow current events</h1>
            <p class="body_text">The best place for following current cultural events so you don't miss a thing!</p>
            <v-btn rounded="xl" flat color="primary" class="mr-3" @click="login()">
              <span class="button_text">log in</span>
            </v-btn>
            <v-btn rounded="xl" flat variant="outlined" color="secondary" class="mr-3" :to="{name: 'registration'}">
              <span class="button_text">sign in</span>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-img :src="hero_image"></v-img>
        </v-col>
      </v-row>

      <div v-if="popularEvents" id="gallery" class="my-4 py-4">
        <span class="button_text font-weight-bold">Popular</span>
        <v-row>
          <v-col :key="event.name" cols="12" md="4" v-for="event in popularEvents">
              <router-link :to="{name: 'event-detail', params: {id: event._id}}">
                <v-img :src="event.img" cover height="200px"></v-img>
              </router-link>
          </v-col>
        </v-row>
      </div>

      <v-row v-if="newestEvent" no-gutters align="center" class="my-4 py-4">
        <v-col cols="12" md="6">
          <router-link :to="{name: 'event-detail', params: {id: newestEvent._id}}">
            <v-img class="event_image" :src="newestEvent.img" ></v-img>
          </router-link>
        </v-col>
        <v-col cols="12" md="6">
          <div class="my-4 py-4 ml-4">
            <h2>{{ newestEvent.name }}</h2>
            <p class="body_text card_text_events">{{newestEvent.description}}</p>
            <v-btn :to="{name: 'event-detail', params: {id: newestEvent._id}}" rounded="xl" flat color="primary" class="mr-3" style="align-items: center">
              <span class="button_text">show more</span>
            </v-btn>
          </div>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>
import hero_image from '@/assets/hero_section_image.png'
import main_image from '@/assets/main_image.png'
import {mapStores} from "pinia";
import {useEventStore} from "@/store/EventStore";

export default {
  data() {
    return {
      hero_image, main_image
    }
  },

  created() {
    this.eventStore.loadPopular()
    this.eventStore.loadNewest()
  },

  computed: {
    ...mapStores(useEventStore),

    popularEvents() {
      return this.eventStore.popularEvents;
    },

    newestEvent() {
      return this.eventStore.newest;
    }
  },

  methods: {
    login() {
      this.$router.push({name: 'login'});
      this.userMenuShown = false;
    },
  }
}
</script>

<style>
h1 {
  font-family: "Outfit", sans-serif;
  font-size: 70px;
  text-transform: capitalize;
  line-height: 100%;
  margin-bottom: 20px;
  color: #40242b;
}

h2 {
  font-family: "Outfit", sans-serif;
  font-size: 50px;
  text-transform: capitalize;
  line-height: 100%;
  margin-bottom: 20px;
  color: #40242b;
}

.body_text {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 20px;
  color: #40242b;
}

.button_text {
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  line-height: 27px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #40242b;
}

.event_image {
  border-radius: 60px;
}

#main_image {
  height: 400px;
  filter: saturate(1) grayscale(1);
}

.card_text_events {
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
}
</style>
