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
    }
}