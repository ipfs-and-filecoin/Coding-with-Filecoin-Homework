<template>
  <div id="wrapper">
      Crypto
      <label for="input">Text to encrypt:</label><br/>
      <textarea v-model="input" id="input" name="input" type="text" rows=4 cols=70></textarea><br/>
      <input id="testme" type="button" value="Test Me!!!" @click="handleTest1"/><br/>
  </div>
</template>

<script>
// import JSEncrypt from '@/utils';
// import JSEncrypt from '@/utils/test';
import JSEncrypt from 'jsencrypt/bin/jsencrypt';
import bs64 from 'base64-js';

export default {
  data() {
    return {
      input: 'This is a test!',
      privkey: `-----BEGIN RSA PRIVATE KEY-----
  MIICXQIBAAKBgQDlOJu6TyygqxfWT7eLtGDwajtNFOb9I5XRb6khyfD1Yt3YiCgQ
  WMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76xFxdU6jE0NQ+Z+zEdhUTooNR
  aY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4gwQco1KRMDSmXSMkDwIDAQAB
  AoGAfY9LpnuWK5Bs50UVep5c93SJdUi82u7yMx4iHFMc/Z2hfenfYEzu+57fI4fv
  xTQ//5DbzRR/XKb8ulNv6+CHyPF31xk7YOBfkGI8qjLoq06V+FyBfDSwL8KbLyeH
  m7KUZnLNQbk8yGLzB3iYKkRHlmUanQGaNMIJziWOkN+N9dECQQD0ONYRNZeuM8zd
  8XJTSdcIX4a3gy3GGCJxOzv16XHxD03GW6UNLmfPwenKu+cdrQeaqEixrCejXdAF
  z/7+BSMpAkEA8EaSOeP5Xr3ZrbiKzi6TGMwHMvC7HdJxaBJbVRfApFrE0/mPwmP5
  rN7QwjrMY+0+AbXcm8mRQyQ1+IGEembsdwJBAN6az8Rv7QnD/YBvi52POIlRSSIM
  V7SwWvSK4WSMnGb1ZBbhgdg57DXaspcwHsFV7hByQ5BvMtIduHcT14ECfcECQATe
  aTgjFnqE/lQ22Rk0eGaYO80cc643BXVGafNfd9fcvwBMnk0iGX0XRsOozVt5Azil
  psLBYuApa66NcVHJpCECQQDTjI2AQhFc1yRnCU/YgDnSpJVm1nASoRUnU8Jfm3Oz
  uku7JUXcVpt08DFSceCEX9unCuMcT72rAQlLpdZir876
  -----END RSA PRIVATE KEY-----`,
      pubkey: `-----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
  FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
  xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
  gwQco1KRMDSmXSMkDwIDAQAB
  -----END PUBLIC KEY-----`,
      privkey2020: `-----BEGIN RSA PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAIFT1Ib1X5zllNrWANlEtu//kiQ7wt6Uqz+KQnQl0Ut/J4PFVwMn0xBSHtMrkie3hoMLtAyTWVZpopqoyrsbAmN5FcVpRwugNqt17fpifTjFjtCK9FR3BonFPOfdoVEfZAp92kkHFSfpyRLBgVl51VEI383aPmwr3RhBNWAQ9+B3AgMBAAECgYANjxNuHtWqZmuH0f3+yXSAjwPsZpOUsHOP0tgKw1hBGRC0gQERZKB9So7Oxveo0FX68UQsOVqZc7PHkUDIAxnp28DDzVd8V70MmnOna3DhPHW2wxrI6bqr3xFF8yrIVA9kz76u/FxTdhUUwO5RHpcaaPLAdA58SkpolXlLcMRdcQJBALvZRvM1YCEot6E/nNg86qrKSZj3WPBnQ+ory1RjqOzIdpm6DpNbdFaNyoyujtndYXtcBC3p/LQxjkElH0kpeTkCQQCwP04PHUTXkKQUdRE7Zuqc6XELVy7/UQI0cYjdtvztp0gQ2rcBCJVX+JilYJf+ogTJt79vMRCK1PmEmEkMqpcvAkEArGe1Y4AocyaAqqDMnfYC1q+ELr1NRo8wWNrK6e/x2Sf/GgYWXI5CTzIhpU6MU06IqoSAXXd0dBlLW2TruuUymQJADvPP84hQJtmmkfW8mIWKsfU8GfIzkoWU4k4fhm/X1XGzs3pavEO2J9h3WtBvFLM6JMLqAszu0lhvMsiYqfJvEQJAP3ZVrNpZ3/uXJ989dBglWvhKF2xyCr4i66aiJAQ3dr/pfvYhV5EBcqVRxreF/aoH+G66GeULvLpzBb8mMe984A==
  -----END RSA PRIVATE KEY-----`,
      pubkey2020: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCBU9SG9V+c5ZTa1gDZRLbv/5IkO8LelKs/ikJ0JdFLfyeDxVcDJ9MQUh7TK5Int4aDC7QMk1lWaaKaqMq7GwJjeRXFaUcLoDarde36Yn04xY7QivRUdwaJxTzn3aFRH2QKfdpJBxUn6ckSwYFZedVRCN/N2j5sK90YQTVgEPfgdwIDAQAB',
    };
  },
  methods: {
    handleTest() {
      this.$log.info(JSEncrypt);
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubkey);
      const encrypted = encrypt.encrypt(this.input);
      this.$log.info('encrypted', encrypted);

      // Decrypt with the private key...
      const decrypt = new JSEncrypt();
      decrypt.setPrivateKey(this.privkey);
      const uncrypted = decrypt.decrypt(encrypted);
      this.$log.info('uncrypted', uncrypted);

      // Now a simple check to see if the round-trip worked.
      if (uncrypted === this.input) {
        this.$log.info('It works!!!');
      } else {
        this.$log.info('Something went wrong....');
      }
    },
    handleTest1() {
      const encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.pubkey2020);
      const encrypted = encrypt.encrypt(this.input);
      this.$log.info('encrypted', encrypted);

      const hex = this.base64ToHex(encrypted);
      this.$log.info('hex', hex);

      // Decrypt with the private key...
      const decrypt = new JSEncrypt();
      decrypt.setPrivateKey(this.privkey2020);
      const uncrypted = decrypt.decrypt(encrypted);
      this.$log.info('uncrypted', uncrypted);

      // Now a simple check to see if the round-trip worked.
      if (uncrypted === this.input) {
        this.$log.info('It works!!!');
      } else {
        this.$log.info('Something went wrong....');
      }
    },
    hexToBase64(hex) {
      const buf = Buffer.from(hex, 'hex');
      const uint8array = new Uint8Array(buf);
      const b64 = bs64.fromByteArray(uint8array);
      return b64;
    },
    base64ToHex(base64) {
      const uint8array = bs64.toByteArray(base64);
      const buf = Buffer.from(uint8array);
      const hex = buf.toString('hex');
      return hex;
    },

  },
};
</script>

<style lang="scss" scoped>

</style>