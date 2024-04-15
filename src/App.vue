<template>
  <v-app>
    <Navbar/>
    <v-main class="main">
      <router-view></router-view>
    </v-main>
    <My_footer class="mb-0 pb-0"/>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import My_footer from "@/components/Footer.vue";
export default {
  name: 'App',
  components: {Navbar, My_footer},
  data () {
    return {}
  }
}
</script>

<style>
.main {
  background-image:
  radial-gradient(circle at 140% 50%, #E3939E, transparent 50%),
  radial-gradient(circle at 0% 120%, #40111C, transparent 30%);
  background-repeat: no-repeat;
  background-position: right, bottom left;
  background-size: 600px 600px, 700px 700px;
  background-color: #fff;
  backdrop-filter: blur(450, 460);
  overflow: hidden;
}
</style>

