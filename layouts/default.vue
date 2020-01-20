<template>
    <div class="layout-root">
        <nuxt/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";

    @Component({
        head() {
            return (this as any).$nuxtI18nSeo();
        }
    })
    export default class DefaultLayout extends Vue {

        // GETTERS & SETTERS --------------------------------------------------

        // METHODS ------------------------------------------------------------

        // WATCHERS -----------------------------------------------------------

        // HOOKS --------------------------------------------------------------
    }
</script>

<style scoped>
    .layout-root {
        align-items: center;
        display: flex;
        height: 100vh;
        justify-content: center;
        width: 100vw;
    }
</style>
