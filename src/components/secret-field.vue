<template>
  <v-text-field
    :type="secretType"
    dense
    outlined
    :label="label"
    :append-icon="secretIcon"
    v-model="secret"
    @keyup.stop="$emit('change', secret)"
    :hint="hint"
    :error-messages="state.error ? state.message : ''"
    :success-messages="state.success ? state.message : ''"
  >
    <template slot="append">
      <v-tooltip bottom color="primary">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-on="on"
            v-bind="attrs"
            style="cursor: pointer"
            @click.stop="togglePasswordType"
          >
            {{ secretIcon }}
          </v-icon>
        </template>
        <span>{{ secretMessage }}</span>
      </v-tooltip>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: "secret-field",
  props: ["label", "hint", "state"],
  data: () => ({
    secretType: "password",
    secretIcon: "mdi-lock",
    secretMessage: "Click to show password",
    secret: "",
  }),
  mounted() {
    this.secret = this.value;
  },
  methods: {
    togglePasswordType() {
      if (this.secretType === "password") {
        this.secretType = "text";
        this.secretIcon = "mdi-lock-open";
        this.secretMessage = "Click to hide password";
      } else {
        this.secretType = "password";
        this.secretIcon = "mdi-lock";
        this.secretMessage = "Click to show password";
      }
    },
  },
};
</script>