module.exports = {
  '/zh/': {
    rootPath: '/zh/',
    lang: 'zh-CN', // 将会被设置为 <html> 的 lang 属性
    title: 'VuePress',
    description: 'Vue 驱动的静态网站生成器',
    label: '简体中文',
    selectText: '选择语言',
    readMore: '更多',
    profile: {
      posts: '文章',
      tags: '标签'
    },
    nav: [{
        key: 'index',
        text: '首页',
        link: '/zh/'
      },
      {
        key: 'archives',
        text: '归档',
        link: '/zh/archives/'
      },
      {
        key: 'categories',
        text: '分类',
        link: '/zh/categories/'
      },
      {
        key: 'tags',
        text: '标签',
        link: '/zh/tags/'
      },
      {
        key: 'about',
        text: '关于',
        link: '/zh/about/'
      },
    ],
    sideBar: [{
        key: 'recent',
        text: '最近'
      },
      {
        key: 'categories',
        text: '分类'
      },
      {
        key: 'archives',
        text: '归档'
      },
      {
        key: 'tags',
        text: '标签'
      },
      {
        key: 'links',
        text: '链接'
      }
    ],
  },
  '/en/': {
    rootPath: '/en/',
    lang: 'en-US',
    title: 'VuePress',
    description: 'Vue-powered Static Site Generator',
    label: 'English',
    selectText: 'Languages',
    readMore: 'Read More',
    profile: {
      posts: 'posts',
      tags: 'tags'
    },
    nav: [{
        key: 'index',
        text: 'Home',
        link: '/en/'
      },
      {
        key: 'archives',
        text: 'Archives',
        link: '/en/archives/'
      },
      {
        key: 'categories',
        text: 'Categories',
        link: '/en/categories/'
      },
      {
        key: 'tags',
        text: 'Tags',
        link: '/en/tags/'
      },
      {
        key: 'about',
        text: 'About',
        link: '/en/about/'
      },
    ],
    sideBar: [{
        key: 'recent',
        text: 'recent'
      },
      {
        key: 'categories',
        text: 'categories'
      },
      {
        key: 'archives',
        text: 'archives'
      },
      {
        key: 'tags',
        text: 'tags'
      },
      {
        key: 'links',
        text: 'links'
      }
    ],
  }
}
