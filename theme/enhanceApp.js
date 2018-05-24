import { date } from '../filters'
import Theme from '@theme'
import moment from 'moment'
import { pathToComponentName } from '@app/util'
import { routes } from '@app/.temp/routes'

const getCountList = (arr) => {
    let counter = {},
        res = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i].toLocaleUpperCase()
        if (counter[item] === undefined) {
            counter[item] = 1;
        } else {
            counter[item]++
        }
    }

    for (let type in counter) {
        res.push({
            type,
            count: counter[type]
        })
    }
    return res;
}

export default ({
    Vue,
    options,
    router,
    siteData
}) => {
    const locales = siteData.themeConfig.locales
    router.addRoutes([{
        path: '/',
        redirect: locales[Object.keys(locales)[0]].rootPath || locales['/'].rootPath
    }])
    Vue.filter('date', date)
    Vue.mixin({
        computed: {
            $localePages() {
                return this.$site.pages.filter(item =>
                    item.path !== this.$themeLocaleConfig.rootPath &&
                    item.path.match(this.$themeLocaleConfig.rootPath) !== null &&
                    item.frontmatter.date
                ).sort((a, b) =>
                    moment(b.frontmatter.date, 'YYYY-MM-DD HH:mm:ss').valueOf() -
                    moment(a.frontmatter.date, 'YYYY-MM-DD HH:mm:ss').valueOf())
            },
            $categories() {
                const arr = this.$localePages
                    .filter(item => item.frontmatter.category)
                    .map(item => item.frontmatter.category)
                return getCountList(arr)
            },
            $archives() {
                const arr = this.$localePages
                    .filter(item => item.frontmatter.date)
                    .map(item =>
                        moment(item.frontmatter.date, 'YYYY-MM-DD HH:mm:ss')
                        .locale(this.$themeLocaleConfig.lang)
                        .format('MMM YYYY'))
                return getCountList(arr)
            },
            $tags() {
                let arr = []
                this.$localePages.filter(item => item.frontmatter.tags)
                    .forEach(item => {
                        arr = arr.concat(item.frontmatter.tags);
                    })
                return getCountList(arr)
            }
        },
        methods: {
            $dateFormatter: function(value, format) {
                return date(value, format)
            }
        }
    })
}