<template>
  <v-text-field
    hide-details
    append-inner-icon="mdi-magnify"
    single-line
    class="pb-0"
  ></v-text-field>

  <v-container>
    <v-row>
      <v-avatar size="170" class="my-2 ">
        <v-img cover :src="images[id]" height="400px"></v-img>
      </v-avatar>
      <p class="align-self-center">
        <span class="h3 font-weight-bold my-2 py-2 ml-2 ">{{ types[id] }}</span>
        <br/>
        <span class="body_text my-2 py-2 ml-2">Unlimited validity</span>
      </p>
    </v-row>
  </v-container>
  <v-divider class="my-2" thickness="2px" color="secondary"></v-divider>

  <v-container>
    <v-row>
      <p class="body_text">
        <span class="body_text font-weight-bold">Use</span><br/>
        <v-icon color="primary" class="mr-1 mdi-24px">mdi-check</v-icon>
        <span>You can use the voucher for any event on website.</span><br/>
        <v-icon color="primary" class="mr-1 mdi-24px">mdi-check</v-icon>
        <span>You can use the voucher for as many purchases as its total value allows you to.</span><br/>
        <v-icon color="primary" class="mr-1 mdi-24px">mdi-check</v-icon>
        <span>The voucher will be delivered to you via e-mail as a PDF file.</span>
      </p>
      <v-divider class="my-2" thickness="3px" color="secondary"></v-divider>
    </v-row>
    <v-form v-model="formValid" lazy-validation ref="form" class="mt-6">
      <span class="body_text font-weight-bold">Voucher selection</span>
      <v-row class="mb-2">
        <v-col cols="12" md="6">
          <v-select
            class="my-2"
            v-model="category"
            :items="categories"
            hint="Voucher's category and price"
            persistent-hint
            label="Select category"
            :rules="[rules.required]"
          ></v-select>
        </v-col>
        <v-col cols="12" md="1">
          <v-select
            class="my-2"
            v-model="count"
            :items="counts"
            label="-"
            hint="Count"
            persistent-hint
            :rules="[rules.required]"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Total"
            v-model="totalPrice"
            readonly
            suffix="din"
          ></v-text-field>
        </v-col>
        <v-divider class="my-2" thickness="3px" color="secondary"></v-divider>
      </v-row>

      <span class="body_text font-weight-bold my-2">Contact information</span>
      <v-row class="mb-2">
        <v-col cols="12" md="6">
          <v-text-field
            class="my-2"
            label="First name"
            variant="outlined"
            v-model="first_name"
            :rules="[rules.required, rules.length]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="my-2"
            variant="outlined"
            label="Last Name"
            v-model="last_name"
            :rules="[rules.required, rules.length]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            variant="outlined"
            label="Email"
            v-model="email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            variant="outlined"
            label="Phone number"
            v-model="phone"
            :rules="[rules.required]"
            prefix="+381"
          ></v-text-field>
        </v-col>
        <v-divider class="mb-2" thickness="3px" color="secondary"></v-divider>
      </v-row>
      <span class="body_text font-weight-bold my-2">Type of payment</span>
    </v-form>
  </v-container>
</template>

<script>
import all from "@/assets/all.jpg";
import concerts from "@/assets/concerts.jpg";
import theater from "@/assets/theater.jpg";
import exhibitions from "@/assets/museum.jpg";
import festivals from "@/assets/festival.jpg";

export default {
  name: "BuyVoucherView",

  data() {
    return {
      category: null,
      count: null,
      total: null,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      images: [all, concerts, theater, exhibitions, festivals],
      types: ["All-Inclusive Gift Voucher", "Gift Voucher for concerts", "Gift Voucher for theater", "Gift Voucher for exhibitions", "Gift Voucher for festivals"],
      categories: ["Gift Voucher: 500 din", "Gift Voucher: 1000 din", "Gift Voucher: 1500 din", "Gift Voucher: 2000 din", "Gift Voucher: 2500 din"],
      counts: [1,2,3,4,5],
      rules: {
        required: value => !!value || 'Required.',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        length: value => (value && value.length >= 5) || 'At least 5 characters',
      },
    }
  },

  computed: {
    id() {
      return parseInt(this.$route.query.index);
    },
    totalPrice() {
      if (!this.category || !this.count) return null;
      const price = parseInt(this.category.split(':')[1]);
      const count = parseInt(this.count);
      return price * count + 10;
    }
  },
}
</script>

<style scoped>

</style>
