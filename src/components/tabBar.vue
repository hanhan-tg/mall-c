<template>
  <van-tabbar fixed route>
    <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
    <van-tabbar-item
    icon="shopping-cart-o"
    to="/home/shopping"
    :badge="badge"
    id="cart"
    >购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
  computed: {
    badge() {
      const count = Object.values(this.$store.state.counterMap)
        .reduce((pre, next) => pre + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
};
</script>

<style>

</style>
