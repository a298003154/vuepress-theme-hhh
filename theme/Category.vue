<template>
  <div class="category-list">
    <div class="list-item" v-for="(item,key) in list" :key="key">
      <div>
        <div class="main-item">
          <a
            :class="{'list-item-link link': true, 'active': !collapseList[key].collapse}"
            @click="onCollapse(key)" >
            {{item.type}}
          </a>
          <span class="list-item-count">({{item.count}})</span>
        </div>
        <ul class="sub-item">
          <transition-group name="slide-fade">
            <li
              v-show="!collapseList[key].collapse"
              v-for="(obj, index) in item.children"
              :style="{'transition-delay': index*0.3+'s'}"
              class="list-item-link"
              :key="index">
              <a :href="obj.path" class="link">{{obj.title}}</a>
            </li>
          </transition-group>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      collapseList: []
    }
  },
  computed: {
    list() {
      let arr = this.$categories.map(item => ({ ...item, children: [], collapse: false }));
      this.$localePages
        .filter(item => item.frontmatter.category)
        .forEach(item => {
          arr.forEach(obj => {
            if (item.frontmatter.category === obj.type) {
              obj.children.push(item);
            }
          });
        });
      this.collapseList = arr.map(item => item)
      return arr;
    }
  },
  methods: {
    onCollapse(key) {
      this.collapseList[key].collapse = !this.collapseList[key].collapse
    }
  }
};
</script>

<style lang="stylus">

.main
  .category-list
    padding: 1rem 1.5rem
    background-color #fff
    .list-item
      padding 5px 0

  .main-item
    padding 5px 0

    a.list-item-link
      font-size 16px
      cursor pointer

  .sub-item
    margin 0
    padding-left 2em
    list-style disc

    .list-item-link
      font-size 14px
      text-transform none
      padding 5px 0

      &:before
        display none

</style>

