<template>
  <v-app>
    <app-bar />
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