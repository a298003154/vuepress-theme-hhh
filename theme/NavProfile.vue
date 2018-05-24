<template>
    <div class="nav-link sub-profile" @click="$emit('fix-profile')">
        <!-- <div class="sub-profile"> -->
            <img :src="$withBase(data.avatar)" alt="" class="avatar">
            <i :class="['fa','fa-caret-down',{active:fixProfile}]"></i>
        <!-- </div> -->
    </div>
</template>

<script>
export default {
    props: ['fixProfile'],
    computed: {
        data() {
            return this.$site.themeConfig;
        }
    },
    watch: {
        fixProfile(val) {
            console.log('val',val)
        }
    }
};
</script>

<style lang="stylus">
@import './styles/config.styl';

.nav-link.sub-profile 
    display none
    margin-left 1.5rem
    border-radius 50%
    vertical-align top
    cursor pointer

    &:hover 
        .fa.fa-caret-down 
            color $accentColor
        
    .avatar 
        margin-right 8px
        height $navbarHeight - 1.4rem
        width $navbarHeight - 1.4rem
        vertical-align: top

    .fa.fa-caret-down 
        color $textColor
        &.active
            color $accentColor

@media (max-width: $MQNarrow) 
    .nav-link.sub-profile 
        display inline-block
    

</style>
