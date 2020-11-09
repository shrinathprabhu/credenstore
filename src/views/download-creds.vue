<template>
  <v-app>
    <app-bar
      :title="
        $vuetify.breakpoint.mobile ? 'C Retrieve' : 'Credenstore Retrieve'
      "
    />
    <v-main>
      <v-container class="mt-5">
        <v-row class="justify-center">
          <v-col sm="8" cols="12">
            <form>
              <v-text-field
                :readonly="$route.params.id ? true : false"
                dense
                outlined
                label="Retrieval ID"
                v-model="uniqueId"
                append-icon="mdi-file-lock"
                :hint="
                  !$route.params.id ? 'Enter your unique retrieval id' : ''
                "
              >
              </v-text-field>
              <secret-field
                label="Decryption password"
                @change="setPassword"
                hint="Enter the password used to encrypt credentials in this store"
                :state="passwordState"
                lockIcon="mdi-file-key"
                lockOpenIcon="mdi-file-key-outline"
              />
              <secret-field
                label="Confirm decryption password"
                @change="setConfirmPassword"
                hint="Enter the password used to encrypt credentials in this store"
                :state="confirmPasswordState"
                lockIcon="mdi-file-key"
                lockOpenIcon="mdi-file-key-outline"
              />
              <v-row class="justify-center">
                <v-btn color="primary" dark @click.stop="downloadAndDecrypt">
                  Download and decrypt
                </v-btn>
              </v-row>
              <hr class="my-5" />
              <v-textarea
                readonly
                :disabled="creds ? false : true"
                v-model="creds"
                outlined
                label="Your decrypted credentials"
                no-resize
              >
                <template slot="append-outer">
                  <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-on="on"
                        v-bind="attrs"
                        style="cursor: pointer"
                        @click.stop="copyToClipboard(creds)"
                      >
                        mdi-content-copy
                      </v-icon>
                    </template>
                    <span>Click to copy credentials</span>
                  </v-tooltip>
                </template>
              </v-textarea>
            </form>
          </v-col>
        </v-row>
      </v-container>
      <v-snackbar
        v-model="snackbarState.show"
        timeout="5000"
        :color="snackbarState.color"
        bottom
      >
        <strong>{{ snackbarState.message }}</strong>

        <template v-slot:action="{ attrs }">
          <v-btn icon v-bind="attrs" @click="snackbarState.show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
    <app-footer />
    <overlay-loader v-if="showOverlay" :loadingText="overlayText" />
  </v-app>
</template>

<script>
import AppBar from "../components/appbar.vue";
import AppFooter from "../components/app-footer.vue";
import SecretField from "../components/secret-field.vue";
import OverlayLoader from "../components/overlay-loader.vue";
import firebase from "../utils/firebase";
import { revealCreds } from "../utils/triplesec";
import { saveAs } from "file-saver";
export default {
  name: "download-creds",
  components: {
    AppBar,
    AppFooter,
    SecretField,
    OverlayLoader,
  },
  data: () => ({
    uniqueId: "",
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
    showOverlay: false,
    overlayText: "",
    snackbarState: {
      show: false,
      message: "",
    },
    creds: "",
  }),
  mounted() {
    if (this.$route.params.id) {
      this.uniqueId = this.$route.params.id;
    }
  },
  methods: {
    setPassword(v) {
      this.password = v;
      this.passwordState.dirty = true;
    },
    setConfirmPassword(v) {
      this.confirmPassword = v;
      this.confirmPasswordState.dirty = true;
    },
    showSnackbar(message, color) {
      this.snackbarState.show = true;
      this.snackbarState.message = message;
      this.snackbarState.color = color || "error";
    },
    setPasswordState(obj, error, success, message) {
      obj.error = error;
      obj.success = success;
      obj.message = message;
    },
    downloadAndDecrypt() {
      if (!this.uniqueId.length) {
        this.showSnackbar("Enter retrieval id to continue");
      } else if (this.passwordState.error) {
        this.showSnackbar("Resolve decryption password issues to continue");
      } else if (!this.password.length) {
        this.showSnackbar("Decryption password should not be empty");
      } else if (this.confirmPasswordState.error) {
        this.showSnackbar("Resolve decryption password issues to continue");
      } else if (!this.confirmPassword.length) {
        this.showSnackbar("Confirm decryption password to continue");
      } else if (this.password !== this.confirmPassword) {
        this.showSnackbar("Passwords must match");
      } else {
        this.showOverlay = true;
        this.overlayText = "Fetching encrypted credentials from cloud...";
        firebase
          .collection("credentials")
          .doc(this.uniqueId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.overlayText = "Decrypting credentials with your password...";
              const data = doc.data();
              revealCreds(data.encryptedCreds, this.password)
                .then((creds) => {
                  this.showOverlay = false;
                  if (data.file) {
                    const blob = new Blob([creds], {
                      type: data.metadata.type,
                    });
                    saveAs(blob, data.metadata.name);
                  } else {
                    this.creds = creds;
                  }
                  this.showSnackbar("Data fetched and decrypted", "success");
                })
                .catch((e) => {
                  this.showOverlay = false;
                  if (
                    e instanceof Error &&
                    e.message === "Signature mismatch or bad decryption key"
                  ) {
                    this.showSnackbar("Incorrect decryption password");
                  } else {
                    this.showSnackbar(
                      "Something went wrong while decrypting. Try again"
                    );
                  }
                });
            } else {
              this.showOverlay = false;
              if (this.$route.params.id) {
                this.showSnackbar("Invalid link");
              } else {
                this.showSnackbar("Invalid retrieval id");
              }
            }
          })
          .catch((e) => {
            console.error(e.message);
            this.showOverlay = false;
            if (e.message === "Missing or insufficient permissions.") {
              if (this.$route.params.id) {
                this.showSnackbar("Retrieval link expired");
              } else {
                this.showSnackbar("Retrieval ID expired");
              }
            } else {
              this.showSnackbar("Something went wrong. Try again");
            }
          });
      }
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
    fallbackCopyToClipboard(value) {
      try {
        let textArea = document.createElement("textarea");
        textArea.value = value;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        let successful = document.execCommand("copy");
        textArea.remove();
        if (successful) {
          this.showSnackbar("Copied to clipboard", "success");
        } else {
          this.showSnackbar("Failed to copy. Try again");
        }
      } catch (e) {
        console.error(e);
        this.showSnackbar(
          "Copying to clipboard is not supported in your browser"
        );
      }
    },
    copyToClipboard(value) {
      if (value) {
        if (!navigator.clipboard) {
          this.fallbackCopyToClipboard(value);
        } else {
          navigator.clipboard
            .writeText(value)
            .then(() => {
              this.showSnackbar("Copied to clipboard", "success");
            })
            .catch((e) => {
              console.error(e);
              this.showSnackbar("Failed to copy. Try again");
            });
        }
      }
    },
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
      } else if (this.password.toLowerCase() === this.uniqueId.toLowerCase()) {
        this.setPasswordState(
          this.passwordState,
          true,
          false,
          "Password should not be similar to unique id"
        );
      } else {
        this.setPasswordState(this.passwordState, false, true, "Looks great");
      }
    },
    confirmPassword() {
      this.confirmPasswordStateVerification();
    },
  },
};
</script>