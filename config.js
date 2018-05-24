const locales = require('./locales.js');
const autoprefixer = require('autoprefixer');
const path = require('path')

module.exports = {
    title: 'Hello VuePress',
    description: 'Just playing around1',
    locales,
    head: [
        ['link', { rel: 'icon', href: `/favicon.ico` }],
        ['link', { rel: 'stylesheet', href: '/assets/font-awesome/font-awesome.min.css' }]
    ],
    // Google Analytics ID
    ga: 'xxxxx',
    // PWA support
    serviceWorker: true,
    // fuck IE
    evergreen: true,
    markdown: {
        // markdown-it-anchor 的选项
        anchor: { permalink: true },
        // markdown-it-toc 的选项
        toc: { includeLevel: [1, 2] },
        //   config: md => {
            //     md.use(require('markdown-it-task-lists')) // 一个 checkbox 的 TODO List 插件
            //       .use(require('markdown-it-imsize'), { autofill: true }) // 支持自定义 md 图片大小 ![](http://test.png =200x200)
            //   }
        },
        // 主题的一些配置
    themeConfig: {
        locales,
        // 博客背景图片
        background: `/background/path`,
        // 博客头像
        avatar: '/assets/img/avatar.jpg',
        // github card
        github: 'https://github.com/a298003154',
        // 名字
        name: 'hhh',
        // 个性签名
        title: 'Web 前端工程师',
        // 博客的 logo
        logo: '/assets/img/logo.png',
        // 定制文章标题颜色
        accentColor: '#ac3e40',
        // 和 vuepress 默认主题一样, 定制导航栏上的链接
        socials: [
            { type: 'github', link: 'https://github.com/a298003154' },
            { type: 'twitter', link: '' },
            { type: 'instagram', link: '' },
            { type: 'stack-overflow', link: '' },
            { type: 'weixin', link: '' },
            { type: 'qq', link: '' },
            { type: 'weibo', link: '' },
            { type: 'rss', link: '' }
        ]
    },
    configureWebpack: (config) => {
        config.resolve.alias['@util'] = path.resolve(__dirname, '../../node_modules/vuepress/lib/util/')
    },
    postcss: {
        plugins: () => [
            autoprefixer({
                browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
            })
        ]
    }
}