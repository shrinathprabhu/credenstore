<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Credenshare logo"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="32"
        />

        <h3 class="text-h5 ml-3">Credenshare</h3>
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex">
        <v-btn icon @click.stop="dark = !dark" dark>
          <v-icon v-if="dark">mdi-brightness-7</v-icon>
          <v-icon v-else>mdi-brightness-4</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <landing-description vuetifyClass="mt-10 pl-10 pr-10" />
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import LandingDescription from "./components/landing-description.vue";

export default {
  name: "App",

  components: {
    HelloWorld,
    LandingDescription,
  },

  mounted: function () {
    document.title = "Crendenshare";
    this.dark = localStorage.getItem("dark") || false;
  },

  data: () => ({
    dark: false,
  }),

  methods: {},
  watch: {
    dark() {
      this.$vuetify.theme.dark = this.dark;
    },
  },
};
</script>
