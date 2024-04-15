<template>
  <div class="artists">
    <v-text-field
      hide-details
      append-inner-icon="mdi-magnify"
      single-line
      class="pb-0"
    ></v-text-field>

    <v-container>
      <div v-if="userStore.isAuthenticated && userStore.user && (userStore.user.role === 'admin' || userStore.user.role === 'technician')" class="new_artist">
        <v-btn rounded="xl" flat color="primary" class="mr-3" :to="{name: 'createArtist'}">
          <span class="button_text">add new artist</span>
        </v-btn>
      </div>

      <div class="my-4 py-4">
        <v-row>
          <v-col :key="artist.name" cols="12" sm="3" v-for="artist in artistStore.artists">
            <v-card class="mx-auto text-center" variant="tonal" height="320px" color="card_color-darken-4" rounded="xl">
              <router-link :to="{name: 'artist-detail', params: {id: artist._id}}">
                <v-avatar size="170" class="mt-4">
                  <v-img :src="artist.img" cover height="200px"></v-img>
                </v-avatar>
              </router-link>
              <v-card-title class="mb-7">{{ artist.name }}</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="followedArtists && followedArtists.length !== 0 && followedArtists.includes(artist.name)" button-card-actions-margin="1rem" rounded="xl" flat variant="tonal" color="primary"
                       class="justify-self-end" :disabled="!userStore.isAuthenticated" @click="unfollowArtist(artist.name)">
                  <span class="smaller_button_text">unfollow</span>
                </v-btn>
                <v-btn v-else button-card-actions-margin="1rem" rounded="xl" flat variant="tonal" color="primary"
                       class="justify-self-end" :disabled="!userStore.isAuthenticated" @click="followArtist(artist.name)">
                  <span class="smaller_button_text">follow</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import { useArtistStore } from "@/store/ArtistStore.js";
import { useUserStore } from "@/store/UserStore";
import { mapStores } from "pinia";

export default {
  data() {
    return {

    }
  },
  created() {
    this.artistStore.loadAll()
    if (this.userStore.isAuthenticated) {
      this.userStore.loadUsersArtists(this.userStore.user.id)
    }
  },
  computed: {
    ...mapStores(useArtistStore, useUserStore),

    followedArtists() {
      let artists = this.userStore.followedArtists;
      let names = [];
      for (let i = 0; i < artists.length; i++) {
        names.push(artists[i].name);
      }
      return names;
    }
  },
  methods: {
    followArtist(name) {
      this.userStore.followArtist(name);
    },
    unfollowArtist(name) {
      this.userStore.unfollowArtist(name);
    }
  }
}
</script>
