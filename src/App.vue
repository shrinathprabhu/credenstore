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
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              @click.stop="dark = !dark"
              dark
              v-on="on"
              v-bind="attrs"
            >
              <v-icon>{{
                dark ? "mdi-brightness-7" : "mdi-brightness-4"
              }}</v-icon>
            </v-btn>
          </template>
          <span>{{
            dark ? "Switch to light mode" : "Switch to dark mode"
          }}</span>
        </v-tooltip>
      </div>
    </v-app-bar>

    <v-main>
      <landing-page />
    </v-main>
  </v-app>
</template>

<script>
import LandingPage from "./views/landing-page.vue";

export default {
  name: "App",

  components: {
    LandingPage,
  },

  mounted: function () {
    document.title = "Crendenshare";
    this.dark = localStorage.getItem("dark") || true;
  },

  data: () => ({
    dark: false,
  }),

  methods: {},
  watch: {
    dark() {
      this.$vuetify.theme.dark = this.dark;
      localStorage.setItem("dark", this.dark);
    },
  },
};
</script>
