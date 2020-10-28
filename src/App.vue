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
import firebase from "./utils/firebase";
export default {
  name: "App",

  mounted: function () {
    document.title = "Credenshare";
    firebase.collection("sample").add({ sample: "yeah" });
  },
};
</script>
