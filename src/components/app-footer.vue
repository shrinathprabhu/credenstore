<template>
  <v-footer>
    <v-row class="justify-center">
      <a :style="$vuetify.theme.dark ? 'color: white' : 'color: #757575'">
        Terms of use
      </a>
      <a
        :href="paypalMeLink"
        target="__blank"
        :style="$vuetify.theme.dark ? 'color: white' : 'color: #757575'"
        class="ml-5"
      >
        Paypal Me
      </a>
    </v-row>
  </v-footer>
</template>

<style scoped>
</style>

<script>
export default {
  name: "app-footer",
  data: () => ({
    paypalMeLink: process.env.VUE_APP_Paypal_Me_Link,
  }),
};
</script>