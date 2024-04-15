<template>
  <div class="card_container">
    <v-card class="ma-4 pa-4 " variant="tonal" width="600px" color="card_color-darken-4" rounded="xl"
            style="display:flex; flex-direction:column">
      <v-form v-model="formValid" lazy-validation ref="form" class="mt-6">
        <span class="body_text">Artist description</span>
        <v-divider class="mb-3" thickness="3px" color="secondary"></v-divider>
        <v-text-field
          class="my-2"
          label="Name"
          v-model="name"
          :rules="[rules.required, rules.length]"
        ></v-text-field>
        <v-text-field
          class="my-2"
          label="Information"
          v-model="information"
          :rules="[rules.required, rules.descriptionLength]"
        ></v-text-field>
        <v-text-field
          class="my-2"
          label="Image"
          v-model="image"
          :rules="[rules.required, rules.image]"
        ></v-text-field>
        <v-select
          v-model="genres"
          :items="possible"
          label="Genres"
          multiple
          :rules="[rules.required]"
        ></v-select>
      </v-form>

      <div align="center">
        <v-btn @click="createNewArtist()" color="primary">Create</v-btn>
        <v-btn id="clear" @click="clear">Clear</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import {useArtistStore} from "@/store/ArtistStore";
import {mapStores} from "pinia";

export default {
  name: "NewArtistView",

  data() {
    return {
      name: '',
      information: '',
      image: '',
      genres: [],
      possible: ["rap", "trap", "pop", "pop rock", "rock", "jazz"],
      formValid: true,
      rules: {
        required: value => !!value || 'Required.',
        image: value => {
          const pattern = /(https?:\/\/.*\.(?:png|jpg))/
          return pattern.test(value) || 'Not right email image format. Images must be jpg or png'
        },
        length: value => (value && value.length >= 5) || 'At least 5 characters',
        descriptionLength: value => (value && value.length >= 100) || 'Text must be at least 100 characters',
      },
    }
  },

  computed: {
    ...mapStores(useArtistStore),
  },

  methods: {
    async createNewArtist() {
      await this.$refs.form.validate();
      if (!this.formValid) return;

      await this.artistStore.create(this.name, this.information, this.image, this.genres)

      if (!this.artistStore.error) {
        this.$router.push(this.artistStore.afterCreatingRoute ?? {name: 'home'})
        this.artistStore.setAfterCreatingRoute(null)
      }
    },
    clear() {
      this.$refs.form.reset()
      this.name = ''
      this.information = ''
      this.image = ''
      this.genres = []
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
