<template>
  <error v-if="userStore.error" :text="userStore.error" @hide="userStore.clearError()"></error>
  <v-alert type="warning" v-else-if="userStore.loginMessage" class="mb-7">{{ userStore.loginMessage }}</v-alert>

  <div v-if="userStore.isLoggingIn">Logging in ...</div>
  <div class="card_container ma-4 pa-4" v-else>
    <v-card class="ma-4 pa-4" variant="tonal" height="400px" width="400px" color="card_color-darken-4" rounded="xl"
            style="display:flex; flex-direction:column">
      <v-form v-model="formValid" lazy-validation ref="form" class="align-content-center" align="center">
        <v-text-field
          class="mb-2 mt-5"
          label="Username"
          v-model="username"
          :rules="usernameRules"
        ></v-text-field>
        <v-text-field
          class="my-2"
          label="Password"
          v-model="password"
          type="password"
          :rules="[rules.required, rules.length]"
        ></v-text-field>
        <v-btn @click="login()" color="primary" class="mb-10">Log me in</v-btn>
      </v-form>

      <br>
      <div id="register">
        Don't have an account?<br>
        <v-btn class="mt-1" rounded="xl" flat variant="outlined" color="secondary" :to="{name: 'registration'}">Create new account</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import {mapStores} from "pinia/dist/pinia";
import {useUserStore} from "@/store/UserStore";
import Error from "@/components/Error.vue";

export default {
  name: "Login",

  data() {
    return {
      username: '',
      password: '',
      formValid: true,
      rules: {
        required: value => !!value || 'Required.',
        length: value => (value && value.length >= 5) || 'Username must be at least 3 characters',
      },
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 5) || 'Username must be at least 3 characters',
      ],
    }
  },

  components: {
    Error
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async login() {
      await this.$refs.form.validate();
      if (!this.formValid) return;

      await this.userStore.login(this.username, this.password)

      if (!this.userStore.error) {
        this.$router.push(this.userStore.afterLoginRoute ?? {name: 'events'})
        this.userStore.setAfterLoginRoute(null)
      }
    },
  }
}
</script>

<style scoped>
.card_container {
  display: flex;
  justify-content: center;
  align-items: center;
}
#register {
  text-align: center;
}
</style>
