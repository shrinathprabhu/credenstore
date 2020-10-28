<template>
  <v-app>
    <app-bar />
    <!-- <v-main> -->
    <v-row class="justify-center">
      <v-col>
        <form>
          <secret-field label="Enter secret" />
          <secret-field label="Re-enter secret" />
          <hr class="mb-5" />
          <v-textarea outlined label="Enter your credentials" no-resize />
          <span>OR</span>
          <v-file-input
            outlined
            label="Upload credentials file"
            prepend-icon=""
            append-icon="mdi-paperclip"
            ref="upload"
            @click:append.stop="$refs.upload.$refs.input.click()"
          ></v-file-input>
        </form>
      </v-col>
    </v-row>
    <!-- </v-main> -->
  </v-app>
</template>

<script>
import AppBar from "../components/appbar.vue";
import SecretField from "../components/secret-field.vue";
export default {
  name: "upload-creds",
  components: {
    AppBar,
    SecretField,
  },
  data: () => ({}),
  methods: {},
};
</script>