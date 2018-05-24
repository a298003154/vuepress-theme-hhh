<template>
  <div>
    <ul
      :class="['timeline', {'hidden': obj.hidden}]"
      v-for="(obj, index) in timeline">
      <li
        :class="['timeline-item','calendar']"
        v-if="obj.type === 'calendar'">
        <div class="timeline-item-tail"></div>
        <div class="timeline-item-head" @click="onCollapse(index)">
          <i class="fa fa-calendar"></i>
        </div>
        <div class="timeline-item-content">{{obj.date}}</div>
      </li>
      <transition-group name="slide-fade">
        <li
          v-show="!obj.hidden"
          :class="[
          'timeline-item',
          {'timeline-item-last': index === timeline.length - 1 && key === obj.children.length - 1},
          ]"
          v-for="(item, key) in obj.children"
          :key="key">
          <div class="timeline-item-tail"></div>
          <div class="timeline-item-head">
          </div>
          <div class="timeline-item-content">
            <div>
              <div class="timeline-article-title">
                <a :href="item.path" class="link">
                  {{item.title || item.frontmatter.title || '&nbsp;'}}
                </a>
              </div>
              <div class="timeline-article-meta article-meta">
                <div class="date">
                  <a :href="item.path">
                    <i class="fa fa-calendar"></i>
                    <span class="text">{{item.frontmatter.date | date}}</span>
                  </a>
                </div>
                <div class="categories">
                  <i class="fa fa-folder"></i>
                  <span class="text">{{item.frontmatter.category}}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      collapseList: []
    };
  },
  computed: {
    localePages: function() {
      return this.$localePages
        .filter(item => item.frontmatter.date)
        .sort(
          (a, b) =>
            moment(b.frontmatter.date, "YYYY-MM-DD HH:mm:ss").valueOf() -
            moment(a.frontmatter.date, "YYYY-MM-DD HH:mm:ss").valueOf()
        );
    },
    timeline: function() {
      let timeline = [];
      this.localePages.forEach((item, index, arr) => {
        const date = item.frontmatter.date;
        if (
          index === 0 ||
          !moment(date, "YYYY-MM-DD").isSame(arr[index - 1], "year")
        ) {
          timeline.push({
            type: "calendar",
            date: moment(item.frontmatter.date, "YYYY-MM-DD").format("YYYY"),
            hidden: false,
            children: [item]
          });
        } else {
          timeline.forEach(timeItem => {
            if (
              moment(date)
                .year()
                .toString() === timeItem.date
            )
              timeItem.children.push(item);
          });
        }
      });
      this.collapseList = timeline.map(item => item);
      return timeline;
    }
  },
  methods: {
    onCollapse: function(key) {
      this.collapseList[key].hidden = !this.collapseList[key].hidden;
    }
  }
};
</script>

<style lang="stylus">
@import './styles/config.styl'

.timeline
  list-style none
  margin 0
  padding 0
  font-size 14px
  overflow hidden
  transition all 5s

  &.hidden
    &:last-child
      .timeline-item-tail
        height 0

.timeline-item
  position relative
  padding 0 0 20px

.timeline-item:not(.calendar)
  margin-left (($majorTimelineHead - $minorTimelineHead) / 2)

.timeline-item-last
  .timeline-item-tail
    display none

.timeline-item-tail
  position absolute
  left ($minorTimelineHead / 2 - 1)
  top 'calc(1em + %s)' % $minorTimelineHead
  height 100%
  border-left 2px solid #e8e8e8
  transition all 0.3s

  .timeline-item.calendar &
    top 'calc(1em + %s)' % $minorTimelineHead
    left ($majorTimelineHead / 2 - 1)

.timeline-item-head
  box-sizing border-box
  position absolute
  width $minorTimelineHead
  height $minorTimelineHead
  margin-top 1em
  background-color #fff
  border-radius 100px
  border 2px solid transparent
  color $accentColor
  border-color $accentColor

.timeline-item.calendar
  .timeline-item-head
    background-color $accentColor
    border 2px solid $accentColor
    width $majorTimelineHead
    height $majorTimelineHead
    margin-top ((16 * 1.7 - $majorTimelineHead) * 3 / 5)
    cursor pointer

    .fa
      position absolute
      top 3px
      left 3px
      color #fff

  .timeline-item-content
    margin-left 25px
    padding 0 10px
    font-size 16px
    font-weight bold
    background-color transparent
    box-shadow none

    &:before
      position static
      display none
      border none

.timeline-item-content
  // padding 0 0 0 18px
  position relative
  // top -6px
  // left 25px
  margin-left 25px
  padding 0 10px
  background-color #fff
  box-shadow $boxShadow

  &:before
    display block
    content ''
    position absolute
    top 1em
    left -12px
    border 6px solid transparent
    border-right-color #fff

.timeline-article-title
  padding 0.5em 10px 10px

.timeline-article-meta
  padding 10px
  font-size 14px
  color #898d92
  border-top 1px solid #f7f7f7
  background-color rgba(244, 246, 247, 0.2)

  a
    color $textColor
</style>
