<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="justify-center">
          <v-col sm="9" cols="12">
            <a
              class="text-h6"
              @click.stop="$router.go(-1)"
              style="color: #53b883"
              >Go Back</a
            >
            <h3 class="text-h4 mt-8">Terms of Use</h3>
            <p class="text-subtitle-1 mt-5">Last updated: Nov 01 2020</p>
            <p class="text-subtitle-1 mt-5">
              Please read these Terms of Use("Terms", "Terms of Use") before
              using
              <a
                href="https://credenstore.web.app"
                style="text-decoration: none; color: #53b883"
              >
                Credenstore
              </a>
              ("Service").
            </p>
            <p class="text-subtitle-1 mt-5">
              Your access to and use of the Service is conditioned on your
              acceptance of and complaince with these Terms. These Terms apply
              to all visitors, users and others who access or use the Service.
            </p>
            <p class="text-subtitle-1 mt-5">
              By accessing or using the Service you agree to be bound by these
              Terms. If you disagree with any part of the Terms then you may not
              access the Service.
            </p>
            <p class="text-subtitle-1 mt-5">
              You will need a computer or a mobile device with Internet access
              to use our the Service.
            </p>
            <p class="text-subtitle-1 mt-5">
              All the encryption and decryption of content takes place at client
              side. Only encrypted content is stored in the cloud database
              without decryption key. Still it would be recommended to not store
              critically sensitive data in Credenstore. We may not be held
              responsible for the loss of your decryption key or retrieval link.
              We may not be held liable for the loss or leak of your data. It is
              upto visitor, user or other to secure their decryption link/id and
              decrytion key. In case you forget the decryption key or decryption
              link/id, there is no way to recover those as we don't store any
              additional info other than encrypted content.
            </p>
            <p class="text-h6 mt-8">Termination</p>
            <p class="text-subtitle-1 mt-6">
              We may terminate or suspend access to our Service immediately,
              without prior notice or liability, for any reason whatsoever,
              including limitation if you breach the Terms.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "terms-of-use",
};
</script>