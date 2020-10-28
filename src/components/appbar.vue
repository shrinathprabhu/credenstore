<template>
  <v-app-bar app color="primary" dark>
    <div
      class="d-flex align-center"
      style="cursor: pointer"
      @click.stop="navigateToHome"
    >
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
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click.stop="dark = !dark" dark v-on="on" v-bind="attrs">
            <v-icon>{{
              dark ? "mdi-brightness-7" : "mdi-brightness-4"
            }}</v-icon>
          </v-btn>
        </template>
        <span>{{ dark ? "Switch to light mode" : "Switch to dark mode" }}</span>
      </v-tooltip>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "appbar",
  data: () => ({
    dark: false,
  }),
  mounted: function () {
    this.dark = this.strToBool(localStorage.getItem("dark"));
  },
  methods: {
    navigateToHome() {
      if (window.location.pathname !== "/") {
        this.$router.push("/");
      }
    },
    strToBool(str) {
      if (str) {
        if (str === "false" || str === "0") {
          return false;
        } else return true;
      } else return false;
    },
  },
  watch: {
    dark() {
      this.$vuetify.theme.dark = this.dark;
      localStorage.setItem("dark", String(this.dark));
    },
  },
};
</script>