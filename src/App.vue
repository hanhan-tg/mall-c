<template>
  <div id="app">
    <home />
  </div>
</template>

<script>
import home from './views/home.vue';

export default {
  components: {
    home,
  },
  created() {
    const counterMap = JSON.parse(localStorage.getItem('goods')) || {};
    this.$store.commit('setCounterMap', counterMap);
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
#app{
}
</style>
