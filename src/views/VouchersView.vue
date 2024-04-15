<template>
  <v-text-field
    hide-details
    append-inner-icon="mdi-magnify"
    single-line
    class="pb-0"
  ></v-text-field>

  <v-container class="my-4 py-4">
    <v-row class="mt-1">
      <v-col cols="12" sm="4" v-for="(type, index) in types" :key="index">
        <v-card class="mx-auto" variant="tonal" height="450px" color="card_color-darken-4" rounded="xl"
                style="display:flex; flex-direction:column">
          <router-link :to="{ name: 'buyVoucher', query: { index: index } }">
            <v-img :src="images[index]" cover height="250px"></v-img>
          </router-link>
          <v-card-title>
            <span class="nav_element font-weight-bold text-wrap">{{ type }}</span>
          </v-card-title>
          <v-card-text style="flex: 1">
            <p class="body_text card_text_events" style="opacity: 0.8">
              You can use the voucher for any event on
              <span class="font-weight-bold text-uppercase"> Gde</span>
              <span class="text-uppercase">Ići</span>
            </p>
          </v-card-text>
          <v-divider class="mb-1 mx-2" thickness="1px" color="secondary"></v-divider>
          <div>
            <v-card-actions style="align-self: flex-end" class="mb-2 mr-2">
              <span style="align-self: flex-start" class="mb-2 ml-2 body_text font-weight-bold">500-2500 din</span>
              <v-spacer></v-spacer>
              <v-btn :to="{ name: 'buyVoucher', query: { index: index } }" button-card-actions-margin="1rem" rounded="xl" flat variant="tonal" color="primary"
                     class="justify-self-end">
                <span class="smaller_button_text">buy</span>
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
import all from "@/assets/all.jpg"
import concerts from "@/assets/concerts.jpg"
import theater from "@/assets/theater.jpg"
import exhibitions from "@/assets/museum.jpg"
import festivals from "@/assets/festival.jpg"

export default {
  data() {
    return {
      images: [all, concerts, theater, exhibitions, festivals],
      types: ["All-Inclusive Gift Voucher", "Gift Voucher for concerts", "Gift Voucher for theater", "Gift Voucher for exhibitions", "Gift Voucher for festivals"]
    }
  }
}
</script>
