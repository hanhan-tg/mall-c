<template>
  <div class="classify">
    <router-link class="search-btn" to="/search" tag="div">
      <van-icon name="search" />
      <div>特价苹果1元一斤</div>
    </router-link>
    <my-tab></my-tab>
    <template v-if="showContent">
      <side-bar></side-bar>
      <good-list></good-list>
    </template>
    <van-loading v-else size="2rem" vertical></van-loading>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';
import myTab from '../components/tab.vue';
import sideBar from '../components/sideBar.vue';
import goodList from '../components/goodList.vue';

export default {
  components: {
    myTab,
    sideBar,
    goodList,
  },
  computed: {
    ...mapState({
      showContent: (state) => state.showContent,
      sideList: (state) => state.sideList,
    }),
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    ...mapActions(['getGoodsList']),
  },
  watch: {
    showContent() {
      if (this.showContent) {
        this.resetGoodsList();
        this.getGoodsList({ type: this.sideList[0], page: 1, sortType: 'all' });
      }
    },
  },
};
</script>

<style lang="less">
.classify{
  width: 375px;
  .search-btn{
    width: 355px;
    height: 31.5px;
    line-height: 31.5px;
    border-radius: 10px;
    margin: 10.5px auto 0;
    background-color: #eee;
    text-align: center;
    color: #a1a1a1;
    >*{
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
