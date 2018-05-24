<template>
  <div class="sidebar-right">
    <div class="widget-wrap">
      <div class="widget-title">{{this.$themeLocaleConfig.sideBar[0].text}}</div>
      <div class="widget">
        <div class="recent-list">
          <div class='list-item' v-for="(page, index) in $localePages" :key="index">
            <div class="item-thumbnail">
              <a :href="page.path" class="thumbnail">
                <div
                  class="thumbnail-image"
                  :style="{
                    backgroundImage: `url(${page.frontmatter.banner ? page.frontmatter.banner
                    : $withBase('/assets/img/thumb-default-small.png')})`
                  }">
                </div>
              </a>
            </div>
            <div class="item-inner">
              <p class="item-category">
                <a :href="page.path">{{page.frontmatter.category}}</a>
              </p>
              <p class="item-title">
                <a :href="page.path" class="title">{{page.frontmatter.title}}</a>
              </p>
              <p class="item-date">
                <span class="date">{{page.frontmatter.date | date}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Widget
      :title="this.$themeLocaleConfig.sideBar[1].text"
      :list="$categories.slice(0, 5)"
      className="category"
    />
    <Widget
      :title="this.$themeLocaleConfig.sideBar[2].text"
      :list="$archives"
      className="archive"
    />
    <Widget
      :title="this.$themeLocaleConfig.sideBar[3].text"
      :list="$tags"
      className="tag"
    />
  </div>
</template>

<script>
import Widget from './Widget.vue'

export default {
  components: { Widget },
}
</script>

<style lang="stylus">
@import './styles/config.styl';

.sidebar-right
  height 1000px

.widget-wrap
  margin 40px 10px
  &:first-child
    margin 0 10px

.widget-title
  text-transform uppercase

.widget
  padding 5px 5px 10px

.recent-list
  .list-item
    position relative
    padding 10px 0 10px 95px
    overflow hidden
    &:hover
      .item-thumbnail
        opacity .8
      .item-inner .item-title .title
        color $accentColor
        // .title
    &:after
      display block
      content ''
      clear both
    .item-thumbnail
      float left
      margin-left -95px
      transition all .2s
      .thumbnail
        width 80px
        height 80px
        display block
        position relative
        overflow hidden
        .thumbnail-image
          position absolute
          width 100%
          height 100%
          background-size cover
          background-position center
    .item-inner
      p
        line-height 1.4em
        margin 0
        padding 0
      .item-title
        .title
          color $textColor
      .item-date
        .date
          color #9a9ea3

[class$='-list']:not(.recent-list)
  .list-item
    padding 10px 0
  .list-item-link
    font-size 14px
    &:hover,
    &.active
      &.link,
      &:before
        color #333
  .list-item-link
    text-transform uppercase
    &.active
      &:before
        content "\f0d7"
    &:before
      color #ccc
      content "\f0da"
      font-size 12px
      margin-right 6px
      font-family FontAwesome
      transition 0.2s ease

  .list-item-count
    padding-left 5px
    color #999
    font-size: .85em

</style>
