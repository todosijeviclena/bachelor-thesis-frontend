<template>
  <v-container class="my-4 py-4">
    <div style="display: flex; align-items: center">
      <v-icon color="primary" class="mr-2 mdi-48px">mdi-account</v-icon>
      <span class="h3 font-weight-bold my-2 py-2">{{ userStore.user.name }}</span>
    </div>
    <v-divider class="my-3" thickness="3px" color="secondary"></v-divider>

    <span class="body_text font-weight-bold">Venues I am following</span>
    <v-row v-if="followedLocations.length === 0">
      <v-container><span>You are not following any locations.</span></v-container>
    </v-row>
    <v-row class="my-2" v-else>
      <v-col :key="venue.name" cols="12" sm="4" v-for="venue in followedLocations">
        <v-card class="mx-auto" variant="tonal" height="500px" color="card_color-darken-4" rounded="xl"
                style="display:flex; flex-direction:column">
          <router-link :to="{name: 'venue-detail', params: {id: venue._id}}">
            <v-img :src="venue.img" cover height="200px"></v-img>
          </router-link>
          <v-card-title>
            <span class="nav_element font-weight-bold text-wrap"> {{ venue.name }}</span>
          </v-card-title>
          <v-card-text style="flex: 1">
            <p class="body_text card_text">
              {{ venue.description }}
            </p>
          </v-card-text>
          <v-card-actions style="align-self: flex-end; margin: 1rem">
            <v-spacer></v-spacer>
            <v-btn button-card-actions-margin="1rem" rounded="xl" flat variant="tonal" color="primary"
                   class="justify-self-end">
              <span class="smaller_button_text" @click="unfollowVenue(venue.name)">unfollow</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-3" thickness="3px" color="secondary"></v-divider>
    <span class="body_text font-weight-bold">Artists I am following</span>
    <v-row v-if="followedArtists.length === 0">
      <v-container><span>You are not following any artists.</span></v-container>
    </v-row>
    <v-row class="mt-1" v-else>
      <v-col :key="artist.name" cols="12" sm="3" v-for="artist in followedArtists">
        <v-card class="mx-auto text-center" variant="tonal" height="320px" color="card_color-darken-4" rounded="xl">
          <router-link :to="{name: 'artist-detail', params: {id: artist._id}}">
            <v-avatar size="170" class="mt-4">
              <v-img :src="artist.img" cover height="200px"></v-img>
            </v-avatar>
          </router-link>
          <v-card-title class="mb-7">{{ artist.name }}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn button-card-actions-margin="1rem" rounded="xl" flat variant="tonal" color="primary"
                   class="justify-self-end" id="unfollowBtton">
              <span class="smaller_button_text" @click="unfollowArtist(artist.name)">unfollow</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-divider class="my-3" thickness="3px" color="secondary"></v-divider>
    <span class="body_text font-weight-bold">Notifications</span>
    <v-row v-if="notifications.length === 0">
      <v-container><span>You have no notifications at the moment.</span></v-container>
    </v-row>
    <v-row v-else :key="notification" v-for="notification in notifications" class="my-2">
      <v-alert
               border="start"
               border-color="success"
               elevation="2"
               closable
               @click="hide(notification)"
      >
        {{ notification }}
      </v-alert>
    </v-row>
  </v-container>
</template>

<script>
import {mapStores} from "pinia";
import {useVenueStore} from "@/store/VenueStore";
import {useUserStore} from "@/store/UserStore";

export default {
  name: "UserView",

  data() {
    return {}
  },

  created() {
    this.userStore.loadUsersLocations(this.userStore.user.id)
    this.userStore.loadUsersArtists(this.userStore.user.id)
    this.userStore.loadNotifications(this.userStore.user.id)
  },

  computed: {
    ...mapStores(useUserStore, useVenueStore),

    followedLocations() {
      return this.userStore.followedLocations;
    },

    followedArtists() {
      return this.userStore.followedArtists;
    },

    notifications() {
      return this.userStore.notifications;
    },
  },

  methods: {
    unfollowVenue(name) {
      this.userStore.unfollowVenue(name);
      this.$router.push({name: 'venues'})
    },
    unfollowArtist(name) {
      this.userStore.unfollowArtist(name);
      this.$router.push({name: 'venues'})
    },
    hide(text) {
      this.userStore.deleteNotification(text)
    }
  }
}
</script>

<style scoped>

</style>
