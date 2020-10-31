<template>
  <v-app>
    <app-bar title="Credenstore Retrieve" />
    <v-main>
      <v-container></v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "../components/appbar.vue";
export default {
  name: "download-creds",
  components: {
    AppBar,
  },
  data: () => ({}),
  mounted: function () {
    console.log(this.$route.params.id);
  },
};
</script>