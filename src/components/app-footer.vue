<template>
  <v-footer class="py-5">
    <v-row class="justify-center">
      <router-link
        :style="$vuetify.theme.dark ? 'color: white' : 'color: #757575'"
        to="/terms-of-use"
      >
        Terms of use
      </router-link>
      <a
        :href="paypalMeLink"
        target="__blank"
        :style="$vuetify.theme.dark ? 'color: white' : 'color: #757575'"
        class="ml-5"
      >
        Paypal Me
      </a>
      <a
        :href="sourceCodeLink"
        target="__blank"
        :style="$vuetify.theme.dark ? 'color: white' : 'color: #757575'"
        class="ml-5"
      >
        Source code
      </a>
      <a
        :href="contactLink"
        target="__blank"
        :style="$vuetify.theme.dark ? 'color: white' : 'color: #757575'"
        class="ml-5"
      >
        Contact
      </a>
    </v-row>
  </v-footer>
</template>

<style scoped>
a {
  text-decoration: none;
}
</style>

<script>
export default {
  name: "app-footer",
  data: () => ({
    paypalMeLink: process.env.VUE_APP_Paypal_Me_Link,
    sourceCodeLink: process.env.VUE_APP_Source_Code,
    contactLink: process.env.VUE_APP_Linkedin_Contact,
  }),
};
</script>