<template>
  <div class="side-bar-wrapper" ref="side">
      <div
      v-for="(item, i) in sideList"
      :key="i"
      :class="{active: index === i}"
      @touchend="scrollTo(i, $event)"
      @touchmove="move = true"
      @touchstart="move = false"
      >{{i == 0 ? '全部' : item}}</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import util from '../util/index';

export default {
  data() {
    return {
      index: 0,
      move: false,
    };
  },
  computed: {
    sideList() {
      return this.$store.state.sideList;
    },
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    scrollTo(i, e) {
      if (this.move) return;
      this.index = i;

      const { side } = this.$refs;
      const sonTop = e.target.getBoundingClientRect().top;
      const sonHeight = e.target.offsetHeight;
      const pTop = side.getBoundingClientRect().top;
      const pHeight = side.offsetHeight;
      util.moveScroll(side.scrollTop, sonTop + sonHeight / 2 - pTop - pHeight / 2, side, 'scrollTop');
      // 获取列表信息
      this.resetGoodsList();
      this.$store.dispatch('getGoodsList', { type: this.sideList[i], page: 1, sort: 'all' });
    },
  },
  mounted() {
    // this.resetGoodsList();
    // this.$store.dispatch('getGoodsList', { type: this.sideList[0], page: 1, sort: 'all' });
  },
};
</script>

<style lang="less" scoped>
.side-bar-wrapper{
    position: fixed;
    top: 135px;
    left: 0;
    width: 79px;
    bottom: 1.333333rem;
    overflow: auto;
    background-color: #f8f8f8;
    div {
        width: 100%;
        text-align: center;
        font-size: 12px;
        height: 40px;
        line-height: 40px;
        position: relative;
    }
    .active {
        font-weight: bold;
        color: #ff1a90;
    }
    .active::before {
        position: absolute;
        width: 6px;
        height: 18px;
        background: #ff1a90;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        content: '';
    }
}
.side-bar-wrapper::-webkit-scrollbar{
    width: 0px;
    background: none;
}
</style>
