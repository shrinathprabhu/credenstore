export default {
  methods: {
    measurePasswordStrength(v) {
      let score = 0;
      if (!v) return score;
      // award every unique letter until 5 repetitions
      let letters = {};
      for (let i = 0; i < v.length; i++) {
        letters[v[i]] = (letters[v[i]] || 0) + 1;
        score += 5.0 / letters[v[i]];
      }
      // bonus points for mixing it up
      var variations = {
        digits: /\d/.test(v),
        lower: /[a-z]/.test(v),
        upper: /[A-Z]/.test(v),
        nonWords: /\W/.test(v),
      };
      var variationCount = 0;
      for (var check in variations) {
        variationCount += variations[check] == true ? 1 : 0;
      }
      score += (variationCount - 1) * 10;
      return parseInt(score);
    },

    generateStrongPassword() {
      const specials = "!@#$%&_+?.";
      const lowercase = "abcdefghijklmnopqrstuvwxyz";
      const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const numbers = "0123456789";
      const all = specials + lowercase + uppercase + numbers;
      let password = "";
      password += this.pickRandom(specials, 2);
      password += this.pickRandom(lowercase, 2);
      password += this.pickRandom(uppercase, 1);
      password += this.pickRandom(numbers, 1);
      password += this.pickRandom(all, 2, 6);
      password = this.shuffleString(password);
      return password;
    },

    pickRandom(str, min, max) {
      let n,
        chars = "";
      if (typeof max === "undefined") {
        n = min;
      } else {
        n = min + Math.floor(Math.random() * (max - min + 1));
      }
      for (let i = 0; i < n; i++) {
        chars += str.charAt(Math.floor(Math.random() * str.length));
      }
      return chars;
    },

    shuffleString(str) {
      let array = str.split("");
      let tmp,
        current,
        top = array.length;
      if (top)
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      return array.join("");
    },
  },
};
