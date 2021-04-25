<template>
  <div class="search-wrapper">
    <div class="search-head">
      <van-icon name="arrow-left" class="arr-left" @click="$router.goBack()"/>
      <van-search
      class="search-content"
        v-model="value"
        show-action
        :placeholder="place"
        @search="onSearch"
        @input="input"
        @focus="focus"
      >
        <template #action v-if="showList">
          <div @touchend="onSearch(value)">搜索</div>
        </template>
        <template #action v-else>
          <van-icon
          name="shopping-cart-o"
          id="cart"
          :badge="badge"
          @click="$router.push('/home/shopping')"
          />
        </template>
      </van-search>
    </div>
    <div class="like-search" v-if="likeList.length && showList">
      <van-list>
        <van-cell
        v-for="item in likeList"
        :key="item"
        @click="onSearch(item)"
        >
          <template>
            <span class="custom-title" v-html="formatHTML(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="goods-list" v-if="!showList">
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
    </div>
    <div class="my-history" v-if="!likeList.length && showList">
      <my-history :searchList="searchList" @search="onSearch"></my-history>
    </div>
  </div>
</template>

<script>
import goodCard from '../components/goodCard.vue';
import myHistory from '../components/myHistory.vue';

export default {
  components: {
    goodCard,
    myHistory,
  },
  data() {
    return {
      value: this.place,
      place: '酒',
      likeList: [],
      timer: null,
      loading: false,
      finished: false,
      page: 1,
      size: 5,
      goodsList: [],
      showList: true,
      total: 0,
      searchList: [],
    };
  },
  computed: {
    counterMap() {
      return this.$store.state.counterMap;
    },
    badge() {
      const count = Object.values(this.$store.state.counterMap)
        .reduce((pre, next) => pre + next, 0);
      if (count > 99) {
        return '99+';
      }
      return count;
    },
  },
  methods: {
    async onLoad() {
      const value = await this.$api.search(this.value, this.page, this.size);
      this.goodsList = [...this.goodsList, ...value.list];
      this.total = value.total;
      this.loading = false;
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page += 1;
      }
    },
    formatHTML(item) {
      const reg = new RegExp(this.value, 'g');
      return item.replace(reg, this.value.fontcolor('red'));
    },
    onSearch(value) {
      if (!value) {
        this.value = this.place;
      } else {
        this.value = value;
      }
      const result = this.searchList.find((item) => item.value === this.value);
      if (result) {
        result.time = new Date().getTime();
        this.searchList.sort((a, b) => b.time - a.time);
      } else {
        this.searchList.unshift({ value: this.value, time: new Date().getTime() });
        if (this.searchList.length > 10) {
          this.searchList.pop();
        }
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList));
      this.likeList = [];
      this.goodsList = [];
      this.page = 1;
      this.finished = false;
      this.onLoad();
      this.showList = false;
    },
    // 防抖
    async input() {
      if (!this.value) {
        this.likeList = [];
        return;
      }
      clearTimeout(this.timer);
      this.timer = null;
      this.timer = setTimeout(async () => {
        const val = await this.$api.likeSearch(this.value);
        this.likeList = val.result;
        clearTimeout(this.timer);
        this.timer = null;
      }, 300);
    },
    focus() {
      this.showList = true;
    },
  },
  created() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')) || [];
  },
};
</script>

<style lang="less">
.search-wrapper{
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: #fff;
  .search-head{
    width: 345px;
    background-color: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 15px;
    .arr-left{
      font-size: 22px;
    }
    .search-content{
      flex: 1;
    }
  }
  .like-search{
    position: relative;
    top: 50px;
    width: 100%;
    box-sizing: border-box;
    padding-left: 40px;
  }
  .goods-list{
    position: relative;
    width: 345px;
    top: 50px;
    margin: 0 auto;
    z-index: 10;
    background-color: #fff;
  }
  .my-history{
    width: 350px;
    position: absolute;
    top: 35px;
    left: 10px;
    z-index: 1;
  }
}
</style>
