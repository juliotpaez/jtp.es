<template>
    <div :class="themeClass" class="layout-root">
        <div class="background">
            <div class="left"></div>
            <div class="right"></div>
        </div>
        <div class="page-container">
            <nuxt :key="$route.fullPath"/>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { GlobalState } from "~/store";

    @Component({
        head() {
            return (this as any).$nuxtI18nSeo();
        }
    })
    export default class DefaultLayout extends Vue {

        // GETTERS & SETTERS --------------------------------------------------

        get theme() {
            return (this.$store.state as GlobalState).theme;
        }

        get themeClass() {
            return ["theme-" + this.theme];
        }

        // METHODS ------------------------------------------------------------

        // WATCHERS -----------------------------------------------------------

        // HOOKS --------------------------------------------------------------

        created() {
            this.$nuxt.$on("changeTheme", (newTheme: string) => {
                this.$store.commit("changeTheme", newTheme);
            });
        }
    }
</script>

<style scoped>
    .layout-root {
        height: 100vh;
        width: 100vw;
    }

    .background {
        background: var(--bg-gradient-top);
        height: 100vh;
        left: 0;
        overflow: hidden;
        position: absolute;
        right: 0;
        top: 0;
        width: 100vw;
    }

    .background .left {
        background: var(--bg-gradient-left);
        height: 100vmax;
        left: -100vmax;
        transform: rotate(15deg);
        top: 30vh;
        width: 200vmax;
    }

    .background .right {
        background: var(--bg-gradient-right);
        height: 100vmax;
        position: absolute;
        right: -100vmax;
        transform: rotate(-20deg);
        top: 50vh;
        width: 200vmax;
    }

    .page-container {
        align-items: center;
        display: flex;
        height: 100vh;
        justify-content: center;
        width: 100vw;
    }
</style>
