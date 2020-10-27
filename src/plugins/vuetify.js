import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#1776D2",
                anchor: "#1776D2",
                secondary: "light-grey",
            },
            dark: {
                primary: "#1776D2",
                anchor: "#1776D2",
                secondary: "#c2c2c2"
            }
        }
    }
});
