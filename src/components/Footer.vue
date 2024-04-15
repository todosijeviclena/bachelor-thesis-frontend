<template>
  <div class="footer">
      <v-container>
        <v-row no-gutters align="center">
          <v-col cols="3" align-self="start" class="hidden-sm-and-down my_col">
            <span class="font-weight-bold text-uppercase nav_element">Gde</span>
            <span class="text-uppercase nav_element">Ići</span>
          </v-col>

          <v-col cols="6" md="3" class="button_col d-flex justify-center" align-self="start">
            <!--<span class="col_name">krypto</span>-->
            <v-btn :to="{name: 'home'}" color="white" variant="text" class="mx-2" rounded="xl">
              <span class="footer_button">Home</span>
            </v-btn>
            <v-btn :to="{name: 'events'}" color="white" variant="text" class="mx-2" rounded="xl">
              <span class="footer_button">Events</span>
            </v-btn>
            <v-btn :to="{name: 'venues'}" color="white" variant="text" class="mx-2" rounded="xl">
              <span class="footer_button">Venues</span>
            </v-btn>
            <v-btn :to="{name: 'artists'}" color="white" variant="text" class="mx-2" rounded="xl">
              <span class="footer_button">Artists</span>
            </v-btn>
            <v-btn :to="{name: 'vouchers'}" color="white" variant="text" class="mx-2" rounded="xl">
              <span class="footer_button">Vouchers</span>
            </v-btn>
          </v-col>

          <v-col cols="6" md="3" class="button_col d-flex justify-center" align-self="start">
            <!--<span class="col_name">contact</span>-->
            <v-btn color="white" variant="text" class="mx-2" rounded="xl">
              <span class="footer_button">Email</span>
              <v-icon color="secondary" class="ml-1">mdi-email-outline</v-icon>
            </v-btn>
            <v-btn color="white" variant="text" class="mx-2" rounded="xl">
              <span class="footer_button">Instagram</span>
              <v-icon color="secondary" class="ml-1">mdi-instagram</v-icon>
            </v-btn>
            <v-btn color="white" variant="text" class="mx-2" rounded="xl">
              <span class="footer_button">Facebook</span>
              <v-icon color="secondary" class="ml-1">mdi-facebook</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="3" align-self="start" class="hidden-sm-and-down my_col" style="display: flex; flex-direction: column; justify-content: center;">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <span class="semi-bold-text">join our newsletter</span>
              <v-text-field ref="field" variant="solo" class="mb-2" clearable label="Email address" style="width: 250px;" :rules="[rules.email]" v-model="email">
                <template #append-inner>
                  <v-btn rounded="xl" color="secondary" size="small" type="submit" @click="clear()">Submit</v-btn>
                </template>
              </v-text-field>
            </div>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ' ',
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
    }
  },
  methods: {
    clear() {
      this.$refs.field.reset()
      this.email = ' '
    },
  }
}
</script>

<style>
.footer {
  height: auto;
  background: linear-gradient(to top right, #8C263E, #E3939E, transparent 100%);
  backdrop-filter: blur(500);
}
.footer_button {
  font-family: "Outfit", sans-serif;
  font-size: 16px;
  color: #40242b;
  text-transform: capitalize;
  text-align: left;
}
.semi-bold-text {
  font-family: "Outfit", sans-serif;
  font-size: 22px;
  color: #40242b;
  font-weight: 600;
}
.col_name {
  font-family: "Outfit", sans-serif;
  font-size: 16px;
  color: #40242b;
  font-weight: 600;
}
.button_col {
  display: flex;
  flex-direction: column;
}

.email_button {
  width: 100%;
}

@media screen and (max-width: 600px) {
  .my_col {
    display: none !important;
  }
}

@media screen and (min-width: 601px) {
  .my_col {
    display: flex !important;
    justify-content: center;
  }
}
</style>


