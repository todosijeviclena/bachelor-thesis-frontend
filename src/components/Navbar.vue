<template>
  <nav>
    <v-app-bar flat color="white">
      <v-container fluid class="d-flex justify-space-between align-baseline navigation">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn class="hidden-md-and-up" color="secondary" dark v-bind="props" icon="mdi-menu"></v-btn>
          </template>

          <v-list>
            <v-list-item v-for="link in links" :key="link.text" :to="link.route">
              <v-list-item-title>{{ link.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-app-bar-title class="mx-2 hidden-md-and-down">
          <span class="font-weight-bold text-uppercase nav_element">Gde</span>
          <span class="text-uppercase nav_element">Ići</span>
        </v-app-bar-title>

        <div class="hidden-sm-and-down">
          <v-btn class="mr-2" :to="{name: 'home'}">
            <span class="nav_element">Homepage</span>
          </v-btn>
          <v-btn class="mx-2" :to="{name: 'events'}">
            <span class="nav_element">Events</span>
          </v-btn>
          <v-btn class="mx-2" :to="{name: 'venues'}">
            <span class="nav_element">Venues</span>
          </v-btn>
          <v-btn class="mx-2" :to="{name: 'artists'}">
            <span class="nav_element">Artists</span>
          </v-btn>
          <v-btn class="ml-2" :to="{name: 'vouchers'}">
            <span class="nav_element">Vouchers</span>
          </v-btn>
        </div>

        <v-spacer class="hidden-md-and-down"></v-spacer>
        <v-menu anchor="bottom end" v-model="userMenuShown">
          <template v-slot:activator="{ props }">
            <v-btn
              color="secondary"
              icon="mdi-account-circle"
              v-bind="props"
            ></v-btn>
          </template>
          <v-list>
            <v-list-item v-if="!userStore.isAuthenticated" @click="login()">
              <v-list-item-title>Log in</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="userStore.isAuthenticated">
              <v-list-item-title class="pr-1"><i>{{ userStore.user.username }}</i></v-list-item-title>
            </v-list-item>
            <v-list-item v-if="userStore.isAuthenticated" @click="logout()">
              <v-list-item-title>Log out</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="userStore.isAuthenticated" :to="{name: 'user'}">
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>
  </nav>
</template>

<script>
import {useUserStore} from "@/store/UserStore";
import {mapStores} from "pinia";

export default {
  data() {
    return {
      userMenuShown: false,
      links: [
        {text: 'Home', route: '/'},
        {text: 'Events', route: '/events'},
        {text: 'Venues', route: '/venues'},
        {text: 'Artists', route: '/artists'},
        {text: 'Vouchers', route: '/vouchers'},
      ]
    }
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    login() {
      this.$router.push({name: 'login'});
      this.userMenuShown = false;
    },
    logout() {
      this.userStore.logout();
      this.$router.push({name: 'home'});
      this.userMenuShown = false;
    }
  }
}
</script>

<style>
.nav_element {
  font-family: "Outfit", sans-serif;
  font-size: 24px;
  line-height: 27px;
  text-transform: capitalize;
  color: #40242b;
  font-weight: normal;
}

.navigation {
  background-image: radial-gradient(circle at 10% -50%, #BE3455, transparent 60%);
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 820px 820px;
  background-color: #fff;
  backdrop-filter: blur(444);
}
</style>

