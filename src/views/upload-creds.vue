<template>
  <v-app>
    <app-bar title="Credenstore Store" />
    <v-main>
      <v-container class="mt-5">
        <v-row class="justify-center">
          <v-col sm="8" cols="12">
            <form>
              <v-text-field
                readonly
                dense
                outlined
                label="Store ID"
                :value="uniqueId"
              >
                <template slot="append">
                  <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        v-on="on"
                        v-bind="attrs"
                        style="cursor: pointer"
                        @click.stop="copyToClipboard(uniqueId)"
                      >
                        mdi-content-copy
                      </v-icon>
                    </template>
                    <span>Click to copy store id</span>
                  </v-tooltip>
                </template>
              </v-text-field>
              <secret-field
                label="Encryption password"
                @change="setPassword"
                :prefill="prefill"
                hint="Use combination of letters, numbers and symbols"
                :state="passwordState"
              />
              <div class="mb-2"></div>
              <secret-field
                label="Confirm encryption password"
                @change="setConfirmPassword"
                :prefill="prefill"
                hint="Repeat the password same as above"
                :state="confirmPasswordState"
              />
              <v-row class="justify-center mb-5">
                <v-btn
                  color="primary"
                  dark
                  @click.stop="autofillStrongPassword"
                >
                  Generate password
                </v-btn>
              </v-row>
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
              <v-row class="mx-2">
                <v-checkbox
                  label="Set expiry"
                  dense
                  inset
                  color="accent"
                  v-model="canExpire"
                />
                <v-spacer />
                <v-text-field
                  label="Expires after"
                  class="mt-3 shrink"
                  style="width: 150px"
                  type="number"
                  :min="expiryRules.min"
                  :max="expiryRules.max"
                  dense
                  outlined
                  :disabled="!canExpire"
                  v-model="expiresAfter"
                  :error-messages="expiryError"
                />
                <v-select
                  class="shrink ml-3 mt-3"
                  dense
                  outlined
                  label="Time"
                  :disabled="!canExpire"
                  v-model="expiryUnit"
                  style="width: 150px"
                  :items="['minutes', 'hours', 'days', 'weeks', 'months']"
                >
                </v-select>
              </v-row>
              <hr class="mb-5" />
              <v-row class="justify-center">
                <v-btn color="primary" dark @click.stop="encryptAndUpload">
                  Encrypt and upload
                </v-btn>
              </v-row>
            </form>
          </v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="showDialog" width="320px">
        <v-card>
          <v-card-title
            class="headline"
            style="background-color: #55af51; color: white"
          >
            <span>Retrieval Info</span>
            <v-spacer />
            <v-btn icon @click="showDialog = false" dark>
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <div class="my-2 text-subtitle-2">
              Your encrypted credentials are stored in cloud successfully
            </div>
            <div class="text-subtitle-1 my-2">
              Enter the below ID in retrieve page
            </div>
            <v-text-field
              dense
              outlined
              readonly
              label="Retrieve ID"
              v-model="idToRetrieve"
              hide-details
            >
              <template slot="append-outer">
                <v-tooltip bottom color="primary">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-on="on"
                      v-bind="attrs"
                      style="cursor: pointer"
                      @click.stop="copyToClipboard(idToRetrieve)"
                    >
                      mdi-content-copy
                    </v-icon>
                  </template>
                  <span>Click to copy retrieve id</span>
                </v-tooltip>
              </template>
            </v-text-field>
            <div class="text-center text-h5 mt-3 mr-3">OR</div>
            <div class="text-subtitle-1 my-2">
              Visit the below url to retrieve the data
            </div>
            <v-textarea
              dense
              outlined
              readonly
              label="URL"
              v-model="linkToRetrieve"
              hide-details
              no-resize
              rows="3"
            >
              <template slot="append-outer">
                <v-tooltip bottom color="primary">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-on="on"
                      v-bind="attrs"
                      style="cursor: pointer"
                      @click.stop="copyToClipboard(linkToRetrieve)"
                    >
                      mdi-content-copy
                    </v-icon>
                  </template>
                  <span>Click to copy retrieve link</span>
                </v-tooltip>
              </template>
            </v-textarea>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-snackbar
        v-model="snackbarState.show"
        timeout="5000"
        :color="snackbarState.color"
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
import PasswordStrength from "../mixins/password-strength.mixin";
import { extractFileContent } from "../utils/file";
import shortid from "shortid";
import { hideCreds } from "../utils/triplesec";
import firebase from "../utils/firebase";
import { firestore } from "firebase/app";
export default {
  name: "upload-creds",
  components: {
    AppBar,
    SecretField,
    OverlayLoader,
    AppFooter,
  },
  mixins: [PasswordStrength],
  data: () => ({
    fileTypes: [
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
      show: false,
      message: "",
    },
    creds: "",
    credsFile: {},
    uniqueId: "",
    showOverlay: false,
    overlayText: "",
    linkToRetrieve: "",
    idToRetrieve: "",
    showDialog: false,
    idTooltipMessage: "",
    prefill: "",
    canExpire: false,
    expiresAfter: "",
    expiryRules: {
      min: "",
      max: "",
    },
    expiryError: "",
    expiryUnit: "",
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
    showSnackbar(message, color) {
      this.snackbarState.show = true;
      this.snackbarState.message = message;
      this.snackbarState.color = color || "error";
    },
    encryptAndUpload() {
      if (!this.password.length) {
        if (!this.passwordState.dirty) {
          this.setPasswordState(
            this.passwordState,
            true,
            false,
            "Please enter a password"
          );
        }
        this.showSnackbar("Enter password to continue");
      } else if (this.passwordState.error) {
        this.showSnackbar("Resolve password issues to continue");
      } else if (!this.confirmPassword.length) {
        if (!this.confirmPasswordState.dirty) {
          this.setPasswordState(
            this.confirmPasswordState,
            true,
            false,
            "Confirm password to continue"
          );
        }
        this.showSnackbar("Confirm password to continue");
      } else if (this.confirmPasswordState.error) {
        this.showSnackbar("Resolve password confirmation issues to continue");
      } else if (this.password !== this.confirmPassword) {
        this.showSnackbar("Passwords must match");
      } else {
        this.showOverlay = true;
        let expiry = null;
        if (this.canExpire && !this.expiryError) {
          expiry = this.getExpiry();
        }
        if (this.creds) {
          this.overlayText = "Encrypting credentials...";
          hideCreds(this.creds, this.password)
            .then((encryptedCreds) => {
              this.overlayText = "Credentials encrypted.";
              this.upload(encryptedCreds, null, expiry);
            })
            .catch((e) => {
              console.error(e);
              this.showOverlay = false;
              this.showSnackbar("Failed to encrypt data. Try again");
            });
        } else if (this.credsFile.name) {
          this.overlayText = "Extracting file content...";
          extractFileContent(this.credsFile).then((file) => {
            this.overlayText = "Encrypting file content...";

            hideCreds(file.content, this.password)
              .then((encryptedCreds) => {
                this.overlayText = "File content encrypted.";
                this.upload(encryptedCreds, file, expiry);
              })
              .catch((e) => {
                console.error(e);
                this.showOverlay = false;
                this.showSnackbar("Failed to encrypt data. Try again");
              });
          });
        } else {
          this.showOverlay = false;
          this.showSnackbar("Enter content or upload file to continue");
        }
      }
    },
    upload(encryptedCreds, file, expiry) {
      let uploadType = file ? "file content" : "credentials";
      this.overlayText = `Uploading encrypted ${uploadType} to cloud...`;
      let uploadData = {};
      uploadData.encryptedCreds = encryptedCreds;
      if (file) {
        uploadData.file = true;
        uploadData.metadata = {
          name: file.name,
          type: file.type,
        };
      }
      if (expiry) {
        uploadData.expires_at = expiry;
      }
      firebase
        .collection("credentials")
        .doc(this.uniqueId)
        .set(uploadData)
        .then(() => {
          this.showOverlay = false;
          this.displayRetrievalInfo();
          this.clearFields();
        })
        .catch((err) => {
          console.error(err);
          this.showOverlay = false;
          this.showSnackbar(
            "Couldn't upload encrypted credentials to cloud. Try again"
          );
        });
    },
    displayRetrievalInfo() {
      this.idToRetrieve = this.uniqueId;
      this.linkToRetrieve =
        window.location.origin + "/retrieve/" + this.idToRetrieve;
      this.showDialog = true;
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
    },
    clearFileInput() {
      this.$refs.upload.reset();
      this.$refs.upload.$refs.input.value = "";
      if (!/safari/i.test(navigator.userAgent)) {
        this.$refs.upload.$refs.input.type = "";
        this.$refs.upload.$refs.input.type = "file";
      }
      this.credsFile = null;
    },
    clearFields() {
      this.uniqueId = shortid();
      this.creds = "";
      this.clearFileInput();
    },
    hasWhiteSpace(str) {
      return /\s/g.test(str);
    },
    autofillStrongPassword() {
      const strongPassword = this.generateStrongPassword();
      this.password = strongPassword;
      this.passwordState.dirty = true;
      this.confirmPassword = strongPassword;
      this.confirmPasswordState.dirty = true;
      this.prefill = strongPassword;
    },
    validateExpiry(event) {
      if (this.canExpire) {
        if (this.expiresAfter < this.expiryRules.min) {
          if (event === "unit-change") {
            this.expiresAfter = this.expiryRules.min;
          } else {
            this.expiryError =
              "Value should not be less than " + this.expiryRules.min;
          }
        } else if (this.expiresAfter > this.expiryRules.max) {
          if (event === "unit-change") {
            this.expiresAfter = this.expiryRules.max;
          } else {
            this.expiryError =
              "Value should not be greater than " + this.expiryRules.max;
          }
        } else {
          this.expiryError = "";
        }
      }
    },
    getExpiry() {
      let now = Date.now();
      let msUnit = 0;
      switch (this.expiryUnit) {
        case "minutes":
          msUnit = 60000;
          break;
        case "hours":
          msUnit = 60 * 60000;
          break;
        case "days":
          msUnit = 24 * 60 * 60000;
          break;
        case "weeks":
          msUnit = 7 * 24 * 60 * 60000;
          break;
        case "months":
          msUnit = 30 * 24 * 60 * 60000;
          break;
        default:
          break;
      }
      return firestore.Timestamp.fromMillis(now + this.expiresAfter * msUnit);
    },
  },
  mounted() {
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
      } else if (this.hasWhiteSpace(this.password)) {
        this.setPasswordState(
          this.passwordState,
          true,
          false,
          "Password should not contain spaces"
        );
      } else if (this.password.toLowerCase() === this.uniqueId.toLowerCase()) {
        this.setPasswordState(
          this.passwordState,
          true,
          false,
          "Password should not be similar to unique id"
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
          this.clearFileInput();
        }
      }
    },
    canExpire() {
      if (!this.canExpire) {
        this.expiresAfter = "";
        this.expiryUnit = "";
        this.expiryError = "";
      } else {
        this.expiresAfter = 1;
        this.expiryUnit = "minutes";
      }
    },
    expiresAfter() {
      this.validateExpiry("expires-after-change");
    },
    expiryUnit() {
      switch (this.expiryUnit) {
        case "minutes":
          this.expiryRules = {
            min: 1,
            max: 527040,
          };
          break;
        case "hours":
          this.expiryRules = {
            min: 1,
            max: 8784,
          };
          break;
        case "weeks":
          this.expiryRules = {
            min: 1,
            max: 52,
          };
          break;
        case "days":
          this.expiryRules = {
            min: 1,
            max: 366,
          };
          break;
        case "months":
          this.expiryRules = {
            min: 1,
            max: 12,
          };
          break;
        default:
          this.expiryRules = {
            min: "",
            max: "",
          };
          break;
      }
      this.validateExpiry("unit-change");
    },
  },
};
</script>