<template>
  <div v-if="eventStore.isLoading">Loading...</div>
  <div v-else class="event">
    <v-img cover :src="event.img" height="400px"></v-img>

    <v-container>
        <v-row>
          <span class="h3 font-weight-bold my-2 py-2">{{ event.name }}</span>
          <v-spacer></v-spacer>
          <v-btn rounded="xl" flat color="primary" class="align-self-center">
            <span class="button_text">tickets</span>
          </v-btn>
        </v-row>
    </v-container>
    <v-divider thickness="2px" color="secondary"></v-divider>

    <v-container class="my-4 py-4">
        <v-row>
          <span class="body_text font-weight-bold">Location</span>
          <v-spacer></v-spacer>
          <span class="body_text">{{ event.location }}</span>
          <v-divider class="my-3" thickness="2px" color="secondary"></v-divider>

          <span class="body_text font-weight-bold">Date and time</span>
          <v-spacer></v-spacer>
          <span class="body_text">{{ formatDate(event.dateTime) }}</span>
          <v-divider class="my-3" thickness="2px" color="secondary"></v-divider>

          <span class="body_text font-weight-bold">Price</span>
          <v-spacer></v-spacer>
          <span v-if="event.price.standard === 0" class="body_text">Free entry</span>
          <span v-else class="body_text">{{ event.price.standard }} din</span>
          <v-divider class="my-3" thickness="2px" color="secondary"></v-divider>

          <span v-if="event.duration != null" class="body_text font-weight-bold">Duration</span>
          <v-spacer></v-spacer>
          <span v-if="event.duration != null" class="body_text">{{ event.duration }} min</span>
          <v-divider v-if="event.duration != null" class="my-3" thickness="2px" color="secondary"></v-divider>


          <span class="body_text font-weight-bold">Event description</span>
          <p class="body_text">{{ event.description}}</p>
        </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useEventStore } from "@/store/EventStore";

export default {
  name: "EventView",

  data() {
    return {

    }
  },
  created() {
    this.eventStore.loadById(this.id);
  },

  computed: {
    ...mapStores(useEventStore),

    id() {
      return this.$route.params.id;
    },

    event() {
      return this.eventStore.getById(this.id);
    }
  },

  methods: {
    formatDate(dateTime) {
      const date = new Date(dateTime);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
  }
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
