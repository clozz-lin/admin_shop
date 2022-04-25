<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    // this.getApi()
  },
  methods: {
    getApi() {
      // this.$http.get('815517/pet/1').then((res) => console.log(res))
    }
  }
}
</script>

<style lang="less"></style>
