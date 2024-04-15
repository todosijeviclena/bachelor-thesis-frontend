<template>
  <div class="card_container">
    <v-card class="ma-4 pa-4" variant="tonal" height="500px" width="500px" color="card_color-darken-4" rounded="xl"
            style="display:flex; flex-direction:column">
      <v-form v-model="formValid" lazy-validation ref="form" class="align-content-center" align="center">
        <v-text-field
          class="mb-2 mt-10"
          label="Name"
          v-model="name"
          :rules="[rules.required, rules.length]"
        ></v-text-field>
        <v-text-field
          class="my-2"
          label="Email"
          v-model="email"
          :rules="[rules.required, rules.email]"
        ></v-text-field>
        <v-text-field
          class="my-2"
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
        <v-btn @click="register()" color="primary">Register</v-btn>

        <v-btn id="clear" @click="clear">Clear</v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import {useUserStore} from "@/store/UserStore";
import {mapStores} from "pinia";

export default {
  name: "SignInView",

  data() {
    return {
      name: '',
      email: '',
      username: '',
      password: '',
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        length: value => (value && value.length >= 5) || 'At least 5 characters',
      },
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length >= 5) || 'Username must be at least 5 characters',
      ],
      formValid: true
    }
  },

  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    async register(){
      await this.$refs.form.validate();
      if (!this.formValid) return;

      await this.userStore.register(this.name, this.email, this.username, this.password)

      if (!this.userStore.error) {
        await this.userStore.login(this.username, this.password)

        if (!this.userStore.error) {
          this.$router.push(this.userStore.afterLoginRoute ?? {name: 'events'})
          this.userStore.setAfterLoginRoute(null)
        }
      }
    },

    clear () {
      this.$refs.form.reset()
      this.name = ''
      this.email = ''
      this.username = ''
      this.password = ''
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
#clear {
  margin: 10px;
}
</style>
