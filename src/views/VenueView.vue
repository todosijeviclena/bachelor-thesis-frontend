<template>
  <div v-if="venueStore.isLoading">Loading...</div>
  <div v-else class="venue">
    <v-img cover :src="venue.img" height="400px"></v-img>

    <v-container>
      <v-row>
        <span class="h3 font-weight-bold my-2 py-2">{{ venue.name }}</span>
        <v-spacer></v-spacer>
        <v-btn rounded="xl" flat color="primary" class="align-self-center" :disabled="!userStore.isAuthenticated"
               @click="followVenue(venue.name)">
          <span class="button_text">follow</span>
        </v-btn>
      </v-row>
    </v-container>
    <v-divider thickness="2px" color="secondary"></v-divider>

    <v-container>
      <div class="my-4 py-4">
        <v-row>
          <span class="body_text font-weight-bold">Address</span>
          <v-spacer></v-spacer>
          <span class="body_text">{{ venue.address.street}}, {{venue.address.zip}} {{venue.address.city}}</span>
          <v-divider class="my-3" thickness="3px" color="secondary"></v-divider>
          <span class="body_text font-weight-bold">Venue description</span>
          <p class="body_text">{{ venue.description}}</p>
          <v-divider class="my-3" thickness="3px" color="secondary"></v-divider>
          <span class="body_text font-weight-bold">Upcoming events</span>
        </v-row>
        <v-row v-if="upcomingEvents.length === 0">
          <span>At the moment, there are no planned events in this location </span>
        </v-row>
        <v-row v-else>
          <v-col :key="event.name" cols="12" sm="4" v-for="event in upcomingEvents">
            <v-card class="mx-auto" variant="tonal" height="450px" color="card_color-darken-4" rounded="xl"
                    style="display:flex; flex-direction:column">
              <router-link :to="{name: 'event-detail', params: {id: event._id}}">
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
                  <span class="smaller_button_text">tickets</span>
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
import { mapStores } from "pinia";
import { useVenueStore } from "@/store/VenueStore";
import { useEventStore} from "@/store/EventStore";
import {useUserStore} from "@/store/UserStore";


export default {
  name: "VenueView",

  data() {
    return {

    }
  },
  created() {
    this.venueStore.loadById(this.id);
    this.eventStore.loadByLocation(this.venue.name)
  },

  computed: {
    ...mapStores(useVenueStore, useEventStore, useUserStore),

    id() {
      return this.$route.params.id;
    },

    venue() {
      return this.venueStore.getById(this.id);
    },
    upcomingEvents() {
      return this.eventStore.eventsByLocation;
    }
  },

  methods: {
    followVenue(name) {
      this.userStore.followVenue(name);
      this.$router.push({name: 'user'})
    },
    unfollowVenue(name) {
      this.userStore.unfollowVenue(name);
      this.$router.push({name: 'user'})
    },
  }
}
</script>

<style>

</style>
