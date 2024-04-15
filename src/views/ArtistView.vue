<template>
  <div v-if="artistStore.isLoading">Loading...</div>
  <div v-else class="artist">
    <v-text-field
      hide-details
      append-inner-icon="mdi-magnify"
      single-line
      class="pb-0"
    ></v-text-field>

    <v-container>
      <v-row>
        <v-avatar size="170" class="my-2 ">
          <v-img cover :src="artist.img" height="400px"></v-img>
        </v-avatar>
        <p class="align-self-center">
          <span class="h3 font-weight-bold my-2 py-2 ml-2 ">{{ artist.name }}</span>
          <br/>
          <span class="body_text my-2 py-2 ml-2">
            <template :key="index" v-for="(genre, index) in artist.genre">
              <span>{{ genre }}</span><span v-if="index !== artist.genre.length - 1">, </span>
            </template>
          </span>
        </p>
        <v-spacer></v-spacer>
        <v-btn rounded="xl" flat color="primary" class="align-self-center">
          <span class="button_text">follow</span>
        </v-btn>
      </v-row>
    </v-container>
    <v-divider thickness="2px" color="secondary"></v-divider>

    <v-container class="my-4 py-4">
      <v-row>
        <span class="body_text font-weight-bold">Info</span>
        <v-spacer></v-spacer>
        <span class="body_text">{{ artist.info }}</span>
        <v-divider class="my-3" thickness="2px" color="secondary"></v-divider>

        <span class="body_text font-weight-bold">Upcoming events</span>
      </v-row>
      <v-row v-if="upcomingEvents.length === 0">
        <span>At the moment, there are no planned events of this artist</span>
      </v-row>
      <v-row v-else>
        <v-col :key="event.name" cols="12" sm="4" v-for="event in upcomingEvents">
          <v-card class="mx-auto" variant="tonal" height="450px" color="card_color-darken-4" rounded="xl"
                  style="display:flex; flex-direction:column">
            <router-link to="/">
              <v-img :src="event.img" cover height="200px"></v-img>
            </router-link>
            <v-card-title>
              <span class="nav_element font-weight-bold text-wrap"> {{ event.name }}</span>
            </v-card-title>
            <v-card-text style="flex: 1">
              <p class="body_text card_text_events">
                {{ event.description }}
              </p>
            </v-card-text>
            <v-card-actions style="align-self: flex-end" class="mb-2 mr-2">
              <v-spacer></v-spacer>
              <v-btn button-card-actions-margin="1rem" rounded="xl" flat variant="tonal" color="primary"
                     class="justify-self-end">
                <span class="smaller_button_text">follow</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mapStores} from "pinia";
import {useArtistStore} from "@/store/ArtistStore";
import {useEventStore} from "@/store/EventStore";

export default {
  name: "ArtistView",

  data() {
    return {}
  },
  created() {
    this.artistStore.loadById(this.id);
    this.eventStore.loadByArtist(this.artist.name)
  },

  computed: {
    ...mapStores(useArtistStore, useEventStore),

    id() {
      return this.$route.params.id;
    },

    artist() {
      return this.artistStore.getById(this.id);
    },

    upcomingEvents() {
      return this.eventStore.eventsByArtist;
    }
  },
}
</script>

<style>
.h3 {
  font-family: "Outfit", sans-serif;
  font-size: 30px;
  text-transform: capitalize;
  line-height: 100%;
  margin-bottom: 20px;
  color: #40242b;
}
</style>
