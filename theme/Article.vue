<template>
    <div v-if="isHomePage" key="main">
      <article class="article" v-for="(page, key) in excerpts" :key="key">
        <div v-if="page.frontmatter.banner">
          <a :href="page.path">
            <img class="article-banner" :src="$withBase(page.frontmatter.banner)" >
          </a>
        </div>
        <div
          v-if="page.title || page.frontmatter.date || page.frontmatter.category"
          :class="{'article-meta': true, 'no-banner': !page.frontmatter.banner}" >
          <h1 class="title" v-if="page.title">
            <a :href="page.path" class="link">{{page.title}}</a>
          </h1>
          <div>
            <div class="date" v-if="$dateFormatter(page.frontmatter.date)">
              <i class="fa fa-calendar"></i>
              <span class="text">{{page.frontmatter.date | date}}</span>
            </div>
            <div class="categories" v-if="page.frontmatter.category">
              <i class="fa fa-folder"></i>
              <span class="text">{{page.frontmatter.category}}</span>
            </div>
          </div>
        </div>
        <div class="article-main is-index">
          <Excerpt :custom="false" :page="page"/>
        </div>
        <div class="article-more">
          <a :href="page.path" class='morelink'>{{$themeLocaleConfig.readMore}}</a>
        </div>
        <div class="article-footer">

        </div>
      </article>
    </div>
    <div v-else key="main">
      <article class="article">
        <div v-if="data.banner">
          <img class="article-banner" :src="$withBase(data.banner)" >
        </div>
        <div
          v-if="data.title || data.date || data.category"
          :class="{'article-meta': true, 'no-banner': !data.banner}" >
          <h1 class="title" v-if="data.title">
            <a href="" class="link">{{data.title}}</a>
          </h1>
          <div :class="{'no-title': !data.title}">
            <div class="date" v-if="$dateFormatter(data.date)">
              <i class="fa fa-calendar"></i>
              <span class="text">{{data.date | date}}</span>
            </div>
            <div class="categories" v-if="data.category">
              <i class="fa fa-list"></i>
              <span class="text">{{data.category}}</span>
            </div>
          </div>
        </div>
        <div :class="['article-main', 'no-footer',{'no-meta': !data.title && !data.date && !data.category }]">
          <Content :custom="false"/>
        </div>
      </article>
    </div>
</template>

<script>
import Excerpt from "./Excerpt.vue";

export default {
  components: { Excerpt },
  props: ["isHomePage", "data"],
  computed: {
    excerpts() {
      return this.$localePages.filter(item => item.excerpt);
    }
  }
};
</script>

<style lang="stylus">
@import './styles/config.styl'

.article
  .article-main, .article-meta, .article-more, .atcicle-footer
    max-width $contentWidth
    margin 1rem auto
    padding 0 1.5rem 0.5rem

    &:first-child
      margin-top 0

    .no-title
      padding-top 0.67 * 2em

.article-meta
  &.no-banner
    padding-top 1rem

  .link
    color $textColor

    &:hover
      color $accentColor

  .date, .categories
    display inline-block

    .text
      cursor pointer

      &:hover
        color $accentColor

  .date
    margin-right 15px

  .fa
    margin-right 5px

.article
  .article-main.is-index
    padding-bottom 0

  .article-main.no-footer
    padding-bottom 1.5rem

  .article-more
    padding-top 1rem
    padding-bottom 2rem

  .morelink
    display inline-block
    line-height 1em
    padding 6px 15px
    border-radius 15px
    background #f5f8f9
    color #999
    text-decoration none

    &:hover
      color #fff
      background $accentLighten

.article-main.no-meta
  .content:not(.custom)
    > *:first-child
      padding-top 1rem

    > p:first-child
      -webkit-padding-before 1em
</style>
