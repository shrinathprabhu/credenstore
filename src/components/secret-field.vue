<template>
  <v-text-field
    :type="secretType"
    dense
    outlined
    :label="label"
    :ref="label"
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
  props: ["label", "hint", "state", "lockIcon", "lockOpenIcon", "prefill"],
  data: () => ({
    secretType: "password",
    secretIcon: "mdi-lock",
    secretMessage: "Click to show password",
    secret: "",
  }),
  mounted() {
    this.$refs[this.label].$refs.input.onpaste = (e) => e.preventDefault();
    this.secretIcon = this.lockIcon || "mdi-lock";
  },
  methods: {
    togglePasswordType() {
      if (this.secretType === "password") {
        this.secretType = "text";
        this.secretIcon = this.lockOpenIcon || "mdi-lock-open";
        this.secretMessage = "Click to hide password";
      } else {
        this.secretType = "password";
        this.secretIcon = this.lockIcon || "mdi-lock";
        this.secretMessage = "Click to show password";
      }
    },
  },
  watch: {
    prefill() {
      if (this.prefill && this.prefill.length) {
        this.secret = this.prefill;
        this.secretType = "text";
        this.secretIcon = this.lockOpenIcon || "mdi-lock-open";
        this.secretMessage = "Click to hide password";
      }
    },
  },
};
</script>