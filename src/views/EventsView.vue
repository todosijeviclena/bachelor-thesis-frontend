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

  <v-container v-if="categorySelected && selectedCategory !== 'All categories'">
    <div
      v-if="userStore.isAuthenticated && userStore.user && (userStore.user.role === 'admin' || userStore.user.role === 'technician')"
      class="new_event">
      <v-btn rounded="xl" flat color="primary" class="mr-3" :to="{name: 'createEvent'}">
        <span class="button_text">create new event</span>
      </v-btn>
    </div>

    <div id="eventsByCategory">
      <span class="button_text font-weight-bold">{{selectedCategory}}s</span>
      <div v-if="events.length === 0">
        <span>There are no events in this category</span>
      </div>
      <v-row v-else class="mt-1">
        <v-col :key="event.name" cols="12" sm="4" v-for="event in events">
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
  <v-container v-else class="my-4 py-4">
    <div
      v-if="userStore.isAuthenticated && userStore.user && (userStore.user.role === 'admin' || userStore.user.role === 'technician')"
      class="new_event">
      <v-btn rounded="xl" flat color="primary" class="mr-3" :to="{name: 'createEvent'}">
        <span class="button_text">create new event</span>
      </v-btn>
    </div>

    <div v-if="todayEvents.length > 0" id="events_today">
      <span class="button_text font-weight-bold">today</span>
      <v-row class="mt-1">
        <v-col :key="event.name" cols="12" sm="4" v-for="event in eventStore.todayEvents">
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

    <div v-if="tomorrowEvents.length > 0" id="events_tomorrow" class="my-4 py-4">
      <span class="button_text font-weight-bold">tomorrow</span>
      <v-row class="mt-1">
        <v-col :key="event.name" cols="12" sm="4" v-for="event in eventStore.tomorrowEvents">
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

    <div v-if="plays.length > 0" id="plays" class="my-4 py-4">
      <span class="button_text font-weight-bold">plays</span>
      <v-row class="mt-1">
        <v-col :key="event.name" cols="12" sm="4" v-for="event in plays">
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

    <div v-if="concerts.length > 0" id="concerts" class="my-4 py-4">
      <span class="button_text font-weight-bold">concerts</span>
      <v-row class="mt-1">
        <v-col :key="event.name" cols="12" sm="4" v-for="event in concerts">
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

    <div v-if="other.length > 0" id="other" class="my-4 py-4">
      <span class="button_text font-weight-bold">other</span>
      <v-row class="mt-1">
        <v-col :key="event.name" cols="12" sm="4" v-for="event in other">
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
</template>

<script>
import {mapStores} from "pinia";
import {useEventStore} from "@/store/EventStore";
import {useUserStore} from "@/store/UserStore";

export default {
  data() {
    return {
      menu1Open: false,
      menu2Open: false,
      categorySelected: false,
      categories: ["All categories", "Concert", "Play", "Exhibition", "Other"],
      selectedCategory: "All categories",
      times: ["Today", "Tomorrow", "This week", "This weekend", "Custom"],
      selectedTime: "Anytime",
    }
  },
  watch: {
    selectedCategory() {
      if (this.selectedCategory !== "All categories") {
        this.eventStore.loadByCategory(this.selectedCategory.toLowerCase());
      } else {
        this.eventStore.eventsByCategory = [];
      }
    },
    "eventStore.eventsByCategory": function () {
      this.$forceUpdate();
    }
  },
  created() {
    this.eventStore.loadAll()
    this.eventStore.loadToday()
    this.eventStore.loadTomorrow()
  },
  computed: {
    ...mapStores(useEventStore, useUserStore),

    todayEvents() {
      return this.eventStore.todayEvents;
    },

    tomorrowEvents() {
      return this.eventStore.tomorrowEvents;
    },

    plays() {
      return useEventStore().events.filter(event => event.category === 'play');
    },

    concerts() {
      return useEventStore().events.filter(event => event.category === 'concert');
    },

    other() {
      return useEventStore().events.filter(event => event.category === 'other');
    },

    events() {
      if (this.eventStore.eventsByCategory && this.eventStore.eventsByCategory.length > 0) {
        return this.eventStore.eventsByCategory;
      } else if (this.eventStore.eventsByCategory.length === 0 && this.selectedCategory !== "All categories") {
        return [];
      } else {
        return [];
      }
    }
  },
  methods: {
    toggleMenu(menu) {
      this[menu] = !this[menu];
    },
    selectItem(item, selection, menu) {
      this[selection] = item;
      this[menu] = false;
      this.categorySelected = true;
    }
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

.filter_wrapper {
  min-height: 3.125rem;
  background: white;
  box-sizing: border-box;
  border-bottom: 1px solid #E3E0DF;
  position: sticky;
}

.card_text_events {
  overflow: hidden;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
}

.new_event {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
}
</style>

<!--
<v-carousel hide-delimiter-background hide-delimiters show-arrows="hover">
<v-carousel-item>
</v-carousel-item>
</v-carousel>
-->
