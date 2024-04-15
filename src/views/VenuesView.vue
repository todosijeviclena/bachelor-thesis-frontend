<template>
  <v-text-field
    hide-details
    append-inner-icon="mdi-magnify"
    single-line
    class="pb-0"
  ></v-text-field>
  <div class="filter_wrapper">
    <v-container>
      <v-menu open-on-click>
        <template v-slot:activator="{ props }">
          <v-btn variant="text" color="secondary" v-bind="props" @click="toggleMenu('menu1Open')">
            <span>{{ selectedCategory }}</span>
            <v-icon :class="{ 'rotate-180': menu1Open }" class="ml-1">mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(category, index) in categories" :key="index"
                       @click="selectItem(category, 'selectedCategory', 'menu1Open')">
            <v-list-item-title>{{ category }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-container>
  </div>

  <v-container>
    <div v-if="userStore.isAuthenticated && userStore.user && userStore.user.role === 'admin'" class="new_venue">
      <v-btn rounded="xl" flat color="primary" class="mr-3" :to="{name: 'createVenue'}">
        <span class="button_text">add new venue</span>
      </v-btn>
    </div>

    <div class="my-4 py-4">
      <div v-if="venues.length === 0">
        <span>There are no venues of that category</span>
      </div>
      <v-row v-else>
        <v-col :key="venue.name" cols="12" sm="4" v-for="venue in venues">
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

              <v-btn v-if="followedVenues && followedVenues.length !== 0 && followedVenues.includes(venue.name)"
                     button-card-actions-margin="1rem" rounded="xl" flat variant="tonal" color="primary"
                     class="justify-self-end" :disabled="!userStore.isAuthenticated"
                     @click="unfollowVenue(venue.name)">
                <span class="smaller_button_text">unfollow</span>
              </v-btn>
              <v-btn v-else button-card-actions-margin="1rem" rounded="xl" flat variant="tonal" color="primary"
                     class="justify-self-end" :disabled="!userStore.isAuthenticated"
                     @click="followVenue(venue.name)">
                <span class="smaller_button_text">follow</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {useVenueStore} from "@/store/VenueStore";
import {useUserStore} from "@/store/UserStore";
import {mapStores} from "pinia";

export default {
  data() {
    return {
      menu1Open: false,
      categories: ["All categories", "Theater", "Gallery", "Museum", "Other"],
      selectedCategory: "All categories",
      //clickedButton: false
    }
  },

  created() {
    this.venueStore.loadAll()
    if (this.userStore.isAuthenticated) {
      this.userStore.loadUsersLocations(this.userStore.user.id)
    }
  },

  watch: {
    selectedCategory() {
      if (this.selectedCategory !== "All categories") {
        this.venueStore.loadByCategory(this.selectedCategory.toLowerCase());
      } else {
        this.venueStore.venuesByCategory = [];
      }
    },
    "venueStore.venuesByCategory": function () {
      this.$forceUpdate();
    },
  },
  computed: {
    ...mapStores(useVenueStore, useUserStore),

    venues() {
      if (this.venueStore.venuesByCategory && this.venueStore.venuesByCategory.length > 0) {
        return this.venueStore.venuesByCategory;
      } else if (this.venueStore.venuesByCategory.length === 0 && this.selectedCategory !== "All categories") {
        return [];
      } else {
        return this.venueStore.venues;
      }
    },

    followedVenues() {
      let venues = this.userStore.followedLocations;
      let names = [];
      for (let i = 0; i < venues.length; i++) {
        names.push(venues[i].name);
      }
      return names;
    }
  },

  methods: {
    toggleMenu(menu) {
      this[menu] = !this[menu];
    },
    selectItem(item, selection, menu) {
      this[selection] = item;
      this[menu] = false;
    },
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
.smaller_button_text {
  font-family: "Roboto", sans-serif;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #40242b;
}

.rotate-180 {
  transform: rotate(180deg);
}

.card_text {
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
}
</style>

