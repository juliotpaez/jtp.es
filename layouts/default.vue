<template>
    <div>
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
