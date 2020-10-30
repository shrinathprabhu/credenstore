<template>
  <v-app>
    <app-bar title="Credenshare" />
    <v-main>
      <v-container>
        <landing-description />
        <v-row class="justify-center">
          <card-router
            icon="mdi-lock"
            name="Store Credentials"
            description="Encrypt your credentials and store it on cloud"
            navigateTo="store"
          ></card-router>
          <card-router
            crClass="ml-10"
            icon="mdi-key-variant"
            name="Retrieve Credentials"
            description="Download your credentials from cloud and decrypt it"
            navigateTo="retrieve"
          ></card-router>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import LandingDescription from "../components/landing/landing-description.vue";
import CardRouter from "../components/landing/card-router.vue";
import AppBar from "../components/appbar.vue";
export default {
  name: "landing-page",
  components: {
    LandingDescription,
    CardRouter,
    AppBar,
  },
  data: () => ({}),
  methods: {},
};
</script>