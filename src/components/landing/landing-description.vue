<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('@/assets/logo.svg')" contain height="100" />
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="12" wrap class="justify-center text-center">
        <span
          style="font-size: 1.6em"
          :style="$vuetify.theme.dark ? 'color: white' : 'color: #757575'"
        >
          Need a way to store your credentials securely on cloud? Need a way to
          share them to your co-workers? Presenting you Credenshare, a web app
          where you can store and share your credentials the secure way. No
          middleware servers involved
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "landing-description",
  props: ["vuetifyClass"],
};
</script>