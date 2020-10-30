<template>
  <v-app>
    <app-bar title="Credenshare Store" />
    <v-main style="width: 100% !important">
      <v-container class="mt-5">
        <v-row class="justify-center">
          <v-col cols="8">
            <form>
              <v-text-field
                readonly
                dense
                outlined
                label="Unique Id"
                :value="uniqueId"
              >
                <template slot="append">
                  <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-on="on"
                        v-bind="attrs"
                        style="cursor: pointer"
                        @click.stop="copyUniqueIdToClipboard"
                      >
                        mdi-content-copy
                      </v-icon>
                    </template>
                    <span>Click to copy id</span>
                  </v-tooltip>
                </template>
              </v-text-field>
              <secret-field
                label="Enter encryption password"
                @change="setPassword"
                hint="Use combination of letters, numbers and symbols"
                :state="passwordState"
              />
              <div class="mb-2"></div>
              <secret-field
                label="Re-enter encryption password"
                @change="setConfirmPassword"
                hint="Repeat the password same as above"
                :state="confirmPasswordState"
              />
              <hr class="mb-8 mt-1" />
              <v-textarea
                outlined
                label="Enter your credentials"
                no-resize
                hint="Enter the secrets and passwords that you want to store securely on cloud"
                v-model="creds"
              />
              <v-row class="justify-center mb-2">
                <span>OR</span>
              </v-row>
              <v-file-input
                :accept="fileTypes.join(',')"
                outlined
                dense
                label="Upload credentials file"
                prepend-icon=""
                append-icon="mdi-paperclip"
                ref="upload"
                @click:append.stop="$refs.upload.$refs.input.click()"
                hide-details
                class="mb-5"
                @change.native="captureFilePath"
              ></v-file-input>
              <hr class="mb-5" />
              <v-row class="justify-center">
                <v-btn color="primary" dark @click.stop="encryptAndUpload"
                  >Encrypt and upload</v-btn
                >
              </v-row>
            </form>
          </v-col>
        </v-row>
      </v-container>
      <v-snackbar
        v-model="snackbarState.show"
        timeout="5000"
        :color="snackbarState.color"
      >
        <strong>{{ snackbarState.message }}</strong>

        <template v-slot:action="{ attrs }">
          <v-btn icon text v-bind="attrs" @click="snackbarState.show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
    <overlay-loader v-if="showOverlay" :loadingText="overlayText" />
  </v-app>
</template>

<script>
import AppBar from "../components/appbar.vue";
import SecretField from "../components/secret-field.vue";
import OverlayLoader from "../components/overlay-loader.vue";
import PasswordStrength from "../mixins/password-strength.mixin";
import { extractFileContent } from "../utils/file";
import shortid from "shortid";
// import { hideCreds } from "../utils/triplesec";
export default {
  name: "upload-creds",
  components: {
    AppBar,
    SecretField,
    OverlayLoader,
  },
  mixins: [PasswordStrength],
  data: () => ({
    fileTypes: [
      ".env",
      ".env.local",
      ".env.test",
      ".env.pro",
      ".txt",
      ".config.js",
      ".json",
      ".xlsx",
      ".csv",
      ".yml",
      ".xml",
      ".xls",
    ],
    password: "",
    confirmPassword: "",
    passwordState: {
      error: false,
      dirty: false,
      success: false,
      message: "",
    },
    confirmPasswordState: {
      error: false,
      dirty: false,
      success: false,
      message: "",
    },
    snackbarState: {
      error: false,
      success: false,
      show: false,
      message: "",
    },
    creds: "",
    credsFile: {},
    uniqueId: "",
    showOverlay: false,
    overlayText: "",
  }),
  methods: {
    setPassword(v) {
      this.password = v;
      this.passwordState.dirty = true;
    },
    setConfirmPassword(v) {
      this.confirmPassword = v;
      this.confirmPasswordState.dirty = true;
    },
    setPasswordState(obj, error, success, message) {
      obj.error = error;
      obj.success = success;
      obj.message = message;
    },
    showSnackbar(error, success, message, color) {
      this.snackbarState.show = true;
      this.snackbarState.error = error;
      this.snackbarState.success = success;
      this.snackbarState.message = message;
      this.snackbarState.color = color || "error";
    },
    encryptAndUpload() {
      if (this.password.length === 0) {
        this.showSnackbar(true, false, "Enter password to continue");
      } else if (this.passwordState.error) {
        this.showSnackbar(true, false, "Resolve password issues to continue");
      } else if (!this.confirmPassword.length === 0) {
        this.showSnackbar(true, false, "Confirm password to continue");
      } else if (this.confirmPasswordState.error) {
        this.showSnackbar(
          true,
          false,
          "Resolve password confirmation issues to continue"
        );
      } else {
        if (this.creds) {
          console.log(this.creds);
        }
        if (this.credsFile) {
          extractFileContent(this.credsFile);
        }
      }
    },
    captureFilePath(e) {
      this.creds = "";
      this.credsFile = e.target.files[0];
    },
    confirmPasswordStateVerification() {
      if (this.passwordState.error) {
        this.setPasswordState(
          this.confirmPasswordState,
          true,
          false,
          "Resolve password errors before confirming"
        );
      } else {
        if (this.confirmPassword !== this.password) {
          this.setPasswordState(
            this.confirmPasswordState,
            true,
            false,
            "Passwords must match"
          );
        } else {
          this.setPasswordState(
            this.confirmPasswordState,
            false,
            true,
            "Awesome"
          );
        }
      }
    },
    copyUniqueIdToClipboard() {
      if (!navigator.clipboard) {
        this.showSnackbar(
          true,
          false,
          "Copying to clipboard is not supported in your browser"
        );
      } else {
        navigator.clipboard
          .writeText(this.uniqueId)
          .then(() => {
            this.showSnackbar(false, true, "Copied to clipboard", "success");
          })
          .catch((e) => {
            console.error(e);
            this.showSnackbar(
              true,
              false,
              "Copying to clipboard failed. Try again"
            );
          });
      }
    },
  },
  mounted: function () {
    this.uniqueId = shortid();
  },
  watch: {
    password() {
      if (this.confirmPasswordState.dirty) {
        this.confirmPasswordStateVerification();
      }
      if (this.password.length === 0) {
        this.setPasswordState(
          this.passwordState,
          true,
          false,
          "Please enter a password"
        );
      } else {
        let strength = this.measurePasswordStrength(this.password);
        if (strength < 45) {
          this.setPasswordState(
            this.passwordState,
            true,
            false,
            "Weak Password"
          );
        } else if (strength < 60) {
          this.setPasswordState(
            this.passwordState,
            true,
            false,
            "Looks good but make it a bit more stronger"
          );
        } else {
          this.setPasswordState(this.passwordState, false, true, "Looks great");
        }
      }
    },
    confirmPassword() {
      this.confirmPasswordStateVerification();
    },
    creds() {
      if (this.creds.length > 0) {
        if (this.credsFile) {
          this.$refs.upload.reset();
          this.$refs.upload.$refs.input.value = "";
          if (!/safari/i.test(navigator.userAgent)) {
            this.$refs.upload.$refs.input.type = "";
            this.$refs.upload.$refs.input.type = "file";
          }
          this.credsFile = null;
        }
      }
    },
  },
};
</script>