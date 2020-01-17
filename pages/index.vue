<template>
    <div class="index-view-root">
        <nuxt-link :key="locale" :to="switchLocalePath(locale)" v-for="locale in availableLocales">
            {{ locale }}
        </nuxt-link>
        <div>
            <h1 class="title">jtp.es</h1>
            <h2 class="subtitle">{{$t("message")}}</h2>
        </div>
    </div>
</template>

<script>
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class DefaultLayout extends Vue {

        // GETTERS & SETTERS --------------------------------------------------

        get availableLocales() {
            return this.$i18n.availableLocales.filter(i => i !== this.$i18n.locale);
        }

        // METHODS ------------------------------------------------------------

        // WATCHERS -----------------------------------------------------------

        // HOOKS --------------------------------------------------------------
    }
</script>

<i18n>
    {
        "en": {
            "message": "The code of my personal web page"
        },
        "es": {
            "message": "El código de mi web personal"
        }
    }
</i18n>
