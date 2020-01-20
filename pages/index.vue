<template>
    <div :class="{maximized, minimized}" class="index-view-root">
        <div class="menu-bar">
            <div class="dots">
                <div class="dot error"></div>
                <div @click="minimize" class="dot warn"></div>
                <div @click="maximize" class="dot debug"></div>
            </div>
        </div>
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
        maximized = false;
        minimized = true;

        // GETTERS & SETTERS --------------------------------------------------

        get availableLocales() {
            return this.$i18n.availableLocales.filter(i => i !== this.$i18n.locale);
        }

        // METHODS ------------------------------------------------------------

        maximize() {
            this.maximized = !this.maximized;
            this.minimized = false;
        }

        minimize() {
            this.maximized = false;
            this.minimized = !this.minimized;
        }

        // WATCHERS -----------------------------------------------------------

        // HOOKS --------------------------------------------------------------
    }
</script>

<style scoped>
    .index-view-root {
        background-color: #f7f7f7;
        --menu-bar-height: 24px;
        border-radius: 7px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, .1), 0 1px 8px rgba(0, 0, 0, .2);
        height: calc(100vh - 80px);
        overflow: hidden;
        transition: height 0.3s ease, width 0.3s ease;

        width: 1440px;
    }

    .index-view-root.maximized {
        border-radius: 0;
        height: 100vh;
        width: 100vw;
    }

    .index-view-root.minimized {
        height: var(--menu-bar-height)
    }

    .menu-bar {
        background-color: #1a2028;
        height: var(--menu-bar-height)
    }

    .menu-bar .dots {
        align-items: center;
        display: flex;
        height: 100%;
    }

    .menu-bar .dots .dot {
        background-color: #626265;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, .1), 0 1px 8px rgba(0, 0, 0, .2);
        cursor: pointer;
        height: 8px;
        margin-left: 10px;
        width: 8px;
    }

    .menu-bar .dots .dot.error:hover {
        background-color: var(--error-bg-color);
    }

    .menu-bar .dots .dot.warn:hover {
        background-color: var(--warn-bg-color);
    }

    .menu-bar .dots .dot.debug:hover {
        background-color: var(--debug-bg-color);
    }

    @media (max-width: 1440px) {
        .index-view-root {
            border-radius: 0;
            height: 100vh;
            width: 100vw;
        }
    }
</style>

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
