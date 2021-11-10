export default {
  install (Vue,) {

    Vue.prototype.$message = function(html) {
      this.$toast(html)
    };

    Vue.prototype.$success = function(html) {
      this.$toast.success(html)
    };

    Vue.prototype.$error = function(html) {
      this.$toast.warning(html, {timeout: 10000})
    };
  }
}
