<template>
  <v-overlay z-index="1000">
    <v-row class="justify-center">
      <v-progress-circular indeterminate color="primary" width="8" size="96" />
    </v-row>
    <div class="text-center mt-5">
      <span>{{ loadingText }}</span>
    </div>
  </v-overlay>
</template>

<script>
export default {
  name: "overlay-loader",
  props: ["loadingText"],
};
</script>