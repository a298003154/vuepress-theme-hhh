<template>
  <div :class="{profile: true, fixed: fixProfile}">
      <div class="base-info profile-block">
        <img :src="$withBase(data.avatar)" alt="" class="avatar">
        <div class="name">{{$withBase(data.name)}}</div>
        <div class="title">{{$withBase(data.title)}}</div>
        <span class="location">
          <i class="fa fa-map-marker"></i>
          GuangZhou, China
        </span>
        <a :href="$withBase(data.github)" class="follow">关注我</a>
      </div>
      <div class="article-info profile-block">
        <div class="article-info-block">{{$localePages.length || 0}} <span>{{$themeLocaleConfig.profile.posts || 'posts'}}</span></div>
        <div class="article-info-block">{{$tags.length || 0}} <span>{{$themeLocaleConfig.profile.tags || 'tags'}}</span></div>
      </div>
      <div class="social-links profile-block">
        <div class="table">
          <div 
            class="table-row" 
            v-for="(socials,key) in socialRows" 
            :key="key"
          >
            <div 
              :class="['table-cell',{'active': activeBtn === social.index}]" 
              v-for="(social,index) in socials" 
              :key="index" 
              @mouseleave="mouseout"
            >
              <a 
                :href="social.link || '/'" 
                :alt="social.type"
                @mouseenter="mouseover(social.index, $event)"
              >
                <i :class="['fa','fa-'+social.type]"></i>
              </a>
              <div :class="['tooltip',{'active': activeBtn === social.index}]" :ref="'tip'+social.index">
                <div class="tooltip-content">
                  <div class="tooltip-arrow"></div>
                  <div class="tooltip-inner">{{social.type}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ["fixProfile"],
  data() {
    return {
      activeBtn: "",
    };
  },
  computed: {
    data() {
      return this.$site.themeConfig;
    },
    socialRows() {
      const arr = this.data.socials.map((o, index) => ({
        ...o,
        index,
        link: o.link || "/"
      }));
      const countInRow = 4;
      const len = arr.length;
      if (len <= countInRow) {
        return arr;
      }
      if (len > countInRow) {
        const rows = Math.ceil(len / countInRow);
        return Array.from({ length: rows }, (item, index) =>
          arr.slice(index * countInRow, (index + 1) * countInRow)
        );
      }
    }
  },
  methods: {
    mouseover(index, e) {
        this.activeBtn = index;
    },
    mouseout(e) {
      this.activeBtn = null;
    },
  },
};
</script>

<style lang="stylus">
@import './styles/config.styl';

@media (max-width: $MQNarrow) 
  .theme-container .profile.fixed 
    position absolute
    display block
    top 'calc(%s + 20px)' % $navbarHeight
    right 1.5rem


.profile 
  background-color #fff

  .base-info
    .name,
    .title,
    .location
      display block
      text-align center
      line-height normal
    .avatar
      display block
      margin 10px auto 20px
      width 128px
      height 128px
      border-radius 50%
    .name
      font-size 1.3rem
      font-weight 600
    .title
      font-size 1rem
      color $subtextColor
    .location
      font-size .8rem
      margin-top 5px
      color #9a9ea3
      .fa
        margin-right 5px
    .follow
      color #fff
      width 150px
      height 40px
      display block
      font-size 14px
      line-height 40px
      text-align center
      margin 20px auto 10px
      background $accentLighten
      border-radius 20px
      transition .2s ease
      &:hover
        background lighten($accentLighten, 8%)

  .article-info
    padding 0
    &:before,
    &:after
      content ''
      display table
    &:after
      clear both
    .article-info-block
      width 50%
      float left
      padding 20px 15px
      text-align center
      box-sizing border-box
      font-size 20px
      span
        display block
        font-size 14px
        text-transform uppercase
      &:first-child
        border-right 1px solid #eceff2

  .social-links
    >.table
      width 100%
      .table-cell
        text-align center
        font-size 24px
        &.active
          a
            color $textColor
        a
          position relative
          color #898d92
          transition 0.2s ease
          
  .profile-block 
    padding 15px 20px
    border-bottom 1px solid #eceff2
    &:last-child 
      border-bottom none

  .table 
    display table

  .table-row
    margin-bottom 10px
    &:last-child 
      margin-bottom 0
    
  .table-cell 
    position relative
    display inline-block
    width 25%
    text-align center

  .tooltip
    font-size 14px
    line-height 1.5
    color rgba(0, 0, 0, 0.65)
    box-sizing border-box
    margin 0
    padding 0
    list-style none
    position absolute
    z-index 1060
    display none
    top -33px
    left 50%
    transform translateX(-50%)
    &.active 
      display block
  
  .tooltip-arrow 
    position absolute
    width 0
    height 0
    top 33px
    left 50%
    transform translateX(-50%)
    border-color transparent
    border-style solid
    bottom 3px
    border-width 5px 5px 0
    border-top-color rgba(0, 0, 0, 0.75)

  .tooltip-inner 
    box-sizing border-box
    max-width 250px
    padding 6px 8px
    color #fff
    text-align left
    text-decoration none
    white-space nowrap
    background-color rgba(0, 0, 0, .75)
    border-radius 4px
    box-shadow 0 2px 8px rgba(0, 0, 0, .15)
    min-height 32px
  
  
</style>
