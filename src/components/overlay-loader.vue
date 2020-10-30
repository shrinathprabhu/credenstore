<template>
  <v-overlay z-index="1000">
    <v-progress-circular indeterminate color="primary" width="8" size="128" />
    <div class="text-center mt-5">
      <span class="text-h5">{{ loadingText }}</span>
    </div>
  </v-overlay>
</template>

<script>
export default {
  name: "overlay-loader",
  props: ["loadingText"],
};
</script>