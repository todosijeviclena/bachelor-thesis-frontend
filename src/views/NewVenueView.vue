<template>
  <div class="card_container">
    <v-card class="ma-4 pa-4 " variant="tonal" width="700px" color="card_color-darken-4" rounded="xl"
            style="display:flex; flex-direction:column">
      <v-form v-model="formValid" lazy-validation ref="form" class="mt-6">
        <span class="body_text">Venue description</span>
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
          :rules="[rules.required, rules.image]"
        ></v-text-field>
        <v-select
          class="my-2"
          v-model="category"
          :items="possible"
          label="Category"
          clearable
          :rules="[rules.required]"
        ></v-select>

        <span class="body_text align-self-start">Address</span>
        <v-divider class="mb-1" thickness="3px" color="secondary"></v-divider>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              class="my-2"
              label="Street"
              v-model="street"
              :rules="[rules.required, rules.length]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="my-2"
              label="City"
              v-model="city"
              model-value="Kragujevac"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              class="my-2"
              label="Zip code"
              v-model="zip"
              model-value="34 000"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>

        <span class="body_text align-self-start">Contact information</span>
        <v-divider class="mb-3" thickness="3px" color="secondary"></v-divider>
        <v-text-field
          class="my-2"
          label="Email"
          v-model="email"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          class="my-2"
          label="Web address"
          v-model="web"
        ></v-text-field>
        <v-text-field
          class="my-2"
          label="Telephone"
          v-model="telephone"
          :rules="[rules.required]"
          prefix="+381"
        ></v-text-field>

        <div align="center">
          <v-btn @click="createNewVenue()" color="primary">Create</v-btn>
          <v-btn id="clear" @click="clear">Clear</v-btn>
        </div>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import {useVenueStore} from "@/store/VenueStore";
import {mapStores} from "pinia";

export default {
  name: "NewVenueView",

  data() {
    return {
      name: '',
      description: '',
      image: '',
      category: '',
      possible: ["Theater", "Gallery", "Museum", "Other"],
      street: '',
      city: '',
      zip: '',
      email: '',
      web: '',
      telephone: '',
      formValid: true,
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        image: value => {
          const pattern = /(https?:\/\/.*\.(?:png|jpg))/
          return pattern.test(value) || 'Image URL is not in right format.'
        },
        length: value => (value && value.length >= 5) || 'At least 5 characters',
        descriptionLength: value => (value && value.length >= 100) || 'Text must be at least 100 characters',
      },
    }
  },

  computed: {
    ...mapStores(useVenueStore),
  },

  methods: {
    async createNewVenue() {
      await this.$refs.form.validate();
      if (!this.formValid) return;

      let number = '+381 ' + this.telephone.toString();

      await this.venueStore.create(this.name, this.description, this.category.toLowerCase(), this.image, this.street, this.city || "Kragujevac", this.zip || "34 000", this.email, this.web, number)

      if (!this.venueStore.error) {
        this.$router.push(this.venueStore.afterCreatingRoute ?? {name: 'home'})
        this.venueStore.setAfterCreatingRoute(null)
      }
    },
    clear() {
      this.$refs.form.reset()
      this.name = ''
      this.description = ''
      this.image = ''
      this.category = ''
      this.street = ''
      this.city = ''
      this.zip = ''
      this.email = ''
      this.web = ''
      this.telephone = ''
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
