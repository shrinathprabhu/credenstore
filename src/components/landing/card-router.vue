<template>
  <v-tooltip bottom color="primary">
    <template v-slot:activator="{ on, attrs }">
      <v-card
        elevation="0"
        outlined
        shaped
        height="150px"
        class="pa-3 text-center"
        width="160px"
        style="cursor: pointer"
        :style="
          $vuetify.theme.dark ? 'border-color: white' : 'border-color: #757575'
        "
        v-on="on"
        v-bind="attrs"
        :class="crClass ? crClass : ''"
        @click.stop="$router.push(navigateTo)"
        ripple
      >
        <div class="mt-2">
          <v-icon v-if="icon" size="80px" color="accent">{{ icon }}</v-icon>
        </div>
        <div class="mt-2">
          <span class="subtitle-2">{{ name }}</span>
        </div>
      </v-card>
    </template>
    <span>{{ description }}</span>
  </v-tooltip>
</template>

<script>
export default {
  name: "card-router",
  props: ["name", "description", "icon", "navigateTo", "crClass"],
};
</script>