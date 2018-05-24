<template>
  <div class="page">
    <Profile :fix-profile="fixProfile"/>
    <section class="main">
      <Article
        v-if="pathKey === 'index' || pathKey === ''"
        :isHomePage="isHomePage"
        :data="data"/>
      <Timeline v-else-if="pathKey === 'archives'"/>
      <Category v-else-if="pathKey === 'categories'"/>
      <TagsCloud v-else-if="pathKey === 'tags'"/>
    </section>
    <SidebarRight/>
    <div class="content edit-link" v-if="editLink">
      <a :href="editLink" target="_blank" rel="noopener noreferrer">
        {{ editLinkText }}
      </a>
      <OutboundLink/>
    </div>
    <div class="content page-nav" v-if="prev || next">
      <p class="inner">
        <span v-if="prev" class="prev">
          ← <router-link v-if="prev" class="prev" :to="prev.path">
            {{ prev.title || prev.path }}
          </router-link>
        </span>
        <span v-if="next" class="next">
          <router-link v-if="next" :to="next.path">
            {{ next.title || next.path }}
          </router-link> →
        </span>
      </p>
    </div>
    <slot name="bottom"/>
  </div>
</template>

<script>
import OutboundLink from "./OutboundLink.vue";
import Profile from "./Profile.vue";
import SidebarRight from "./SidebarRight.vue";
import Excerpt from "./Excerpt.vue";
import Article from "./Article.vue";
import Category from "./Category.vue";
import Timeline from "./Timeline.vue";
import TagsCloud from "./TagsCloud.vue";
import { resolvePage, normalize, outboundRE, endingSlashRE } from "./util";

export default {
  components: {
    OutboundLink,
    Profile,
    SidebarRight,
    Excerpt,
    Article,
    TagsCloud,
    Timeline,
    Category
  },
  props: ["sidebarItems", "fixProfile"],
  data() {
    return {
      pathKey: ""
    };
  },
  computed: {
    isHomePage() {
      return (
        this.$route.fullPath === "/" ||
        this.$route.fullPath === this.$themeLocaleConfig.rootPath
      );
    },
    data() {
      console.log(this.$site, this.$page);
      return this.$page.frontmatter;
    },
    prev() {
      const prev = this.$page.frontmatter.prev;
      if (prev === false) {
        return;
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path);
      } else {
        return resolvePrev(this.$page, this.sidebarItems);
      }
    },
    next() {
      const next = this.$page.frontmatter.next;
      if (next === false) {
        return;
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path);
      } else {
        return resolveNext(this.$page, this.sidebarItems);
      }
    },
    editLink() {
      const {
        repo,
        editLinks,
        docsDir = "",
        docsBranch = "master",
        docsRepo = repo
      } = this.$site.themeConfig;

      let path = normalize(this.$page.path);
      if (endingSlashRE.test(path)) {
        path += "README.md";
      } else {
        path += ".md";
      }

      if (docsRepo && editLinks) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : `https://github.com/${docsRepo}`;
        return (
          base.replace(endingSlashRE, "") +
          `/edit/${docsBranch}/` +
          docsDir.replace(endingSlashRE, "") +
          path
        );
      }
    },
    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      );
    }
  },
  watch: {
    $route: {
      handler: function(to, from) {
        const { nav } = this.$themeLocaleConfig;
        for (let i = 0; i < nav.length; i++) {
          const item = nav[i];
          if (to.path.match(new RegExp(item.link + "?$"))) {
            this.pathKey = item.key;
            break;
          }
        }
      },
      immediate: true
    }
  }
};

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

function find(page, items, offset) {
  const res = [];
  items.forEach(item => {
    if (item.type === "group") {
      res.push(...(item.children || []));
    } else {
      res.push(item);
    }
  });
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === "page" && cur.path === page.path) {
      return res[i + offset];
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.page
  max-width 1320px
  margin 0 auto
  padding $navbarHeight + 2.5rem 20px 2rem

.edit-link.content
  padding-top 0 !important

  a
    color lighten($textColor, 25%)
    margin-right 0.25rem

.page-nav.content
  padding-top 1rem !important
  padding-bottom 0 !important

  .inner
    min-height 2rem
    margin-top 0 !important
    border-top 1px solid $borderColor
    padding-top 1rem

  .next
    float right
</style>
