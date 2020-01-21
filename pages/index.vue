<template>
    <div :class="{maximized, minimized}" class="index-view-root">
        <div class="menu-bar">
            <div class="dots">
                <div class="dot error"></div>
                <div @click="minimize" class="dot warn"></div>
                <div @click="maximize" class="dot debug"></div>
            </div>
        </div>
        <div :key="locale" @click="setLocale(locale)" v-for="locale in availableLocales">
            {{ locale }}
        </div>
        <div>
            <h1 class="title">jtp.es</h1>
            <h2 class="subtitle">{{$t("message")}}</h2>
        </div>
        <j-button text="standard" theme="standard"/>
        <j-button :negative="true" text="standard" theme="standard"/>
        <j-button bg-color="j-extra-1" color="j-secondary" text="" theme="standard"/>
        <j-button bg-color="j-extra-2" color="j-complementary" text="" theme="standard"/>
        <j-button bg-color="j-extra-3" color="j-complementary" text="" theme="standard"/>
        <j-button bg-color="j-extra-4" color="j-complementary" text="" theme="standard"/>
        <j-button bg-color="j-extra-5" color="j-complementary" text="" theme="standard"/>
        <j-button bg-color="j-extra-6" color="j-complementary" text="" theme="standard"/>


        <j-button bg-color="j-green" color="j-secondary" text="" theme="standard"/>
        <j-button bg-color="j-dark-green" color="j-complementary" text="" theme="standard"/>
        <j-button bg-color="j-orange" color="j-complementary" text="" theme="standard"/>
        <j-button bg-color="j-yellow" color="j-complementary" text="" theme="standard"/>
        <j-button bg-color="j-purple" color="j-complementary" text="" theme="standard"/>
        <j-button bg-color="j-blue" color="j-complementary" text="" theme="standard"/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import JButton from "~/components/ui/JButton.vue";
    import JIconButton from "~/components/ui/JIconButton.vue";

    @Component({
        components: {
            JIconButton,
            JButton
        }
    })
    export default class DefaultLayout extends Vue {
        maximized = false;
        minimized = false;

        // GETTERS & SETTERS --------------------------------------------------

        get availableLocales() {
            return this.$i18n.availableLocales.filter(i => i !== this.$i18n.locale);
        }

        // METHODS ------------------------------------------------------------

        maximize() {
            this.maximized = !this.maximized;
            this.minimized = false;
            this.$emit("changeTheme", "color");
        }

        minimize() {
            this.maximized = false;
            this.minimized = !this.minimized;
            this.$emit("changeTheme", "white");
        }

        changeTheme(value: string) {
            this.$nuxt.$emit("changeTheme", value);
        }

        setLocale(locale: string) {
            // @ts-ignore
            this.$nuxt.$i18n.setLocale(locale);
        }

        // WATCHERS -----------------------------------------------------------

        // HOOKS --------------------------------------------------------------
    }
</script>

<style scoped>
    .index-view-root {
        --menu-bar-height: 24px;
        border-radius: 7px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, .1), 0 1px 8px rgba(0, 0, 0, .2);
        height: calc(100vh - 80px);
        overflow: auto;

        transition: height 0.3s ease, width 0.3s ease;

        width: 1440px;

        color: var(--text-color);
        background-color: var(--bg-color);
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
