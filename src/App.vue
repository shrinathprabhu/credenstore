<template>
  <landing-page />
</template>

<script>
import LandingPage from "./views/landing-page.vue";

export default {
  name: "App",

  components: {
    LandingPage,
  },

  mounted: function () {
    document.title = "Credenshare";
  },
};
</script>
