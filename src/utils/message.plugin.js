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

    Vue.prototype.$showMessage = function(html, type) {
        switch (type) {
          case 'error': {
            this.$toast.warning(html, {timeout: 10000})
            break
          }
          case 'success': {
            this.$toast.success(html)
            break
          }
          case null || undefined: {
            this.$toast(html)
            break
          }
        }
    };

  }
}
