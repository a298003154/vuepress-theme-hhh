<template>
  <div class="widget-wrap">
    <div class="widget-title">{{title}}</div>
    <div class="widget">
        <div :class="className+'-list'">
          <div class="list-item" v-for="(item,key) in list" :key="key">
              <a href="" class="list-item-link link">{{item.type}}</a>
              <span class="list-item-count">({{item.count}})</span>
          </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props: {
        className: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        list: {
            type: Array,
            default: []
        }
    }
}
</script>


