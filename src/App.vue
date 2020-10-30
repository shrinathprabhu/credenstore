<template>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<script>
export default {
  name: "App",

  mounted: function () {
    document.title = "Credenshare";
  },
};
</script>
