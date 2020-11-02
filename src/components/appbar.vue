<template>
  <v-app-bar app color="primary" dark>
    <div
      class="d-flex align-center"
      style="cursor: pointer"
      @click.stop="navigateToHome"
    >
      <v-img
        alt="Credenstore logo"
        contain
        src="@/assets/logo.png"
        transition="scale-transition"
        width="32"
      />

      <h3 class="text-h5 ml-3">{{ title }}</h3>
    </div>

    <v-spacer></v-spacer>

    <v-tooltip bottom color="primary">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon dark @click.stop="openPaypalMe()" v-on="on" v-bind="attrs">
          <v-icon>mdi-paypal</v-icon>
        </v-btn>
      </template>
      <span>Buy me a coffee</span>
    </v-tooltip>

    <v-tooltip bottom color="primary">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click.stop="dark = !dark" dark v-on="on" v-bind="attrs">
          <v-icon>{{ dark ? "mdi-brightness-7" : "mdi-brightness-4" }}</v-icon>
        </v-btn>
      </template>
      <span>{{ dark ? "Switch to light mode" : "Switch to dark mode" }}</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
export default {
  name: "appbar",
  props: ["title"],
  data: () => ({
    dark: false,
  }),
  mounted() {
    this.dark = this.strToBool(localStorage.getItem("dark")) || true;
    document.title = this.title;
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
    openPaypalMe() {
      console.log(process.env.VUE_APP_Paypal_Me_Link);
      window.open(process.env.VUE_APP_Paypal_Me_Link, "__blank");
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