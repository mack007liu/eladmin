<template>
  <div class="hello"></div>
</template>

<script>
  import {getOpenId} from "@/api/data";
  import {Indicator} from "mint-ui";

  export default {
    data() {
      return {
        msg: "Welcome to Your Vue.js App"
      };
    },
    created() {
      // 'snake'、'fading-circle'、'double-bounce'、'triple-bounce'
      Indicator.open({
        text: "Loading...",
        spinnerType: "triple-bounce"
      });
      this.Code();
    },
    methods: {
      getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      Code() {
        this.$store.commit("changeToken", null);
        this.$store.commit("changeCode", this.getQueryString("code"));
        this.axios
          .get(getOpenId + "?code=" + this.getQueryString("code"))
          .then(res => {
            debugger
            if (res.data.msg == "bind") {
              Indicator.close();
              this.$store.commit("changeOpenId", res.data.data);
              this.$router.push("bind");
            } else if (res.data.msg == "newtoken") {
              this.$store.commit("changeToken", res.data.data.token.access_token);
              this.$store.commit("changeUserInfo", res.data.data.user);
              this.$store.commit("changeOpenId", res.data.data.user.openId);
              Indicator.close();
              this.$router.push("home");
            }
          })
          .catch(err => {
          });
      }
    }
  };
</script>

<style scoped>
</style>
