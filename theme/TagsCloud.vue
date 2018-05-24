<template>
  <!-- <div style="height: 400px; width:400px; background: #fff">
    <div class="tagcloud">
      <a href="" v-for="(tag, key) in $tags" :key="key">{{tag.type}}</a>
    </div>
  </div> -->
  <waterfall :line-gap="200" :watch="items">
    <!-- each component is wrapped by a waterfall slot -->
    <waterfall-slot
      v-for="(item, index) in items"
      :width="item.width"
      :height="item.height"
      :order="index"
      :key="item.id"
    >
      <div :style="item.style" class="tags-item">
        <div class="tags-item-text">
          {{$tags[index].type}}
        </div>
      </div>
    </waterfall-slot>
  </waterfall>
</template>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

var ItemFactory = (function () {

  var lastIndex = 0

  function generateRandomItems (count) {
    var items = [], i
    for (i = 0; i < count; i++) {
      items[i] = {
        index: lastIndex++,
        style: {
          background: getRandomColor()
        },
        width: 20 + ~~(Math.random() * 30),
        height: 20 + ~~(Math.random() * 30)
      }
    }
    return items
  }

  function getRandomColor () {
    var colors = [
      'rgba(21,174,103,.5)',
      'rgba(245,163,59,.5)',
      'rgba(255,230,135,.5)',
      'rgba(194,217,78,.5)',
      'rgba(195,123,177,.5)',
      'rgba(125,205,244,.5)'
    ]
    return colors[~~(Math.random() * colors.length)]
  }

  return {
    get: generateRandomItems
  }

})()

export default {
  components: {
    Waterfall,
    WaterfallSlot
  },
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.items = ItemFactory.get(this.$tags.length)
  },
}
</script>

<style lang="stylus">
.tags-item
  position absolute
  left 5px
  right 5px
  top 5px
  bottom 5px
.tags-item-text
  position absolute
  top 50%
  left 50%
  transform translate(-50%,-50%)

</style>
