<template>
  <div class="tab-wrapper" ref="scroll">
    <div class="tab-item"
    v-for="(item, i) in menuList"
    :key="item.title"
    :class="{ active: i == index}"
    @touchend="scrollTo(i, $event)"
    @touchstart="move = false"
    @touchmove="move = true"
    >
      <div class="img-box" >
        <img
          :src="item.imgURL"
        >
      </div>
      <div class="title-box">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import api from '../api/index';
import util from '../util/index';

export default {
  data() {
    return {
      index: 0,
      move: false,
      menuList: [
        {
          title: '时令水果',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg',
        },
        {
          title: '酒水冲调',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg',
        },
        {
          title: '安心乳品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg',
        },
        {
          title: '休闲零食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg',
        },
        {
          title: '肉蛋食材',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg',
        },
        {
          title: '新鲜蔬菜',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/新鲜食材.jpg',
        },
        {
          title: '熟食餐饮',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg',
        },
        {
          title: '海鲜水产',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg',
        },
        {
          title: '粮油调味',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/粮油调味.jpg',
        },
        {
          title: '某手美食',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/某手美食.jpg',
        },
        {
          title: '纸杯清洁',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/纸品清洁.jpg',
        },
        {
          title: '个人护理',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/个人护理.jpg',
        },
        {
          title: '美妆护肤',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/美妆护肤.jpg',
        },
        {
          title: '家居收纳',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg',
        },
        {
          title: '家用电器',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg',
        },
        {
          title: '3C数码',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg',
        },
        {
          title: '母婴用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg',
        },
        {
          title: '鲜花绿植',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg',
        },
        {
          title: '宠物用品',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg',
        },
        {
          title: '图书玩具',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/图书文具.jpg',
        },
        {
          title: '手表配饰',
          imgURL:
            'https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg',
        },
      ],
    };
  },
  async created() {
    const list = await api.getSideList(this.menuList[0].title);
    this.$store.dispatch('getSideList', list);
  },
  methods: {
    async scrollTo(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      const itemLeft = e.target.getBoundingClientRect().left;
      const itemWidth = e.target.offsetWidth;
      const wrapperWidth = this.$refs.scroll.offsetWidth;
      const changeDisX = itemLeft - wrapperWidth / 2 + itemWidth / 2;
      util.moveScroll(this.$refs.scroll.scrollLeft, changeDisX, this.$refs.scroll, 'scrollLeft');

      // 获取二级导航
      const list = await api.getSideList(this.menuList[i].title);
      this.$store.dispatch('getSideList', list);
    },
  },
};
</script>

<style lang="less">
.tab-wrapper{
    height: 104px;
    display: flex;
    overflow: auto;
    .tab-item{
        flex-shrink: 0;
        width: 50px;
        padding: 10px 5px;
        text-align: center;
        .img-box{
            width: 100%;
            height: 50px;
            border-width: 2px;
            border-style: solid;
            border-color: transparent;
            border-radius: 23px;
            display: flex;
            justify-content: center;
            align-content: center;
            img{
                width: 45px;
                height: 45px;
                border-radius: 50%;
                align-self: center;
            }
        }
        .title-box{
            margin-top: 5px;
        }
    }
    .active{
        .img-box {
            background: #fff;
            border-color: #d13193;
        }
        .title-box {
            color: #fff;
            background: #d13193;
            font-weight: bold;
            border-radius: 30px;
        }
    }
}
.tab-wrapper::-webkit-scrollbar{
    width: 0;
}
</style>
