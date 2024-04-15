<template>
  <div class="card_container">
    <v-card class="ma-4 pa-4 " variant="tonal" width="700px" color="card_color-darken-4" rounded="xl"
            style="display:flex; flex-direction:column">
      <v-form v-model="formValid" lazy-validation ref="form" class="mt-6">
        <span class="body_text">Event information</span>
        <v-divider class="mb-3" thickness="3px" color="secondary"></v-divider>
        <v-text-field
          class="my-2"
          label="Name"
          v-model="name"
          :rules="[rules.required, rules.length]"
        ></v-text-field>
        <v-text-field
          class="my-2"
          label="Description"
          v-model="description"
          :rules="[rules.required, rules.descriptionLength]"
        ></v-text-field>
        <v-text-field
          class="my-2"
          label="Image"
          v-model="image"
          :rules="[rules.required]"
        ></v-text-field>

        <v-row>
          <v-col cols="12" md="3">
            <v-select
              class="my-2"
              v-model="category"
              :items="possible"
              label="Category"
              :rules="[rules.required]"
            ></v-select>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              class="my-2"
              label="Capacity"
              v-model="capacity"
              :rules="[rules.number]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              class="my-2"
              label="Price"
              v-model="price"
              :rules="[rules.required, rules.number]"
              suffix="din"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              class="my-2"
              label="Duration"
              v-model="duration"
              suffix="min"
              :rules="[rules.number]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-text-field
          v-model="date"
          label="Date"
          prepend-inner-icon="mdi-calendar"
          hint="YYYY-MM-DD format"
          v-on="on"
          :rules="[rules.required, rules.date]"
        ></v-text-field>
        <v-text-field
          class="my-2"
          label="Artist"
          v-model="artist"
        ></v-text-field>
        <v-text-field
          class="my-2"
          label="Location"
          v-model="event_location"
          :rules="[rules.required]"
        ></v-text-field>

        <div align="center">
          <v-btn @click="createNewEvent()" color="primary">Create</v-btn>
          <v-btn id="clear" @click="clear">Clear</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import {useEventStore} from "@/store/EventStore";
import {mapStores} from "pinia";

export default {
  name: "NewEventView",

  data() {
    return {
      name: '',
      description: '',
      image: '',
      category: '',
      possible: ["Play", "Concert", "Exhibition", "Other"],
      capacity: '',
      price: '',
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      duration: '',
      artist: '',
      event_location: '',
      rules: {
        required: value => !!value || 'Required.',
        number: value => {
          const pattern = /[0-9]+[^a-zA-Z]/
          return pattern.test(value) || 'Must be number'
        },
        length: value => (value && value.length >= 5) || 'At least 5 characters',
        descriptionLength: value => (value && value.length >= 100) || 'Text must be at least 100 characters',
        date: value => {
          const pattern = /[0-9]{4}-[0-9]{2}-[0-9]{2}/
          return pattern.test(value) || 'Date is not in correct format. See hint for help'
        },
      },
    }
  },

  computed: {
    ...mapStores(useEventStore),
  },

  methods: {
    async createNewEvent() {
      await this.$refs.form.validate();
      if (!this.formValid) return;

      const duration = Number(this.duration);
      const price = Number(this.price);
      const capacity = Number(this.capacity);

      await this.eventStore.create(this.name, this.description, this.image, this.category.toLowerCase(), capacity, price, this.date, duration, this.artist, this.event_location)

      if (!this.eventStore.error) {
        this.$router.push(this.eventStore.afterCreatingRoute ?? {name: 'home'})
        this.eventStore.setAfterCreatingRoute(null)
      }
    },
    clear() {
      this.$refs.form.reset()
      this.name = ''
      this.description = ''
      this.image = ''
      this.category = ''
      this.capacity = ''
      this.price = ''
      this.date = ''
      this.duration = ''
      this.artist = ''
      this.event_location = ''
    },
  },
}

</script>

<style scoped>
.card_container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#clear {
  margin: 10px;
}
</style>
