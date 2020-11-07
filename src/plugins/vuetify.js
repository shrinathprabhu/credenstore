import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#35495E",
        accent: "#53B883",
        anchor: "#35495E",
      },
      dark: {
        primary: "#35495E",
        accent: "#53B883",
        anchor: "#35495E",
      },
    },
  },
});
