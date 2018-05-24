
<template>
  <div v-html="html">
  </div>
</template>

<script>
import { pathToComponentName } from "@app/util";

import Markdown from "../../../node_modules/markdown-it";

const md = new Markdown();

export default {
  props: {
    custom: {
      type: Boolean,
      default: true
    },

    page: {
      type: Object,
      default: {}
    }
  },

  computed: {
    html: function() {
      return this.page.excerpt ? md.render(this.page.excerpt) : '';
    }
  }
};
</script>
