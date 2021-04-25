<template>
  <div class="good-list">
    <div class="list-title">
      <div
        :class="{active: type === 'all'}"
        @click="changeType('all')"
      >综合</div>
      <div
        :class="{active: type === 'sale'}"
        @click="changeType('sale')"
      >销量</div>
      <div
        class="price"
        :class="{ 'price-up': type === 'price-up', 'price-down': type === 'price-down' }"
        @click="changeType('price')"
      >价格</div>
    </div>
    <div class="list-content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
        >
          <good-card
          v-for="(item) in goodsList"
          :key="item.id"
          v-bind="item"
          :num="counterMap[item.id]"
          ></good-card>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import goodCard from './goodCard.vue';

export default {
  components: {
    goodCard,
  },
  data() {
    return {
      type: 'all',
      isLoading: false,
      loading: false,
      finished: false,
    };
  },
  computed: {
    goodsList() {
      return this.$store.state.goodsList;
    },
    counterMap() {
      return this.$store.state.counterMap;
    },
  },
  methods: {
    ...mapMutations(['resetGoodsList']),
    onRefresh() {
      this.isLoading = true;
      this.finished = false;
      this.page = 1;
      this.loading = false;
      this.resetGoodsList();
      this.$store.dispatch('getGoodsList', { page: this.page, sort: this.type });
      this.isLoading = false;
    },
    async onLoad() {
      this.page += 1;
      this.loading = true;
      const res = await this.$store.dispatch('getGoodsList', { page: this.page, sort: this.type });
      if (res) {
        this.loading = false;
      } else {
        this.finished = true;
      }
    },
    changeType(val) {
      if (val === 'price') {
        if (this.type === 'price-up') {
          this.type = 'price-down';
        } else {
          this.type = 'price-up';
        }
      } else {
        this.type = val;
      }
      this.onRefresh();
    },
  },
};
</script>

<style lang="less">
.good-list {
  .list-title {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    font-size: 12px;
    height: 25px;
    > div {
      height: 25px;
      line-height: 25px;
      width: 50px;
      text-align: center;
      color: #aaa;
    }
    .active,
    .price-up,
    .price-down {
      color: #ff1a90;
      font-weight: bold;
    }
    .price {
      margin-right: 15px;
      position: relative;
    }
    .price::before {
      content: "";
      position: absolute;
      border: 4px solid transparent;
      border-top-color: #aaa;
      bottom: 4px;
      right: 0;
    }
    .price::after {
      content: "";
      position: absolute;
      border: 4px solid transparent;
      border-bottom-color: #aaa;
      top: 4px;
      right: 0;
    }
    .price-up::before {
      border-top-color: #ff1a90;
    }
    .price-down::after {
      border-bottom-color: #ff1a90;
    }
  }
}
.list-content{
  width: 296px;
  position: fixed;
  top: 170px;
  right: 0;
  bottom: 50px;
  overflow: auto;
}
.van-pull-refresh {
  overflow: unset !important;
}
</style>
